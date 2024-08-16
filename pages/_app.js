
import React, { useEffect, useState  } from "react";

import { AuthProvider } from "../Firebase/FirebaseAuth";

import Script from "next/script"
import { useRouter } from 'next/router'
import * as gtag from '../lib/gtag'

import Nav from "../components/nav/nav"
import Footer from "../components/nav/footer"


import { db } from "../Firebase/FirebaseInit"
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";

import ChatBot from "../components/chatBot"

import PropTypes from "prop-types";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "../theme";

import { Grid, Button, Typography } from "@mui/material"
import { CookiesProvider, useCookies } from 'react-cookie'


import "../style.css"


export default function MyApp(props) {

  const [cookies, setCookie, removeCookie] = useCookies(['user']);

  const { Component, pageProps } = props;

  const [ works, setWorks ] = useState([])
  const [ imgs, setImgs ] = useState([])

  useEffect(() => {
    
    const works = collection(db, "works")

    let unsub
    let unsub2


    unsub = onSnapshot(works, (workSnap) => {

      setWorks([])
          
      workSnap.forEach(async (work) => {

          let workData = work.data()

          workData.id = work.id

          let workDate = new Date(work.data().date.replace(/-/g, '\/'))
          workData.date = workDate.toLocaleDateString()

          const imgsRef = collection(db, "works", work.id, "imgs")

          const imgsQuery = query(imgsRef, orderBy("created", "asc"))
  
          unsub2 = onSnapshot(imgsQuery, (imgsSnap) => {
            

            let imgs = []
              
          imgsSnap.forEach(async (img) => {
            imgs.push({url: img.data().url, message: img.data().message, collection: workData.collection, item: workData.item})    
          });

          setImgs(oldimgs => [...oldimgs, ...imgs])
  
  
          });

          setWorks(works => [...works, workData])

          
      });


      });
      

  }, [])

  


  const router = useRouter()
  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url)
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

    return (
    
    
      <React.Fragment>
        <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}/>
        <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gtag.GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}>
        
        </Script>
  
        <link href="https://fonts.googleapis.com/css2?family=Marcellus&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Marcellus SC&display=swap" rel="stylesheet" />

        
       
          <CookiesProvider>
          
              {cookies.user ?
               <ThemeProvider theme={theme}>
              <CssBaseline />
              <AuthProvider >
                <Nav />
                <Component {...pageProps} works={works} imgs={imgs}/>
                <Footer />
                <ChatBot />
              </AuthProvider>
              </ThemeProvider>

              :
              cookies ?
             <div>
                  <img src={"logo.png"} style={{display: "flex", margin: "auto", marginTop: 40}} />
               <br />
                  <Button style={{display: "flex", margin: "auto", border: "1px solid #49BC88", padding: "5%"}} onClick={() => setCookie("user", {confirm: true})}><Typography align="center" variant="h6" style={{color: "#49BC88"}}> I confirm that I am 21 or a valid medical patient</Typography></Button>
              </div>
              : 
              null
              }
              
            
          </CookiesProvider>
        
  
        
      </React.Fragment>
    );
  
  

  
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};
