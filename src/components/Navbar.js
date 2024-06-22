import React from 'react'

const Navbar = ({page, setPage}) => {
    
    const handleNavClick = (e) => {
        setPage(e)
     }

  return (
    <>
        <div className="navbar">


        <div onClick={()=>page!==1&&handleNavClick(1)} className={page===1?"nav-icon-div active":"nav-icon-div"}><img className='nav-icon' src="home.svg" alt="" /></div>
        <div onClick={()=>page!==2&&handleNavClick(2)} className={page===2?"nav-icon-div active":"nav-icon-div"}><img className='nav-icon' src="plusBlack.svg" alt="" /></div>
        {/* <div onClick={()=>page!==3&&handleNavClick(3)} className={page===3?"nav-icon-div active":"nav-icon-div"}><img className='nav-icon' src="report.svg" alt="" /></div> */}
    </div>
  </>)
}

export default Navbar