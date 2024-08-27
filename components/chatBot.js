import React, { useState } from "react"

import { Card, Typography, Button, TextField, Grid } from "@mui/material"

import Typewriter from "./typewriter"

import LiveHelpIcon from '@mui/icons-material/LiveHelp';

import { motion } from "framer-motion"

export default function ChatBot(props) { 

    const [expand, setExpand] = useState(false)

    const [prompt, setPrompt] = useState("Hello")
    const [response, setResponse] = useState("Hello, how can I help you today?")

    const [loading, setLoading] = useState(true)



    React.useEffect(() => {

       

    }, [])

    const askModel = async (ask) => {

        setResponse("")
        setPrompt(ask)
       
        let response = await fetch('/api/customModel', {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
                prompt: ask
                
            }),
            
              
          });
  
          let session = await response.json()

         
          setResponse(session.response)

    
    }

    const handlePromptChange = (event) => {

        const target = event.target;
        let value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        if (name == "prompt") {
            setPrompt(value.replace(/(\r\n|\n|\r)/gm,""))
        }
    
    }

    const onKeyPress = (e) => {
        if(e.keyCode == 13){
            askModel(prompt)
         }
    }


    if (expand) {
        return (
            <div>
                
                <Card style={{position: "fixed", bottom: 0, width: "100%", backgroundColor: "#011000", border: "1px solid #49BC88", padding: 20}}>
                    
                    <Grid container>
                        <Grid item xs={12} sm={3} >
                            <Button style={{textTransform: "none", margin: 20}} variant="contained" color="primary" onClick={() => askModel("What is New Standard?")}>
                                <Typography align="center" variant="subtitle2" style={{color: "#011000"}}>
                                    What is New Standard?
                                </Typography>
                            </Button>
                        </Grid>
                        
                        <Grid item xs={12} sm={3}>
                            <Button style={{textTransform: "none", margin: 20}} variant="contained" color="primary" onClick={() => askModel("What kinds of products does New Standard offer?")}>
                                <Typography align="center" variant="subtitle2" style={{color: "#011000"}}>
                                    What kinds of products does New Standard offer?
                                </Typography>
                            </Button>
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <Button style={{textTransform: "none", margin: 20}} variant="contained" color="primary" onClick={() => askModel("What product would help me with sleep?")}>
                                <Typography align="center" variant="subtitle2" style={{color: "#011000"}}>
                                    What product would help me with sleep?
                                </Typography>
                            </Button>
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <Button style={{textTransform: "none", margin: 20}} variant="contained" color="primary" onClick={() => askModel("What sets New Standard apart from other cannabis brands?")}>
                                <Typography align="center" variant="subtitle2" style={{color: "#011000"}}>
                                What sets New Standard apart from other cannabis brands?
                                </Typography>
                            </Button>
                        </Grid>
                        
                        
                       
                    </Grid>
    
                    <br />
                     
                    <TextField                
                    onChange={handlePromptChange}
                    onKeyDown={onKeyPress}
                    value={prompt}
                    multiline
                    type="text"
                    name="prompt"
                    autoComplete="false"
                    InputProps={{ style: { color: "black" } }}
                    style={{
                    color: "black",
                    background: "white",
                    borderRadius: 15,
                    display: "flex",
                    margin: "auto",
                    width: "80%"
                    }}
                    />
                    <br />
                    <Button variant="contained" color="primary" 
                    onClick={() => askModel(prompt)}
                    >
                        Ask
                    </Button>
                    {loading && response == "" ?
                    <motion.img animate={{opacity: [0,1,0]}} transition={{duration: 3, repeat: Infinity}} src={"/logo.png"} style={{width: 60, display: "flex", margin: "auto", marginTop: 40}} />
                    :
                    null
                    }
                    <Typewriter style={{margin: 10}} text={response} delay={20} />
                </Card>
                
                <Button style={{position: "fixed", right: 20, bottom: 20}} color="secondary" onClick={() => setExpand(!expand)}>
                    <LiveHelpIcon style={{fontSize: 30, color: "#49BC88"}} />
                </Button>

            </div>
        )
    }
    else {
        return (
            <div>
                
                <Button style={{position: "fixed", right: 20, bottom: 20}} color="secondary" onClick={() => setExpand(!expand)}>
                    <LiveHelpIcon style={{fontSize: 30, color: "#49BC88"}} />
                </Button>
            </div>
        )
    }
    
    
    
    
}