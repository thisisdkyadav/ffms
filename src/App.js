import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import { useState, useRef } from 'react';
import Home from './pages/Home';
import AddNew from './pages/AddNew';
import Report from './pages/Report';
import Contacts from './pages/Contacts';
import Login from './pages/Login';
import AlertView from './components/AlertView';
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from './config/firebase';
import { appContext } from './context/context'
import { collection, query, getDocs, orderBy, where } from 'firebase/firestore';
import Loading from './components/Loading';


function App() {
  const [page, setPage] = useState(1)
  const [authStatus, setAuthStatus] = useState(false)
  const [contacts, setContacts] = useState(JSON.parse(localStorage.getItem("contacts")) || {});
  const [transactions, setTransactions] = useState({});
  const [alertInfo, setAlertInfo] = useState({ type: '', message: '', isActive: false, handleConfirm: () => null})
  const [loading, setLoading] = useState(true)



  const startDate = useRef();
  const endDate = useRef();

  const resetAlert = () => {
    setAlertInfo({ type: '', message: '', isActive: false, handleConfirm: () => null})
  }

  const alertPopUp = (data = {}) => { 
    const type = data.type || 'normal';
    const message = data.message || 'Are you sure?';
    const handleConfirm = data.handleConfirm || (() => null);
    setAlertInfo({ type, message, isActive: true, handleConfirm:()=>{
      handleConfirm();
      resetAlert();
    } })
   }


  const loadTransactions = async (interval=null) => {
    console.log('loading data');

    let initialTimeID = "";
    let finalTimeID = "";

    if (interval==="month") {
      let today = new Date();
      let monthAgo = new Date(today.setMonth(today.getMonth() - 1));
      initialTimeID = monthAgo.toISOString().slice(0, 10).replace(/-/g, "") + "000000";
      finalTimeID = new Date().toISOString().slice(0, 10).replace(/-/g, "") + "999999";
    } else {
      initialTimeID = startDate.current.value.replace(/-/g, "") + "000000";
      finalTimeID = endDate.current.value.replace(/-/g, "") + "999999";
    }

    var paymentsQuery = query(collection(db, "transactions"), where("timeid", ">=", initialTimeID), where("timeid", "<=", finalTimeID), orderBy("timeid", "desc"));
    const querySnapshot = await getDocs(paymentsQuery);
    const temp_transactions = {};
    querySnapshot.forEach((doc) => {
      const dataWithId = { ...doc.data(), id: doc.id };
      temp_transactions[doc.id] = dataWithId;
    });
    setTransactions(temp_transactions);
  }


  const loadContacts = async () => {
    const contactsQuery = query(collection(db, "contacts"), orderBy("name"));
    const querySnapshot = await getDocs(contactsQuery);

    const contactsList = {};
    querySnapshot.forEach((doc) => {
      const dataWithId = { ...doc.data(), id: doc.id };
      contactsList[doc.id] = dataWithId;
    });

    setContacts(contactsList);
    localStorage.setItem("contacts", JSON.stringify(contactsList));  // save to local storage
  }




  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthStatus(true);
        loadContacts();
        loadTransactions("month");
      } else {
        setAuthStatus(false);
      }
      setLoading(false);
    });


    return () => unsubscribe();

  }, [])


  return (
    <>
      <appContext.Provider value={{ contacts, loadContacts, transactions, loadTransactions, startDate, endDate, setLoading, alertPopUp }}>
      
        {loading && <Loading />}

      {alertInfo.isActive && <AlertView type={alertInfo.type} message={alertInfo.message} handleCancel={() => setAlertInfo({ type: '', message: '', isActive: false, handleConfirm: () => null })} handleConfirm={alertInfo.handleConfirm} />}

        {!authStatus ? <Login /> : <>
          <Navbar page={page} setPage={setPage} />
          {page === 1 && <Home transactions={transactions} />}
          {page === 2 && <AddNew />}
          {page === 3 && <Report />}
          {page === 4 && <Contacts />}
        </>}
      </appContext.Provider>
    </>
  );
}

export default App;
