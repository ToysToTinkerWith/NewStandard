import React, { useEffect, useState } from "react"

import Head from "next/head"

const linkItems = [
  {
    href: "https://www.iheartjane.com/brands/43474/girlweed",
    title: "BUY NOW",
    subtitle: "Shop Girlweed for pickup or delivery",
    variant: "primary",
  },
  {
    href: "https://www.girlweedxo.com",
    title: "LOCATE GIRLWEED",
    subtitle: "Find a shop near you that carries us",
    variant: "ghost",
  },
  {
    href: "https://www.instagram.com/girlweedxo/",
    title: "JOIN THE COMMUNITY",
    subtitle: "Follow @girlweedxo on Instagram",
    variant: "ghost",
  },
  {
    href: "https://wa.cultiveramarket.com/bm/market/new-standard-labs_2/menu",
    title: "BUY NOW FOR YOUR STORE",
    subtitle: "Wholesale ordering on Cultivera",
    variant: "retail",
    groupLabel: "Retailers & buyers",
  },
]

export default function NWLeaf3({
  hasConfirmedAge = false,
  confirmAge = () => {},
}) {
  const [agePassed, setAgePassed] = useState(Boolean(hasConfirmedAge))

  useEffect(() => {
    if (hasConfirmedAge) {
      setAgePassed(true)

      try {
        sessionStorage.setItem("gw_age", "1")
      } catch {}

      return
    }

    try {
      if (sessionStorage.getItem("gw_age") === "1") {
        setAgePassed(true)
        confirmAge()
      }
    } catch {}
  }, [confirmAge, hasConfirmedAge])

  useEffect(() => {
    if (!agePassed) {
      document.body.style.overflow = "hidden"

      return () => {
        document.body.style.overflow = ""
      }
    }

    document.body.style.overflow = ""
  }, [agePassed])

  const passGate = () => {
    setAgePassed(true)
    confirmAge()

    try {
      sessionStorage.setItem("gw_age", "1")
    } catch {}
  }

  return (
    <>
      <Head>
        <title>Girlweed Links</title>
        <meta name="robots" content="noindex" />
        <meta
          name="description"
          content="Girlweed links for shopping, locating stores, community, and wholesale buyers."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Abril+Fatface&family=League+Spartan:wght@500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </Head>

      <main className="girlweed-links-page">
        {!agePassed ? (
          <div className="girlweed-gate">
            <div className="gate-card">
              <h1>Hold up.</h1>
              <p>This page is for adults 21 and over in Washington State.</p>
              <div className="gate-btns">
                <button className="gate-btn yes" onClick={passGate} type="button">
                  I&apos;m 21 or older
                </button>
                <a className="gate-btn no" href="https://www.google.com">
                  Take me back
                </a>
              </div>
            </div>
          </div>
        ) : null}

        <section className="girlweed-wrap" aria-label="Girlweed link hub">
          <header className="girlweed-header">
            <div className="wordmark">GIRLWEED</div>
            <div className="tagline">Where do you want to go?</div>
          </header>

          <nav className="link-stack" aria-label="Girlweed links">
            {linkItems.map((item) => (
              <React.Fragment key={item.title}>
                {item.groupLabel ? (
                  <div className="retail-label">{item.groupLabel}</div>
                ) : null}
                <a
                  className={`hub-link ${item.variant}`}
                  href={item.href}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <span className="link-text">
                    <span className="link-main">{item.title}</span>
                    <span className="link-sub">{item.subtitle}</span>
                  </span>
                  <span className="arrow" aria-hidden="true">
                    &rarr;
                  </span>
                </a>
              </React.Fragment>
            ))}
          </nav>

          <footer className="girlweed-warning">
            <p>
              This product has intoxicating effects and may be habit forming.
              Marijuana can impair concentration, coordination, and judgment. Do
              not operate a vehicle or machinery under the influence of this
              drug. There may be health risks associated with consumption of
              this product. For use only by adults twenty-one and older. Keep
              out of the reach of children.
            </p>
          </footer>
        </section>
      </main>

      <style jsx global>{`
        .girlweed-links-page {
          --pink: #f5afb9;
          --pink-soft: #fadfe8;
          --pink-bg: #fff0f1;
          --navy: #010b4f;
          --gold: #c9a253;
          --white: #ffffff;
          --ink: #2a2230;
          background: var(--pink-bg);
          color: var(--ink);
          font-family: "League Spartan", system-ui, sans-serif;
          line-height: 1.4;
          min-height: 100vh;
        }

        .girlweed-links-page *,
        .girlweed-links-page *::before,
        .girlweed-links-page *::after {
          box-sizing: border-box;
        }

        .girlweed-gate {
          align-items: center;
          background: var(--navy);
          display: flex;
          inset: 0;
          justify-content: center;
          padding: 24px;
          position: fixed;
          text-align: center;
          z-index: 9999;
        }

        .girlweed-gate .gate-card {
          color: var(--pink-soft);
          max-width: 420px;
        }

        .girlweed-gate h1 {
          color: var(--pink);
          font-family: "Abril Fatface", serif;
          font-size: clamp(2rem, 8vw, 2.6rem);
          font-weight: 400;
          line-height: 1.08;
          margin: 0 0 14px;
        }

        .girlweed-gate p {
          font-size: 1.02rem;
          margin: 0 0 26px;
        }

        .gate-btns {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          justify-content: center;
        }

        .gate-btn {
          border: 0;
          border-radius: 999px;
          cursor: pointer;
          display: inline-block;
          font-family: "League Spartan", sans-serif;
          font-size: 1rem;
          font-weight: 700;
          letter-spacing: 0.04em;
          padding: 15px 30px;
          text-decoration: none;
          transition: transform 0.12s ease;
        }

        .gate-btn:active {
          transform: scale(0.98);
        }

        .gate-btn:focus-visible {
          outline: 3px solid var(--gold);
          outline-offset: 3px;
        }

        .gate-btn.yes {
          background: var(--pink);
          color: var(--navy);
        }

        .gate-btn.no {
          background: transparent;
          border: 2px solid var(--pink-soft);
          color: var(--pink-soft);
        }

        .girlweed-wrap {
          display: flex;
          flex-direction: column;
          margin: 0 auto;
          max-width: 480px;
          min-height: 100vh;
          padding: 52px 22px 40px;
        }

        .girlweed-header {
          margin-bottom: 34px;
          text-align: center;
        }

        .wordmark {
          color: var(--navy);
          font-size: clamp(2rem, 9vw, 2.7rem);
          font-weight: 800;
          letter-spacing: 0.16em;
          line-height: 1.08;
        }

        .tagline {
          color: var(--pink);
          font-family: "Abril Fatface", serif;
          font-size: 1.15rem;
          margin-top: 8px;
        }

        .link-stack {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .hub-link {
          align-items: center;
          border: 2px solid var(--navy);
          border-radius: 16px;
          display: flex;
          gap: 14px;
          justify-content: space-between;
          padding: 18px 22px;
          text-decoration: none;
          transition: box-shadow 0.12s ease, transform 0.12s ease;
        }

        .hub-link:active {
          transform: scale(0.99);
        }

        .hub-link:focus-visible {
          outline: 3px solid var(--gold);
          outline-offset: 3px;
        }

        .hub-link:hover {
          box-shadow: 0 10px 24px rgba(1, 11, 79, 0.16);
          transform: translateY(-1px);
        }

        .link-text {
          display: flex;
          flex-direction: column;
          text-align: left;
        }

        .link-main {
          font-size: 1.18rem;
          font-weight: 800;
          letter-spacing: 0.04em;
          line-height: 1.1;
        }

        .link-sub {
          font-size: 0.86rem;
          font-weight: 500;
          margin-top: 4px;
          opacity: 0.9;
        }

        .arrow {
          flex: none;
          font-size: 1.3rem;
          font-weight: 700;
        }

        .hub-link.primary {
          background: var(--navy);
          border-color: var(--navy);
          box-shadow: 0 10px 24px rgba(1, 11, 79, 0.22);
        }

        .hub-link.primary .link-main,
        .hub-link.primary .arrow {
          color: var(--pink);
        }

        .hub-link.primary .link-sub {
          color: var(--pink-soft);
        }

        .hub-link.ghost {
          background: var(--white);
          border-color: var(--navy);
        }

        .hub-link.ghost .link-main,
        .hub-link.ghost .arrow,
        .hub-link.retail .link-main,
        .hub-link.retail .arrow {
          color: var(--navy);
        }

        .hub-link.ghost .link-sub,
        .hub-link.retail .link-sub {
          color: var(--ink);
        }

        .retail-label {
          align-items: center;
          color: var(--navy);
          display: flex;
          font-size: 0.76rem;
          font-weight: 700;
          gap: 12px;
          letter-spacing: 0.18em;
          margin: 26px 0 4px;
          text-transform: uppercase;
        }

        .retail-label::before,
        .retail-label::after {
          background: rgba(1, 11, 79, 0.25);
          content: "";
          flex: 1;
          height: 1px;
        }

        .hub-link.retail {
          background: var(--pink-soft);
          border-color: var(--pink);
        }

        .girlweed-warning {
          margin-top: auto;
          padding-top: 34px;
          text-align: center;
        }

        .girlweed-warning p {
          color: var(--navy);
          font-size: 0.7rem;
          line-height: 1.45;
          margin: 0 auto;
          max-width: 420px;
          opacity: 0.75;
        }

        @media (prefers-reduced-motion: reduce) {
          .girlweed-links-page * {
            transition: none !important;
          }
        }
      `}</style>
    </>
  )
}
