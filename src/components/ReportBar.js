import React, {useState, useEffect} from 'react'
import '../css/reportBar.css'

const ReportBar = ({profit, loss}) => {
  const [profitPercent, setProfitPercent] = useState(0);

    useEffect(() => {
        setProfitPercent(profit/(profit+loss)*100)
        return () => {
        console.log("cleanup")
        }
    }, [profit, loss])
    
  
    return (
      <div className="report-bar">
        <div className="bar">
          <div className="bar-slider" style={{ width: `${profitPercent}%` }}></div>
        </div>
      </div>
    )
}

export default ReportBar