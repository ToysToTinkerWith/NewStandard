import React, { useCallback, useEffect, useState } from "react"

import { AuthProvider } from "../Firebase/FirebaseAuth"

import Script from "next/script"
import { useRouter } from "next/router"
import * as gtag from "../lib/gtag"

import Nav from "../components/Nav"
import Footer from "../components/Footer"

import { db } from "../Firebase/FirebaseInit"
import { collection, query, orderBy, onSnapshot } from "firebase/firestore"

import ChatBot from "../components/chatBot"

import PropTypes from "prop-types"
import { ThemeProvider } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import theme from "../theme"

import { Typography } from "@mui/material"
import { CookiesProvider, useCookies } from "react-cookie"

import { motion } from "framer-motion"

import "../style.css"

export default function MyApp(props) {
  const [cookies, setCookie] = useCookies(["user"])

  const { Component, pageProps } = props

  const [works, setWorks] = useState([])
  const [imgs, setImgs] = useState([])
  const [view, setView] = useState(false)
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    const worksRef = collection(db, "works")
    const imgUnsubs = []

    const unsub = onSnapshot(worksRef, (workSnap) => {
      const nextWorks = []
      setImgs([])

      workSnap.forEach((workDoc) => {
        const rawWork = workDoc.data() || {}

        const workData = {
          ...rawWork,
          id: workDoc.id,
        }

        const rawDate = rawWork?.date

        if (typeof rawDate === "string" && rawDate.trim()) {
          const parsedDate = new Date(rawDate.replace(/-/g, "/"))
          workData.date = isNaN(parsedDate.getTime())
            ? rawDate
            : parsedDate.toLocaleDateString()
        } else {
          workData.date = ""
        }

        nextWorks.push(workData)

        const imgsRef = collection(db, "works", workDoc.id, "imgs")
        const imgsQuery = query(imgsRef, orderBy("created", "asc"))

        const unsubImgs = onSnapshot(imgsQuery, (imgsSnap) => {
          const nextImgs = []

          imgsSnap.forEach((imgDoc) => {
            const imgData = imgDoc.data() || {}

            nextImgs.push({
              id: imgDoc.id,
              url: imgData.url || "",
              message: imgData.message || "",
              created: imgData.created || 0,
              index:
                typeof imgData.index === "number"
                  ? imgData.index
                  : Number(imgData.index) || 0,
              collection: imgData.collection || workData.collection || "",
              item: imgData.item || workData.item || "",
              workId: imgData.workId || workDoc.id,
            })
          })

          setImgs((oldImgs) => {
            const withoutCurrentWork = oldImgs.filter(
              (img) => img.workId !== workDoc.id
            )
            return [...withoutCurrentWork, ...nextImgs]
          })
        })

        imgUnsubs.push(unsubImgs)
      })

      setWorks(nextWorks)
      setView(true)
    })

    return () => {
      try {
        unsub()
      } catch {}

      imgUnsubs.forEach((fn) => {
        try {
          fn()
        } catch {}
      })
    }
  }, [])

  const router = useRouter()

  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url)
    }

    router.events.on("routeChangeComplete", handleRouteChange)

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange)
    }
  }, [router.events])

  useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side")
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles)
    }
  }, [])

  useEffect(() => {
    setIsHydrated(true)
  }, [])

  const confirmAge = useCallback(() => {
    setCookie("user", { confirm: true }, { path: "/", sameSite: "lax" })
  }, [setCookie])

  useEffect(() => {
    if (!isHydrated) {
      return
    }

    let cancelled = false
    let attempts = 0

    const trackLocationContext = () => {
      if (cancelled) {
        return
      }

      if (typeof window !== "undefined" && window.gtag) {
        gtag.trackVisitorLocationContext()
        return
      }

      attempts += 1

      if (attempts < 10) {
        window.setTimeout(trackLocationContext, 500)
      }
    }

    trackLocationContext()

    return () => {
      cancelled = true
    }
  }, [isHydrated])

  const hasConfirmedAge =
    isHydrated && Boolean(cookies.user?.confirm || cookies.user)
  const isNwLeafPage = ["/nwleaf", "/nwleaf3"].includes(router.pathname)
  const shouldShowChat = hasConfirmedAge && !isNwLeafPage

  return (
    <React.Fragment>
      {gtag.GA_TRACKING_ID ? (
        <>
          <Script
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
          />
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
            }}
          />
        </>
      ) : null}

      <link
        href="https://fonts.googleapis.com/css2?family=Marcellus&display=swap"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Marcellus SC&display=swap"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=Montserrat:wght@400;500;600;700&family=Oswald:wght@400;500;600&display=swap"
        rel="stylesheet"
      />

      <CookiesProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <AuthProvider>
            {!isHydrated ? (
              <div style={{ minHeight: "100vh", backgroundColor: "#011000" }} />
            ) : hasConfirmedAge || isNwLeafPage ? (
              <motion.div animate={{ opacity: [0, 1] }}>
                <Nav isNwLeafPage={isNwLeafPage} />
                <Component
                  {...pageProps}
                  works={works}
                  imgs={imgs}
                  hasConfirmedAge={hasConfirmedAge}
                  confirmAge={confirmAge}
                />
                <Footer />
                {shouldShowChat ? (
                  <>
                    <Typography
                      component={motion.div}
                      animate={{ opacity: [0, 1, 1, 0] }}
                      className="chatbot-callout"
                      transition={{ duration: 5 }}
                      align="center"
                      variant="subtitle2"
                    >
                      Try out our AI chatbot!
                    </Typography>
                    <ChatBot />
                  </>
                ) : null}
              </motion.div>
            ) : (
              <main className="site-age-gate">
                <motion.section
                  animate={{ opacity: 1, y: 0 }}
                  className="site-age-card"
                  initial={{ opacity: 0, y: 22 }}
                  transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="site-age-brand">
                    <img alt="" src="/logo.png" />
                    <span>New Standard</span>
                  </div>
                  <div className="site-age-line" />
                  <p className="site-age-eyebrow">Age Verification</p>
                  <h1>Welcome to New Standard.</h1>
                  <p className="site-age-copy">
                    Please confirm you are 21 or a valid medical patient before
                    entering.
                  </p>
                  <button
                    className="site-age-button"
                    onClick={confirmAge}
                    type="button"
                  >
                    I confirm that I am 21+
                  </button>
                  <p className="site-age-disclaimer">
                    The statements made regarding these products have not been
                    evaluated by the Food and Drug Administration. These
                    products are not intended to diagnose, treat, cure or
                    prevent any disease. Please consult a healthcare
                    professional before use.
                  </p>
                </motion.section>
              </main>
            )}
          </AuthProvider>
        </ThemeProvider>
      </CookiesProvider>

      <style jsx global>{`
        .site-age-gate {
          align-items: center;
          background-color: #010b08;
          background-image: linear-gradient(
              90deg,
              rgba(1, 7, 6, 0.96) 0%,
              rgba(1, 10, 8, 0.72) 45%,
              rgba(1, 9, 8, 0.86) 100%
            ),
            radial-gradient(
              circle at 28% 46%,
              rgba(73, 188, 136, 0.18),
              transparent 34%
            ),
            url("/background.png");
          background-position: center;
          background-size: cover;
          color: #ffffff;
          display: flex;
          font-family: "Montserrat", sans-serif;
          justify-content: center;
          min-height: 100vh;
          overflow: hidden;
          padding: clamp(24px, 5vw, 72px);
          position: relative;
        }

        .chatbot-callout {
          background: rgba(2, 15, 13, 0.84);
          border: 1px solid rgba(73, 188, 136, 0.58);
          border-radius: 999px;
          border-bottom-right-radius: 4px;
          box-shadow: 0 18px 42px rgba(0, 0, 0, 0.44),
            0 0 24px rgba(73, 188, 136, 0.2);
          color: #49bc88 !important;
          font-family: "Montserrat", sans-serif;
          font-weight: 700;
          letter-spacing: 0.01em;
          padding: 14px 18px;
          position: fixed;
          right: 84px;
          bottom: 68px;
          z-index: 2147482999;
        }

        @media (max-width: 640px) {
          .chatbot-callout {
            bottom: 74px;
            max-width: calc(100vw - 104px);
            right: 78px;
          }
        }

        .site-age-gate::before {
          background: linear-gradient(
            180deg,
            rgba(0, 0, 0, 0.08),
            rgba(0, 0, 0, 0.76)
          );
          content: "";
          inset: 0;
          pointer-events: none;
          position: absolute;
        }

        .site-age-card {
          background: rgba(2, 15, 13, 0.72);
          border: 1px solid rgba(255, 255, 255, 0.24);
          border-radius: 18px;
          box-shadow: 0 30px 90px rgba(0, 0, 0, 0.54);
          max-width: 650px;
          overflow: hidden;
          padding: clamp(30px, 4.6vw, 62px);
          position: relative;
          width: min(100%, 650px);
          z-index: 1;
        }

        .site-age-card::before {
          background: radial-gradient(
            circle at 22% 0%,
            rgba(73, 188, 136, 0.2),
            transparent 45%
          );
          content: "";
          inset: 0;
          pointer-events: none;
          position: absolute;
        }

        .site-age-card > * {
          position: relative;
          z-index: 1;
        }

        .site-age-brand {
          align-items: center;
          display: flex;
          gap: 22px;
          margin-bottom: 24px;
        }

        .site-age-brand img {
          display: block;
          height: clamp(72px, 8vw, 110px);
          object-fit: contain;
          width: clamp(72px, 8vw, 110px);
        }

        .site-age-brand span {
          color: #ffffff;
          font-family: "Oswald", sans-serif;
          font-size: clamp(28px, 4vw, 50px);
          font-weight: 400;
          letter-spacing: 0.18em;
          line-height: 1;
          text-transform: uppercase;
        }

        .site-age-line {
          background: #49bc88;
          height: 3px;
          margin-bottom: 34px;
          width: 72px;
        }

        .site-age-eyebrow {
          color: #49bc88;
          font-size: clamp(13px, 1vw, 16px);
          font-weight: 700;
          letter-spacing: 0.18em;
          line-height: 1.4;
          margin: 0 0 14px;
          text-transform: uppercase;
        }

        .site-age-card h1 {
          color: #fbfbf7;
          font-family: "Cormorant Garamond", Georgia, serif;
          font-size: clamp(48px, 6vw, 84px);
          font-weight: 600;
          letter-spacing: 0;
          line-height: 0.96;
          margin: 0 0 24px;
          text-shadow: 0 2px 16px rgba(0, 0, 0, 0.5);
        }

        .site-age-copy {
          color: rgba(255, 255, 255, 0.84);
          font-size: clamp(17px, 1.35vw, 22px);
          line-height: 1.55;
          margin: 0 0 30px;
          max-width: 520px;
        }

        .site-age-button {
          align-items: center;
          background: linear-gradient(135deg, #55c985, #3ba565);
          border: 0;
          border-radius: 8px;
          box-shadow: 0 0 34px rgba(73, 188, 136, 0.34);
          color: #ffffff;
          cursor: pointer;
          display: inline-flex;
          font-family: "Montserrat", sans-serif;
          font-size: clamp(16px, 1.25vw, 21px);
          font-weight: 600;
          justify-content: center;
          min-height: 64px;
          min-width: min(100%, 320px);
          padding: 18px 30px;
          transition: box-shadow 160ms ease, filter 160ms ease,
            transform 160ms ease;
        }

        .site-age-button:hover {
          box-shadow: 0 0 44px rgba(73, 188, 136, 0.48);
          filter: brightness(1.06);
          transform: translateY(-2px);
        }

        .site-age-button:focus-visible {
          outline: 2px solid #ffffff;
          outline-offset: 4px;
        }

        .site-age-disclaimer {
          border-top: 1px solid rgba(255, 255, 255, 0.12);
          color: rgba(255, 255, 255, 0.58);
          font-size: clamp(12px, 0.9vw, 14px);
          line-height: 1.55;
          margin: 30px 0 0;
          padding-top: 24px;
        }

        @media (max-width: 640px) {
          .site-age-gate {
            background-position: 72% center;
            padding: 18px;
          }

          .site-age-card {
            border-radius: 14px;
          }

          .site-age-brand {
            align-items: flex-start;
            flex-direction: column;
            gap: 16px;
          }

          .site-age-brand span {
            font-size: clamp(25px, 9vw, 38px);
            white-space: normal;
          }

          .site-age-button {
            width: 100%;
          }
        }
      `}</style>
    </React.Fragment>
  )
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
}
