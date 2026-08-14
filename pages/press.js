import React from "react"

import Head from "next/head"
import { motion } from "framer-motion"
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined"
import AutoAwesomeOutlinedIcon from "@mui/icons-material/AutoAwesomeOutlined"
import LaunchOutlinedIcon from "@mui/icons-material/LaunchOutlined"
import OpacityOutlinedIcon from "@mui/icons-material/OpacityOutlined"
import RecyclingOutlinedIcon from "@mui/icons-material/RecyclingOutlined"
import SpaOutlinedIcon from "@mui/icons-material/SpaOutlined"

const pressReleaseUrl = "/press/New_Standard_Press_Release.pdf"

const easeOut = [0.22, 1, 0.36, 1]

const introVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.18,
    },
  },
}

const fadeUpVariants = {
  hidden: {
    opacity: 0,
    y: 22,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.1,
      ease: easeOut,
    },
  },
}

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 28,
    scale: 0.98,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 1,
      ease: easeOut,
    },
  },
}

const cardsContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.16,
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
      duration: 0.92,
      ease: easeOut,
    },
  },
}

const pressLinks = [
  {
    title: "40 Under 40: Noah Dotson",
    source: "Marijuana Venture",
    date: "July 28, 2025",
    copy:
      "A profile of Noah Dotson's lean, hands-on approach to building New Standard Labs in Washington.",
    href: "https://marijuanaventure.com/noah-dotson/",
    icon: ArticleOutlinedIcon,
  },
  {
    title: "Joint Venture: Lush Vapes",
    source: "Marijuana Venture",
    date: "December 9, 2025",
    copy:
      "Coverage of the Verdelux and New Standard Labs collaboration bringing Lush-inspired vapes to Washington.",
    href: "https://www.marijuanaventure.com/joint-venture-lush-vapes/",
    icon: OpacityOutlinedIcon,
  },
]

const brandCards = [
  {
    title: "New Standard",
    label: "Flagship",
    copy:
      "Top-shelf rosin and live resin products made with a quality-first mindset and a practical price point.",
    icon: SpaOutlinedIcon,
  },
  {
    title: "Slo Gro",
    label: "Budget Resin",
    copy:
      "Cured resin dabs and 5g pre-roll packs with a portion of profits supporting sloth conservation.",
    icon: AutoAwesomeOutlinedIcon,
  },
  {
    title: "Lush",
    label: "Verdelux Collab",
    copy:
      "Flavor-forward disposables built to echo Verdelux's Lush soft chew jelly gummies.",
    icon: OpacityOutlinedIcon,
  },
  {
    title: "GIRLWEED",
    label: "Databud Launch",
    copy:
      "A female-focused brand created with Grace Wethor, pairing bold style with batch-level experience tracking.",
    icon: SpaOutlinedIcon,
  },
  {
    title: "New Standard Recycling",
    label: "Coming Soon",
    copy:
      "A statewide recycling effort built around collection boxes for disposable vapes from any brand.",
    icon: RecyclingOutlinedIcon,
  },
]

const resourceLinks = [
  {
    label: "GIRLWEED",
    href: "https://www.girlweedxo.com/",
  },
  {
    label: "Lush Gummies",
    href: "https://www.verdelux.com/lush-soft-chew-jelly-gummies",
  },
  {
    label: "New Standard Recycling",
    href: "https://www.newstandardrecycling.com/",
  },
  {
    label: "Grace Wethor on Forbes",
    href:
      "https://www.forbes.com/sites/brucelee/2026/03/29/grace-wethor-on-her-decade-of-brain-cancer-since-given-6-months-to-live/",
  },
]

