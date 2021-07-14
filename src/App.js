import React, { useState } from 'react'

import firebase from 'firebase'

import { TextField, List, Button, ListItem, ListItemText, ListItemSecondaryAction, Checkbox } from '@material-ui/core'
import './App.css'


import db from './firebase'
const App = () => {

  const [list, setList] = useState([])

  const [val, setVal] = useState("")


  // useEffect(() => {

  // }, [])


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

      <Button variant="contained" color="primary" onClick={getData}>get</Button>

      <List dense className="list" >
        {
          list.map((item, index) => {

            return (
              <ListItem key={index} button>
                {/* <ListItemAvatar>
                <Avatar
                  alt={`Avatar n°${value + 1}`}
                  src={`/static/images/avatar/${value + 1}.jpg`}
                />
              </ListItemAvatar> */}
                <ListItemText id={index} primary={item.text} />
                <ListItemSecondaryAction>
                  <Checkbox

                  />
                </ListItemSecondaryAction>
              </ListItem>
            )
          })

        }
      </List>


    </div >

  )

}


export default App;