import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';

import ContactForm from '../ContactForm';
import Filter from '../Filter';
import ContactList from '../ContactList/';

export default function App() {
  const CONTACTS = 'contacts';
  const [contacts, setContacts] = useState(
    () => JSON.parse(localStorage.getItem(CONTACTS)) ?? [],
  );
  const [filter, setFilter] = useState('');
  const [filteredContacts, setFilteredContacts] = useState(() => contacts, []);

  useEffect(() => {
    localStorage.setItem(CONTACTS, JSON.stringify(contacts));
    setFilter('');
  }, [contacts]);

  useEffect(() => {
    setFilteredContacts(
      contacts.filter(({ name }) =>
        name.toLowerCase().includes(filter.toLowerCase()),
      ),
    );
  }, [filter, contacts]);

  const addItemToContacts = (e, newName, newNumber) => {
    e.preventDefault();

    const found = contacts.find(
      ({ name }) => name.toLowerCase() === newName.toLowerCase(),
    );
    if (found) return window.alert(`${newName} is already in contacts.`);

    setContacts(prevState => [
      { id: nanoid(), name: newName, number: newNumber },
      ...prevState,
    ]);
  };

  const deleteItemFromContacts = e => {
    e.preventDefault();
    setContacts(prevState =>
      prevState.filter(contact => contact.id !== e.target.value),
    );
  };

  const setFilterValue = e => setFilter(e.target.value);

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm onFormSubmit={addItemToContacts} />
      <h2>Contacts</h2>
      <Filter filter={filter} onChangeFilterValue={setFilterValue} />
      {filteredContacts && (
        <ContactList
          filteredContacts={filteredContacts}
          deleteContact={deleteItemFromContacts}
        />
      )}
    </div>
  );
}