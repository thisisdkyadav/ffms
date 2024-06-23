import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import { useState } from 'react';
import Home from './pages/Home';
import AddNew from './pages/AddNew';
import Report from './pages/Report';
import Contacts from './pages/Contacts';
import Login from './pages/Login';
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './config/firebase';


function App() {
  const [page, setPage] = useState(1)
  const [authStatus, setAuthStatus] = useState(true)

  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       setAuthStatus(true);
  //     } else {
  //       setAuthStatus(false);
  //     }
  //   });
  //   return () => unsubscribe();
  // }, [])
  
  return (
    <>
      {!authStatus?<Login />:<>
      <Navbar page={page} setPage={setPage} />
      {page===1 && <Home />}
      {page===2 && <AddNew />}
      {page===3 && <Report />}
      {page===4 && <Contacts />}
      </>}
    </>
  );
}

export default App;
