import React from 'react'
import '../css/reportBar.css'

const reportBar = (profit, loss) => {
  return (
    <div className="report-bar">
      <div className="bar">
        <div className="bar-slider" style={{ width: `${50}%` }}></div>
      </div>
    </div>
  )
}

export default reportBar