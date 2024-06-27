import React, { useState, useEffect } from 'react'
import TransactionMiniView from './TransactionMiniView'
import TransactionView from './TransactionView';
import '../css/transactionsListView.css'
import { appContext } from '../context/context';

const TransactionsListView = ({showName = true, type="All" , contactID = null}) => {

  const { transactions } = React.useContext(appContext)

  const [activeID, setActiveID] = useState(null)


  return (
    <div className='transactions-list-view'>

      {activeID && <TransactionView setActiveID={setActiveID} data={transactions[activeID]} />}

      <div className="home-header">
        <div className="home-header-item date">Date</div>
        {showName && <div className="home-header-item person">Person</div>}
        <div className="home-header-item amount">Amount</div>
      </div>

      <div className="home-data">
        <TransactionMiniView transactions={transactions} setActiveID={setActiveID} showName={showName} type={type} contactID={contactID} />
        <div style={{ height: 250 }}></div>
      </div>
    </div>
  )
}

export default TransactionsListView