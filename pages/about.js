import React from "react"

import Head from "next/head"

import { Grid, Button, Typography } from "@mui/material"

import Vision from "../components/animations/about/vision";
import Innovate from "../components/animations/home/innovate";

import Leaf from "../components/Leaf"


export default class About extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          
        };
        
    }

    componentDidMount() {

      

      
  
      }

        render() {

            return (
                <div>
                    <Head>
                    <title>New Standard</title>
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <meta name="description" content="Embrace the luxury of choice and the assurance of excellence with every product, perfectly balancing THC and CBD for your individual needs." />
                    <meta name="keywords" content="CBD, THC, New Standard, Serum, Cartridges." />
    
                    
                    </Head>
                   
                    <Typography variant="h2" align="center" color="primary" style={{margin: "5%"}} > Our Story </Typography>

                    <Grid container>
                        <Grid item xs={12} sm={6}>
                            <Vision />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="h4" align="center" color="primary" style={{padding: "5%"}} > A Vision Realized </Typography>
                            <Typography variant="h6" align="center" color="primary" style={{padding: "5%"}} > 
                            New Standard is a passion project that’s been years in the making for the owner, Noah Dotson. 
                            Noah’s dedication and experience brought a fresh perspective to the cannabis industry, sparking the creation of innovative products that set New Standard apart. 
                            By listening to the needs of consumers and staying true to his vision, Noah transformed his passion project into a beloved brand that continues to thrive today. 
                            
                            </Typography>
                        </Grid>
                    </Grid>

                    <img src="about/logo.svg" style={{display: "flex", margin: "auto", width: "90%", maxWidth: 200}}/>


                    <Typography variant="h4" align="center" color="primary" style={{margin: "5%"}} > Quality and Innovation </Typography>
                    <Typography variant="h6" align="center" color="primary" style={{margin: "5%"}} > 
                    With a commitment to quality and a drive for excellence, New Standard has become a beacon of innovation in the ever-evolving world of cannabis. 
                    The brand is known for its meticulous attention to detail, ensuring that each product not only meets but exceeds consumer expectations. 
                    By staying true to its core values and constantly pushing the boundaries of what's possible, New Standard continues to lead the way in the cannabis industry.
                    </Typography>

                    <Typography variant="h2" align="center" color="primary" style={{margin: "5%"}} > Our Products </Typography>

                    <Typography variant="h4" align="center" color="primary" style={{margin: "5%"}} > The Serum: Elevate Your Experience </Typography>
                    <img src="about/serum.svg" style={{display: "flex", margin: "auto", width: "90%", maxWidth: 300}}/>

                    <Typography variant="h6" align="center" color="primary" style={{margin: "5%"}} > 
                    The Serum offers a refined cannabis experience tailored for the discerning connoisseur seeking quality without the excess. 
                    Crafted with food-grade, fully edible ingredients, this product stands out with its use of full spectrum extract, entourage effect, and terpene enrichment for unparalleled potency. 
                    Distinguished by its convenient dropper bottle packaging, the New Standard serum ensures precise dosage flexibility for any tolerance level. 
                    Formulated with Live Resin, MCT Oil, and Avocado Oil, this product combines the luxury of a high-end tincture with the affordability and potency of a budget-friendly topical option.
                    </Typography>
                   
                    
                    <br />
                    



                                           
                </div>
            )
        
        }

        
    
}