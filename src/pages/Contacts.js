import React, { useState, useEffect, useRef } from 'react'
import { db } from "../config/firebase";
import { collection, query, deleteDoc, getDocs, orderBy, addDoc, doc } from "firebase/firestore";
import '../css/contacts.css'
import AlertView from '../components/AlertView';

const Contacts = () => {

  const catList = ["Not Selected", "Home", "Work"]

  const [contacts, setContacts] = useState(null);
  const [catOption, setCatOption] = useState(0);
  const [alertInfo, setAlertInfo] = useState({type: '', message: '', isActive: false, handleConfirm: () => null})


  const name = useRef()


  const loadData = async () => {
    const contactsQuery = query(collection(db, "contacts"), orderBy("name"));
    const querySnapshot = await getDocs(contactsQuery);
    setContacts(querySnapshot);
  }

  const addNewContact = async () => {
    if (name.current.value === "") {
      alert("Please fill the required fields")
      return
    }
    if (catOption === 0) {
      alert("Please select a category")
      return
    }
    await addDoc(collection(db, "contacts"), {
      name: name.current.value,
      category: catList[catOption]
    }).then(() => {
      loadData()
      alert("Contact added successfully")
    }).catch((error) => {
      alert("Error adding contact")
    });
  }

  const deleteContact = (id) => {
    setAlertInfo({
      type: 'danger',
      message: 'Are you sure you want to delete this contact?',
      isActive: true,
      handleConfirm: async () => {
        await deleteDoc(doc(db, "contacts", id))
        setAlertInfo({type: '', message: '', isActive: false, handleConfirm: () => null})
        alert("Contact deleted successfully");
        loadData()
      }
    })
  }


  useEffect(() => {
    loadData()

  }, [])

  return (
    <>

      {alertInfo.isActive && <AlertView type={alertInfo.type} message={alertInfo.message} handleCancel={() => setAlertInfo({type: '', message: '', isActive: false, handleConfirm: () => null})} handleConfirm={alertInfo.handleConfirm} />}

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
          {contacts && contacts.docs.map((doc) => {
            const person = doc.data();
            const id = doc.id;
            return (
              <div key={id} className="contacts-item">
                <div className="contacts-item-data person">{person.name}</div>
                <div className="contacts-item-data category">{person.category}</div>
                <div className="contacts-item-data delete-button">
                  <img className='delete-button-image' src="delete.svg" alt="delete" onClick={()=>deleteContact(id)} />
                </div>
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