import React, { useContext, Fragment, useEffect } from 'react';
// import { TransitionGroup, CSSTransition } from 'react-transition-group';

import Spinner from '../layouts/Spinner';

import ContactContext from '../../context/contacts/contactContext';

import ContactItem from './ContactItem';

const Contacts = () => {
  const { contacts, filtered, getContacts, loading } = useContext(
    ContactContext
  );

  useEffect(() => {
    getContacts();

    // eslint-disable-next-line
  }, []);

  if (contacts !== null && contacts.lenght === 0 && !loading) {
    return <h4>Please, add a contact...</h4>;
  }

  return (
    <Fragment>
      {contacts !== null && !loading ? (
        /* <TransitionGroup> */
        filtered ? (
          filtered.map((contact) => (
            //<CSSTransition key={contact.id} timeout={500} classNames='item'>
            <ContactItem key={contact._id} contact={contact} />
            //</CSSTransition>
          ))
        ) : (
          contacts.map((contact) => (
            //<CSSTransition key={contact.id} timeout={500} classNames='item'>
            <ContactItem key={contact._id} contact={contact} />
            //</CSSTransition>
          ))
        )
      ) : (
        /* </TransitionGroup> */

        <Spinner />
      )}
    </Fragment>
  );
};

export default Contacts;
