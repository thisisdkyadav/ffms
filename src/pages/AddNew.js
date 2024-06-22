import React, { useState, useRef, useEffect } from 'react'
import '../css/addNew.css'
import { db } from "../config/firebase";
import SecNav from '../components/SecNav'
import { collection, addDoc } from "firebase/firestore"; // Import the functions you need from the SDKs you need
import { getDocs, query, orderBy } from "firebase/firestore";

const AddNew = () => {

  const [mode, setMode] = useState(0)
  const [contacts, setContacts] = useState(null)
  const [nameOption, setNameOption] = useState("other")


  const date = useRef()
  const amount = useRef()
  const description = useRef()
  const person = useRef()
  const category = useRef()
  const name = useRef()


  const toggleNameOption = (e) => {
    setNameOption(e.target.value)
  }


  const loadContacts = async () => {
    const contactsQuery = query(collection(db, "contacts"), orderBy("name"));
    const querySnapshot = await getDocs(contactsQuery);
    setContacts(querySnapshot);
  }

  const handleAddNew = async () => {
    if (person.current === "" || amount.current === 0) {
      alert("Please fill the required fields")
      return
    }

    let personName = nameOption === "other" ? name.current.value : person.current.value.split("-")[1]
    let personID = nameOption === "other" ? "other" : person.current.value.split("-")[0]

    let now = new Date();
    let hh = String(now.getHours()).padStart(2, '0');
    let mm = String(now.getMinutes()).padStart(2, '0');
    let ss = String(now.getSeconds()).padStart(2, '0');

    let time = hh + mm + ss;
    let timeid= date.current.value.replace(/-/g, "") + time;
    await addDoc(collection(db, "transactions"), {

      timeid: timeid,
      person: personName,
      personID: personID,
      amount: amount.current.value,
      date: date.current.value,
      description: description.current.value,
      category: category.current.value,
      type: mode === 0 ? "Income" : "Expense"
    }).then(() => {
      alert("Payment successfully written!");
    }).catch((error) => {
      console.error("Error adding document: ", error);
    });
  }

  useEffect(() => {
    date.current.value = new Date().toISOString().split('T')[0]
    loadContacts()
  }, [])


  return (
    <>
      <div className="add-new">
        <div className="add-new-header">
          <SecNav secNavList={["Income", "Expense"]} activeSecNav={mode} handleSecNavClick={setMode} />
        </div>
        <div className="add-new-form">
          <select className='add-new-contact' onChange={toggleNameOption} ref={person}>
            <option value="other">Other</option>
            {contacts && contacts.docs.map((doc) => {
              const person = doc.data();
              const id = doc.id;
              return (
                <option key={id} value={id+"-"+person.name}>{person.name}</option>
              );
            })}
          </select>
          {nameOption==="other"&&<input className='add-new-person' placeholder="Name" ref={name} />}
          <input type="text" className='add-new-desc' placeholder="Description" ref={description} />
          <input type="number" className={mode === 0 ? 'add-new-amount income' : 'add-new-amount expense'} placeholder="Amount" ref={amount} />
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