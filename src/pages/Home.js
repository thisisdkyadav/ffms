import React, { useState, useEffect, useRef } from 'react'
import SecNav from '../components/SecNav'
import ReportBar from '../components/ReportBar'
import { db } from "../config/firebase";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import '../css/home.css'
import HomePayHistory from '../components/HomePayHistory';


const Home = () => {

  let today = new Date();
  let monthAgo = new Date(today.setMonth(today.getMonth() - 1));


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
      var paymentsQuery = query(collection(db, "transactions"), where("timeid", ">=", initialTimeID), where("timeid", "<=", finalTimeID), orderBy("timeid", "desc"));
    } else {
      var paymentsQuery = query(collection(db, "transactions"), where("timeid", ">=", initialTimeID), where("timeid", "<=", finalTimeID), orderBy("timeid", "desc"), where("type", "==", mode === 1 ? "Income" : "Expense"));
    }
    const querySnapshot = await getDocs(paymentsQuery);
    const transactions = {}; // Create an empty object for key-value pairs
    querySnapshot.forEach((doc) => {
      const dataWithId = { ...doc.data(), id: doc.id };
      transactions[doc.id] = dataWithId;
    });
    setHistory(transactions);
  }

  const handleReport = () => {
    let profit = 0;
    let loss = 0;
    Object.values(history).map((payment) => {
      if (payment.type === "Income") {
        profit += parseFloat(payment.amount);
      } else {
        loss += parseFloat(payment.amount);
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
      // console.log(history.docs[0].data());
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
          <div className="date-selector">
            <input type="date" ref={startDate} onChange={loadData} />
            <input type="date" ref={endDate} onChange={loadData} />
          </div>
        </div>
        <div className="report">
          {/* <ReportBar profit={profit} loss={loss} /> */}
          <div className="report-item">
            <div className='amount income' >₹{(profit).toFixed(0)}</div>
            <div>-</div>
            <div className='amount expense' >₹{(loss).toFixed(0)}</div>
            <div>=</div>
            <div className={profit - loss > 0 ? 'amount income' : 'amount expense'} >₹{(profit - loss).toFixed(0)}</div>
          </div>
        </div>

        <HomePayHistory history={history} />

      </div>



    </>
  )
}

export default Home