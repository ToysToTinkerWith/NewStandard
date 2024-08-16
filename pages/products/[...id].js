import React, { useState, useEffect, useContext } from "react"

import Head from "next/head"

import WorksDatabase from "../../components/Works/WorksDatabase"

import NewWorks from "../../components/Works/NewWorks"
import EditWorks from "../../components/Works/EditWorks"

import { AuthContext } from "../../Firebase/FirebaseAuth"

import { motion } from "framer-motion"


import { Grid, Card, Button, Modal, Typography } from "@mui/material"




export default class ID extends React.Component {

  static contextType = AuthContext

    constructor(props) {
        super(props);
        this.state = {
          works: [],
          newWorks: false,
          editWorks: null,
          collection: "",
          piece: ""
        };
        
    }

    componentDidMount() {

      let place = window.location.pathname.split("/")

      console.log(place)

      this.setState({collection: place[2].replace(/_/g, " ")})



      if (place.length > 3) {
        this.setState({piece: place[3].replace(/_/g, " ")})
      }
      

      
    }

  
      
    render() {
      console.log(this.state)

      let sortedWorks = []

      console.log(this.props.works)

      if (this.state.piece) {
        this.props.works.forEach((work) => {
        if (this.state.collection == work.collection && this.state.piece == work.item) {
          sortedWorks.push(work)
        }
        })
      }
      else {
      this.props.works.forEach((work) => {
        if (this.state.collection == work.collection) {
          sortedWorks.push(work)
        }
      })
      }

      console.log(sortedWorks)

      if (sortedWorks.length > 0){
        if (this.state.piece) {
          return (

                 <Card style={{backgroundColor: "#011000"}}>
                    <br />
                   
                    <Typography color="primary" align="center" variant="h3" style={{ margin: "5%"}}> {sortedWorks[0].item} </Typography>
                    <Typography color="primary" align="center" variant="h4" style={{ margin: "5%"}}> {sortedWorks[0].collection} </Typography>
                    <br />
                    
                    {this.props.imgs.length > 0 ? this.props.imgs.map((img, index) => {
                    let count = 0
                      if (img.collection == sortedWorks[0].collection && img.item == sortedWorks[0].item) {
  
                        return (
                          <div key={index} style={{display: "grid", padding: 20}}>
                            <img src={img.url} style={{width: "100%", maxWidth: 400, margin: "auto"}}/>
                            <Typography color="primary" align="center" variant="subtitle1" style={{ margin: "5%"}}> {img.message} </Typography>
  
                          </div>
                        )
                      }
                    })
                    :
                    null
                    }
                    <Button style={{display: "flex", margin: "auto", border: "1px solid #49BC88", borderRadius: 5, width: 200}} onClick={() => window.open("https://www.iheartjane.com/brands/24293/new-standard")}>
                      <Typography align="center" variant="h6" color="primary"> Order Online </Typography>
                    </Button>
                    <br />
                 </Card>
               
              
          )
        }
  
        else {
          return (
            <div >
                <Head>
                <title>Products</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="description" content="Discover the essence of choice and quality with New Standard. Our diverse range of top-tier cannabis products, from unique live resin cartridges to adaptable serums, is crafted to cater to every preference. " />
                <meta name="keywords" content="Products, Serum, Cartridges, Variety." />
  
                
                </Head>
  
                <div style={{backgroundColor: "#011000", overflow: "hidden"}}>
  
                {this.context.currentUser ? 
                this.context.currentUser.email == "abergquist96@gmail.com" ?
                <Button style={{float: "right", border: "1px solid #49BC88", margin: 10, padding: 0}} onClick={() => this.setState({newWorks: true})}>
                  <Typography variant="h6" style={{color: "#49BC88"}}> + </Typography>
                </Button>
                :
                null
                :
                null
                }

                  <Button style={{display: "block", width: "100%" }} href="/products">
                    
                    <Typography align="center" variant="h4" style={{ margin: "5%", float: "right"}}> {this.state.collection} </Typography>
                    <Typography align="center" variant="h4" style={{ margin: "5%", float: "right"}}> {"<"} </Typography>

                  </Button>
  
                <Grid container spacing={3} >
                  {sortedWorks.length > 0 ? 
                  
                  sortedWorks.map((work, index) => {
                      return (
                        <Grid item key={index} md={6} >
                        <Button style={{display: "flex", border: "1px solid #49BC88", width: "100%", height: "100%", borderRadius: 15}}  href={window.location.pathname + "/" + work.item.replace(/ /g, "_")}>
                        <Grid container spacing={3} style={{height: "100%"}} >
                          <Grid item sm={12}>
                          <Typography align="left" variant="h4" style={{margin: "5%"}}> {work.item} </Typography>
                          </Grid>
                          {this.props.imgs.length > 0 ? this.props.imgs.map((img, index) => {
                              if (img.collection == work.collection && img.item == work.item) {
                                return (
                                  <Grid item key={index} sm={12} md={12} style={{display: "flex", margin: "auto", padding: 20, marginBottom: 40}}>
                                    <Grid container spacing={12} alignItems="center">
                                    <Grid item xs={12} sm={6} style={{display: "flex", margin: "auto"}} >
                                    <img src={img.url} style={{width: "100%", maxWidth: 300, paddingLeft: 20, display: "flex", margin: "auto"}}/>
                                    </Grid>
                                    <Grid item xs={12} sm={6} >
                                    <Typography align="center" variant="caption" style={{ display: "flex", padding: "5%"}}> {img.message} </Typography>
                                    </Grid>
                                    </Grid>
                                  </Grid>
                                  
                                )
                              }
                            })
                            :
                            null
                            }
                            </Grid>
                        </Button>
                              
                        </Grid>
                      )
                    
                  })
                  
                  :
                  null
                  }

                  </Grid>
                   
  
                </div>

                <Button style={{display: "flex", margin: "auto", border: "1px solid #49BC88", borderRadius: 5, width: 200, margin: 20}} onClick={() => window.open("https://www.iheartjane.com/brands/24293/new-standard")}>
                      <Typography align="center" variant="h6" color="primary"> Order Online </Typography>
                  </Button>
  
  
                <div style={{backgroundColor: "#011000"}}>
                  <WorksDatabase works={sortedWorks} imgs={this.props.imgs} editWorks={(editWorks) => this.setState({editWorks: editWorks})} user={this.context.currentUser}/>
                </div>
  
  
                
  
  
  
               {this.state.newWorks ? 
               <Modal 
               open={true} 
               onClose={() => this.setState({newWorks: false})}
               style={{
                 overflowY: "auto",
                 overflowX: "hidden"
               }}>
                 <Card style={{backgroundColor: "#FFE2D9"}}>
                   <Button variant="contained" color="primary" style={{margin: "5%", backgroundColor: "#242424"}} onClick={() => this.setState({newWorks: false})}> Back </Button>
                   <NewWorks closeModal={() => this.setState({newWorks: false})} />
                 </Card>
               
               </Modal>
               
                :
                null
                }
  
              {this.state.editWorks ? 
               <Modal 
               open={true} 
               onClose={() => this.setState({editWorks: null})}
               style={{
                 overflowY: "auto",
                 overflowX: "hidden"
               }}>
                 <Card style={{backgroundColor: "#FFE2D9"}}>
                   <Button variant="contained" color="primary" style={{margin: "5%", backgroundColor: "#242424"}} onClick={() => this.setState({editWorks: null})}> Back </Button>
                   <EditWorks closeModal={() => this.setState({editWorks: null})} work={this.state.editWorks} />
                 </Card>
               
               </Modal>
               
                :
                null
                }
                           
            </div>
        )
        }
      }
      else {
        return(
          <div>

          </div>
        )
      }

      
        
    }
    
}