import React, { useState, useContext, useEffect } from 'react';

import ContactContext from '../../context/contacts/contactContext';

const ContactForm = () => {
  const contactContext = useContext(ContactContext);
  const { addContact, updateContact, current, clearCurrent } = contactContext;

  const [contact, setContact] = useState({
    name: '',
    email: '',
    phone: '',
    type: 'personal',
  });

  useEffect(() => {
    if (current) {
      setContact(current);
    }
  }, [current]);

  const { name, email, phone, type } = contact;

  const clearAll = () => {
    clearCurrent();
    setContact({
      name: '',
      email: '',
      phone: '',
      type: 'personal',
    });
  };

  const onChange = (e) =>
    setContact({ ...contact, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (current) {
      updateContact(contact);
    } else {
      addContact(contact);
    }

    clearAll();
  };

  return (
    <form onSubmit={onSubmit}>
      <h2 className='text-primary'>
        {current ? 'Edit contact' : 'Add contact'}
      </h2>
      <input
        type='text'
        name='name'
        placeholder='Name'
        value={name}
        onChange={onChange}
      />
      <input
        type='email'
        name='email'
        placeholder='Email'
        value={email}
        onChange={onChange}
      />
      <input
        type='text'
        name='phone'
        placeholder='Phone'
        value={phone}
        onChange={onChange}
      />
      <h5>Contact Type</h5>
      <input
        type='radio'
        name='type'
        value='personal'
        checked={type === 'personal'}
        onChange={onChange}
      />{' '}
      Personal{' '}
      <input
        type='radio'
        name='type'
        value='professional'
        checked={type === 'professional'}
        onChange={onChange}
      />{' '}
      Professional{' '}
      <div>
        <input
          type='submit'
          value={current ? 'Update contact' : 'Add contact'}
          className='btn btn-primary btn-block'
        />
      </div>
      {current && (
        <div>
          <input
            type='submit'
            value='Clear'
            className='btn btn-light btn-block'
            onClick={clearAll}
          />
        </div>
      )}
    </form>
  );
};

export default ContactForm;
