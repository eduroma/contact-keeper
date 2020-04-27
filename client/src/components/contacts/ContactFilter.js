import React, { useRef, useContext, useEffect } from 'react';
import ContactContext from '../../context/contacts/contactContext';

const ContactFilter = () => {
  const { filterContacts, clearFilter, filtered } = useContext(ContactContext);

  const text = useRef('');

  useEffect(() => {
    console.log(text.current.value);
    if (!filtered) {
      text.current.value = '';
    }
  });

  const onChange = (e) => {
    if (text.current.value !== '') {
      filterContacts(text.current.value);
    } else {
      clearFilter();
    }
  };

  return (
    <form>
      <input
        type='text'
        ref={text}
        placeholder='Filter contacts...'
        onChange={onChange}
      />
    </form>
  );
};

export default ContactFilter;
