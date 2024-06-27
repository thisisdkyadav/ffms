import React, {useEffect, useContext} from 'react'
import '../css/DateRangeSelector.css'
import { appContext } from '../context/context';

const DateRangeSelector = () => {

  const { startDate, endDate, loadTransactions} = useContext(appContext)

  let today = new Date();
  let monthAgo = new Date(today.setMonth(today.getMonth() - 1));
  
  useEffect(() => {
    startDate.current.value = monthAgo.toISOString().slice(0, 10)
    endDate.current.value = new Date().toISOString().slice(0, 10)

  }, [])

  return (
    <div className="date-range-selector">
      <div className="date-selector">
        <input type="date" ref={startDate} onChange={loadTransactions} />
        <input type="date" ref={endDate} onChange={loadTransactions} />
      </div>
    </div>
  )
}

export default DateRangeSelector