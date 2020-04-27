import React, { useReducer } from 'react';
import axios from 'axios';

import contactReducer from './contactReducer';
import ContactContext from './contactContext';

import {
  ADD_CONTACT,
  DELETE_CONTACT,
  UPDATE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  FILTER_CONTACTS,
  CLEAR_FILTER,
  CONTACT_ERROR,
  GET_CONTACTS,
  CLEAR_CONTACTS,
} from '../types';

const ContactState = (props) => {
  const initialState = {
    contacts: null,
    current: null,
    filtered: null,
    error: null,
  };

  const [state, dispatch] = useReducer(contactReducer, initialState);

  const getContacts = async () => {
    try {
      const res = await axios.get('/api/contacts');

      dispatch({ type: GET_CONTACTS, payload: res.data });
    } catch (err) {
      dispatch({ type: CONTACT_ERROR, payload: err.response.data });
    }
  };

  const addContact = (contact) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const res = axios.post('/api/contacts', contact, config);

      dispatch({ type: ADD_CONTACT, payload: res.data });
    } catch (err) {
      dispatch({ type: CONTACT_ERROR, payload: err.response.msg });
    }
  };

  const updateContact = async (contact) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const res = await axios.put(
        `/api/contacts/${contact._id}`,
        contact,
        config
      );

      dispatch({ type: UPDATE_CONTACT, payload: res.data });
    } catch (err) {
      dispatch({ type: CONTACT_ERROR, payload: err.response.msg });
    }
  };

  const deleteContact = async (id) => {
    try {
      await axios.delete(`/api/contacts/${id}`);
      dispatch({ type: DELETE_CONTACT, payload: id });
    } catch (err) {
      dispatch({ type: CONTACT_ERROR, payload: err.response.msg });
    }
  };

  const clearContacts = () => {
    dispatch({ type: CLEAR_CONTACTS });
  };

  const setCurrent = (contact) => {
    dispatch({ type: SET_CURRENT, payload: contact });
  };

  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };

  const filterContacts = (text) => {
    dispatch({ type: FILTER_CONTACTS, payload: text });
  };

  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER });
  };

  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
        current: state.current,
        filtered: state.filtered,
        getContacts,
        addContact,
        updateContact,
        deleteContact,
        clearContacts,
        setCurrent,
        clearCurrent,
        filterContacts,
        clearFilter,
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;
