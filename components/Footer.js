import React, { useState } from "react"

import SpaOutlinedIcon from "@mui/icons-material/SpaOutlined"
import { addDoc, collection, serverTimestamp } from "firebase/firestore"

import { db } from "../Firebase/FirebaseInit"

const shopUrl = "https://www.iheartjane.com/brands/24293/new-standard"

const exploreLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/products", label: "Products" },
  { href: "/press", label: "Press" },
]

const socialLinks = [
  {
    href: "https://www.instagram.com/newstandard710/",
    icon: "/insta.svg",
    label: "Instagram @newstandard710",
  },
  { href: "mailto:newstandard710@gmail.com", icon: "/Email.svg", label: "Email" },
]

export default function Footer() {
  const year = new Date().getFullYear()
  const [email, setEmail] = useState("")
  const [newsletterStatus, setNewsletterStatus] = useState("idle")
  const [newsletterMessage, setNewsletterMessage] = useState("")

  const handlePlaceholderLink = (event, href) => {
    if (href === "#") {
      event.preventDefault()
    }
  }

  const handleNewsletterSubmit = async (event) => {
    event.preventDefault()

    const normalizedEmail = email.trim().toLowerCase()

    if (!normalizedEmail) {
      setNewsletterStatus("error")
      setNewsletterMessage("Enter an email to subscribe.")
      return
    }

    setNewsletterStatus("submitting")
    setNewsletterMessage("")

    try {
      await addDoc(collection(db, "newsletterEmails"), {
        email: normalizedEmail,
        created: serverTimestamp(),
        source: "footer",
        page:
          typeof window !== "undefined" ? window.location.pathname : "unknown",
      })

      setEmail("")
      setNewsletterStatus("success")
      setNewsletterMessage("Thanks for subscribing.")
    } catch {
      setNewsletterStatus("error")
      setNewsletterMessage("Could not subscribe right now.")
    }
  }

  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-main">
          <section className="footer-brand" aria-label="New Standard">
            <a className="footer-brand-lockup" href="/">
              <img className="footer-logo" src="/logo.png" alt="" />
              <span>New Standard</span>
            </a>
            <div className="footer-accent-line" />
            <p>
              Elevated cannabis crafted for quality, balance, and innovation.
            </p>
            <a
              className="footer-shop-button"
              href={shopUrl}
              rel="noreferrer"
              target="_blank"
            >
              Shop Now
            </a>
          </section>

          <nav className="footer-links-column" aria-label="Explore">
            <h2>Explore</h2>
            <div className="footer-accent-line small" />
            {exploreLinks.map((link) => (
              <a href={link.href} key={link.href}>
                {link.label}
              </a>
            ))}
          </nav>

          <section className="footer-newsletter" aria-label="Newsletter signup">
            <div className="newsletter-heading-row">
              <div className="newsletter-icon">
                <SpaOutlinedIcon />
              </div>
              <div>
                <h2>Stay in the Know</h2>
                <div className="footer-accent-line small" />
              </div>
            </div>
            <p>Exclusive drops, new products, and insider updates.</p>
            <form
              className="newsletter-form"
              onSubmit={handleNewsletterSubmit}
            >
              <label className="visually-hidden" htmlFor="footer-email">
                Email address
              </label>
              <input
                id="footer-email"
                name="email"
                placeholder="Enter your email"
                type="email"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value)
                  if (newsletterStatus !== "idle") {
                    setNewsletterStatus("idle")
                    setNewsletterMessage("")
                  }
                }}
              />
              <button
                disabled={newsletterStatus === "submitting"}
                type="submit"
              >
                <span>
                  {newsletterStatus === "submitting"
                    ? "Subscribing"
                    : "Subscribe"}
                </span>
                <img alt="" src="/logo.png" />
              </button>
            </form>
            {newsletterMessage ? (
              <div
                aria-live="polite"
                className={`newsletter-message newsletter-message-${newsletterStatus}`}
              >
                {newsletterMessage}
              </div>
            ) : null}
          </section>
        </div>

        <div className="footer-bottom">
          <p>&copy; {year} New Standard. All rights reserved.</p>
          <div className="footer-socials" aria-label="Social links">
            {socialLinks.map((link) => (
              <a
                aria-label={link.label}
                href={link.href}
                key={link.label}
                onClick={(event) => handlePlaceholderLink(event, link.href)}
                rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                target={link.href.startsWith("http") ? "_blank" : undefined}
              >
                <img alt="" src={link.icon} />
              </a>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .site-footer {
          background-color: #010b08;
          background-image: linear-gradient(
              180deg,
              rgba(1, 11, 8, 0.18) 0%,
              rgba(1, 11, 8, 0.52) 58%,
              rgba(1, 11, 8, 0.82) 100%
            ),
            url("/footerBackground.png");
          background-position: center;
          background-repeat: no-repeat;
          background-size: cover;
          color: #ffffff;
          font-family: "Montserrat", sans-serif;
          overflow: hidden;
          position: relative;
        }

        .footer-inner {
          margin: 0 auto;
          max-width: 1680px;
          padding: clamp(76px, 8vw, 132px) clamp(24px, 6.8vw, 120px) 0;
        }

        .footer-main {
          align-items: start;
          display: grid;
          gap: clamp(42px, 5vw, 84px);
          grid-template-columns:
            minmax(300px, 1fr) minmax(140px, 0.42fr)
            minmax(520px, 1.45fr);
          padding-bottom: clamp(64px, 7vw, 118px);
        }

        .footer-brand {
          max-width: 470px;
        }

        .footer-brand-lockup {
          align-items: center;
          color: #ffffff;
          display: inline-flex;
          gap: 26px;
          text-decoration: none;
        }

        .footer-logo {
          display: block;
          height: clamp(82px, 7vw, 118px);
          object-fit: contain;
          width: clamp(82px, 7vw, 118px);
        }

        .footer-brand-lockup span {
          font-family: "Oswald", "Montserrat", sans-serif;
          font-size: clamp(27px, 2.15vw, 42px);
          font-weight: 500;
          letter-spacing: 0.18em;
          line-height: 1;
          text-transform: uppercase;
          white-space: nowrap;
        }

        .footer-accent-line {
          background: #49bc88;
          height: 3px;
          margin: 34px 0 28px;
          width: 86px;
        }

        .footer-accent-line.small {
          height: 2px;
          margin: 20px 0 30px;
          width: 62px;
        }

        .footer-brand p,
        .footer-newsletter p {
          color: rgba(255, 255, 255, 0.78);
          font-size: clamp(17px, 1.15vw, 24px);
          line-height: 1.65;
          margin: 0;
        }

        .footer-shop-button {
          align-items: center;
          background: linear-gradient(135deg, #56c985, #3ea363);
          border: 1px solid rgba(255, 255, 255, 0.16);
          border-radius: 8px;
          box-shadow: 0 0 30px rgba(73, 188, 136, 0.24);
          color: #ffffff;
          display: inline-flex;
          font-size: clamp(19px, 1.4vw, 29px);
          font-weight: 500;
          justify-content: center;
          margin-top: 34px;
          min-height: 76px;
          min-width: min(100%, 360px);
          padding: 18px 36px;
          text-decoration: none;
          transition: box-shadow 180ms ease, transform 180ms ease;
        }

        .footer-shop-button:hover {
          box-shadow: 0 0 40px rgba(73, 188, 136, 0.38);
          transform: translateY(-2px);
        }

        .footer-links-column h2,
        .footer-newsletter h2 {
          color: #ffffff;
          font-family: "Cormorant Garamond", Georgia, serif;
          font-size: clamp(32px, 2.4vw, 48px);
          font-weight: 600;
          letter-spacing: 0;
          line-height: 1;
          margin: 0;
        }

        .footer-links-column a {
          border-bottom: 1px solid rgba(255, 255, 255, 0.12);
          color: rgba(255, 255, 255, 0.78);
          display: block;
          font-size: clamp(17px, 1.15vw, 25px);
          line-height: 1.2;
          padding: 0 0 20px;
          text-decoration: none;
          transition: color 160ms ease, transform 160ms ease;
        }

        .footer-links-column a + a {
          margin-top: 22px;
        }

        .footer-links-column a:hover {
          color: #49bc88;
          transform: translateX(3px);
        }

        .footer-newsletter {
          background: rgba(4, 15, 13, 0.54);
          border: 1px solid rgba(255, 255, 255, 0.22);
          border-radius: 22px;
          box-shadow: 0 24px 64px rgba(0, 0, 0, 0.28);
          padding: clamp(30px, 2.6vw, 44px);
        }

        .newsletter-heading-row {
          align-items: flex-start;
          display: grid;
          gap: 24px;
          grid-template-columns: auto 1fr;
        }

        .newsletter-icon {
          align-items: center;
          border: 1px solid rgba(73, 188, 136, 0.68);
          border-radius: 50%;
          color: #49bc88;
          display: inline-flex;
          height: clamp(56px, 4.2vw, 76px);
          justify-content: center;
          width: clamp(56px, 4.2vw, 76px);
        }

        .newsletter-icon :global(svg) {
          font-size: clamp(30px, 2.3vw, 42px);
        }

        .newsletter-form {
          border: 1px solid rgba(255, 255, 255, 0.18);
          border-radius: 8px;
          display: grid;
          grid-template-columns: minmax(0, 1fr) auto;
          margin-top: 30px;
          overflow: hidden;
        }

        .newsletter-form input {
          background: rgba(1, 11, 8, 0.48);
          border: 0;
          color: #ffffff;
          font-family: "Montserrat", sans-serif;
          font-size: clamp(15px, 1.05vw, 21px);
          min-height: 70px;
          min-width: 0;
          outline: none;
          padding: 0 26px;
        }

        .newsletter-form input::placeholder {
          color: rgba(255, 255, 255, 0.52);
        }

        .newsletter-form button {
          align-items: center;
          background: linear-gradient(135deg, #56c985, #3ea363);
          border: 0;
          color: #ffffff;
          cursor: pointer;
          display: inline-flex;
          font-family: "Montserrat", sans-serif;
          font-size: clamp(15px, 1vw, 20px);
          font-weight: 500;
          gap: 12px;
          justify-content: center;
          min-width: 170px;
          padding: 0 22px;
          transition: filter 160ms ease;
        }

        .newsletter-form button:hover {
          filter: brightness(1.08);
        }

        .newsletter-form button:disabled {
          cursor: wait;
          filter: saturate(0.8);
          opacity: 0.72;
        }

        .newsletter-form button img {
          filter: brightness(0) invert(1);
          height: 26px;
          object-fit: contain;
          opacity: 0.76;
          width: 26px;
        }

        .newsletter-message {
          font-size: 14px;
          font-weight: 600;
          line-height: 1.4;
          margin-top: 14px;
        }

        .newsletter-message-success {
          color: #49bc88;
        }

        .newsletter-message-error {
          color: #f5afb9;
        }

        .footer-bottom {
          align-items: center;
          border-top: 1px solid rgba(73, 188, 136, 0.42);
          display: flex;
          gap: 28px;
          justify-content: space-between;
          padding: 30px 0 40px;
        }

        .footer-bottom p {
          color: rgba(255, 255, 255, 0.72);
          font-size: clamp(15px, 1vw, 21px);
          line-height: 1.4;
          margin: 0;
        }

        .footer-socials {
          display: flex;
          gap: 26px;
        }

        .footer-socials a {
          align-items: center;
          border: 1px solid rgba(73, 188, 136, 0.48);
          border-radius: 50%;
          display: inline-flex;
          height: 58px;
          justify-content: center;
          transition: background 160ms ease, box-shadow 160ms ease,
            transform 160ms ease;
          width: 58px;
        }

        .footer-socials a:hover {
          background: rgba(73, 188, 136, 0.12);
          box-shadow: 0 0 24px rgba(73, 188, 136, 0.2);
          transform: translateY(-2px);
        }

        .footer-socials img {
          filter: invert(92%) sepia(18%) saturate(264%) hue-rotate(82deg)
            brightness(108%) contrast(91%);
          height: 24px;
          object-fit: contain;
          width: 24px;
        }

        .footer-socials a[aria-label="Email"] img {
          height: 28px;
          width: 28px;
        }

        .visually-hidden {
          clip: rect(0 0 0 0);
          clip-path: inset(50%);
          height: 1px;
          overflow: hidden;
          position: absolute;
          white-space: nowrap;
          width: 1px;
        }

        @media (max-width: 1180px) {
          .footer-main {
            grid-template-columns: minmax(0, 1fr) minmax(150px, 0.35fr);
          }

          .footer-newsletter {
            grid-column: 1 / -1;
          }
        }

        @media (max-width: 760px) {
          .footer-inner {
            padding-left: 18px;
            padding-right: 18px;
          }

          .footer-main {
            gap: 40px;
            grid-template-columns: 1fr;
            padding-bottom: 56px;
          }

          .footer-brand-lockup {
            gap: 16px;
          }

          .footer-brand-lockup span {
            white-space: normal;
          }

          .footer-shop-button {
            width: 100%;
          }

          .newsletter-heading-row {
            grid-template-columns: 1fr;
          }

          .newsletter-form {
            grid-template-columns: 1fr;
          }

          .newsletter-form input {
            min-height: 62px;
          }

          .newsletter-form button {
            min-height: 62px;
            width: 100%;
          }

          .footer-bottom {
            align-items: flex-start;
            flex-direction: column;
          }
        }

        @media (max-width: 440px) {
          .footer-brand-lockup {
            align-items: flex-start;
            flex-direction: column;
          }

          .footer-socials {
            gap: 14px;
          }

          .footer-socials a {
            height: 50px;
            width: 50px;
          }
        }
      `}</style>
    </footer>
  )
}
