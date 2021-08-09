import React, { useState, useEffect } from 'react'

import firebase from 'firebase'

import { TextField, List, Button, ListItem, ListItemText, ListItemSecondaryAction, Checkbox, AppBar, Toolbar, Typography, IconButton } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';




import './App.css'
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";


import db from './firebase'
import Todo from './Todo';
const App = () => {


  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }));
  const classes = useStyles();
  const [list, setList] = useState([])

  const [val, setVal] = useState("")

  const [user, setUser] = useState(null)


  var provider = new firebase.auth.GoogleAuthProvider();

  const signoutUser = () => {
    firebase.auth().signOut().then(() => {
      setUser(null)
    }).catch((error) => {
      alert("Unable to logout")
    });
  }

  const siginGoogle = () => {
    firebase.auth()
      .signInWithPopup(provider)
      .then((result) => {

        // var credential = result.credential;


        // var token = credential.accessToken;

        setUser(result.user);
        console.log(result)


      }).catch((error) => {

        console.log(error)
        // var errorCode = error.code;
        // var errorMessage = error.message;

        // var email = error.email;

        // var credential = error.credential;

      });
  }

  function onAuthStateChange() {
    return firebase.auth().onAuthStateChanged(user => {
      if (user) {

        setUser(user)

      } else {
        setUser(null)
      }
    });
  }


  useEffect(() => {

    onAuthStateChange();

  }, []);





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
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        username: user.displayName
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
            text: doc.data().text,
            username: doc.data().username
          }))
        )
      })
  }

  return (
    <div className='App'>

      <AppBar position="static">
        <Toolbar>
          <Typography variant="body1" component="h2">

            {user && `Welcome, ${user.displayName}`}
          </Typography>
          <Typography variant="h6" className={classes.title}>
            Anonymous Chat SSDC
          </Typography>


          {
            !user &&
            <Button color="inherit" onClick={siginGoogle}>Signin</Button>
          }
          {
            user &&
            <Button color="inherit" onClick={signoutUser}>Sign Out</Button>
          }


        </Toolbar>
      </AppBar>

      <h1>Express your views...</h1>
      {user &&
        <form >

          <TextField id="standard-basic" label="To-Do" type="text" value={val} onChange={event => setVal(event.target.value)} />

          <Button variant="contained" color="primary" type="submit" onClick={handleChange}>Add</Button>

        </form>
      }



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