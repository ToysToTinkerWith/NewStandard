import React from "react"

import { useRouter } from 'next/router'


import { Card, Button, Typography, Grid } from "@mui/material"

export default function Nav() {

 

        const router = useRouter()

            return (
                <Card style={{ border: "none", boxShadow: "none", borderRadius: 0, paddingRight: "5%", backgroundColor: "#011000"}}>

                    <Grid container>
                        <Grid item xs={6} sm={4}>
                            <Button style={{marginLeft: "5%", marginTop: 10}} href="/">
                                <img src="logo.png" />
                            </Button>
                        </Grid>
                        <Grid item xs={6} sm={8}>
                        <Grid container>
 
                                <Grid item xs={12} sm={4}>
                                <Button 
                                variant="text"
                                style={{
                                    background: router.asPath == "/" ? "#49BC88" : "#011000",
                                    color: "#49BC88",
                                    float: "right",
                                    padding: "10%",
                                    paddingTop: "5%",
                                    paddingBottom: "5%",
                                    margin: "2%",
                                    border: "1px solid #49BC88",
                                    borderRadius: 5
                                    
                                    }}
                                href="/"
                                
                                > 
                                <Typography align="right" variant="h5" style={{color: router.asPath == "/" ?  "#011000" : "#49BC88"}}>
                                Home
                                </Typography>
                                </Button>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                <Button 
                                variant="text"
                                style={{
                                    background: router.asPath == "/works" ? "#49BC88" : "#011000",
                                    color: "#49BC88",
                                    float: "right",
                                    padding: "10%",
                                    paddingTop: "5%",
                                    paddingBottom: "5%",
                                    margin: "2%",
                                    border: "1px solid #49BC88",
                                    borderRadius: 5
                                    
                                    }}
                    
                                href="/about"
                                
                                > 
                                <Typography align="right" variant="h6" style={{color: router.asPath == "/about" ?  "#011000" : "#49BC88"}}>
                                About
                                </Typography>
                                </Button>
                                
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                <Button 
                                variant="text"
                                style={{
                                background: router.asPath == "/products" ? "#49BC88" : "#011000",
                                color: "#49BC88",
                                float: "right",
                                padding: "10%",
                                paddingTop: "5%",
                                paddingBottom: "5%",
                                margin: "2%",
                                border: "1px solid #49BC88",
                                borderRadius: 5
                                
                                }}
                    
                                href="/about"
                                
                                > 
                                <Typography align="right" variant="h6" style={{color: router.asPath == "/products" ?  "#011000" : "#49BC88"}}>
                                Products
                                </Typography>
                                </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>

                   

                    
                        

                    
                                  
                </Card>
            )
        

        
    
    
}