import React, { useState } from 'react'
import '../css/transactionView.css'
import AlertView from './AlertView'
import { doc, deleteDoc } from "firebase/firestore";
import { db } from '../config/firebase'

const TransactionView = ({ setActiveID, data }) => {

  const [alertInfo, setAlertInfo] = useState({type: '', message: '', isActive: false, handleConfirm: () => null})

  const deleteTransaction = () => {
    setAlertInfo({
      type: 'danger',
      message: 'Are you sure you want to delete this transaction?',
      isActive: true,
      handleConfirm: async () => {
        await deleteDoc(doc(db, "transactions", data.id))
        alert("Transaction deleted successfully");
        setActiveID(null)
      }
    })
  }

  return (
    <>
      {alertInfo.isActive && <AlertView type={alertInfo.type} message={alertInfo.message} handleCancel={() => setAlertInfo({type: '', message: '', isActive: false, handleConfirm: () => null})} handleConfirm={alertInfo.handleConfirm} />}
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