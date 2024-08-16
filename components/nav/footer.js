import React from 'react'

import { Grid, Button, Typography } from "@mui/material"

import CombineAll from "./combineAll"


export default class Nav extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        path: null, 
        width: 1000,
        height: 1000
    };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
  }

  updateWindowDimensions() {
      this.setState({ width: window.innerWidth, height: window.innerHeight });
    }


  componentDidMount() {
  this.updateWindowDimensions();
  window.addEventListener('resize', this.updateWindowDimensions);
  this.setState({
    path: window.location.pathname
  })
  }

  componentWillUnmount() {
  window.removeEventListener('resize', this.updateWindowDimensions);
  }

  // Map through the providers.
  // Render account information and "connect", "set active", and "disconnect" buttons.
  // Finally, map through the `accounts` property to render a dropdown for each connected account.
  render() {
 
    return (


      <div style={{backgroundColor: "#011000"}} align="center">
          <Grid container>
              <Grid item xs={12} sm={12} md={6}>
                <Button style={{display: "flex", margin: "auto", marginTop: 10}} href="/">
                  <img src={"/logo.png"} style={{width: this.state.width > 600 ? 100 : 60}} />
                </Button>
              </Grid>
              
              
              <Grid item xs={12} sm={4} md={2} syle={{padding: "5%"}}>
                <br />
                <Button style={{borderRadius: 0, borderBottom: this.state.path == "/" ? "1px solid #49BC88" : null}} onClick={() => window.location.href = "/"}>
                  <Typography variant="h6"> Home </Typography>
                </Button>            
              </Grid>

              <Grid item xs={12} sm={4} md={2}>
                <br />
                <Button style={{borderRadius: 0, borderBottom: this.state.path == "/about" ? "1px solid #49BC88" : null}} onClick={() => window.location.href = "/about"}>
                  <Typography variant="h6"> About </Typography>
                </Button>            
              </Grid>
              
  
              <Grid item xs={12} sm={4} md={2}>
                <br />
                <Button style={{borderRadius: 0, borderBottom: this.state.path == "/products" ? "1px solid #49BC88" : null}} onClick={() => window.location.href = "/products"}>
                  <Typography variant="h6"> Products </Typography>
  
              </Button>  
            </Grid>
             
             
  
          </Grid>

          <br />
          <br />
          <Typography color="primary" variant="subtitle1"> COPTYRIGHT @ DATAGNOME. ALL RIGHTS RESERVED </Typography>
          <br />
      </div>
    )
  }
  
}