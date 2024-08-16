import React, { useState, useEffect } from 'react';

import { Button, Typography, Modal, Popover } from '@mui/material';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

import MenuIcon from '@mui/icons-material/Menu';


export default function CombineAll(props) {

    const [open, setOpen] = useState(false)

    return (
        <div style={{float: "right", margin: 20}}>
            <Button
            variant="text"
            color = {props.page == "About" ? "secondary" : "primary"}
            onClick={() => setOpen(!open)} 
            >
              <MenuIcon style={{color: "#49BC88"}} />
           
          </Button>

          {open ?
           
          <List style={{position: "absolute", zIndex: 6, background: "#011000", right: 20, borderRadius: 15, border: "1px solid #49BC88"}}>
          <ListItem>
          <Button style={{float: "right", margin: 20, borderRadius: 0, borderBottom: props.path == "/" ? "1px solid #49BC88" : null}} href="/">
            <Typography align="center"> Home </Typography>
          </Button>
          </ListItem>
          <ListItem>
          <Button style={{float: "right", margin: 20, borderRadius: 0, borderBottom: props.path == "/about" ? "1px solid #49BC88" : null}} href="/about">
            <Typography align="center"> About </Typography>
          </Button>
          </ListItem>
          <ListItem>
          <Button style={{float: "right", margin: 20, borderRadius: 0, borderBottom: props.path == "/products" ? "1px solid #49BC88" : null}} href="/products">
              <Typography> Products </Typography>

          </Button>  
          </ListItem>
          
          </List>
         :
         null
         }
        

            
                

        </div>
    )
}


