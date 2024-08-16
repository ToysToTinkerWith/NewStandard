import React, { useState, useEffect, useContext } from "react"

import Head from "next/head"

import WorksDatabase from "../../components/Works/WorksDatabase"

import NewWorks from "../../components/Works/NewWorks"
import EditWorks from "../../components/Works/EditWorks"

import { AuthContext } from "../../Firebase/FirebaseAuth"



import { db } from "../../Firebase/FirebaseInit"
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";

import { motion } from "framer-motion"


import { Grid, Card, Button, Modal, Typography } from "@mui/material"




export default class Work extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          works: [],
          imgs: [],
          newWorks: false,
          editWorks: null,
          selWork: null,
          selCol: null
        };
        
    }

    componentDidMount() {

     
    }

  
      
    render() {


      let sortedWorks = []

      this.props.works.forEach((work) => {
        let found = false
        sortedWorks.forEach((sWork, index) => {
          if (work.collection == sWork.works[0].collection) {
            found = true
            sortedWorks[index] = {works: [...sWork.works, work], num: sWork.num + 1}
          }
        })
        if (!found) {
          sortedWorks.push({works: [work], num: 1})
        }

      })

      console.log(sortedWorks)



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

                

                <Typography align="left" variant="h3" style={{color: "#49BC88", margin: "5%"}}> Products </Typography>

                <Grid container  style={{height: "100%"}}>
                  {sortedWorks.length > 0 ? sortedWorks.map((work, index) => {
                    let ind = 0
                    console.log(work)
                    return (
                      <Grid item key={index} xs={12} sm={12} md={6} style={{padding: 10, height: 400}}>
                        <Button style={{border: "1px solid #49BC88", width: "100%", display: "grid", height: "100%", borderRadius: 15}} href={"/products/" + work.works[0].collection.replace(/ /g, "_")}>
                          <br />
                          <Typography align="center" variant="h4" style={{ color: "#49BC88", margin: "5%"}}> {work.works[0].collection} </Typography>
                          <Typography align="center" variant="h5" style={{ color: "#49BC88", margin: "5%"}}> {work.num} items</Typography>
                          <br />
                          
                          

                          {this.props.imgs.length > 0 ? this.props.imgs.map((img) => {
                          let count = 0
                            if (img.collection == work.works[0].collection) {
                              
                              this.state.imgs.forEach((countimg) => {
                                if (countimg.collection == img.collection) {
                                  count++
                                }
                              })
                                ind++

                              return (
                                <motion.div animate={{y: [(-200 * (ind - 1) - 40), ((-200 * (ind - 1)) - 50)], opacity: [0,1,1,1,1,1,1,0,0,0,0,0]}} transition={{duration: 10, delay: 10 * (ind -1) + index}} style={{display: "grid", padding: 20, height: 200}}>
                                  <img src={img.url} style={{maxWidth: 300, height: 200, width: "auto", margin: "auto", borderRadius: 15}}/>

                                </motion.div>
                              )
                            }
                          })
                          :
                          null
                          }


                        </Button>
                      </Grid>

                    )

                  })
                  :
                  null
                  }

                  <Button style={{display: "flex", margin: "auto", border: "1px solid #49BC88", borderRadius: 5, width: 200, marginTop: 20}} onClick={() => window.open("https://www.iheartjane.com/brands/24293/new-standard")}>
                      <Typography align="center" variant="h6" color="primary"> Order Online </Typography>
                  </Button>
                  
                 
                   
                </Grid>

                </div>


                  <Typography align="left" variant="h3" style={{color: "#49BC88", padding: "5%", marginBottom: 0}}> All Products</Typography>

                  <WorksDatabase works={this.props.works} imgs={this.props.imgs} selWork={(work) => this.setState({selWork: work})} editWorks={(editWorks) => this.setState({editWorks: editWorks})} user={this.context.currentUser}/>


                



               {this.state.newWorks ? 
               <Modal 
               open={true} 
               onClose={() => this.setState({newWorks: false})}
               style={{
                 overflowY: "auto",
                 overflowX: "hidden"
               }}>
                 <Card style={{backgroundColor: "#FFE2D9"}}>
                   <Button variant="contained" color="primary" style={{margin: "5%", backgroundColor: "#011000"}} onClick={() => this.setState({newWorks: false})}> 
                   <Typography style={{color: "#49BC88"}} >Back </Typography> </Button>
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
                   <Button variant="contained" color="primary" style={{margin: "5%", backgroundColor: "#011000"}} onClick={() => this.setState({editWorks: null})}> <Typography style={{color: "#49BC88"}}>Back</Typography> </Button>
                   <EditWorks closeModal={() => this.setState({editWorks: null})} work={this.state.editWorks} />
                 </Card>
               
               </Modal>
               
                :
                null
                }

              {this.state.selWork ? 
               <Modal 
               open={true} 
               onClick={() => this.setState({selWork: null})}
               onClose={() => this.setState({selWork: null})}
               style={{
                 overflowY: "auto",
                 overflowX: "hidden"
               }}>
                 <Card style={{backgroundColor: "#011000"}}>
                    <br />
                    <Typography align="center" variant="h3" style={{ color: "#49BC88", margin: "5%"}}> {this.state.selWork.item} </Typography>
                    <Typography align="center" variant="h4" style={{ color: "#49BC88", margin: "5%"}}> {this.state.selWork.collection} </Typography>
                    <br />
                    {this.props.imgs.length > 0 ? this.props.imgs.map((img) => {
                    let count = 0
                      if (img.collection == this.state.selWork.collection && img.item == this.state.selWork.item) {

                        return (
                          <div style={{display: "grid", padding: 20}}>
                            <img src={img.url} style={{width: "100%", margin: "auto"}}/>
                            <Typography align="center" variant="subtitle1" style={{ color: "#49BC88", margin: "5%"}}> {img.message} </Typography>

                          </div>
                        )
                      }
                    })
                    :
                    null
                    }
                 </Card>
               
               </Modal>
               
                :
                null
                }
                           
            </div>
        )
    }
    
}