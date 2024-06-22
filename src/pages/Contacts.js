import React, { useState, useEffect, useRef } from 'react'
import { db } from "../config/firebase";
import { collection, query, where, getDocs, orderBy, addDoc } from "firebase/firestore";
import '../css/contacts.css'
// import { useRef } from 'react';

const Contacts = () => {

  const [contacts, setContacts] = useState(null)

  const name = useRef()


  const loadData = async () => {
    const contactsQuery = query(collection(db, "contacts"), orderBy("name"));
    const querySnapshot = await getDocs(contactsQuery);
    setContacts(querySnapshot);
  }

  const addNewContact = async () => {
    await addDoc(collection(db, "contacts"), {
      name: name.current.value
    }).then(() => {
      loadData()
      alert("Contact added successfully")
    }).catch((error) => {
      alert("Error adding contact")
    });
  }


  useEffect(() => {
    loadData()

  }, [])

  return (
    <>
      <div className="contacts">
      <div className="contacts-header">
        {/* <div className="contacts-header-item person">Add new contact</div> */}
        <div className="new-contact">
          <input type="text" className='new-contact-name' placeholder="Name" ref={name} />
          <button className='new-contact-button' onClick={addNewContact} >+</button>
        </div>
      </div>
        <div className="contacts-data">
          {contacts && contacts.docs.map((doc) => {
            const person = doc.data();
            const id = doc.id;
            return (
              <div key={id} className="contacts-item">
                <div className="contacts-item-data person">{person.name}</div>
              </div>
            );
          })}
          <div style={{height:200}}></div>
        </div>
      </div>
    </>
  )
}

export default Contacts