import React, { useState, useEffect } from 'react'

import firebase from 'firebase'

import { TextField, List, Button, ListItem, ListItemText, ListItemSecondaryAction, Checkbox } from '@material-ui/core'
import './App.css'
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

import db from './firebase'
import Todo from './Todo';
const App = () => {

  const [list, setList] = useState([])

  const [val, setVal] = useState("")


  useEffect(() => {
    getData();
  }, [])


  const handleChange = (event) => {

    event.preventDefault();
    // var a = [];


    // list.map(item => {
    //   a.push(item)
    // })
    // a.push(val)
    // setList(a)

    if (val === "") {

    } else {


      db.collection('Todos').add({
        text: val,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      })


      setList([...list, val])


      setVal("");





    }


  }

  const getData = () => {
    db.collection("Todos")
      .orderBy("timestamp", "asc").onSnapshot(snapshot => {
        setList(
          snapshot.docs.map(doc => ({
            id: doc.id,
            text: doc.data().text
          }))
        )
      })
  }

  return (
    <div className='App'>
      <h1>Todo</h1>
      <h2> SSDC</h2>
      <form >

        <TextField id="standard-basic" label="To-Do" type="text" value={val} onChange={event => setVal(event.target.value)} />

        <Button variant="contained" color="primary" type="submit" onClick={handleChange}>Add</Button>

      </form>



      <List dense className="list" >
        {


          // JSON.stringify(list)
          list.map((item) => {

            return <Todo item={item} />
            // <Todo />

          })
        }

      </List>


    </div >

  )

}


export default App;