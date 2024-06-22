import React, {useState, useEffect} from 'react'

const SecNav = ({secNavList,activeSecNav,handleSecNavClick}) => {

    const [up, setUp] = useState(false)

    useEffect(() => {
      
        if(!up&&secNavList.length){
            setUp(true)
        }

        return ()=>{
            setUp(false)
        }
    
    }, [])
    

  return (<>
    {<div className={up?"sec-nav sec-nav-up":"sec-nav"}>
        {secNavList.map((item,index)=><div key={index} onClick={()=>handleSecNavClick(index)} className={activeSecNav===index?"sec-nav-item active":"sec-nav-item"}>{item}</div>)}
        
    </div>}
  </>)
}

export default SecNav