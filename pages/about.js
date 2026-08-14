import React from "react"

import Head from "next/head"
import { motion } from "framer-motion"
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined"
import FilterHdrOutlinedIcon from "@mui/icons-material/FilterHdrOutlined"
import LaunchOutlinedIcon from "@mui/icons-material/LaunchOutlined"
import SpaOutlinedIcon from "@mui/icons-material/SpaOutlined"

const accentGreen = "#49bc88"
const easeOut = [0.22, 1, 0.36, 1]

const storyCards = [
  {
    eyebrow: "Our Story",
    title: "A Vision Realized.",
    copy: [
      <>
        New Standard began as a passion project by owner{" "}
        <span>Noah Dotson</span>. With deep roots in the industry, Noah saw an
        opportunity to create something different, something better.
      </>,
      <>
        His dedication and experience brought a fresh perspective to cannabis,
        one that prioritizes quality, transparency, and trust.
      </>,
    ],
    icon: FilterHdrOutlinedIcon,
  },
  {
    eyebrow: "Built for the Future",
    title: "Always Raising the Standard.",
    copy: [
      <>
        By listening to consumers and staying true to his vision, Noah built
        New Standard into a brand that's trusted, respected, and beloved.
      </>,
      <>
        We are committed to quality, excellence, innovation, and meticulous
        attention to detail because you deserve nothing less.
      </>,
      <span className="green-copy" key="green-copy">
        We push boundaries. We lead the way.
        <br />
        This is New Standard.
      </span>,
    ],
    icon: SpaOutlinedIcon,
  },
]

const founderPressQuotes = [
  {
    quote: "Honestly, I credit that to my success.",
    attribution: "Noah Dotson, Marijuana Venture 40 Under 40",
    href: "https://marijuanaventure.com/noah-dotson/",
  },
  {
    quote: "not everyone can actually execute.",
    attribution: "Chris Lin, Verdelux co-founder",
    href: "https://www.marijuanaventure.com/joint-venture-lush-vapes/",
  },
  {
    quote: "his greatest skill is his creativity in being an entrepreneur.",
    attribution: "Chris Lin, Verdelux co-founder",
    href: "https://www.marijuanaventure.com/joint-venture-lush-vapes/",
  },
]

const introVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.24,
    },
  },
}

const headlineMainVariants = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.7,
      ease: easeOut,
    },
  },
}

const headlineAccentVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      delay: 0.36,
      duration: 1.44,
      ease: easeOut,
    },
  },
}

const fadeUpVariants = {
  hidden: {
    opacity: 0,
    y: 18,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.3,
      ease: easeOut,
    },
  },
}

const lineVariants = {
  hidden: {
    opacity: 0,
    scaleX: 0,
  },
  visible: {
    opacity: 1,
    scaleX: 1,
    transition: {
      duration: 1.16,
      ease: easeOut,
    },
  },
}

const cardsContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.36,
    },
  },
}

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 34,
    scale: 0.98,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 1.36,
      ease: easeOut,
      staggerChildren: 0.16,
      delayChildren: 0.16,
    },
  },
}

const cardElementVariants = {
  hidden: {
    opacity: 0,
    y: 10,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      ease: easeOut,
    },
  },
}

const founderVariants = {
  hidden: {
    opacity: 0,
    x: 28,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 1.36,
      ease: easeOut,
      staggerChildren: 0.18,
      delayChildren: 0.24,
    },
  },
}

const signatureVariants = {
  hidden: {
    clipPath: "inset(0 100% 0 0)",
    opacity: 0,
  },
  visible: {
    clipPath: "inset(0 0% 0 0)",
    opacity: 1,
    transition: {
      delay: 1.05,
      duration: 2.35,
      ease: "linear",
    },
  },
}

