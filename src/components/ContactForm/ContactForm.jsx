import PropTypes from 'prop-types';
import { useState } from 'react';
import { ContactWrapper, Label, Input, Button } from './ContactForm.styled';

const ContactForm = ({ contacts, onSubmit }) => {
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');

    const onChange = ({ target: { name, value } }) => {
        switch (name) {
            case 'name':
                setName(value);
                break;
            case 'number':
                setNumber(value);
                break;
            default:
                console.error(`Unexpected attribute - ${name}`);
        };
    };

    const onAddToContactSubmit = event => {
        event.preventDefault();

        if (contacts.some(contact => contact.name === name))
            callAlert(name)
        else onSubmit({ name, number });

        setName('');
        setNumber('');
    };

    const callAlert = name => alert(`${name} is already in contacts`);

    return (
        <ContactWrapper onSubmit={onAddToContactSubmit}>
            <Label htmlFor="name">Name</Label>
            <Input
                type="text"
                id="name"
                name="name"
                pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                required
                onChange={onChange}
                value={name}
            />
            <Label htmlFor="tel">Number</Label>
            <Input
                type="tel"
                id="tel"
                name="number"
                pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                required
                onChange={onChange}
                value={number}
            />
            <Button type="submit">Add to contact</Button>
        </ContactWrapper>
    );
};

ContactForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    contacts: PropTypes.array.isRequired,
};

export default ContactForm;