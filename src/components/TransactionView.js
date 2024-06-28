import React, { useState } from 'react'
import '../css/transactionView.css'
import AlertView from './AlertView'
import { doc, deleteDoc } from "firebase/firestore";
import { db } from '../config/firebase'
import { appContext } from '../context/context';

const TransactionView = ({ setActiveID, data }) => {

  const { alertPopUp, loadTransactions, setLoading } = React.useContext(appContext)


  const deleteTransaction = () => {

    alertPopUp({
      type: 'danger',
      message: 'Are you sure you want to delete this transaction?',
      handleConfirm: async () => {
        setLoading(true)
        await deleteDoc(doc(db, "transactions", data.id)).then(() => {
          loadTransactions()
          setActiveID(null)
          setLoading(false)
        }).catch((error) => {
          setLoading(false)
          alert("Error deleting transaction: ", error)
        });
      }
    })

  }

  return (
    <>
      <div className="transaction-view">
        <div className="transaction-view-main">
          <div className="data">
            <div className="data-item name">
              Name: <div className="data-item-value name-value">{data.person}</div>
            </div>
            <div className="data-item date">
              Date: <div className="data-item-value date-value">{data.date.slice(2).split('-').reverse().join('-')}</div>
            </div>
            <div className="data-item amount">
              Amount: <div className={"data-item-value amount-value " + data.type}>₹ {data.amount}</div>
            </div>
            <div className="data-item category">
              Category: <div className="data-item-value category-value">{data.category}</div>
            </div>
            <div className="data-item description">
              Description: <div className="data-item-value description-value">{data.description}</div>
            </div>
          </div>

          <div className="buttons-div">
            <button className='delete-button' onClick={deleteTransaction}>Delete</button>
            <button className='close-button' onClick={() => setActiveID(null)}>Close</button>
          </div>

        </div>
      </div>
    </>
  )
}

export default TransactionView