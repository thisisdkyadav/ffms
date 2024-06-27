import React, { useState, useEffect } from 'react'

const SecNav = ({ optionList, activeOption, handleClick }) => {

  const [classes, setClasses] = useState("sec-nav")

  useEffect(() => {

    if (optionList.length) {
      setClasses("sec-nav sec-nav-up")
    } else {
      setClasses("sec-nav")
    }

    return () => {
    }

  }, [])


  return (<>
    {<div className={classes}>
      {optionList.map((item, index) =>
        <div key={index} onClick={() => handleClick(index)} className={activeOption === index ? "sec-nav-item active" : "sec-nav-item"}>
          {item}
        </div>
      )}

    </div>}
  </>)
}

export default SecNav