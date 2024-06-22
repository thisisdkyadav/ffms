import React, { useState, useEffect, useRef } from 'react'
import SecNav from '../components/SecNav'
import ReportBar from '../components/ReportBar'
import { db } from "../config/firebase";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import '../css/home.css'


const Home = () => {

  let today = new Date();
  let monthAgo = new Date(today.setMonth(today.getMonth() - 1));


  // const selectModeList = [{type:"date", value:date}, {type:"month", value:month}, {type:"year", value:year}]

  const [mode, setMode] = React.useState(0);
  const [history, setHistory] = useState(null);
  const [profit, setProfit] = useState(0)
  const [loss, setLoss] = useState(0)

  const startDate = useRef();
  const endDate = useRef();

  const loadData = async () => {
    let initialTimeID = startDate.current.value.replace(/-/g, "") + "000000";
    let finalTimeID = endDate.current.value.replace(/-/g, "") + "999999";
    if (mode === 0) {
      const paymentsQuery = query(collection(db, "transactions"), where("timeid", ">=", initialTimeID), where("timeid", "<=", finalTimeID), orderBy("timeid", "desc"));
      const querySnapshot = await getDocs(paymentsQuery);
      setHistory(querySnapshot);
    } else {
      const paymentsQuery = query(collection(db, "transactions"), where("timeid", ">=", initialTimeID), where("timeid", "<=", finalTimeID), orderBy("timeid", "desc"), where("type", "==", mode === 1 ? "Income" : "Expense"));
      const querySnapshot = await getDocs(paymentsQuery);
      setHistory(querySnapshot);
    }
  }

  const handleReport = () => {
    let profit = 0;
    let loss = 0;
    history.docs.map((doc) => {
      const item = doc.data();
      if (item.type === "Income") {
        profit += parseInt(item.amount);
      } else {
        loss += parseInt(item.amount);
      }
    })
    setProfit(profit)
    setLoss(loss)
  }

  useEffect(() => {
    startDate.current.value = monthAgo.toISOString().slice(0, 10)
    endDate.current.value = new Date().toISOString().slice(0, 10)
    return () => {
      console.log("cleanup")
    }
  }, [])

  useEffect(() => {
    loadData()
    return () => {
      console.log("cleanup")
    }
  }, [mode])

  useEffect(() => {
    if (history) {
      handleReport()
    }

    return () => {
      console.log("cleanup")
    }
  }, [history])




  return (
    <>
      <SecNav secNavList={["All", "Income", "Expense"]} activeSecNav={mode} handleSecNavClick={setMode} />



      <div className="home">
        <div className="rangeSelector">
          <input type="date" ref={startDate} onChange={loadData} />
          <input type="date" ref={endDate} onChange={loadData} />
        </div>
        <div className="report">
          <ReportBar profit={profit} loss={loss} />
          <div className="report-item">
            <div className='amount income' >₹{profit}</div>
            <div>-</div>
            <div className='amount expense' >₹{loss}</div>
            <div>=</div>
            <div className={profit - loss > 0 ? 'amount income' : 'amount expense'} >₹{profit - loss}</div>
          </div>
        </div>


        <div className="home-header">
          <div className="home-header-item date">Date</div>
          <div className="home-header-item person">Person</div>
          {/* <div className="home-header-item">Category</div> */}
          <div className="home-header-item amount">Amount</div>
        </div>
        <div className="home-data">
          {history && history.docs.map((doc) => {
            const item = doc.data();
            const id = doc.id;
            return (
              <div key={id} className="home-item">
                <div className="home-item-data date">{item.date.slice(2).split('-').reverse().join('-')}</div>
                <div className="home-item-data person">{item.person}</div>
                {/* <div className="home-item-data">{item.category}</div> */}
                <div className={item.type === "Income" ? "home-item-data amount income" : "home-item-data amount expense"}>₹{item.amount}</div>
              </div>
            );
          })}
          {history && history.docs.map((doc) => {
            const item = doc.data();
            const id = doc.id;
            return (
              <div key={id} className="home-item">
                <div className="home-item-data date">{item.date.slice(2).split('-').reverse().join('-')}</div>
                <div className="home-item-data person">{item.person}</div>
                {/* <div className="home-item-data">{item.category}</div> */}
                <div className={item.type === "Income" ? "home-item-data amount income" : "home-item-data amount expense"}>₹{item.amount}</div>
              </div>
            );
          })}
          {history && history.docs.map((doc) => {
            const item = doc.data();
            const id = doc.id;
            return (
              <div key={id} className="home-item">
                <div className="home-item-data date">{item.date.slice(2).split('-').reverse().join('-')}</div>
                <div className="home-item-data person">{item.person}</div>
                {/* <div className="home-item-data">{item.category}</div> */}
                <div className={item.type === "Income" ? "home-item-data amount income" : "home-item-data amount expense"}>₹{item.amount}</div>
              </div>
            );
          })}
          {history && history.docs.map((doc) => {
            const item = doc.data();
            const id = doc.id;
            return (
              <div key={id} className="home-item">
                <div className="home-item-data date">{item.date.slice(2).split('-').reverse().join('-')}</div>
                <div className="home-item-data person">{item.person}</div>
                {/* <div className="home-item-data">{item.category}</div> */}
                <div className={item.type === "Income" ? "home-item-data amount income" : "home-item-data amount expense"}>₹{item.amount}</div>
              </div>
            );
          })}
          {history && history.docs.map((doc) => {
            const item = doc.data();
            const id = doc.id;
            return (
              <div key={id} className="home-item">
                <div className="home-item-data date">{item.date.slice(2).split('-').reverse().join('-')}</div>
                <div className="home-item-data person">{item.person}</div>
                {/* <div className="home-item-data">{item.category}</div> */}
                <div className={item.type === "Income" ? "home-item-data amount income" : "home-item-data amount expense"}>₹{item.amount}</div>
              </div>
            );
          })}
          {history && history.docs.map((doc) => {
            const item = doc.data();
            const id = doc.id;
            return (
              <div key={id} className="home-item">
                <div className="home-item-data date">{item.date.slice(2).split('-').reverse().join('-')}</div>
                <div className="home-item-data person">{item.person}</div>
                {/* <div className="home-item-data">{item.category}</div> */}
                <div className={item.type === "Income" ? "home-item-data amount income" : "home-item-data amount expense"}>₹{item.amount}</div>
              </div>
            );
          })}
          {history && history.docs.map((doc) => {
            const item = doc.data();
            const id = doc.id;
            return (
              <div key={id} className="home-item">
                <div className="home-item-data date">{item.date.slice(2).split('-').reverse().join('-')}</div>
                <div className="home-item-data person">{item.person}</div>
                {/* <div className="home-item-data">{item.category}</div> */}
                <div className={item.type === "Income" ? "home-item-data amount income" : "home-item-data amount expense"}>₹{item.amount}</div>
              </div>
            );
          })}
          {history && history.docs.map((doc) => {
            const item = doc.data();
            const id = doc.id;
            return (
              <div key={id} className="home-item">
                <div className="home-item-data date">{item.date.slice(2).split('-').reverse().join('-')}</div>
                <div className="home-item-data person">{item.person}</div>
                {/* <div className="home-item-data">{item.category}</div> */}
                <div className={item.type === "Income" ? "home-item-data amount income" : "home-item-data amount expense"}>₹{item.amount}</div>
              </div>
            );
          })}
          {history && history.docs.map((doc) => {
            const item = doc.data();
            const id = doc.id;
            return (
              <div key={id} className="home-item">
                <div className="home-item-data date">{item.date.slice(2).split('-').reverse().join('-')}</div>
                <div className="home-item-data person">{item.person}</div>
                {/* <div className="home-item-data">{item.category}</div> */}
                <div className={item.type === "Income" ? "home-item-data amount income" : "home-item-data amount expense"}>₹{item.amount}</div>
              </div>
            );
          })}
          <div style={{height:200}}></div>
        </div>
      </div>



    </>
  )
}

export default Home