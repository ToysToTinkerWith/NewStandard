import React from "react"

import Head from "next/head"

import { Grid, Button, Typography } from "@mui/material"

import Variety from "../components/animations/home/variety";
import Innovate from "../components/animations/home/innovate";

import Leaf from "../components/Leaf"


export default class Index extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          works: [],
          imgs: [],
          selProd: "1:1"
        };
        
    }

    componentDidMount() {

      

      
  
      }

        render() {

            let selImg
            let selProd

            this.props.works.forEach((work) => {
              if (work.item == this.state.selProd) {
                selProd = work
              }
            })

            this.props.imgs.forEach((img) => {
              if (img.item == this.state.selProd) {
                selImg = img
              }
            })

            return (
                <div>
                    <Head>
                    <title>New Standard</title>
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <meta name="description" content="Embrace the luxury of choice and the assurance of excellence with every product, perfectly balancing THC and CBD for your individual needs." />
                    <meta name="keywords" content="CBD, THC, New Standard, Serum, Cartridges." />
    
                    
                    </Head>
                   
                    <Typography variant="h2" align="center" color="primary" style={{margin: "5%"}} > New Standard </Typography>
                   
                    <img src="home/cover.svg" style={{display: "flex", margin: "auto", width: "90%", maxWidth: 1000}}/>
                    <br />
                    <Typography variant="h4" align="center" color="primary" style={{margin: "5%"}} > Quality Meets Variety </Typography>
                    <Typography variant="h6" align="center" color="primary" style={{margin: "5%"}} > Embrace the luxury of choice and the assurance of excellence with every product, perfectly balancing THC and CBD for your individual needs. </Typography>
                    <Variety />
                    <Typography variant="h6" align="center" color="primary" style={{margin: "5%"}} > Discover the essence of choice and quality with New Standard. Our diverse range of top-tier cannabis products, from unique live resin cartridges to adaptable serums, is crafted to cater to every preference.  </Typography>
                    <br />
                    <Grid container >
                    {this.props.works.length > 0 ? this.props.works.slice(0,6).map((work) => {
                    

                          let workImgs = []

                          this.props.imgs.forEach((img) => {
                            if (img.item == work.item) {
                              workImgs.push(img)
                            }
                          })

                              return (
                                <Grid item xs={4} sm={2} style={{padding: 20}}> 
                                  <Button style={{border: this.state.selProd == work.item ? "1px solid #49BC88" : null}} onClick={() => this.setState({selProd: work.item})}>
                                    <Leaf work={work} imgs={workImgs}/>
                                  </Button>
                                </Grid>
                              )
                            
                          })
                          :
                          null
                          }
                      
                      </Grid> 
                    {selImg ? 
                    <Grid container alignItems="center">
                      <Grid item xs={12} sm={6} style={{padding: "5%"}}>
                        <Typography variant="h4" color="primary"> {this.state.selProd}</Typography>
                        <br />
                        <Typography color="primary"> {selImg.message}</Typography>

                      </Grid>
                      <Grid item xs={12} sm={6} style={{padding: "5%"}}>
                      <img src={selImg.url} style={{display: "flex", margin: "auto", width: "100%", maxHeight: 300, maxWidth: 300}} />

                      </Grid>
                    </Grid>
                    :
                    null
                    }

                            
                   
                      <Typography align="center" variant="subtitle1" color="primary"> and more...</Typography>
                      <br />
                      <Button style={{display: "flex", margin: "auto", border: "1px solid #49BC88", borderRadius: 5, width: 120}} href="/products">
                        <Typography align="center" variant="h6" color="primary"> Products</Typography>
                      </Button>
                      <br />
                      <Typography align="center" variant="h4" color="primary" style={{margin: "5%"}}> Innovative Touch</Typography>
                      <Typography align="center" variant="h6" color="primary" style={{margin: "5%"}}> At New Standard, innovation isn't just a concept, it's our core philosophy. We're constantly pushing the boundaries to create new and unique cannabis experiences. </Typography>


                      <br />
                      <Innovate />
                      <br />
                      <Button style={{display: "flex", margin: "auto", border: "1px solid #49BC88", borderRadius: 5, width: 120}} href="/products">
                        <Typography align="center" variant="h6" color="primary"> About</Typography>
                      </Button>
                      <br />

                      <Typography align="center" variant="h6" color="primary" style={{margin: "5%"}}> Our team is dedicated to exploring uncharted territories in product development, ensuring that our customers always have access to the latest and most advanced cannabis products on the market. With New Standard, you're not just purchasing cannabis; you're embracing a future of endless possibilities and innovative discoveries. </Typography>



                                           
                </div>
            )
        
        }

        
    
}