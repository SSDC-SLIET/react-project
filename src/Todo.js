import { ListItem, ListItemSecondaryAction, ListItemText } from '@material-ui/core'
import React from 'react'
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import db from './firebase';
function Todo({ item }) {
    return (

        <ListItem key={item.index} button>
            {/* <ListItemAvatar>
              <Avatar
                alt={`Avatar n°${value + 1}`}
                src={`/static/images/avatar/${value + 1}.jpg`}
              />
            </ListItemAvatar> */}

            {/* {JSON.strigify(item)} */}
            <ListItemText id={item.index} primary={item.text} />
            <ListItemSecondaryAction>
                <DeleteForeverIcon onClick={
                    event =>
                        db.collection("Todos").doc(item.id).delete()

                } />




                {/* //TODO:: Edit */}


            </ListItemSecondaryAction>
        </ListItem>
    )


}

export default Todo
