import React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";
import theme from "../theme";

export default class MyDocument extends Document {
  

  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html lang="en">
        <Head>

          <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
          <meta name="description" content="Embrace the luxury of choice and the assurance of excellence with every product, perfectly balancing THC and CBD for your individual needs." />
          <meta name="keywords" content="CBD, THC, New Standard, Serum, Cartridges." />
          <link rel="icon" href="/images/favicon.ico"/>


          <meta name="theme-color" content={theme.palette.primary.main} />
          
          
        </Head>
        <body style={{backgroundColor: "#011000"}}>

          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

