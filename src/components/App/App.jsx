import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';

import ContactForm from '../ContactForm';
import Filter from '../Filter';
import ContactList from '../ContactList/';

function filterContacts(contacts, filter) {
  return contacts.filter(({ name }) =>
    name.toLowerCase().includes(filter.toLowerCase()),
  );
}

export default function App() {
  const [contacts, setContacts] = useState(
    () => JSON.parse(localStorage.getItem('contacts')),
    [],
  );
  const [filter, setFilter] = useState('');

  const filteredContacts = filterContacts(contacts, filter);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
    setFilter('');
  }, [contacts]);

  const addItemToContacts = (e, newName, newNumber) => {
    e.preventDefault();
    if (
      contacts.find(({ name }) => name.toLowerCase() === newName.toLowerCase())
    )
      return window.alert(`${newName} is already in contacts.`);

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
      <ContactList
        filteredContacts={filteredContacts}
        deleteContact={deleteItemFromContacts}
      />
    </div>
  );
}
