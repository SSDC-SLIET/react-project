import React, { useState } from 'react'



import { TextField, List, Button, ListItem, ListItemText, ListItemSecondaryAction, Checkbox } from '@material-ui/core'
import './App.css'
const App = () => {

  const [list, setList] = useState([])

  const [val, setVal] = useState("")


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
      setList([...list, val])


      setVal("");
    }


  }

  return (
    <div className='App'>
      <h1>Todo</h1>
      <h2> SSDC</h2>
      <form >

        <TextField id="standard-basic" label="To-Do" type="text" value={val} onChange={event => setVal(event.target.value)} />

        <Button variant="contained" color="primary" type="submit" onClick={(event) => handleChange(event)}>Add</Button>

      </form>

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
                <ListItemText id={index} primary={item} />
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