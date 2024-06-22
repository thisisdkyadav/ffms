import React, { useState, useRef, useEffect } from 'react'
import '../css/addNew.css'
import { db } from "../config/firebase";
import SecNav from '../components/SecNav'
import { collection, addDoc } from "firebase/firestore"; // Import the functions you need from the SDKs you need

const AddNew = () => {

  const [mode, setMode] = useState(0)
  const [peopleList, setPeopleList] = useState([{ "name": "John Doe", "email": "" }])

  const date = useRef()
  const amount = useRef()
  const description = useRef()
  const person = useRef()
  const category = useRef()

  const handleAddNew = async () => {
    if (person.current === "" || amount.current === 0) {
      alert("Please fill the required fields")
      return
    }
    let now = new Date();
    let hh = String(now.getHours()).padStart(2, '0');
    let mm = String(now.getMinutes()).padStart(2, '0');
    let ss = String(now.getSeconds()).padStart(2, '0');

    let time = hh + mm + ss;
    let timeid= date.current.replace(/-/g, "") + time;
    const docRef = await addDoc(collection(db, "transactions"), {

      timeid: timeid,
      person: person.current.value,
      amount: amount.current.value,
      date: date.current.value,
      description: description.current.value,
      category: category.current.value,
      type: mode === 0 ? "Income" : "Expense"
    });
  }

  useEffect(() => {
    date.current.value = new Date().toISOString().split('T')[0]
  }, [])
  

  return (
    <>
      <div className="add-new">
        <div className="add-new-header">
          <SecNav secNavList={["Income", "Expense"]} activeSecNav={mode} handleSecNavClick={setMode} />
        </div>
        <div className="add-new-form">
          <input list="usernames" className='add-new-person' placeholder="Person" ref={person} />
          <datalist id="usernames">
            <option value="Other">Other</option>
            {peopleList.map((item, index) => <option key={index} value={item.name}>{item.name}</option>)}
          </datalist>
          <input type="text" className='add-new-desc' placeholder="Description" ref={description} />
          <input type="number" className='add-new-amount' placeholder="Amount" ref={amount} />
          <input type="date" className='add-new-date' ref={date} />
          <select className='add-new-cat' ref={category}>
            <option value="Home">Home</option>
            <option value="work">Work</option>
          </select>
    <div className="add-button-div">
          <button onClick={handleAddNew}>Add</button>
    </div>
        </div>
      </div>
    </>
  )
}

export default AddNew