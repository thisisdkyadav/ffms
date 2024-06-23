import React, {useState, useEffect} from 'react'
import HomeData from './HomeData'
import TransactionView from '../components/TransactionView';

const HomePayHistory = ({history}) => {

  
  const [activeID, setActiveID] = useState(null)

  useEffect(() => {
    console.log("dfdf"+activeID);
    
  }, [activeID])
  

  return (
    <>
    
    {activeID && <TransactionView setActiveID={setActiveID} data={history[activeID]} />}

    <div className="home-header">
          <div className="home-header-item date">Date</div>
          <div className="home-header-item person">Person</div>
          {/* <div className="home-header-item">Category</div> */}
          <div className="home-header-item amount">Amount</div>
        </div>

    <div className="home-data">
      <HomeData history={history} setActiveID={setActiveID} />
      <HomeData history={history} />
      <HomeData history={history} />
      <HomeData history={history} />
      <HomeData history={history} />
      <HomeData history={history} />
      <HomeData history={history} />
      <HomeData history={history} />
      <HomeData history={history} />
      <HomeData history={history} />
      <HomeData history={history} />
      <HomeData history={history} />
      <HomeData history={history} />
      <HomeData history={history} />
      <HomeData history={history} />
      <HomeData history={history} />
      <HomeData history={history} />
      <HomeData history={history} />
      <HomeData history={history} />
      <HomeData history={history} />
      <HomeData history={history} />
      <HomeData history={history} />
      <HomeData history={history} />
      <HomeData history={history} />
      <HomeData history={history} />
      <HomeData history={history} />
      <HomeData history={history} />
      <HomeData history={history} />
      <HomeData history={history} />
      <HomeData history={history} />
      <HomeData history={history} />
      <HomeData history={history} />
      <HomeData history={history} />
      <HomeData history={history} />
      <HomeData history={history} />
      <HomeData history={history} />
      <HomeData history={history} />
      <HomeData history={history} />
      <div style={{ height: 200 }}></div>
    </div>
  </>
  )
}

export default HomePayHistory