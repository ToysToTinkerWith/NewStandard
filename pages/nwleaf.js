import React, { useEffect, useRef, useState } from "react"

import Head from "next/head"

const assetPath = "/assets/"

export default function NWLeaf({
  hasConfirmedAge = false,
  confirmAge = () => {},
}) {
  const pageRef = useRef(null)
  const [agePassed, setAgePassed] = useState(Boolean(hasConfirmedAge))
  const [ageDenied, setAgeDenied] = useState(false)
  const [lightboxSrc, setLightboxSrc] = useState("")

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

  useEffect(() => {
    const page = pageRef.current

    if (!page) {
      return
    }

    const revealEls = page.querySelectorAll(".reveal")

    if (typeof IntersectionObserver === "undefined") {
      revealEls.forEach((el) => el.classList.add("in"))
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in")
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15 }
    )

    revealEls.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

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
        <title>GIRLWEED - There's A New Girl In Town</title>
        <meta
          name="description"
          content="GIRLWEED is a New Standard Labs cannabis brand in Washington powered by DataBud QR experiences."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=League+Spartan:wght@400;500;600;700;800;900&family=Abril+Fatface&display=swap"
          rel="stylesheet"
        />
      </Head>

      <main className="nwleaf-page" ref={pageRef}>
        {!agePassed ? (
          <div className="nwleaf-age-gate">
            <div className="gate-mark">GIRLWEED</div>
            <div className="gate-q">Are you 21 or older?</div>
            <div className="gate-sub">
              You must be of legal age to enter. Washington State recreational
              cannabis.
            </div>
            <div className="gate-btns">
              <button
                className="gate-btn yes"
                onClick={passGate}
                type="button"
              >
                Yes, I&apos;m 21+
              </button>
              <button
                className="gate-btn no"
                onClick={() => setAgeDenied(true)}
                type="button"
              >
                No
              </button>
            </div>
            {ageDenied ? (
              <div className="gate-deny">
                Sorry - you must be 21 or older to view this site.
              </div>
            ) : null}
          </div>
        ) : null}

        <section className="hero">
          <div className="wrap">
            <div className="kicker">Now in Washington</div>
            <h1>
              There&apos;s
              <br />A <span className="nav">New Girl</span>
              <br />
              In Town
            </h1>
            <div className="hero-tag">&hellip;and she brought her bud.</div>
            <div className="scroll-cue">
              Meet her<span>&darr;</span>
            </div>
          </div>
        </section>

        <section className="pretty">
          <div className="wrap reveal">
            <img
              alt="Girlweed"
              className="pretty-photo"
              src={`${assetPath}hoodie.jpg`}
            />
            <div className="section-eyebrow">More than a pretty face</div>
            <h2>
              Cannabis
              <br />
              for <em>HER</em>.
            </h2>
            <p className="body-lg">
              Girlweed looks like a lifestyle. It is one. But she didn&apos;t
              show up to be another pretty tin on the shelf - she showed up to
              change how this whole thing works.
            </p>
            <p className="body-lg">
              Pretty is the entrance. The impact is the point.
            </p>
          </div>
        </section>

        <section className="databud">
          <div className="wrap reveal">
            <div className="db-eyebrow">
              The real impact &middot; Powered by DataBud
            </div>
            <h2>
              One QR code<em>changes the whole game.</em>
            </h2>
            <p className="db-body">
              Strain names and THC numbers don&apos;t tell you how cannabis will
              actually land for you. There&apos;s never been enough consistent
              information to know - so you guess, and you pay for the misses.
            </p>
            <p className="db-body">
              <strong>Every Girlweed package carries a DataBud QR.</strong> Scan
              it, and your chemistry finally gets a memory.
            </p>

            <div className="db-steps">
              <div className="db-step">
                <div className="db-step-n">1</div>
                <div className="db-step-t">
                  Scan the QR on the package
                  <span>No app. No account. Seconds.</span>
                </div>
              </div>
              <div className="db-step">
                <div className="db-step-n">2</div>
                <div className="db-step-t">
                  Tell DataBud how it felt
                  <span>Mind, body, mood - in seconds.</span>
                </div>
              </div>
              <div className="db-step">
                <div className="db-step-n">3</div>
                <div className="db-step-t">
                  Build your DataBud Card
                  <span>Carry your real patterns into any dispensary.</span>
                </div>
              </div>
            </div>

            <div className="qr-proof">
              <div className="qr-proof-label">
                Find the QR &middot; On every package
              </div>
              <div className="qr-row">
                <div className="qr-card gummy">
                  <img
                    alt="Girlweed gummy package with DataBud QR"
                    src={`${assetPath}qr-gummy.png`}
                  />
                  <div className="qr-pin">DataBud QR</div>
                </div>
                <div className="qr-card preroll">
                  <img
                    alt="Girlweed pre-roll package with DataBud QR"
                    src={`${assetPath}qr-preroll.png`}
                  />
                  <div className="qr-pin">DataBud QR</div>
                </div>
                <div className="qr-card vape">
                  <img
                    alt="Girlweed vape package with DataBud QR"
                    src={`${assetPath}qr-vape.png`}
                  />
                  <div className="qr-pin">DataBud QR</div>
                </div>
              </div>
              <p className="qr-proof-caption">
                Look for the QR paired with &ldquo;Your Experience
                Matters.&rdquo;
              </p>
            </div>

            <div className="db-card-wrap">
              <div className="db-card-label">Your DataBud Card</div>
              <button
                aria-label="Open DataBud Card detail"
                className="db-card-button"
                onClick={() => setLightboxSrc(`${assetPath}card.png`)}
                type="button"
              >
                <img
                  alt="DataBud Card - your cannabis patterns, evidence-based and consumer-owned"
                  className="db-card-img"
                  src={`${assetPath}card.png`}
                />
              </button>
              <p className="db-card-cap">
                A living profile of what works for you - add it to Apple
                Wallet, show it to any budtender. Tap to take a closer look.
              </p>
            </div>

            <p className="db-pull">
              &ldquo;If THC alone determined the experience,
              <br />
              <em>Everclear would be the world&apos;s favorite alcohol.&rdquo;</em>
            </p>
            <p className="db-body db-body-extra">
              Cannabis works differently for every body. DataBud helps you stop
              chasing hype and start discovering what actually works for{" "}
              <em>you</em> - free, secure, and anonymous by default.
            </p>

            <p className="db-pull db-pull-compact">
              Everyone else sells you a product.
              <br />
              <em>DataBud learns you.</em>
            </p>
            <p className="db-note">
              DataBud is an independent technology platform. Not a cannabis
              licensee. DataBud is never paid to recommend any product, and
              producers cannot pay to influence a recommendation. Informational
              only - not medical advice. 21+.
            </p>
          </div>
        </section>

        <section className="comeback">
          <div className="wrap reveal">
            <div className="cb-badge">
              Launching this summer &middot; The Girlweed Comeback
            </div>
            <h2>Bring it back.</h2>
            <div className="cb-mm">Don&apos;t trash it.</div>
            <p className="cb-body">
              Cannabis hardware has a waste problem - most of it ends up in a
              drawer or a landfill. The <strong>Girlweed Comeback</strong> is
              changing that. Bring your empties to a participating dispensary,
              drop them in the big pink box, and earn rewards and recognition
              for keeping waste out of the environment.
            </p>
            <p className="cb-body cb-body-soon">
              Launching at Washington dispensaries this summer.
              <br />
              Look for the big pink box.
            </p>
          </div>
        </section>

        <section className="lineup">
          <div className="wrap">
            <div className="reveal">
              <h2>
                She&apos;s Real!
                <br />
                She&apos;s On Shelves!
              </h2>
              <div className="lineup-sub">
                Made in Washington. Fresh. Smart. Eco-Friendly.
              </div>
            </div>

            <div className="prod reveal">
              <div className="prod-photo-wrap">
                <img
                  alt="Girlweed gummies - Soft Glow Peach"
                  className="prod-photo prod-photo-tall"
                  src={`${assetPath}gummy-hero.png`}
                />
              </div>
              <div className="prod-cat">
                The Gummies &middot; 10mg &middot; 10 pieces
              </div>
              <div className="prod-name">Infused with Botanicals</div>
              <ul className="flavor-list">
                <li>
                  <strong>It-Girl Energy</strong> &middot; Strawberry{" "}
                  <span>+ Cacao</span>
                </li>
                <li>
                  <strong>Calm Down, Bitch</strong> &middot; Mango{" "}
                  <span>+ Chamomile</span>
                </li>
                <li>
                  <strong>Soft Glow</strong> &middot; Peach{" "}
                  <span>+ Vanilla &amp; Lion&apos;s Mane</span>
                </li>
              </ul>
              <p className="flavor-meta">
                No gluten &middot; No dairy &middot; No artificial flavors or
                dyes
              </p>
            </div>

            <div className="prod reveal">
              <div className="prod-photo-wrap">
                <img
                  alt="Girlweed pre-rolls - Calm Down Bitch Indica"
                  className="prod-photo prod-photo-tall"
                  src={`${assetPath}preroll-hero.png`}
                />
              </div>
              <div className="prod-cat">The Pre-Rolls</div>
              <div className="prod-name">For every moment.</div>
              <ul className="flavor-list">
                <li>
                  <strong>It-Girl Energy</strong> &middot; Sativa
                </li>
                <li>
                  <strong>Soft Glow</strong> &middot; Hybrid
                </li>
                <li>
                  <strong>Calm Down, Bitch</strong> &middot; Indica
                </li>
              </ul>
            </div>

            <div className="prod reveal">
              <div className="prod-photo-wrap">
                <img
                  alt="Girlweed vape - Mint"
                  className="prod-photo prod-photo-tall"
                  src={`${assetPath}vape-hero.png`}
                />
              </div>
              <div className="prod-cat">
                The Vapes &middot; 1g &middot; pesticide-free
              </div>
              <div className="prod-name">Naturally flavored.</div>
              <ul className="flavor-list">
                <li>
                  <strong>Strawberry</strong>
                </li>
                <li>
                  <strong>Peach</strong>
                </li>
                <li>
                  <strong>Mango Ice</strong>
                </li>
                <li>
                  <strong>Mint</strong>
                </li>
              </ul>
            </div>

            <div className="locator-card reveal">
              <div className="prod-cat locator-card-cat">
                Find her in Washington
              </div>
              <p className="body-lg locator-body">
                Ask your budtender for Girlweed.
              </p>
              <p className="flavor-tag locator-tag">
                Dispensary locator coming soon.
              </p>
            </div>
          </div>
        </section>

        <section className="producer">
          <div className="wrap reveal">
            <div className="producer-card">
              <div className="db-eyebrow producer-eyebrow">For producers</div>
              <p className="producer-title">
                Want the DataBud QR
                <br />
                on your product?
              </p>
              <p className="producer-copy">
                DataBud is open to producers and free for consumers - a direct
                way for consumers to share their experiences, repurchase, and
                access social media.
              </p>
              <a className="cta producer-cta" href="https://databud.ai/producers">
                See How It Works &rarr;
              </a>
            </div>
          </div>
        </section>

        <footer>
          <div className="wrap">
            <div className="foot-mark">GIRLWEED</div>
            <div className="foot-by">A New Standard Labs Brand &middot; WA</div>

            <div className="foot-databud">
              <img alt="DataBud" src={`${assetPath}databud-logo.png`} />
              <span>
                Look for the DataBud QR
                <br />
                on every package.
              </span>
            </div>

            <p className="warn">
              Warning: may be habit forming. Unlawful outside Washington State.
              It is illegal to operate a motor vehicle while under the influence
              of cannabis. For use only by adults 21 and older. Keep out of
              reach of children.
            </p>

            <p className="legal">
              The Girlweed Comeback is a recycling and rewards program - not a
              sweepstakes or game of chance. Status and rewards are earned
              through recycling. Program available at participating Washington
              dispensaries while supplies last. Comeback Card managed via
              DataBud, an independent technology platform.
            </p>
          </div>
        </footer>

        {lightboxSrc ? (
          <div className="lightbox open" onClick={() => setLightboxSrc("")}>
            <button
              aria-label="Close DataBud Card detail"
              className="lightbox-x"
              onClick={() => setLightboxSrc("")}
              type="button"
            >
              &times;
            </button>
            <img alt="DataBud Card detail" src={lightboxSrc} />
          </div>
        ) : null}
      </main>

      <style jsx global>{`
        .nwleaf-page {
          --pink: #f5afb9;
          --pink-soft: #fadfe8;
          --cream: #fff0f1;
          --white: #ffffff;
          --navy: #010b4f;
          --ink: #3a1f27;
          --display: "League Spartan", sans-serif;
          --serif: "Abril Fatface", serif;
          --maxw: 520px;
          background: var(--cream);
          color: var(--ink);
          font-family: var(--display);
          margin: 0;
          overflow-x: hidden;
          -webkit-font-smoothing: antialiased;
        }

        .nwleaf-page * {
          box-sizing: border-box;
        }

        .nwleaf-page .wrap {
          max-width: var(--maxw);
          margin: 0 auto;
          padding: 0 24px;
          position: relative;
        }

        .nwleaf-age-gate {
          position: fixed;
          inset: 0;
          z-index: 9999;
          background: var(--pink);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 32px;
        }

        .nwleaf-page .gate-mark {
          color: var(--white);
          font-family: var(--display);
          font-size: clamp(40px, 13vw, 68px);
          font-weight: 900;
          letter-spacing: -0.02em;
          line-height: 0.9;
          margin-bottom: 20px;
        }

        .nwleaf-page .gate-q {
          color: var(--navy);
          font-family: var(--serif);
          font-size: clamp(22px, 6vw, 30px);
          line-height: 1.15;
          margin-bottom: 8px;
        }

        .nwleaf-page .gate-sub {
          color: var(--ink);
          font-size: 14px;
          font-weight: 500;
          letter-spacing: 0.02em;
          line-height: 1.4;
          margin-bottom: 32px;
          max-width: 300px;
          opacity: 0.7;
        }

        .nwleaf-page .gate-btns {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          justify-content: center;
        }

        .nwleaf-page .gate-btn {
          border: none;
          border-radius: 999px;
          cursor: pointer;
          font-family: var(--display);
          font-size: 16px;
          font-weight: 700;
          letter-spacing: 0.04em;
          padding: 16px 38px;
          text-transform: uppercase;
          transition: transform 0.15s ease, box-shadow 0.15s ease;
        }

        .nwleaf-page .gate-btn.yes {
          background: var(--navy);
          box-shadow: 0 6px 20px rgba(1, 11, 79, 0.25);
          color: var(--white);
        }

        .nwleaf-page .gate-btn.yes:hover {
          box-shadow: 0 10px 28px rgba(1, 11, 79, 0.35);
          transform: translateY(-2px);
        }

        .nwleaf-page .gate-btn.no {
          background: transparent;
          color: var(--navy);
          padding: 16px 12px;
          text-decoration: underline;
        }

        .nwleaf-page .gate-deny {
          color: var(--navy);
          font-size: 15px;
          font-weight: 600;
          line-height: 1.4;
          margin-top: 28px;
          max-width: 280px;
        }

        .nwleaf-page .hero {
          padding: 54px 0 38px;
          text-align: center;
        }

        .nwleaf-page .kicker,
        .nwleaf-page .section-eyebrow,
        .nwleaf-page .db-eyebrow,
        .nwleaf-page .prod-cat,
        .nwleaf-page .qr-proof-label,
        .nwleaf-page .db-card-label {
          color: var(--pink);
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.24em;
          text-transform: uppercase;
        }

        .nwleaf-page .kicker {
          letter-spacing: 0.28em;
          margin-bottom: 22px;
        }

        .nwleaf-page .hero h1 {
          color: var(--pink);
          font-family: var(--display);
          font-size: clamp(46px, 15vw, 82px);
          font-weight: 900;
          letter-spacing: -0.03em;
          line-height: 0.86;
          margin: 0;
          text-transform: uppercase;
        }

        .nwleaf-page .hero h1 .nav {
          color: var(--navy);
        }

        .nwleaf-page .hero-tag {
          color: var(--ink);
          font-family: var(--serif);
          font-size: clamp(18px, 5vw, 24px);
          margin-top: 18px;
          opacity: 0.8;
        }

        .nwleaf-page .scroll-cue {
          align-items: center;
          color: var(--pink);
          display: inline-flex;
          flex-direction: column;
          font-size: 11px;
          font-weight: 600;
          gap: 8px;
          letter-spacing: 0.22em;
          margin-top: 34px;
          text-transform: uppercase;
        }

        .nwleaf-page .scroll-cue span {
          animation: nwleaf-bob 1.6s ease-in-out infinite;
          font-size: 20px;
        }

        @keyframes nwleaf-bob {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(6px);
          }
        }

        .nwleaf-page .reveal {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }

        .nwleaf-page .reveal.in {
          opacity: 1;
          transform: none;
        }

        .nwleaf-page .pretty {
          padding: 30px 0 10px;
        }

        .nwleaf-page .pretty-photo {
          border-radius: 20px;
          box-shadow: 0 18px 50px rgba(245, 175, 185, 0.45);
          display: block;
          width: 100%;
        }

        .nwleaf-page .section-eyebrow {
          margin-bottom: 14px;
          margin-top: 30px;
        }

        .nwleaf-page .pretty h2 {
          color: var(--navy);
          font-family: var(--display);
          font-size: clamp(32px, 9vw, 46px);
          font-weight: 800;
          letter-spacing: -0.02em;
          line-height: 0.95;
          margin: 0 0 16px;
          text-transform: uppercase;
        }

        .nwleaf-page .pretty h2 em {
          color: var(--pink);
          font-family: var(--serif);
          font-style: normal;
          text-transform: none;
        }

        .nwleaf-page .body-lg {
          color: var(--ink);
          font-size: 17px;
          font-weight: 500;
          line-height: 1.55;
          margin: 0;
          opacity: 0.85;
        }

        .nwleaf-page .body-lg + .body-lg {
          margin-top: 14px;
        }

        .nwleaf-page .databud {
          background: var(--navy);
          color: var(--white);
          margin: 40px 0 0;
          overflow: hidden;
          padding: 60px 0;
          position: relative;
        }

        .nwleaf-page .databud::before {
          background: radial-gradient(
            circle at 80% 0%,
            rgba(245, 175, 185, 0.22),
            transparent 55%
          );
          content: "";
          inset: 0;
          pointer-events: none;
          position: absolute;
        }

        .nwleaf-page .db-eyebrow {
          letter-spacing: 0.26em;
          margin-bottom: 18px;
          text-align: center;
        }

        .nwleaf-page .databud h2 {
          color: var(--white);
          font-family: var(--display);
          font-size: clamp(40px, 12vw, 64px);
          font-weight: 900;
          letter-spacing: -0.03em;
          line-height: 0.88;
          margin: 0 0 22px;
          text-align: center;
          text-transform: uppercase;
        }

        .nwleaf-page .databud h2 em {
          color: var(--pink);
          display: block;
          font-family: var(--serif);
          font-size: 0.62em;
          font-style: normal;
          margin-top: 10px;
          text-transform: none;
        }

        .nwleaf-page .db-body {
          color: rgba(255, 255, 255, 0.86);
          font-size: 17px;
          font-weight: 500;
          line-height: 1.6;
          margin: 0 auto;
          max-width: 420px;
          text-align: center;
        }

        .nwleaf-page .db-body + .db-body {
          margin-top: 16px;
        }

        .nwleaf-page .db-body strong {
          color: var(--pink);
          font-weight: 700;
        }

        .nwleaf-page .db-body-extra {
          margin-top: 30px;
        }

        .nwleaf-page .db-steps {
          display: flex;
          flex-direction: column;
          gap: 2px;
          margin: 36px auto 0;
          max-width: 380px;
        }

        .nwleaf-page .db-step {
          align-items: flex-start;
          border-bottom: 1px solid rgba(255, 255, 255, 0.12);
          display: flex;
          gap: 16px;
          padding: 18px 0;
        }

        .nwleaf-page .db-step:last-child {
          border-bottom: none;
        }

        .nwleaf-page .db-step-n {
          color: var(--pink);
          flex-shrink: 0;
          font-family: var(--display);
          font-size: 30px;
          font-weight: 900;
          line-height: 1;
          width: 38px;
        }

        .nwleaf-page .db-step-t {
          color: var(--white);
          font-size: 16px;
          font-weight: 600;
          line-height: 1.4;
        }

        .nwleaf-page .db-step-t span {
          color: rgba(255, 255, 255, 0.6);
          display: block;
          font-size: 14px;
          font-weight: 500;
          margin-top: 3px;
        }

        .nwleaf-page .qr-proof {
          margin: 38px 0 8px;
        }

        .nwleaf-page .qr-proof-label {
          letter-spacing: 0.2em;
          margin-bottom: 18px;
          text-align: center;
        }

        .nwleaf-page .qr-row {
          align-items: start;
          display: grid;
          gap: 8px;
          grid-template-columns: 1fr 1fr 1fr;
        }

        .nwleaf-page .qr-card {
          align-items: center;
          background: rgba(255, 255, 255, 0.06);
          border-radius: 10px;
          display: flex;
          justify-content: center;
          padding: 8px;
          position: relative;
        }

        .nwleaf-page .qr-card img {
          border-radius: 6px;
          display: block;
          height: auto;
          width: 100%;
        }

        .nwleaf-page .qr-pin {
          background: var(--pink);
          border-radius: 3px;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.25);
          color: var(--navy);
          font-family: var(--display);
          font-size: 8px;
          font-weight: 700;
          letter-spacing: 0.05em;
          line-height: 1;
          padding: 3px 6px;
          position: absolute;
          text-transform: uppercase;
          white-space: nowrap;
          z-index: 2;
        }

        .nwleaf-page .qr-pin::before {
          background: var(--pink);
          content: "";
          position: absolute;
        }

        .nwleaf-page .qr-card.gummy .qr-pin {
          left: -4px;
          top: 73%;
        }

        .nwleaf-page .qr-card.gummy .qr-pin::before,
        .nwleaf-page .qr-card.vape .qr-pin::before {
          height: 1px;
          left: 100%;
          top: 50%;
          width: 10px;
        }

        .nwleaf-page .qr-card.preroll .qr-pin {
          right: -4px;
          top: 68%;
        }

        .nwleaf-page .qr-card.preroll .qr-pin::before {
          height: 1px;
          right: 100%;
          top: 50%;
          width: 10px;
        }

        .nwleaf-page .qr-card.vape .qr-pin {
          left: -4px;
          top: 43%;
        }

        .nwleaf-page .qr-proof-caption,
        .nwleaf-page .db-card-cap,
        .nwleaf-page .db-note {
          color: rgba(255, 255, 255, 0.6);
          font-size: 12.5px;
          font-weight: 500;
          line-height: 1.5;
          margin: 14px 0 0;
          text-align: center;
        }

        .nwleaf-page .db-card-wrap {
          margin: 40px 0 8px;
          text-align: center;
        }

        .nwleaf-page .db-card-label {
          letter-spacing: 0.2em;
          margin-bottom: 16px;
        }

        .nwleaf-page .db-card-button {
          background: transparent;
          border: 0;
          cursor: zoom-in;
          display: block;
          padding: 0;
          width: 100%;
        }

        .nwleaf-page .db-card-img {
          border-radius: 14px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.45);
          display: block;
          transition: transform 0.2s ease;
          width: 100%;
        }

        .nwleaf-page .db-card-button:hover .db-card-img {
          transform: scale(1.01);
        }

        .nwleaf-page .db-card-cap {
          color: rgba(255, 255, 255, 0.6);
          font-size: 13px;
        }

        .nwleaf-page .db-pull {
          color: var(--white);
          font-family: var(--serif);
          font-size: clamp(22px, 6vw, 30px);
          line-height: 1.25;
          margin: 42px auto 0;
          max-width: 420px;
          text-align: center;
        }

        .nwleaf-page .db-pull em {
          color: var(--pink);
          font-style: normal;
        }

        .nwleaf-page .db-pull-compact {
          font-size: clamp(20px, 5.5vw, 26px);
          margin-top: 36px;
        }

        .nwleaf-page .db-note {
          color: rgba(255, 255, 255, 0.55);
          margin-top: 28px;
        }

        .nwleaf-page .comeback {
          background: var(--pink-soft);
          padding: 60px 0;
          text-align: center;
        }

        .nwleaf-page .cb-badge {
          background: var(--navy);
          border-radius: 999px;
          color: var(--white);
          display: inline-block;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.2em;
          margin-bottom: 22px;
          padding: 8px 18px;
          text-transform: uppercase;
        }

        .nwleaf-page .comeback h2 {
          color: var(--pink);
          font-family: var(--display);
          font-size: clamp(40px, 12vw, 60px);
          font-weight: 900;
          letter-spacing: -0.03em;
          line-height: 0.88;
          margin: 0;
          text-transform: uppercase;
        }

        .nwleaf-page .cb-mm {
          color: var(--navy);
          font-family: var(--serif);
          font-size: clamp(26px, 8vw, 40px);
          line-height: 1;
          margin: 6px 0 20px;
        }

        .nwleaf-page .cb-body {
          color: var(--ink);
          font-size: 17px;
          font-weight: 500;
          line-height: 1.55;
          margin: 0 auto 30px;
          max-width: 400px;
          opacity: 0.85;
        }

        .nwleaf-page .cb-body-soon {
          font-family: var(--serif);
          font-size: 18px;
          opacity: 0.8;
        }

        .nwleaf-page .lineup {
          background: var(--white);
          padding: 54px 0 40px;
        }

        .nwleaf-page .lineup h2 {
          color: var(--pink);
          font-family: var(--display);
          font-size: clamp(38px, 11vw, 58px);
          font-weight: 900;
          letter-spacing: -0.025em;
          line-height: 0.9;
          margin: 0 0 8px;
          text-align: center;
          text-transform: uppercase;
        }

        .nwleaf-page .lineup-sub {
          color: var(--ink);
          font-family: var(--serif);
          font-size: 18px;
          margin-bottom: 38px;
          opacity: 0.75;
          text-align: center;
        }

        .nwleaf-page .prod {
          margin-bottom: 46px;
        }

        .nwleaf-page .prod-photo-wrap {
          align-items: center;
          background: var(--pink-soft);
          border-radius: 22px;
          box-shadow: 0 14px 40px rgba(245, 175, 185, 0.35);
          display: flex;
          justify-content: center;
          padding: 26px;
        }

        .nwleaf-page .prod-photo {
          border-radius: 10px;
          display: block;
          max-height: 340px;
          max-width: 100%;
        }

        .nwleaf-page .prod-photo-tall {
          max-height: 440px;
        }

        .nwleaf-page .prod-cat {
          letter-spacing: 0.22em;
          margin: 22px 0 6px;
          text-align: center;
        }

        .nwleaf-page .prod-name {
          color: var(--navy);
          font-family: var(--display);
          font-size: clamp(28px, 8vw, 38px);
          font-weight: 800;
          letter-spacing: -0.02em;
          line-height: 0.95;
          text-align: center;
          text-transform: uppercase;
        }

        .nwleaf-page .flavor-list {
          border-top: 1px solid rgba(1, 11, 79, 0.12);
          list-style: none;
          margin: 22px auto 0;
          max-width: 360px;
          padding: 0;
        }

        .nwleaf-page .flavor-list li {
          border-bottom: 1px solid rgba(1, 11, 79, 0.12);
          color: var(--ink);
          font-size: 15px;
          line-height: 1.4;
          padding: 14px 0;
          text-align: center;
        }

        .nwleaf-page .flavor-list strong {
          color: var(--navy);
          font-family: var(--display);
          font-size: 15px;
          font-weight: 800;
          letter-spacing: -0.01em;
          text-transform: uppercase;
        }

        .nwleaf-page .flavor-list span {
          color: var(--ink);
          display: inline-block;
          font-family: var(--serif);
          font-size: 13px;
          margin-left: 6px;
          opacity: 0.6;
        }

        .nwleaf-page .flavor-meta {
          color: var(--pink);
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.12em;
          margin-top: 18px;
          text-align: center;
          text-transform: uppercase;
        }

        .nwleaf-page .flavor-tag {
          color: var(--ink);
          display: block;
          font-family: var(--serif);
          font-size: 12px;
          line-height: 1.2;
          margin-top: 8px;
          opacity: 0.7;
        }

        .nwleaf-page .locator-card {
          background: var(--pink-soft);
          border-radius: 20px;
          margin-top: 14px;
          padding: 32px 24px;
          text-align: center;
        }

        .nwleaf-page .locator-card-cat {
          margin-top: 0;
        }

        .nwleaf-page .locator-body {
          margin-bottom: 6px;
          opacity: 0.8;
        }

        .nwleaf-page .locator-tag {
          margin: 0;
        }

        .nwleaf-page .producer {
          padding: 20px 0 10px;
        }

        .nwleaf-page .producer-card {
          background: var(--navy);
          border-radius: 22px;
          padding: 38px 28px;
          text-align: center;
        }

        .nwleaf-page .producer-eyebrow {
          margin-bottom: 12px;
        }

        .nwleaf-page .producer-title {
          color: var(--white);
          font-family: var(--display);
          font-size: clamp(22px, 6vw, 30px);
          font-weight: 800;
          letter-spacing: -0.02em;
          line-height: 1.05;
          margin: 0 0 16px;
        }

        .nwleaf-page .producer-copy {
          color: rgba(255, 255, 255, 0.78);
          font-size: 15px;
          font-weight: 500;
          line-height: 1.5;
          margin: 0 auto 24px;
          max-width: 360px;
        }

        .nwleaf-page .cta {
          background: var(--navy);
          border-radius: 999px;
          box-shadow: 0 8px 26px rgba(1, 11, 79, 0.28);
          color: var(--white);
          display: inline-block;
          font-family: var(--display);
          font-size: 17px;
          font-weight: 800;
          letter-spacing: 0.04em;
          padding: 18px 44px;
          text-decoration: none;
          text-transform: uppercase;
          transition: transform 0.15s ease, box-shadow 0.15s ease;
        }

        .nwleaf-page .cta:hover {
          box-shadow: 0 12px 34px rgba(1, 11, 79, 0.38);
          transform: translateY(-2px);
        }

        .nwleaf-page .producer-cta {
          background: var(--pink);
          color: var(--navy);
        }

        .nwleaf-page footer {
          background: var(--pink);
          margin-top: 40px;
          padding: 44px 0 28px;
          text-align: center;
        }

        .nwleaf-page .foot-mark {
          color: var(--white);
          font-family: var(--display);
          font-size: 34px;
          font-weight: 900;
          letter-spacing: -0.02em;
          margin-bottom: 6px;
        }

        .nwleaf-page .foot-by {
          color: var(--navy);
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.16em;
          margin-bottom: 22px;
          text-transform: uppercase;
        }

        .nwleaf-page .foot-databud {
          align-items: center;
          background: #000000;
          border-radius: 14px;
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
          display: inline-flex;
          gap: 14px;
          margin-bottom: 22px;
          padding: 14px 22px;
        }

        .nwleaf-page .foot-databud img {
          display: block;
          height: 32px;
          width: auto;
        }

        .nwleaf-page .foot-databud span {
          color: rgba(255, 255, 255, 0.85);
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.04em;
          line-height: 1.3;
          text-align: left;
        }

        .nwleaf-page .warn {
          color: var(--navy);
          font-size: 10.5px;
          font-weight: 600;
          letter-spacing: 0.02em;
          line-height: 1.55;
          margin: 16px auto 0;
          max-width: 460px;
          text-transform: uppercase;
        }

        .nwleaf-page .legal {
          color: var(--ink);
          font-size: 10.5px;
          line-height: 1.6;
          margin: 16px auto 0;
          max-width: 460px;
          opacity: 0.62;
        }

        .nwleaf-page .lightbox {
          align-items: center;
          background: rgba(0, 0, 0, 0.92);
          cursor: zoom-out;
          display: none;
          inset: 0;
          justify-content: center;
          padding: 16px;
          position: fixed;
          z-index: 9998;
        }

        .nwleaf-page .lightbox.open {
          display: flex;
        }

        .nwleaf-page .lightbox img {
          border-radius: 10px;
          max-height: 92vh;
          max-width: 100%;
        }

        .nwleaf-page .lightbox-x {
          background: transparent;
          border: 0;
          color: #ffffff;
          cursor: pointer;
          font-size: 30px;
          font-weight: 300;
          line-height: 1;
          padding: 0;
          position: fixed;
          right: 22px;
          top: 18px;
        }
      `}</style>
    </>
  )
}
