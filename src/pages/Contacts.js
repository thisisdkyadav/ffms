import React, { useState, useEffect, useRef, useContext } from 'react'
import { db } from "../config/firebase";
import { collection, query, deleteDoc, getDocs, orderBy, addDoc, doc, where } from "firebase/firestore";
import '../css/contacts.css'
import AlertView from '../components/AlertView';
import ContactView from '../components/ContactView';
import {appContext} from '../context/context'


const Contacts = () => {

  const {contacts, loadContacts, setLoading} = useContext(appContext)

  const catList = ["Not Selected", "Home", "Work"]

  const [catOption, setCatOption] = useState(0);
  const [alertInfo, setAlertInfo] = useState({type: '', message: '', isActive: false, handleConfirm: () => null})
  const [activeID, setActiveID] = useState(null)

  const name = useRef()

  const addNewContact = async () => {
    if (name.current.value === "") {
      alert("Please fill the required fields")
      return
    }
    if (catOption === 0) {
      alert("Please select a category")
      return
    }

    setLoading(true)

    await addDoc(collection(db, "contacts"), {
      name: name.current.value,
      category: catList[catOption]
    }).then(() => {
      loadContacts()
      setLoading(false)
    }).catch((error) => {
      setLoading(false)
      alert("Error adding contact: ", error)
    });
  }

  return (
    <>

      {alertInfo.isActive && <AlertView type={alertInfo.type} message={alertInfo.message} handleCancel={() => setAlertInfo({type: '', message: '', isActive: false, handleConfirm: () => null})} handleConfirm={alertInfo.handleConfirm} />}
    
      {activeID && <ContactView setActiveID={setActiveID} data={contacts[activeID]} />}

      <div className="contacts">
        <div className="contacts-header">
          <div className="new-contact">
            <input type="text" className='new-contact-name' placeholder="Name" ref={name} />
            <button className='new-contact-button' onClick={addNewContact} >+</button>
          </div>
            <div className='new-contact-cat'>
              <div className="new-contact-cat-list">
                <div className={catOption === 1 ? 'new-contact-cat-option active' : 'new-contact-cat-option'} onClick={() => setCatOption(1)}>Home</div>
                <div className={catOption === 2 ? 'new-contact-cat-option active' : 'new-contact-cat-option'} onClick={() => setCatOption(2)}>Work</div>
              </div>
            </div>
        </div>
        <hr />
        <div className="contacts-data">
          {contacts && Object.values(contacts).map((contact) => {
            return (
              <div key={contact.id} className="contacts-item" onClick={() => setActiveID(contact.id)}>
                <div className="contacts-item-data person">{contact.name}</div>
                <div className="contacts-item-data category">{contact.category}</div>
                {/* <div className="contacts-item-data delete-button">
                  <img className='delete-button-image' src="delete.svg" alt="delete" onClick={()=>deleteContact(contact.id)} />
                </div> */}
              </div>
            );
          })}
          <div style={{ height: 200 }}></div>
        </div>
      </div>
    </>
  )
}

export default Contacts