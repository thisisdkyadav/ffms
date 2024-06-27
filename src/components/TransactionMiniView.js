import React from 'react'

const TransactionMiniView = ({transactions, setActiveID, showName, type, contactID}) => {
  return (
    <>
      {transactions && Object.values(transactions).map((payment,index) => {
        if(contactID && payment.personID !== contactID) return null
        if(type && type !== "All" && payment.type !== type) return null
        return (
          <div key={index} className="home-item" onClick={()=>setActiveID(payment.id)} style={{border: `${index===(Object.values(transactions).length-1)&&"none"}`}}>
            <div className="home-item-data date">{payment.date.slice(2).split('-').reverse().join('-')}</div>
            {showName&&<div className="home-item-data person">{payment.person}</div>}
            <div className={payment.type === "Income" ? "home-item-data amount income" : "home-item-data amount expense"}>₹{payment.amount}</div>
          </div>
        );
      })}
  </>)
}

export default TransactionMiniView