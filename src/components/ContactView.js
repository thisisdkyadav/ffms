import React, { useState, useRef, useEffect } from 'react'
import '../css/ContactView.css'
import AlertView from './AlertView'
import { doc, deleteDoc, query, collection, where, orderBy, getDocs } from 'firebase/firestore'
import { db } from '../config/firebase'
import TransactionsListView from './TransactionsListView';
import DateRangeSelector from './DateRangeSelector'
import { appContext } from '../context/context'

const ContactView = ({ setActiveID, data }) => {

  const { alertPopUp, loadContacts, setLoading } = React.useContext(appContext)

  const deleteContact = () => {

    alertPopUp({
      type: 'danger',
      message: 'Are you sure you want to delete this contact?',
      handleConfirm: async () => {
        setLoading(true)
        await deleteDoc(doc(db, "contacts", data.id)).then(() => {
          loadContacts()
          setActiveID(null)
          setLoading(false)
        }).catch((error) => {
          setLoading(false)
          alert("Error deleting contact: ", error)
        });
      }
    })
  }
  

  return (
    <>
      <div className="contact-view">
        <div className="contact-view-main">
          <div className="data">
            <div className="data-item name">
              Name: <div className="data-item-value name-value">{data.name}</div>
            </div>
            <div className="data-item date">
              Category: <div className="data-item-value date-value">{data.category}</div>
            </div>

          </div>
          <DateRangeSelector />

          <TransactionsListView contactID={data.id} showName={false} />

          <div className="buttons-div">
            <button className='delete-button' onClick={deleteContact}>Delete</button>
            <button className='close-button' onClick={() => setActiveID(null)}>Close</button>
          </div>

        </div>
      </div>
    </> 
  )
}


export default ContactView