export default function About() {
  return (
    <>
      <Head>
        <title>About New Standard</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="Learn about New Standard, a cannabis brand built on experience, integrity, quality, and innovation."
        />
      </Head>

      <main className="about-page">
        <section className="about-hero">
          <motion.div
            className="about-intro"
            initial="hidden"
            variants={introVariants}
            viewport={{ once: true, amount: 0.45 }}
            whileInView="visible"
          >
            <h1>
              <motion.span
                className="headline-main"
                variants={headlineMainVariants}
              >
                Rooted in
              </motion.span>
              <motion.span
                className="headline-accent"
                variants={headlineAccentVariants}
              >
                Passion.
              </motion.span>
            </h1>
            <motion.div className="about-line" variants={lineVariants} />
            <motion.p className="about-copy" variants={fadeUpVariants}>
              New Standard is a passion project years in the making,
              <br />
              built on experience, guided by integrity, and inspired
              <br />
              by the people we serve.
            </motion.p>
          </motion.div>

          <div className="about-lower">
            <motion.div
              className="story-cards"
              initial="hidden"
              variants={cardsContainerVariants}
              viewport={{ once: true, amount: 0.2 }}
              whileInView="visible"
            >
              {storyCards.map((card) => {
                const Icon = card.icon

                return (
                  <motion.article
                    className="story-card"
                    key={card.title}
                    variants={cardVariants}
                  >
                    <motion.div
                      className="story-icon"
                      variants={cardElementVariants}
                    >
                      <Icon />
                    </motion.div>
                    <div className="story-card-body">
                      <motion.p
                        className="card-eyebrow"
                        variants={cardElementVariants}
                      >
                        {card.eyebrow}
                      </motion.p>
                      <motion.h2 variants={cardElementVariants}>
                        {card.title}
                      </motion.h2>
                      <motion.div
                        className="card-line"
                        variants={lineVariants}
                      />
                      {card.copy.map((copy, index) => (
                        <motion.p key={index} variants={cardElementVariants}>
                          {copy}
                        </motion.p>
                      ))}
                    </div>
                  </motion.article>
                )
              })}
            </motion.div>

            <motion.aside
              className="founder"
              initial="hidden"
              variants={founderVariants}
              viewport={{ once: true, amount: 0.32 }}
              whileInView="visible"
            >
              <motion.p className="founder-eyebrow" variants={fadeUpVariants}>
                Founder
              </motion.p>
              <motion.h2 variants={fadeUpVariants}>Noah Dotson</motion.h2>
              <motion.div
                className="founder-rule"
                variants={lineVariants}
              />
              <motion.div
                aria-label="Noah Dotson signature"
                className="signature"
                variants={signatureVariants}
              >
                N Dotson
              </motion.div>
            </motion.aside>
          </div>
        </section>

        <section className="founder-story-section">
          <motion.div
            className="founder-story-inner"
            initial="hidden"
            variants={cardsContainerVariants}
            viewport={{ once: true, amount: 0.22 }}
            whileInView="visible"
          >
            <motion.div className="founder-story-copy" variants={cardVariants}>
              <p className="section-eyebrow">
                <ArticleOutlinedIcon className="section-eyebrow-icon" />
                <span>Founder Story</span>
              </p>
              <h2>
                Built Small.
                <span>Moving Fast.</span>
              </h2>
              <motion.div
                className="founder-story-line"
                variants={lineVariants}
              />
              <p>
                Marijuana Venture's coverage frames Noah Dotson as a builder
                who learned Washington cannabis from the ground level: grow
                operations, retail counters, supply chain realities, product
                formulation, and finally ownership of New Standard Labs.
              </p>
              <p>
                That path still shapes the company. New Standard keeps overhead
                low, stays close to production, and grows through focused
                collaborations like Lush Vapes with Verdelux, Slo Gro, and
                GIRLWEED x Databud.
              </p>
              <a
                className="founder-story-link"
                href="/press"
              >
                <span>View Press</span>
                <LaunchOutlinedIcon />
              </a>
            </motion.div>

            <motion.div
              className="founder-quote-grid"
              variants={cardsContainerVariants}
            >
              {founderPressQuotes.map((item) => (
                <motion.article
                  className="founder-quote-card"
                  key={item.quote}
                  variants={cardVariants}
                >
                  <blockquote>"{item.quote}"</blockquote>
                  <p>{item.attribution}</p>
                  <a href={item.href} rel="noreferrer" target="_blank">
                    <span>Source</span>
                    <LaunchOutlinedIcon />
                  </a>
                </motion.article>
              ))}
            </motion.div>
          </motion.div>
        </section>
      </main>

      <style jsx global>{`
        .about-page {
          background: #010b08;
          color: #ffffff;
          font-family: "Montserrat", sans-serif;
          min-height: 100vh;
        }

        .section-eyebrow {
          align-items: center;
          color: ${accentGreen};
          display: inline-flex;
          font-size: clamp(13px, 0.95vw, 18px);
          font-weight: 700;
          gap: 12px;
          letter-spacing: 0.16em;
          line-height: 1.2;
          margin: 0;
          text-transform: uppercase;
        }

        .section-eyebrow-icon {
          font-size: clamp(28px, 2vw, 40px);
        }

        .about-hero {
          background-image: radial-gradient(
              circle at 59% 13%,
              rgba(73, 188, 136, 0.13),
              transparent 28%
            ),
            linear-gradient(
              90deg,
              rgba(1, 11, 8, 0.93) 0%,
              rgba(1, 11, 8, 0.6) 42%,
              rgba(1, 11, 8, 0.28) 68%,
              rgba(1, 11, 8, 0.7) 100%
            ),
            linear-gradient(
              180deg,
              rgba(1, 11, 8, 0.16) 0%,
              rgba(1, 11, 8, 0.26) 51%,
              rgba(1, 11, 8, 0.88) 100%
            ),
            url("/aboutBackground.png");
          background-position: center center;
          background-repeat: no-repeat;
          background-size: cover;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          min-height: 100vh;
          overflow: hidden;
          padding: clamp(160px, 16.5vh, 205px) clamp(24px, 5.7vw, 120px)
            clamp(34px, 6vh, 78px);
          position: relative;
        }

        .about-hero::after {
          background: linear-gradient(
            180deg,
            transparent 0%,
            rgba(1, 11, 8, 0.18) 46%,
            rgba(1, 11, 8, 0.92) 100%
          );
          bottom: 0;
          content: "";
          left: 0;
          pointer-events: none;
          position: absolute;
          right: 0;
          top: 0;
        }

        .about-intro,
        .about-lower {
          position: relative;
          z-index: 1;
        }

        .about-intro {
          max-width: 920px;
        }

        .about-page h1 {
          align-items: baseline;
          color: #f8f8f3;
          display: flex;
          flex-wrap: wrap;
          font-family: "Cormorant Garamond", Georgia, serif;
          font-size: clamp(58px, 6vw, 104px);
          font-weight: 600;
          gap: 0.24em;
          letter-spacing: -0.025em;
          line-height: 0.92;
          margin: 0;
          text-shadow: 0 2px 16px rgba(0, 0, 0, 0.52);
        }

        .about-page h1 .headline-main {
          color: #f8f8f3;
          display: inline-block;
        }

        .about-page h1 .headline-accent {
          color: ${accentGreen};
          display: inline-block;
        }

        .about-line,
        .card-line,
        .founder-rule {
          background: ${accentGreen};
          transform-origin: left center;
        }

        .about-line {
          height: 3px;
          margin: 32px 0 28px;
          width: 62px;
        }

        .about-copy {
          color: rgba(255, 255, 255, 0.91);
          font-size: clamp(19px, 1.45vw, 26px);
          line-height: 1.48;
          margin: 0;
          max-width: 790px;
          text-shadow: 0 1px 10px rgba(0, 0, 0, 0.6);
        }

        .about-lower {
          align-items: start;
          display: grid;
          gap: clamp(42px, 4.4vw, 86px);
          grid-template-columns: minmax(0, 1fr) minmax(260px, 390px);
          margin-top: clamp(30px, 3vh, 44px);
        }

        .story-cards {
          display: grid;
          gap: 34px;
          grid-template-columns: repeat(2, minmax(0, 1fr));
        }

        .story-card {
          align-items: flex-start;
          background: rgba(4, 15, 13, 0.64);
          border: 1px solid rgba(255, 255, 255, 0.24);
          border-radius: 22px;
          box-shadow: 0 22px 50px rgba(0, 0, 0, 0.28);
          display: grid;
          gap: 26px;
          grid-template-columns: 96px 1fr;
          min-height: 500px;
          overflow: hidden;
          padding: clamp(34px, 2.9vw, 44px) clamp(28px, 3.1vw, 50px);
          position: relative;
        }

        .story-card::before {
          background: rgba(255, 255, 255, 0.045);
          backdrop-filter: blur(14px);
          content: "";
          inset: 0;
          position: absolute;
        }

        .story-card > * {
          position: relative;
          z-index: 1;
        }

        .story-icon {
          align-items: center;
          border: 1px solid ${accentGreen};
          border-radius: 50%;
          color: ${accentGreen};
          display: flex;
          height: 96px;
          justify-content: center;
          width: 96px;
        }

        .story-icon :global(svg) {
          font-size: 52px;
        }

        .story-card-body {
          padding-top: 8px;
        }

        .card-eyebrow,
        .founder-eyebrow {
          color: ${accentGreen};
          font-size: clamp(13px, 0.95vw, 18px);
          font-weight: 600;
          letter-spacing: 0.16em;
          line-height: 1.2;
          margin: 0 0 18px;
          text-transform: uppercase;
        }

        .story-card h2,
        .founder h2 {
          color: #ffffff;
          font-family: "Cormorant Garamond", Georgia, serif;
          font-weight: 600;
          letter-spacing: -0.01em;
          margin: 0;
          text-shadow: 0 1px 10px rgba(0, 0, 0, 0.4);
        }

        .story-card h2 {
          font-size: clamp(29px, 1.9vw, 38px);
          line-height: 1.05;
        }

        .card-line {
          height: 2px;
          margin: 20px 0 20px;
          width: 100px;
        }

        .story-card p {
          color: rgba(255, 255, 255, 0.9);
          font-size: clamp(16px, 1.02vw, 20px);
          line-height: 1.38;
          margin: 0 0 18px;
        }

        .story-card .card-eyebrow {
          color: ${accentGreen};
          font-size: clamp(13px, 0.95vw, 18px);
          line-height: 1.2;
          margin: 0 0 18px;
        }

        .story-card p:last-child {
          margin-bottom: 0;
        }

        .story-card span,
        .green-copy {
          color: ${accentGreen};
        }

        .founder {
          align-self: start;
          margin-top: clamp(100px, 12vh, 155px);
          padding-left: clamp(0px, 1.3vw, 26px);
        }

        .founder h2 {
          font-size: clamp(40px, 3vw, 58px);
          line-height: 0.98;
        }

        .founder-rule {
          height: 2px;
          margin: 22px 0 28px;
          width: 92px;
        }

        .signature {
          color: ${accentGreen};
          display: inline-block;
          font-family: "Segoe Script", "Brush Script MT", cursive;
          font-size: clamp(44px, 3.2vw, 62px);
          font-weight: 400;
          letter-spacing: 0;
          line-height: 1.08;
          min-height: 88px;
          overflow: hidden;
          text-shadow: 0 0 20px rgba(73, 188, 136, 0.24);
          transform-origin: left center;
          white-space: nowrap;
        }

        .founder-story-section {
          background: radial-gradient(
              circle at 20% 18%,
              rgba(73, 188, 136, 0.12),
              transparent 30%
            ),
            linear-gradient(180deg, #010b08 0%, #020d0a 46%, #010504 100%);
          padding: clamp(78px, 8vw, 132px) clamp(24px, 5.7vw, 120px);
        }

        .founder-story-inner {
          display: grid;
          gap: clamp(34px, 4vw, 70px);
          grid-template-columns: minmax(0, 0.86fr) minmax(0, 1fr);
          margin: 0 auto;
          max-width: 1500px;
        }

        .founder-story-copy,
        .founder-quote-card {
          background: rgba(4, 15, 13, 0.64);
          border: 1px solid rgba(255, 255, 255, 0.22);
          border-radius: 22px;
          box-shadow: 0 22px 56px rgba(0, 0, 0, 0.3);
          overflow: hidden;
          position: relative;
        }

        .founder-story-copy {
          padding: clamp(32px, 3.4vw, 56px);
        }

        .founder-story-copy::before,
        .founder-quote-card::before {
          background: radial-gradient(
              circle at 18% 4%,
              rgba(73, 188, 136, 0.16),
              transparent 42%
            ),
            rgba(255, 255, 255, 0.04);
          content: "";
          inset: 0;
          pointer-events: none;
          position: absolute;
        }

        .founder-story-copy > *,
        .founder-quote-card > * {
          position: relative;
          z-index: 1;
        }

        .founder-story-copy h2 {
          color: #ffffff;
          font-family: "Cormorant Garamond", Georgia, serif;
          font-size: clamp(46px, 4.9vw, 82px);
          font-weight: 600;
          letter-spacing: 0;
          line-height: 0.96;
          margin: 18px 0 0;
        }

        .founder-story-copy h2 span {
          color: ${accentGreen};
          display: block;
        }

        .founder-story-line {
          background: ${accentGreen};
          height: 3px;
          margin: 28px 0;
          transform-origin: left center;
          width: 62px;
        }

        .founder-story-copy p:not(.section-eyebrow) {
          color: rgba(255, 255, 255, 0.82);
          font-size: clamp(16px, 1.08vw, 20px);
          line-height: 1.62;
          margin: 0 0 22px;
        }

        .founder-story-link,
        .founder-quote-card a {
          align-items: center;
          border: 1px solid rgba(73, 188, 136, 0.58);
          border-radius: 8px;
          color: ${accentGreen};
          display: inline-flex;
          font-size: 14px;
          font-weight: 700;
          gap: 10px;
          justify-content: center;
          min-height: 46px;
          padding: 12px 18px;
          text-decoration: none;
          text-transform: uppercase;
          transition: background 180ms ease, color 180ms ease,
            box-shadow 180ms ease, transform 180ms ease;
        }

        .founder-story-link:hover,
        .founder-quote-card a:hover {
          background: rgba(73, 188, 136, 0.14);
          box-shadow: 0 0 22px rgba(73, 188, 136, 0.16);
          color: #ffffff;
          transform: translateY(-1px);
        }

        .founder-quote-grid {
          display: grid;
          gap: 22px;
          grid-template-columns: repeat(3, minmax(0, 1fr));
        }

        .founder-quote-card {
          display: flex;
          flex-direction: column;
          min-height: 315px;
          padding: clamp(26px, 2.4vw, 36px);
        }

        .founder-quote-card blockquote {
          color: #ffffff;
          font-family: "Cormorant Garamond", Georgia, serif;
          font-size: clamp(26px, 2.15vw, 38px);
          line-height: 1.1;
          margin: 0;
        }

        .founder-quote-card p {
          color: rgba(255, 255, 255, 0.62);
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.12em;
          line-height: 1.45;
          margin: 24px 0 18px;
          text-transform: uppercase;
        }

        .founder-quote-card a {
          align-self: flex-start;
          margin-top: auto;
        }

        @media (max-width: 1360px) {
          .about-lower {
            grid-template-columns: 1fr;
          }

          .founder {
            margin-top: 0;
            padding-left: 0;
          }

          .founder-story-inner {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 1180px) {
          .about-hero {
            background-position: 68% center;
            min-height: auto;
            overflow: visible;
          }

          .story-cards {
            grid-template-columns: 1fr;
          }

          .story-card {
            min-height: auto;
          }

          .founder-quote-grid {
            gap: 16px;
          }

          .founder-quote-card {
            min-height: 280px;
            padding: 24px 18px;
          }

          .founder-quote-card blockquote {
            font-size: clamp(21px, 2.2vw, 30px);
          }
        }

        @media (max-width: 720px) {
          .about-hero {
            background-position: 78% center;
            padding-top: 210px;
          }

          .about-page h1 {
            display: block;
          }

          .about-page h1 .headline-main,
          .about-page h1 .headline-accent {
            display: block;
          }

          .about-copy br {
            display: none;
          }

          .story-card {
            grid-template-columns: 1fr;
            padding: 30px 24px;
          }

          .story-icon {
            height: 78px;
            width: 78px;
          }

          .story-icon :global(svg) {
            font-size: 44px;
          }

          .founder-story-section {
            padding-left: 18px;
            padding-right: 18px;
          }
        }

        @media (max-width: 680px) {
          .founder-quote-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 520px) {
          .about-hero {
            background-position: right center;
          }

          .signature {
            font-size: 42px;
            min-height: 58px;
          }

          .founder-story-section {
            padding-left: 14px;
            padding-right: 14px;
          }

          .founder-story-copy,
          .founder-quote-card {
            border-radius: 16px;
            padding: 24px 18px;
          }
        }
      `}</style>
    </>
  )
}
