import React, { useState, useEffect, useRef, useContext } from 'react'
import SecNav from '../components/SecNav'
import ReportBar from '../components/ReportBar'
import { db } from "../config/firebase";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import '../css/home.css'
import TransactionsListView from '../components/TransactionsListView';
import DateRangeSelector from '../components/DateRangeSelector';
import Loading from '../components/Loading';
// import { appContext } from '../context/context';


const Home = ({transactions}) => {

  // const {  } = useContext(appContext)

  const TransactionsType = ["All", "Income", "Expense"]

  const [mode, setMode] = React.useState(0);
  const [profit, setProfit] = useState(0)
  const [loss, setLoss] = useState(0)

  const handleReport = () => {
    let profit = 0;
    let loss = 0;
    Object.values(transactions).map((payment) => {
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
      handleReport()
  }, [transactions])

  useEffect(() => {
  }
    , [])




  return (
    <>

      <SecNav optionList={["All", "Income", "Expense"]} activeOption={mode} handleClick={setMode} />

      <div className="home">
        <DateRangeSelector />
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

        <TransactionsListView type={TransactionsType[mode]} />

      </div>



    </>
  )
}

export default Home