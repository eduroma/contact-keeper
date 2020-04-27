import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import ContactContext from '../../context/contacts/contactContext';

const ContactItem = ({ contact }) => {
  const { _id, name, email, phone, type } = contact;

  const contactContext = useContext(ContactContext);
  const { deleteContact, setCurrent, clearCurrent } = contactContext;

  const onDelete = () => {
    deleteContact(_id);
    clearCurrent();
  };

  return (
    <div className='card bg-light'>
      <h3 className='text-primary text-left'>
        {name}{' '}
        <span
          className={
            'badge ' +
            (type === 'professional' ? 'badge-success' : 'badge-primary')
          }
          style={{ float: 'right' }}
        >
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </span>
      </h3>
      <ul className='list'>
        {email && (
          <li>
            <i className='fas fa-envelope-open' /> {email}
          </li>
        )}
        {phone && (
          <li>
            <i className='fas fa-phone' /> {phone}
          </li>
        )}
      </ul>
      <button
        className='btn btn-dark btn-sm'
        onClick={() => setCurrent(contact)}
      >
        Edit
      </button>
      <button className='btn btn-danger btn-sm' onClick={onDelete}>
        Delete
      </button>
    </div>
  );
};

ContactItem.propTypes = {
  contact: PropTypes.object.isRequired,
};

export default ContactItem;
