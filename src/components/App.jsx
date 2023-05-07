import { useState, useEffect, useRef } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';

export const App = () => {
    const [contacts, setContacts] = useState([]);
    const [filter, setFilter] = useState('');
    const isFirstLaunch = useRef(true);

    useEffect(() => {
        const contactStorage = JSON.parse(localStorage.getItem('contacts'));
        if (contactStorage) setContacts(contactStorage);
    }, []);

    useEffect(() => {
        if (isFirstLaunch.current) {
            isFirstLaunch.current = false;
            return;
        };
        const contactStorage = JSON.stringify(contacts);
        if (contactStorage) localStorage.setItem('contacts', contactStorage);
    }, [contacts]);

    const addContact = contact => {
        setContacts(previous => [...previous, { ...contact, id: nanoid() }]);
    };

    const deleteContact = id => {
        setContacts(previous => previous.filter(contact => contact.id !== id));
    };

    const onChange = event => { setFilter(event.target.value) };

    const getFilterNormalize = () => filter.toLowerCase();

    const getFilteredContacts = () => contacts.filter(contact => contact.name.toLowerCase().includes(getFilterNormalize()));

    return (
        <div style={{ margin: 10 }}>
            <h1>Phonebook</h1>
            <ContactForm contacts={contacts} onSubmit={addContact} />
            <h2 style={{ fontSize: 32 }}>Contacts</h2>
            <Filter filter={filter} onChange={onChange} />
            <ContactList contacts={contacts} filteredList={getFilteredContacts()} deleteContact={deleteContact} />
        </div>
    );
}