export default function Press() {
  return (
    <>
      <Head>
        <title>Press | New Standard</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="Press releases, media coverage, and brand notes for New Standard Labs, GIRLWEED, Lush, Slo Gro, and New Standard Recycling."
        />
      </Head>

      <main className="press-page">
        <motion.section
          className="press-hero"
          initial="hidden"
          variants={introVariants}
          viewport={{ once: true, amount: 0.34 }}
          whileInView="visible"
        >
          <motion.p className="section-eyebrow" variants={fadeUpVariants}>
            <ArticleOutlinedIcon className="section-eyebrow-icon" />
            <span>Press</span>
          </motion.p>
          <motion.h1 variants={fadeUpVariants}>
            New Standard <em>in the News.</em>
          </motion.h1>
          <motion.div className="press-heading-line" variants={lineVariants} />
          <motion.p className="press-hero-copy" variants={fadeUpVariants}>
            Media releases, industry coverage, and the brand stories shaping
            New Standard Labs.
          </motion.p>
        </motion.section>

        <motion.section
          className="featured-release"
          initial="hidden"
          variants={cardVariants}
          viewport={{ once: true, amount: 0.2 }}
          whileInView="visible"
        >
          <div className="release-mark">
            <img alt="" src="/logo.png" />
          </div>
          <div className="release-copy">
            <p className="release-kicker">For Immediate Release</p>
            <h2>
              Three Strangers, a Beach, and a Quarter-Century Collision
            </h2>
            <p className="release-meta">June 6, 2026 · Blaine, Washington</p>
            <p>
              New Standard Labs presents GIRLWEED x Databud, a launch that
              brings together Noah Dotson, Grace Wethor, and Databud founder
              Dave Erickson around a new feedback loop between cannabis
              chemistry and real human experience.
            </p>
            <blockquote>
              "If THC alone determined the experience, Everclear would be the
              world's favorite alcohol."
            </blockquote>
            <div className="release-actions">
              <a href={pressReleaseUrl} rel="noreferrer" target="_blank">
                <ArticleOutlinedIcon />
                <span>Open Press Release</span>
              </a>
              <a download href={pressReleaseUrl}>
                <LaunchOutlinedIcon />
                <span>Download PDF</span>
              </a>
            </div>
          </div>
        </motion.section>

        <motion.section
          className="press-grid-section"
          initial="hidden"
          variants={cardsContainerVariants}
          viewport={{ once: true, amount: 0.18 }}
          whileInView="visible"
        >
          <div className="section-heading">
            <p className="section-eyebrow">
              <SpaOutlinedIcon className="section-eyebrow-icon" />
              <span>Coverage</span>
            </p>
            <h2>Featured Articles</h2>
          </div>

          <div className="press-card-grid">
            {pressLinks.map((link) => {
              const Icon = link.icon

              return (
                <motion.article
                  className="press-card"
                  key={link.href}
                  variants={cardVariants}
                >
                  <div className="press-card-icon">
                    <Icon />
                  </div>
                  <p className="press-card-source">{link.source}</p>
                  <h3>{link.title}</h3>
                  <div className="press-card-line" />
                  <p>{link.copy}</p>
                  <span className="press-card-date">{link.date}</span>
                  <a href={link.href} rel="noreferrer" target="_blank">
                    <span>Read Article</span>
                    <LaunchOutlinedIcon />
                  </a>
                </motion.article>
              )
            })}
          </div>
        </motion.section>

        <motion.section
          className="brand-notes-section"
          initial="hidden"
          variants={cardsContainerVariants}
          viewport={{ once: true, amount: 0.18 }}
          whileInView="visible"
        >
          <div className="section-heading">
            <p className="section-eyebrow">
              <AutoAwesomeOutlinedIcon className="section-eyebrow-icon" />
              <span>Brand Notes</span>
            </p>
            <h2>Current Portfolio</h2>
          </div>

          <div className="brand-card-grid">
            {brandCards.map((brand) => {
              const Icon = brand.icon

              return (
                <motion.article
                  className="brand-card"
                  key={brand.title}
                  variants={cardVariants}
                >
                  <div className="brand-card-icon">
                    <Icon />
                  </div>
                  <p>{brand.label}</p>
                  <h3>{brand.title}</h3>
                  <div className="brand-card-line" />
                  <span>{brand.copy}</span>
                </motion.article>
              )
            })}
          </div>
        </motion.section>

        <motion.section
          className="resources-section"
          initial="hidden"
          variants={fadeUpVariants}
          viewport={{ once: true, amount: 0.24 }}
          whileInView="visible"
        >
          <h2>Additional Resources</h2>
          <div className="resource-links">
            {resourceLinks.map((resource) => (
              <a
                href={resource.href}
                key={resource.href}
                rel="noreferrer"
                target="_blank"
              >
                <span>{resource.label}</span>
                <LaunchOutlinedIcon />
              </a>
            ))}
          </div>
        </motion.section>
      </main>

      <style jsx global>{`
        .press-page {
          background: radial-gradient(
              circle at 50% 16%,
              rgba(73, 188, 136, 0.13),
              rgba(73, 188, 136, 0.04) 34%,
              transparent 58%
            ),
            linear-gradient(180deg, #010504 0%, #020b09 48%, #010504 100%);
          color: #ffffff;
          font-family: "Montserrat", sans-serif;
          min-height: 100vh;
          overflow: hidden;
          padding: clamp(170px, 15vw, 220px) clamp(20px, 5.5vw, 110px)
            clamp(80px, 8vw, 132px);
          position: relative;
        }

        .press-page::before {
          background: radial-gradient(
              circle at 18% 28%,
              rgba(73, 188, 136, 0.09),
              transparent 30%
            ),
            radial-gradient(
              circle at 84% 10%,
              rgba(73, 188, 136, 0.08),
              transparent 28%
            );
          content: "";
          inset: 0;
          pointer-events: none;
          position: absolute;
        }

        .press-page > * {
          position: relative;
          z-index: 1;
        }

        .press-hero {
          margin: 0 auto clamp(42px, 5vw, 78px);
          max-width: 940px;
          text-align: center;
        }

        .section-eyebrow {
          align-items: center;
          color: #49bc88;
          display: inline-flex;
          font-size: clamp(14px, 1vw, 20px);
          font-weight: 700;
          gap: 12px;
          letter-spacing: 0.16em;
          line-height: 1.2;
          margin: 0;
          text-transform: uppercase;
        }

        .section-eyebrow-icon {
          font-size: clamp(28px, 2vw, 42px);
        }

        .press-hero .section-eyebrow {
          justify-content: center;
          margin-bottom: 18px;
        }

        .press-hero h1,
        .section-heading h2,
        .resources-section h2 {
          color: #f8f8f3;
          font-family: "Cormorant Garamond", Georgia, serif;
          font-weight: 600;
          letter-spacing: 0;
          margin: 0;
          text-shadow: 0 2px 16px rgba(0, 0, 0, 0.52);
        }

        .press-hero h1 {
          font-size: clamp(54px, 6.2vw, 100px);
          line-height: 0.96;
        }

        .press-hero h1 em {
          color: #49bc88;
          font-style: normal;
        }

        .press-heading-line {
          background: #49bc88;
          height: 3px;
          margin: 28px auto 28px;
          transform-origin: center;
          width: 58px;
        }

        .press-hero-copy {
          color: rgba(255, 255, 255, 0.78);
          font-size: clamp(17px, 1.25vw, 23px);
          line-height: 1.55;
          margin: 0 auto;
          max-width: 760px;
        }

        .featured-release,
        .resources-section {
          background: rgba(4, 15, 13, 0.66);
          border: 1px solid rgba(255, 255, 255, 0.24);
          border-radius: 22px;
          box-shadow: 0 24px 62px rgba(0, 0, 0, 0.34);
          margin: 0 auto;
          overflow: hidden;
          position: relative;
        }

        .featured-release {
          display: grid;
          gap: clamp(30px, 4vw, 72px);
          grid-template-columns: minmax(170px, 0.42fr) minmax(0, 1fr);
          max-width: 1280px;
          padding: clamp(34px, 4vw, 64px);
        }

        .featured-release::before,
        .resources-section::before,
        .press-card::before,
        .brand-card::before {
          background: radial-gradient(
              circle at 22% 10%,
              rgba(73, 188, 136, 0.17),
              transparent 45%
            ),
            rgba(255, 255, 255, 0.04);
          content: "";
          inset: 0;
          pointer-events: none;
          position: absolute;
        }

        .featured-release > *,
        .resources-section > *,
        .press-card > *,
        .brand-card > * {
          position: relative;
          z-index: 1;
        }

        .release-mark {
          align-items: center;
          border: 1px solid rgba(73, 188, 136, 0.46);
          border-radius: 50%;
          display: flex;
          height: clamp(150px, 16vw, 240px);
          justify-content: center;
          width: clamp(150px, 16vw, 240px);
        }

        .release-mark img {
          display: block;
          height: 70%;
          object-fit: contain;
          width: 70%;
        }

        .release-kicker,
        .press-card-source,
        .brand-card p {
          color: #49bc88;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.16em;
          line-height: 1.3;
          margin: 0 0 16px;
          text-transform: uppercase;
        }

        .release-copy h2 {
          color: #ffffff;
          font-family: "Cormorant Garamond", Georgia, serif;
          font-size: clamp(38px, 4vw, 68px);
          font-weight: 600;
          line-height: 1;
          margin: 0;
        }

        .release-meta {
          color: rgba(255, 255, 255, 0.64);
          font-size: 14px;
          font-weight: 700;
          letter-spacing: 0.12em;
          margin: 20px 0 24px;
          text-transform: uppercase;
        }

        .release-copy > p:not(.release-kicker):not(.release-meta),
        .press-card p:not(.press-card-source),
        .brand-card span {
          color: rgba(255, 255, 255, 0.8);
          font-size: clamp(16px, 1.05vw, 19px);
          line-height: 1.6;
          margin: 0;
        }

        .release-copy blockquote {
          border-left: 3px solid #49bc88;
          color: rgba(255, 255, 255, 0.92);
          font-family: "Cormorant Garamond", Georgia, serif;
          font-size: clamp(25px, 2vw, 36px);
          line-height: 1.12;
          margin: 30px 0;
          padding-left: 22px;
        }

        .release-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 14px;
        }

        .release-actions a,
        .press-card a,
        .resource-links a {
          align-items: center;
          border: 1px solid rgba(73, 188, 136, 0.58);
          border-radius: 8px;
          color: #49bc88;
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

        .release-actions a:hover,
        .press-card a:hover,
        .resource-links a:hover {
          background: rgba(73, 188, 136, 0.14);
          box-shadow: 0 0 22px rgba(73, 188, 136, 0.16);
          color: #ffffff;
          transform: translateY(-1px);
        }

        .press-grid-section,
        .brand-notes-section,
        .resources-section {
          margin-top: clamp(54px, 6vw, 94px);
        }

        .section-heading {
          margin: 0 auto clamp(28px, 3.2vw, 46px);
          max-width: 1180px;
          text-align: center;
        }

        .section-heading .section-eyebrow {
          margin-bottom: 16px;
        }

        .section-heading h2,
        .resources-section h2 {
          font-size: clamp(40px, 4vw, 70px);
          line-height: 1;
        }

        .press-card-grid,
        .brand-card-grid {
          display: grid;
          gap: clamp(22px, 2.4vw, 38px);
          margin: 0 auto;
          max-width: 1380px;
        }

        .press-card-grid {
          grid-template-columns: repeat(2, minmax(0, 1fr));
        }

        .brand-card-grid {
          grid-template-columns: repeat(5, minmax(0, 1fr));
        }

        .press-card,
        .brand-card {
          background: rgba(4, 15, 13, 0.62);
          border: 1px solid rgba(255, 255, 255, 0.22);
          border-radius: 18px;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.28);
          overflow: hidden;
          position: relative;
        }

        .press-card {
          padding: clamp(30px, 3vw, 46px);
        }

        .brand-card {
          padding: 28px 24px;
        }

        .press-card-icon,
        .brand-card-icon {
          align-items: center;
          border: 1px solid rgba(73, 188, 136, 0.68);
          border-radius: 50%;
          color: #49bc88;
          display: flex;
          height: 64px;
          justify-content: center;
          margin-bottom: 22px;
          width: 64px;
        }

        .press-card-icon :global(svg),
        .brand-card-icon :global(svg) {
          font-size: 34px;
        }

        .press-card h3,
        .brand-card h3 {
          color: #ffffff;
          font-family: "Cormorant Garamond", Georgia, serif;
          font-weight: 600;
          letter-spacing: 0;
          line-height: 1.05;
          margin: 0;
        }

        .press-card h3 {
          font-size: clamp(32px, 2.6vw, 48px);
        }

        .brand-card h3 {
          font-size: clamp(25px, 2vw, 36px);
        }

        .press-card-line,
        .brand-card-line {
          background: #49bc88;
          height: 2px;
          margin: 20px 0;
          width: 56px;
        }

        .press-card-date {
          color: rgba(255, 255, 255, 0.58);
          display: block;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.12em;
          margin: 24px 0 18px;
          text-transform: uppercase;
        }

        .resources-section {
          max-width: 1180px;
          padding: clamp(30px, 3.8vw, 54px);
          text-align: center;
        }

        .resource-links {
          display: flex;
          flex-wrap: wrap;
          gap: 14px;
          justify-content: center;
          margin-top: 28px;
        }

        @media (max-width: 1180px) {
          .brand-card-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 760px) {
          .press-page {
            padding-left: 18px;
            padding-right: 18px;
            padding-top: clamp(164px, 25vw, 196px);
          }

          .press-hero,
          .section-heading,
          .resources-section {
            text-align: left;
          }

          .press-hero .section-eyebrow {
            justify-content: flex-start;
          }

          .press-heading-line {
            margin-left: 0;
            transform-origin: left center;
          }

          .featured-release,
          .press-card-grid,
          .brand-card-grid {
            grid-template-columns: 1fr;
          }

          .release-mark {
            height: 132px;
            width: 132px;
          }

          .release-actions a,
          .resource-links a {
            width: 100%;
          }

          .resource-links {
            justify-content: flex-start;
          }
        }

        @media (max-width: 480px) {
          .press-page {
            padding-left: 14px;
            padding-right: 14px;
            padding-top: clamp(212px, 56vw, 248px);
          }

          .press-hero h1 {
            font-size: clamp(44px, 14vw, 62px);
          }

          .featured-release,
          .press-card,
          .brand-card,
          .resources-section {
            border-radius: 16px;
            padding: 24px 18px;
          }
        }
      `}</style>
    </>
  )
}
