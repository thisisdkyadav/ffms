import React from 'react'
import '../css/Loading.css'

const Loading = () => {
  return (<>
    <div className="loading">
      <div className="dots-div">
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
      </div>
    </div>
  </>)
}

export default Loading