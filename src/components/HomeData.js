import React from 'react'

const HomeData = ({history, setActiveID}) => {
  return (
    <>
      {history && Object.values(history).map((payment,index) => {
        return (
          <div key={index} className="home-item" onClick={()=>setActiveID(payment.id)}>
            <div className="home-item-data date">{payment.date.slice(2).split('-').reverse().join('-')}</div>
            <div className="home-item-data person">{payment.person}</div>
            <div className={payment.type === "Income" ? "home-item-data amount income" : "home-item-data amount expense"}>₹{payment.amount}</div>
          </div>
        );
      })}
  </>)
}

export default HomeData