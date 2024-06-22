import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import { useState } from 'react';
import Home from './pages/Home';
import AddNew from './pages/AddNew';
import Report from './pages/Report';

function App() {

  const [page, setPage] = useState(1)
  
  return (
    <>
      <Navbar page={page} setPage={setPage} />
      {page===1 && <Home />}
      {page===2 && <AddNew />}
      {page===3 && <Report />}
    </>
  );
}

export default App;
