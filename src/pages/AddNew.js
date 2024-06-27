import React, { useState, useRef, useEffect, useContext } from 'react'
import '../css/addNew.css'
import { db } from "../config/firebase";
import SecNav from '../components/SecNav'
import { collection, addDoc } from "firebase/firestore"; // Import the functions you need from the SDKs you need
import { getDocs, query, orderBy } from "firebase/firestore";
import Loading from '../components/Loading';
import {appContext} from '../context/context'

const AddNew = () => {

  const {loadTransactions, setLoading} = useContext(appContext)

  const catList = ["Not Selected", "Home", "Work"]

  const [mode, setMode] = useState(0)
  const [contacts, setContacts] = useState(null)
  const [nameOption, setNameOption] = useState(0)
  const [catOption, setCatOption] = useState(0)


  const date = useRef()
  const amount = useRef()
  const description = useRef()
  const person = useRef()
  const name = useRef()


  const resetForm = () => {
    date.current.value = new Date().toISOString().split('T')[0]
    amount.current.value = ""
    description.current.value = ""
    nameOption ? person.current.value = "" : name.current.value = ""
    setNameOption(0)
    setCatOption(0)
    setMode(0)
  }



  const changeCat = (e) => {
    const category = e.target.options[e.target.selectedIndex].getAttribute('data-category')
    setCatOption(catList.indexOf(category))
  }


  const loadContacts = async () => {
    const contactsQuery = query(collection(db, "contacts"), orderBy("name"));
    const querySnapshot = await getDocs(contactsQuery);
    setContacts(querySnapshot);
  }



  const handleAddNew = async () => {

    let personName = nameOption === 0 ? name.current.value : person.current.value.split("-")[1]
    let personID = nameOption === 0 ? "other" : person.current.value.split("-")[0]
    let amountValue = amount.current.value ? amount.current.value : 0
    let descriptionValue = description.current.value ? description.current.value : ""
    let dateValue = date.current.value ? date.current.value : new Date().toISOString().split('T')[0]
    let categoryValue = catList[catOption] ? catList[catOption] : "Not Selected"

    if (personName === "" || amountValue === 0 || categoryValue === "Not Selected") {
      alert("Please fill the required fields")
      return
    }

    let now = new Date();
    let hh = String(now.getHours()).padStart(2, '0');
    let mm = String(now.getMinutes()).padStart(2, '0');
    let ss = String(now.getSeconds()).padStart(2, '0');

    let time = hh + mm + ss;
    let timeid = date.current.value.replace(/-/g, "") + time;

    setLoading(true)

    await addDoc(collection(db, "transactions"), {

      timeid: timeid,
      person: personName,
      personID: personID,
      amount: amountValue,
      description: descriptionValue,
      date: dateValue,
      category: categoryValue,
      type: mode === 0 ? "Income" : "Expense"
    }).then(() => {
      loadTransactions("month");
      resetForm()
      setLoading(false)
    }).catch((error) => {
      setLoading(false)
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
          <SecNav optionList={["Name", "Contact"]} activeOption={nameOption} handleClick={setNameOption} />
        </div>
        <div className="add-new-form">


          <div className='add-new-cat'>
            <div className="add-new-cat-list">
              <div className={catOption === 1 ? 'add-new-cat-option active' : 'add-new-cat-option'} onClick={() => setCatOption(1)}>Home</div>
              <div className={catOption === 2 ? 'add-new-cat-option active' : 'add-new-cat-option'} onClick={() => setCatOption(2)}>Work</div>
            </div>
          </div>

          {nameOption === 0
            ? <input className='add-new-person' placeholder="Name" ref={name} />
            : <select className='add-new-contact' onChange={changeCat} ref={person}>
              <option value="">Select contact</option>
              {contacts && contacts.docs.map((doc) => {
                const person = doc.data();
                const id = doc.id;
                return (
                  <option key={id} data-category={person.category} value={id + "-" + person.name}>{person.name}</option>
                );
              })}
            </select>
          }
          <input type="text" className='add-new-desc' placeholder="Description" ref={description} />
          <div className="date-amount-div">
            <input type="date" className='add-new-date' ref={date} />
            <div className="amount-input-div">
              <span className="rupee-sign">₹</span>
              <input type="number" className={mode === 0 ? 'add-new-amount income income-border income-bg' : 'add-new-amount expense expense-border expense-bg'} placeholder="Amount" ref={amount} />
            </div>
          </div>
          <div className='add-new-type'>
            <div className="add-new-type-list">
              <div className={mode === 0 ? 'add-new-type-option income active' : 'add-new-type-option income'} onClick={() => setMode(0)}>In</div>
              <div className={mode === 1 ? 'add-new-type-option expense active' : 'add-new-type-option expense'} onClick={() => setMode(1)}>Out</div>
            </div>
          </div>

          <div className="add-button-div">
            <button onClick={handleAddNew}>Save</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default AddNew