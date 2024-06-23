import React from 'react'
import '../css/alertView.css'

const AlertView = ({message, type, handleCancel, handleConfirm}) => {
  return (
    <div className='alert-view'>
       <div className="alert-view-main">
          <div className={"data "+type}>
            {message}
          </div>

          <div className="buttons-div">
            <button className={'cancel-button '+type} onClick={handleCancel}>Cancel</button>
            <button className={'confirm-button '+type} onClick={handleConfirm}>Confirm</button>
          </div>

        </div>
      </div>
  )
}

export default AlertView