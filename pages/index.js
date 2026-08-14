import React, { useEffect, useMemo, useState } from "react"

import Head from "next/head"
import { motion } from "framer-motion"
import SpaOutlinedIcon from "@mui/icons-material/SpaOutlined"
import OpacityOutlinedIcon from "@mui/icons-material/OpacityOutlined"
import AutoAwesomeOutlinedIcon from "@mui/icons-material/AutoAwesomeOutlined"
import FlagOutlinedIcon from "@mui/icons-material/FlagOutlined"
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined"
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined"
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined"
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined"

const featureCards = [
  {
    title: "Quality Meets Variety",
    copy:
      "The luxury of choice with the assurance of excellence. Our products balance THC and CBD to meet your individual needs.",
    icon: SpaOutlinedIcon,
  },
  {
    title: "Crafted for Every Preference",
    copy:
      "From live resin cartridges to adaptable serums, our diverse, top-tier products are designed to suit every preference.",
    icon: OpacityOutlinedIcon,
  },
  {
    title: "Innovative Touch",
    copy:
      "Innovation is at our core. We push boundaries in product development, creating advanced cannabis experiences and a future of endless possibilities.",
    icon: AutoAwesomeOutlinedIcon,
  },
]

const aboutValues = [
  {
    title: "Purpose Driven",
    copy: "Rooted in purpose, driven by passion, focused on you.",
    icon: FlagOutlinedIcon,
  },
  {
    title: "Quality Obsessed",
    copy: "We never compromise on quality--from start to finish.",
    icon: VerifiedOutlinedIcon,
  },
  {
    title: "Community First",
    copy: "Your feedback shapes our products and our future.",
    icon: GroupsOutlinedIcon,
  },
]

const easeOut = [0.22, 1, 0.36, 1]

const heroIntroVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.24,
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

const headlineNaturalVariants = {
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

const actionVariants = {
  hidden: {
    opacity: 0,
    y: 16,
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

const FALLBACK_PRODUCT_COPY =
  "Premium New Standard cannabis product crafted with care, quality, and attention to detail."
const PRODUCT_CARD_COUNT = 3

const getTimeValue = (value) => {
  if (!value) return 0
  if (typeof value === "number") return value
  if (typeof value === "string") {
    const parsed = Date.parse(value)
    return Number.isNaN(parsed) ? 0 : parsed
  }
  if (typeof value.toMillis === "function") return value.toMillis()
  if (typeof value.seconds === "number") return value.seconds * 1000
  return 0
}

const getProductIcon = (category = "") => {
  const normalizedCategory = category.toLowerCase()

  if (
    normalizedCategory.includes("serum") ||
    normalizedCategory.includes("tincture") ||
    normalizedCategory.includes("oil")
  ) {
    return OpacityOutlinedIcon
  }

  if (
    normalizedCategory.includes("flower") ||
    normalizedCategory.includes("leaf") ||
    normalizedCategory.includes("plant")
  ) {
    return SpaOutlinedIcon
  }

  return AutoAwesomeOutlinedIcon
}

const sortByProductText = (a, b) =>
  `${a.collection || ""} ${a.item || ""}`.localeCompare(
    `${b.collection || ""} ${b.item || ""}`,
    undefined,
    { sensitivity: "base" }
  )

export default function Home({ works = [], imgs = [] }) {
  const [productPageIndex, setProductPageIndex] = useState(0)
  const [productsPerPage, setProductsPerPage] = useState(PRODUCT_CARD_COUNT)
  const [brokenProductImageIds, setBrokenProductImageIds] = useState([])

  const productItems = useMemo(() => {
    return [...works]
      .sort(sortByProductText)
      .map((work, workIndex) => {
        const workImages = imgs
          .filter((img) => {
            const isSameWork = img.workId && work.id && img.workId === work.id
            const hasSameNames =
              img.collection === work.collection && img.item === work.item

            return isSameWork || hasSameNames
          })
          .sort((a, b) => {
            const indexDelta = (a.index || 0) - (b.index || 0)

            if (indexDelta !== 0) return indexDelta

            return getTimeValue(a.created) - getTimeValue(b.created)
          })

        const primaryImage = workImages[0] || {}
        const productTitle = work.item || work.collection || "New Standard"
        const productCategory = work.collection || "Product"
        const productId = work.id || `${productCategory}-${productTitle}`

        return {
          id: productId,
          uid: `${productId}-${workIndex}`,
          title: productTitle,
          category: productCategory,
          accent: work.color3 || work.color2 || work.color1 || "#49BC88",
          description:
            primaryImage.message || work.description || FALLBACK_PRODUCT_COPY,
          image: primaryImage.url || "",
        }
      })
      .filter((product) => {
        return product.image && !brokenProductImageIds.includes(product.id)
      })
  }, [works, imgs, brokenProductImageIds])

  const markProductImageBroken = (productId) => {
    setBrokenProductImageIds((oldIds) =>
      oldIds.includes(productId) ? oldIds : [...oldIds, productId]
    )
  }

  useEffect(() => {
    const smallScreenQuery = window.matchMedia("(max-width: 940px)")
    const updateProductsPerPage = () => {
      setProductsPerPage(smallScreenQuery.matches ? 2 : PRODUCT_CARD_COUNT)
    }

    updateProductsPerPage()
    smallScreenQuery.addEventListener("change", updateProductsPerPage)

    return () => {
      smallScreenQuery.removeEventListener("change", updateProductsPerPage)
    }
  }, [])

  const productPageCount = Math.ceil(productItems.length / productsPerPage)
  const normalizedProductPageIndex = productPageCount
    ? productPageIndex % productPageCount
    : 0
  const visibleProducts = useMemo(() => {
    if (!productItems.length) return []

    const pageStartIndex = normalizedProductPageIndex * productsPerPage

    return productItems.slice(pageStartIndex, pageStartIndex + productsPerPage)
  }, [normalizedProductPageIndex, productItems, productsPerPage])

  useEffect(() => {
    if (!productPageCount) {
      setProductPageIndex(0)
      return
    }

    setProductPageIndex((currentIndex) =>
      currentIndex >= productPageCount ? productPageCount - 1 : currentIndex
    )
  }, [productPageCount])

  const moveProducts = (direction) => {
    if (productPageCount <= 1) return

    setProductPageIndex((currentIndex) => {
      return (currentIndex + direction + productPageCount) % productPageCount
    })
  }

  return (
    <>
      <Head>
        <title>New Standard</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="Premium cannabis products crafted for balance, quality, and innovation."
        />
      </Head>

      <main className="home-page">
        <section className="hero">
          <motion.div
            className="hero-content"
            initial="hidden"
            variants={heroIntroVariants}
            viewport={{ once: true, amount: 0.45 }}
            whileInView="visible"
          >
            <motion.p className="hero-kicker" variants={fadeUpVariants}>
              Premium Cannabis
            </motion.p>
            <h1>
              <motion.span
                className="headline-main"
                variants={headlineMainVariants}
              >
                Elevated Cannabis,
              </motion.span>
              <motion.span
                className="headline-natural"
                variants={headlineNaturalVariants}
              >
                Naturally.
              </motion.span>
            </h1>
            <motion.div className="accent-line" variants={lineVariants} />
            <motion.p className="hero-copy" variants={fadeUpVariants}>
              Premium cannabis products crafted
              <br />
              for balance, quality, and innovation.
            </motion.p>
            <div className="hero-actions">
              <motion.div className="action-shell" variants={actionVariants}>
                <a
                  className="primary-action"
                  href="https://www.iheartjane.com/brands/24293/new-standard"
                  rel="noreferrer"
                  target="_blank"
                >
                  <SpaOutlinedIcon className="action-icon" />
                  <span>Shop Now</span>
                </a>
              </motion.div>
              <motion.div className="action-shell" variants={actionVariants}>
                <a className="secondary-action" href="/products">
                  Explore Products
                </a>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            className="feature-grid"
            initial="hidden"
            variants={cardsContainerVariants}
            viewport={{ once: true, amount: 0.22 }}
            whileInView="visible"
          >
            {featureCards.map((card) => {
              const Icon = card.icon

              return (
                <motion.article
                  className="feature-card"
                  key={card.title}
                  variants={cardVariants}
                >
                  <motion.div
                    className="feature-icon"
                    variants={cardElementVariants}
                  >
                    <Icon />
                  </motion.div>
                  <div className="feature-text">
                    <motion.h2 variants={cardElementVariants}>
                      {card.title}
                    </motion.h2>
                    <motion.div
                      className="feature-line"
                      variants={lineVariants}
                    />
                  </div>
                  <motion.p
                    className="feature-copy"
                    variants={cardElementVariants}
                  >
                    {card.copy}
                  </motion.p>
                </motion.article>
              )
            })}
          </motion.div>
        </section>

        <section className="home-about-section">
          <motion.div
            className="about-section-inner"
            initial="hidden"
            variants={cardsContainerVariants}
            viewport={{ once: true, amount: 0.28 }}
            whileInView="visible"
          >
            <motion.div className="about-section-copy" variants={cardVariants}>
              <motion.p className="section-eyebrow" variants={cardElementVariants}>
                <SpaOutlinedIcon className="section-eyebrow-icon" />
                <span>Our Story</span>
              </motion.p>
              <h2 aria-label="About New Standard">
                <motion.span
                  className="about-title-main"
                  variants={headlineMainVariants}
                >
                  About
                </motion.span>
                <motion.span
                  className="about-title-accent"
                  variants={headlineNaturalVariants}
                >
                  New Standard.
                </motion.span>
              </h2>
              <motion.div className="about-section-line" variants={lineVariants} />
              <motion.p variants={cardElementVariants}>
                New Standard began as a passion project founded by Noah Dotson,
                built on a simple belief: cannabis should be crafted with
                dedication, quality, innovation, and an unwavering attention to
                detail.
              </motion.p>
              <motion.p variants={cardElementVariants}>
                We listen to our community, learn from every experience, and
                create premium products with care--so you can elevate your life,
                naturally.
              </motion.p>
              <motion.div className="about-action-shell" variants={actionVariants}>
                <a className="about-primary-action" href="/about">
                  <SpaOutlinedIcon className="action-icon" />
                  <span>Visit About Page</span>
                </a>
              </motion.div>
            </motion.div>

            <motion.div className="about-founder-card" variants={cardVariants}>
              <div className="founder-card-top">
                <motion.div
                  className="founder-logo-ring"
                  variants={cardElementVariants}
                >
                  <img src="/logo.png" alt="New Standard" />
                </motion.div>
                <motion.div
                  className="founder-card-copy"
                  variants={cardElementVariants}
                >
                  <p className="founder-card-eyebrow">Founded By</p>
                  <h3>Noah Dotson</h3>
                  <motion.div
                    className="founder-card-line"
                    variants={lineVariants}
                  />
                  <p>
                    Entrepreneur. Innovator.
                    <br />
                    Cannabis enthusiast.
                  </p>
                </motion.div>
              </div>

              <motion.div
                className="about-values-grid"
                variants={cardsContainerVariants}
              >
                {aboutValues.map((value) => {
                  const Icon = value.icon

                  return (
                    <motion.div
                      className="about-value"
                      key={value.title}
                      variants={cardElementVariants}
                    >
                      <div className="about-value-icon">
                        <Icon />
                      </div>
                      <h4>{value.title}</h4>
                      <motion.div
                        className="about-value-line"
                        variants={lineVariants}
                      />
                      <p>{value.copy}</p>
                    </motion.div>
                  )
                })}
              </motion.div>
            </motion.div>
          </motion.div>
        </section>

        <section className="home-products-section">
          <motion.div
            className="products-section-inner"
            initial="hidden"
            variants={heroIntroVariants}
            viewport={{ once: true, amount: 0.22 }}
            whileInView="visible"
          >
            <motion.div
              className="products-section-heading"
              variants={fadeUpVariants}
            >
              <p className="section-eyebrow products-eyebrow">
                <SpaOutlinedIcon className="section-eyebrow-icon" />
                <span>Our Products</span>
              </p>
              <h2 aria-label="Explore Our Products">
                <span className="products-title-main">Explore</span>{" "}
                <span className="products-title-accent">Our Products.</span>
              </h2>
              <div className="products-heading-line" />
              <p>
                Carefully crafted. Thoughtfully sourced. Discover our premium
                cannabis products designed to elevate every moment.
              </p>
            </motion.div>

            {productItems.length > 0 ? (
              <>
                <div className="product-carousel-shell">
                  <button
                    aria-label="Previous products"
                    className="product-arrow product-arrow-prev"
                    disabled={productPageCount <= 1}
                    onClick={() => moveProducts(-1)}
                    type="button"
                  >
                    <ArrowBackIosNewOutlinedIcon />
                  </button>

                  <motion.div
                    className="product-cards-row"
                    key={normalizedProductPageIndex}
                    animate="visible"
                    initial="hidden"
                    variants={cardsContainerVariants}
                  >
                    {visibleProducts.map((product, index) => {
                      const Icon = getProductIcon(product.category)

                      return (
                        <motion.article
                          className="product-card"
                          key={product.uid}
                          style={{ "--product-accent": product.accent }}
                          variants={cardVariants}
                        >
                          <img
                            alt=""
                            aria-hidden="true"
                            className="product-card-watermark"
                            src="/logo.png"
                          />
                          <motion.div
                            className="product-card-icon"
                            variants={cardElementVariants}
                          >
                            <Icon />
                          </motion.div>
                          <motion.div
                            className="product-image-wrap"
                            variants={cardElementVariants}
                          >
                            <img
                              alt={product.title}
                              className={
                                product.image
                                  ? "product-image"
                                  : "product-image product-image-placeholder"
                              }
                              decoding="async"
                              loading={index < 3 ? "eager" : "lazy"}
                              onError={() => markProductImageBroken(product.id)}
                              src={product.image || "/logo.png"}
                            />
                          </motion.div>
                          <motion.div
                            className="product-card-copy"
                            variants={cardElementVariants}
                          >
                            <h3>{product.title}</h3>
                            <motion.div
                              className="product-card-line"
                              variants={lineVariants}
                            />
                            <p>{product.description}</p>
                            <div className="product-meta">
                              <div>
                                <span>Category</span>
                                <strong>{product.category}</strong>
                              </div>
                              <div>
                                <span>Item</span>
                                <strong>{product.title}</strong>
                              </div>
                            </div>
                          </motion.div>
                        </motion.article>
                      )
                    })}
                  </motion.div>

                  <button
                    aria-label="Next products"
                    className="product-arrow product-arrow-next"
                    disabled={productPageCount <= 1}
                    onClick={() => moveProducts(1)}
                    type="button"
                  >
                    <ArrowForwardIosOutlinedIcon />
                  </button>
                </div>

                {productPageCount > 1 ? (
                  <div
                    aria-label="Product carousel pages"
                    className="product-page-dots"
                    role="tablist"
                  >
                    {Array.from({ length: productPageCount }, (_, index) => (
                      <button
                        aria-current={
                          normalizedProductPageIndex === index
                            ? "page"
                            : undefined
                        }
                        aria-label={`Show product page ${index + 1}`}
                        className={
                          normalizedProductPageIndex === index
                            ? "product-page-dot is-active"
                            : "product-page-dot"
                        }
                        key={index}
                        onClick={() => setProductPageIndex(index)}
                        type="button"
                      />
                    ))}
                  </div>
                ) : null}

                <motion.div
                  className="products-page-action-shell"
                  variants={actionVariants}
                >
                  <a className="products-page-action" href="/products">
                    <SpaOutlinedIcon className="action-icon" />
                    <span>View Products Page</span>
                  </a>
                </motion.div>
              </>
            ) : (
              <motion.div
                className="product-empty"
                variants={cardVariants}
                viewport={{ once: true, amount: 0.35 }}
                whileInView="visible"
              >
                Products are loading from Firebase.
              </motion.div>
            )}
          </motion.div>
        </section>
      </main>

      <style jsx global>{`
        .home-page {
          background: #010b08;
          color: #ffffff;
          font-family: "Montserrat", sans-serif;
          min-height: 100vh;
        }

        .hero {
          background-image: radial-gradient(
              circle at 58% 12%,
              rgba(73, 188, 136, 0.14),
              transparent 26%
            ),
            linear-gradient(
              90deg,
              rgba(1, 11, 8, 0.92) 0%,
              rgba(1, 11, 8, 0.54) 42%,
              rgba(1, 11, 8, 0.25) 68%,
              rgba(1, 11, 8, 0.62) 100%
            ),
            linear-gradient(
              180deg,
              rgba(1, 11, 8, 0.18) 0%,
              rgba(1, 11, 8, 0.2) 52%,
              rgba(1, 11, 8, 0.84) 100%
            ),
            url("/background.png");
          background-position: center center;
          background-repeat: no-repeat;
          background-size: cover;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          min-height: 100vh;
          overflow: hidden;
          padding: clamp(170px, 19vh, 245px) clamp(24px, 6vw, 120px)
            clamp(28px, 5vh, 64px);
          position: relative;
        }

        .hero::after {
          background: linear-gradient(
            180deg,
            transparent 0%,
            rgba(1, 11, 8, 0.32) 55%,
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

        .hero-content,
        .feature-grid {
          position: relative;
          z-index: 1;
        }

        .hero-content {
          max-width: 760px;
        }

        .hero-kicker {
          color: rgba(255, 255, 255, 0.68);
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.28em;
          margin: 0 0 18px;
          text-transform: uppercase;
        }

        h1 {
          color: #f8f8f3;
          font-family: "Cormorant Garamond", Georgia, serif;
          font-size: clamp(58px, 6vw, 104px);
          font-weight: 600;
          letter-spacing: -0.025em;
          line-height: 0.92;
          margin: 0;
          text-shadow: 0 2px 16px rgba(0, 0, 0, 0.52);
        }

        h1 .headline-main {
          color: #f8f8f3;
          display: block;
        }

        h1 .headline-natural {
          color: #49bc88;
          display: block;
        }

        .accent-line {
          background: #49bc88;
          height: 3px;
          margin: 36px 0 28px;
          width: 58px;
        }

        .hero-copy {
          color: rgba(255, 255, 255, 0.9);
          font-size: clamp(18px, 1.45vw, 25px);
          font-weight: 400;
          line-height: 1.45;
          margin: 0;
          text-shadow: 0 1px 10px rgba(0, 0, 0, 0.6);
        }

        .hero-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 22px;
          margin-top: 34px;
        }

        .action-shell {
          display: inline-flex;
        }

        .primary-action,
        .secondary-action {
          align-items: center;
          border-radius: 8px;
          display: inline-flex;
          font-size: clamp(16px, 1.2vw, 21px);
          font-weight: 500;
          gap: 14px;
          justify-content: center;
          min-height: 64px;
          min-width: 240px;
          padding: 16px 28px;
          text-decoration: none;
          transition: box-shadow 160ms ease, transform 160ms ease,
            background 160ms ease;
        }

        .primary-action {
          background: linear-gradient(135deg, #54c985, #3aa765);
          box-shadow: 0 0 26px rgba(73, 188, 136, 0.32);
          color: #ffffff;
        }

        .primary-action:hover,
        .secondary-action:hover {
          transform: translateY(-2px);
        }

        .primary-action:hover {
          box-shadow: 0 0 34px rgba(73, 188, 136, 0.45);
        }

        .secondary-action {
          background: rgba(1, 16, 0, 0.28);
          border: 1px solid rgba(73, 188, 136, 0.78);
          color: #49bc88;
        }

        .secondary-action:hover {
          background: rgba(73, 188, 136, 0.08);
          box-shadow: 0 0 24px rgba(73, 188, 136, 0.18);
        }

        .feature-grid {
          display: grid;
          gap: 32px;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          margin-top: clamp(48px, 7vh, 96px);
        }

        .feature-card {
          align-items: flex-start;
          background: rgba(4, 15, 13, 0.62);
          border: 1px solid rgba(255, 255, 255, 0.24);
          border-radius: 22px;
          box-shadow: 0 22px 50px rgba(0, 0, 0, 0.28);
          display: grid;
          gap: 26px;
          grid-template-columns: 64px 1fr;
          min-height: 250px;
          overflow: hidden;
          padding: 42px 38px 34px;
          position: relative;
        }

        .feature-card::before {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(14px);
          content: "";
          inset: 0;
          position: absolute;
        }

        .feature-card > * {
          position: relative;
          z-index: 1;
        }

        .feature-icon {
          align-items: center;
          border: 1px solid #49bc88;
          border-radius: 50%;
          color: #49bc88;
          display: flex;
          height: 58px;
          justify-content: center;
          width: 58px;
        }

        .feature-icon :global(svg) {
          font-size: 33px;
        }

        .feature-text h2 {
          color: #ffffff;
          font-family: "Cormorant Garamond", Georgia, serif;
          font-size: clamp(28px, 2.2vw, 42px);
          font-weight: 600;
          letter-spacing: -0.01em;
          line-height: 0.98;
          margin: 0;
          text-shadow: 0 1px 10px rgba(0, 0, 0, 0.4);
        }

        .feature-line {
          background: #49bc88;
          height: 2px;
          margin: 28px 0 0;
          transform-origin: left center;
          width: 78px;
        }

        .feature-copy {
          color: rgba(255, 255, 255, 0.9);
          font-size: clamp(16px, 1.15vw, 22px);
          grid-column: 1 / -1;
          line-height: 1.48;
          margin: 0;
        }

        .action-icon {
          font-size: 24px;
        }

        .home-about-section {
          align-items: center;
          background: radial-gradient(
              circle at 54% 52%,
              rgba(73, 188, 136, 0.16),
              rgba(73, 188, 136, 0.04) 31%,
              transparent 58%
            ),
            linear-gradient(
              180deg,
              rgba(1, 11, 8, 0.98) 0%,
              #020b09 44%,
              #010504 100%
            );
          display: flex;
          min-height: 100vh;
          overflow: hidden;
          padding: clamp(72px, 9vh, 140px) clamp(24px, 6vw, 120px);
          position: relative;
        }

        .home-about-section::before {
          background: radial-gradient(
            circle at 50% 50%,
            rgba(73, 188, 136, 0.1),
            transparent 34%
          );
          content: "";
          inset: 0;
          pointer-events: none;
          position: absolute;
        }

        .about-section-inner {
          align-items: center;
          display: grid;
          gap: clamp(56px, 7vw, 150px);
          grid-template-columns: minmax(0, 1fr) minmax(520px, 760px);
          margin: 0 auto;
          max-width: 1840px;
          position: relative;
          width: 100%;
          z-index: 1;
        }

        .about-section-copy {
          max-width: 880px;
        }

        .section-eyebrow {
          align-items: center;
          color: #49bc88;
          display: inline-flex;
          font-size: clamp(13px, 1vw, 18px);
          font-weight: 700;
          gap: 16px;
          letter-spacing: 0.18em;
          margin: 0 0 36px;
          text-transform: uppercase;
        }

        .section-eyebrow-icon {
          font-size: 40px;
        }

        .about-section-copy h2 {
          color: #f8f8f3;
          display: flex;
          flex-wrap: wrap;
          font-family: "Cormorant Garamond", Georgia, serif;
          font-size: clamp(54px, 5.4vw, 96px);
          font-weight: 600;
          gap: 0.24em;
          letter-spacing: 0;
          line-height: 0.96;
          margin: 0;
          text-shadow: 0 2px 16px rgba(0, 0, 0, 0.52);
        }

        .about-title-main,
        .about-title-accent {
          display: inline-block;
        }

        .about-title-accent {
          color: #49bc88;
        }

        .about-section-line {
          background: #49bc88;
          height: 3px;
          margin: 38px 0 38px;
          transform-origin: left center;
          width: 58px;
        }

        .about-section-copy p:not(.section-eyebrow) {
          color: rgba(255, 255, 255, 0.78);
          font-size: clamp(18px, 1.28vw, 25px);
          line-height: 1.55;
          margin: 0 0 32px;
          max-width: 820px;
        }

        .about-action-shell {
          display: inline-flex;
          margin-top: 22px;
        }

        .about-primary-action {
          align-items: center;
          background: linear-gradient(135deg, #54c985, #3aa765);
          border-radius: 8px;
          box-shadow: 0 0 34px rgba(73, 188, 136, 0.34);
          color: #ffffff;
          display: inline-flex;
          font-size: clamp(17px, 1.25vw, 23px);
          font-weight: 600;
          gap: 16px;
          justify-content: center;
          min-height: 72px;
          min-width: 360px;
          padding: 18px 34px;
          text-decoration: none;
          transition: box-shadow 160ms ease, transform 160ms ease;
        }

        .about-primary-action:hover {
          box-shadow: 0 0 42px rgba(73, 188, 136, 0.48);
          transform: translateY(-2px);
        }

        .about-founder-card {
          background: rgba(4, 15, 13, 0.62);
          border: 1px solid rgba(255, 255, 255, 0.24);
          border-radius: 28px;
          box-shadow: 0 28px 70px rgba(0, 0, 0, 0.3);
          overflow: hidden;
          position: relative;
        }

        .about-founder-card::before {
          background: rgba(255, 255, 255, 0.045);
          backdrop-filter: blur(16px);
          content: "";
          inset: 0;
          position: absolute;
        }

        .about-founder-card > * {
          position: relative;
          z-index: 1;
        }

        .founder-card-top {
          align-items: center;
          display: grid;
          gap: clamp(34px, 4vw, 72px);
          grid-template-columns: 210px 1fr;
          padding: clamp(46px, 4.8vw, 72px) clamp(42px, 5vw, 82px);
        }

        .founder-logo-ring {
          align-items: center;
          border: 1px solid #49bc88;
          border-radius: 50%;
          display: flex;
          height: clamp(150px, 9.8vw, 216px);
          justify-content: center;
          width: clamp(150px, 9.8vw, 216px);
        }

        .founder-logo-ring img {
          display: block;
          height: 58%;
          object-fit: contain;
          width: 58%;
        }

        .founder-card-eyebrow {
          color: #49bc88;
          font-size: clamp(13px, 1vw, 18px);
          font-weight: 700;
          letter-spacing: 0.18em;
          margin: 0 0 18px;
          text-transform: uppercase;
        }

        .founder-card-copy h3 {
          color: #ffffff;
          font-family: "Cormorant Garamond", Georgia, serif;
          font-size: clamp(32px, 2.5vw, 48px);
          font-weight: 600;
          letter-spacing: 0;
          line-height: 1;
          margin: 0;
        }

        .founder-card-line,
        .about-value-line {
          background: #49bc88;
          height: 2px;
          transform-origin: left center;
        }

        .founder-card-line {
          margin: 28px 0 28px;
          width: 58px;
        }

        .founder-card-copy p:not(.founder-card-eyebrow) {
          color: rgba(255, 255, 255, 0.78);
          font-size: clamp(17px, 1.25vw, 24px);
          line-height: 1.45;
          margin: 0;
        }

        .about-values-grid {
          border-top: 1px solid rgba(255, 255, 255, 0.14);
          display: grid;
          gap: 22px;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          padding: clamp(38px, 3.8vw, 58px) clamp(32px, 4.2vw, 58px)
            clamp(42px, 4vw, 66px);
        }

        .about-value {
          text-align: center;
        }

        .about-value-icon {
          align-items: center;
          border: 1px solid #49bc88;
          border-radius: 50%;
          color: #49bc88;
          display: inline-flex;
          height: 74px;
          justify-content: center;
          margin-bottom: 24px;
          width: 74px;
        }

        .about-value-icon :global(svg) {
          font-size: 40px;
        }

        .about-value h4 {
          color: #ffffff;
          font-family: "Cormorant Garamond", Georgia, serif;
          font-size: clamp(20px, 1.45vw, 29px);
          font-weight: 700;
          letter-spacing: 0;
          line-height: 1.05;
          margin: 0;
        }

        .about-value-line {
          margin: 22px auto 22px;
          width: 58px;
        }

        .about-value p {
          color: rgba(255, 255, 255, 0.78);
          font-size: clamp(15px, 1vw, 18px);
          line-height: 1.55;
          margin: 0;
        }

        .home-products-section {
          align-items: center;
          background: radial-gradient(
              circle at 50% 42%,
              rgba(73, 188, 136, 0.13),
              rgba(73, 188, 136, 0.04) 30%,
              transparent 58%
            ),
            linear-gradient(180deg, #010504 0%, #020b09 44%, #010504 100%);
          display: flex;
          min-height: 100vh;
          overflow: hidden;
          padding: clamp(82px, 9vh, 150px) clamp(24px, 6vw, 120px);
          position: relative;
        }

        .home-products-section::before {
          background: radial-gradient(
              circle at 19% 74%,
              rgba(73, 188, 136, 0.08),
              transparent 24%
            ),
            radial-gradient(
              circle at 82% 26%,
              rgba(73, 188, 136, 0.08),
              transparent 26%
            );
          content: "";
          inset: 0;
          pointer-events: none;
          position: absolute;
        }

        .products-section-inner {
          margin: 0 auto;
          max-width: 1760px;
          position: relative;
          width: 100%;
          z-index: 1;
        }

        .products-section-heading {
          margin: 0 auto clamp(48px, 5vw, 84px);
          max-width: 820px;
          text-align: center;
        }

        .products-eyebrow {
          margin-bottom: 18px;
        }

        .products-section-heading h2 {
          align-items: center;
          color: #f8f8f3;
          display: flex;
          flex-wrap: wrap;
          font-family: "Cormorant Garamond", Georgia, serif;
          font-size: clamp(50px, 4.7vw, 88px);
          font-weight: 600;
          column-gap: 0;
          justify-content: center;
          letter-spacing: 0;
          line-height: 0.96;
          margin: 0;
          row-gap: 0.08em;
          text-shadow: 0 2px 16px rgba(0, 0, 0, 0.52);
        }

        .products-title-main,
        .products-title-accent {
          display: inline-block;
        }

        .products-title-accent {
          color: #49bc88;
          margin-left: 0.08em;
        }

        .products-heading-line {
          background: #49bc88;
          height: 3px;
          margin: 28px auto 28px;
          width: 58px;
        }

        .products-section-heading p:not(.section-eyebrow) {
          color: rgba(255, 255, 255, 0.78);
          font-size: clamp(17px, 1.25vw, 23px);
          line-height: 1.55;
          margin: 0;
        }

        .product-carousel-shell {
          align-items: center;
          display: grid;
          gap: clamp(18px, 2.8vw, 48px);
          grid-template-columns: 78px minmax(0, 1fr) 78px;
        }

        .product-cards-row {
          display: grid;
          gap: clamp(24px, 2.4vw, 44px);
          grid-template-columns: repeat(3, minmax(0, 1fr));
        }

        .product-arrow {
          align-items: center;
          background: rgba(1, 16, 0, 0.44);
          border: 1px solid #49bc88;
          border-radius: 50%;
          color: #ffffff;
          cursor: pointer;
          display: inline-flex;
          height: clamp(62px, 4.8vw, 86px);
          justify-content: center;
          justify-self: center;
          padding: 0;
          transition: background 180ms ease, box-shadow 180ms ease,
            transform 180ms ease, opacity 180ms ease;
          width: clamp(62px, 4.8vw, 86px);
        }

        .product-arrow:hover:not(:disabled) {
          background: rgba(73, 188, 136, 0.13);
          box-shadow: 0 0 28px rgba(73, 188, 136, 0.24);
          transform: translateY(-2px);
        }

        .product-arrow:disabled {
          cursor: default;
          opacity: 0.32;
        }

        .product-arrow :global(svg) {
          font-size: clamp(24px, 2vw, 34px);
        }

        .product-page-dots {
          align-items: center;
          display: flex;
          gap: 12px;
          justify-content: center;
          margin: clamp(22px, 2.4vw, 34px) 0 0;
        }

        .product-page-dot {
          background: rgba(255, 255, 255, 0.24);
          border: 0;
          border-radius: 50%;
          cursor: pointer;
          height: 11px;
          padding: 0;
          transition: background 180ms ease, box-shadow 180ms ease,
            transform 180ms ease, width 180ms ease;
          width: 11px;
        }

        .product-page-dot:hover,
        .product-page-dot.is-active {
          background: #49bc88;
          box-shadow: 0 0 18px rgba(73, 188, 136, 0.42);
        }

        .product-page-dot.is-active {
          transform: scale(1.16);
        }

        .product-card {
          --product-accent: #49bc88;
          background: rgba(4, 15, 13, 0.66);
          border: 1px solid rgba(255, 255, 255, 0.24);
          border-radius: 22px;
          box-shadow: 0 24px 62px rgba(0, 0, 0, 0.34);
          display: flex;
          flex-direction: column;
          min-height: 600px;
          overflow: hidden;
          padding: clamp(28px, 2.4vw, 40px) clamp(26px, 2.2vw, 38px)
            clamp(30px, 2.2vw, 40px);
          position: relative;
        }

        .product-card::before {
          background: radial-gradient(
              circle at 50% 32%,
              rgba(73, 188, 136, 0.2),
              rgba(73, 188, 136, 0.04) 42%,
              transparent 68%
            ),
            rgba(255, 255, 255, 0.04);
          backdrop-filter: blur(14px);
          content: "";
          inset: 0;
          position: absolute;
        }

        .product-card > * {
          position: relative;
          z-index: 1;
        }

        .product-card-watermark {
          height: 46%;
          left: 50%;
          object-fit: contain;
          opacity: 0.08;
          pointer-events: none;
          position: absolute;
          top: 38%;
          transform: translate(-50%, -50%);
          width: 76%;
          z-index: 0;
        }

        .product-card-icon {
          align-items: center;
          border: 1px solid var(--product-accent);
          border-radius: 50%;
          color: var(--product-accent);
          display: inline-flex;
          height: 58px;
          justify-content: center;
          margin-bottom: 18px;
          width: 58px;
        }

        .product-card-icon :global(svg) {
          font-size: 32px;
        }

        .product-image-wrap {
          align-items: center;
          display: flex;
          flex: 0 0 clamp(220px, 17vw, 310px);
          height: clamp(220px, 17vw, 310px);
          justify-content: center;
          margin: 0 0 24px;
          min-height: 0;
          overflow: hidden;
          width: 100%;
        }

        .product-image {
          display: block;
          filter: drop-shadow(0 24px 32px rgba(0, 0, 0, 0.38));
          height: 100%;
          max-height: 100%;
          max-width: 100%;
          object-fit: contain;
          width: 100%;
        }

        .product-image-placeholder {
          height: auto;
          max-height: 72%;
          opacity: 0.58;
          width: min(58%, 220px);
        }

        .product-card-copy {
          display: flex;
          flex: 1;
          flex-direction: column;
        }

        .product-card h3 {
          color: #ffffff;
          font-family: "Cormorant Garamond", Georgia, serif;
          font-size: clamp(28px, 2.2vw, 42px);
          font-weight: 700;
          letter-spacing: 0;
          line-height: 1.02;
          margin: 0;
          text-shadow: 0 1px 10px rgba(0, 0, 0, 0.4);
        }

        .product-card-line {
          background: var(--product-accent);
          height: 2px;
          margin: 22px 0 22px;
          transform-origin: left center;
          width: 56px;
        }

        .product-card-copy p {
          color: rgba(255, 255, 255, 0.78);
          display: -webkit-box;
          font-size: clamp(15px, 1vw, 18px);
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 4;
          line-height: 1.55;
          margin: 0;
          overflow: hidden;
        }

        .product-meta {
          border-top: 1px solid rgba(255, 255, 255, 0.12);
          display: grid;
          gap: 24px;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          margin-top: auto;
          padding-top: 24px;
        }

        .product-meta div + div {
          border-left: 1px solid rgba(255, 255, 255, 0.32);
          padding-left: 24px;
        }

        .product-meta span,
        .product-meta strong {
          display: block;
        }

        .product-meta span {
          color: #49bc88;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.12em;
          margin-bottom: 10px;
          text-transform: uppercase;
        }

        .product-meta strong {
          color: rgba(255, 255, 255, 0.9);
          font-size: clamp(15px, 1vw, 18px);
          font-weight: 500;
          line-height: 1.35;
        }

        .products-page-action-shell {
          display: flex;
          justify-content: center;
          margin-top: clamp(30px, 3.5vw, 48px);
        }

        .products-page-action {
          align-items: center;
          background: linear-gradient(135deg, #54c985, #3aa765);
          border-radius: 8px;
          box-shadow: 0 0 30px rgba(73, 188, 136, 0.3);
          color: #ffffff;
          display: inline-flex;
          font-size: clamp(16px, 1.15vw, 21px);
          font-weight: 600;
          gap: 14px;
          justify-content: center;
          min-height: 62px;
          min-width: 250px;
          padding: 16px 30px;
          text-decoration: none;
          transition: box-shadow 160ms ease, transform 160ms ease;
        }

        .products-page-action:hover {
          box-shadow: 0 0 38px rgba(73, 188, 136, 0.44);
          transform: translateY(-2px);
        }

        .product-empty {
          background: rgba(4, 15, 13, 0.62);
          border: 1px solid rgba(255, 255, 255, 0.24);
          border-radius: 18px;
          color: rgba(255, 255, 255, 0.78);
          font-size: clamp(17px, 1.2vw, 22px);
          margin: 0 auto;
          max-width: 520px;
          padding: 32px;
          text-align: center;
        }

        @media (max-width: 1180px) {
          .hero {
            background-position: 68% center;
          }

          .about-section-inner {
            grid-template-columns: 1fr;
          }

          .about-founder-card {
            max-width: 820px;
            width: 100%;
          }

          .feature-grid {
            grid-template-columns: 1fr;
          }

          .feature-card {
            grid-template-columns: 86px 1fr;
            min-height: auto;
          }

          .feature-copy {
            grid-column: 2;
          }

          .feature-icon {
            height: 78px;
            width: 78px;
          }

          .feature-icon :global(svg) {
            font-size: 44px;
          }

          .home-products-section {
            min-height: auto;
          }

          .product-carousel-shell {
            gap: clamp(14px, 2vw, 28px);
            grid-template-columns: 62px minmax(0, 1fr) 62px;
          }

          .product-cards-row {
            grid-template-columns: repeat(3, minmax(0, 1fr));
          }

          .product-arrow-prev {
            grid-column: 1;
            grid-row: 1;
            justify-self: center;
          }

          .product-arrow-next {
            grid-column: 3;
            grid-row: 1;
            justify-self: center;
          }

          .product-card {
            min-height: auto;
          }

          .product-image-wrap {
            flex-basis: clamp(220px, 38vw, 340px);
            height: clamp(220px, 38vw, 340px);
          }
        }

        @media (max-width: 720px) {
          .hero {
            background-position: 78% center;
            padding-top: 210px;
          }

          .hero-copy br {
            display: none;
          }

          .hero-actions {
            width: 100%;
          }

          .action-shell,
          .primary-action,
          .secondary-action {
            width: 100%;
          }

          .feature-card {
            grid-template-columns: 1fr;
            padding: 30px 24px;
          }

          .feature-copy {
            grid-column: 1;
          }

          .home-about-section {
            padding-bottom: 88px;
            padding-top: 88px;
          }

          .about-section-copy h2 {
            display: block;
          }

          .about-title-main,
          .about-title-accent {
            display: block;
          }

          .about-section-copy p:not(.section-eyebrow) {
            max-width: none;
          }

          .founder-card-top {
            grid-template-columns: 1fr;
            padding: 38px 28px;
          }

          .founder-logo-ring {
            height: 136px;
            width: 136px;
          }

          .about-values-grid {
            grid-template-columns: 1fr;
            padding: 34px 28px;
          }

          .about-value {
            text-align: left;
          }

          .about-value-icon {
            height: 68px;
            margin-bottom: 18px;
            width: 68px;
          }

          .about-value-line {
            margin-left: 0;
          }

          .home-products-section {
            padding-bottom: 88px;
            padding-top: 88px;
          }

          .products-section-heading {
            text-align: left;
          }

          .products-section-heading h2 {
            justify-content: flex-start;
            text-align: left;
          }

          .products-heading-line {
            margin-left: 0;
          }

          .product-cards-row {
            gap: 18px;
            grid-template-columns: repeat(3, minmax(0, 1fr));
          }

          .product-card {
            padding: 30px 24px;
          }

          .product-meta {
            display: none;
          }

          .products-page-action-shell,
          .products-page-action {
            width: 100%;
          }
        }

        @media (max-width: 940px) {
          .product-carousel-shell {
            grid-template-columns: 1fr 1fr;
          }

          .product-cards-row {
            grid-column: 1 / -1;
            grid-row: 1;
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .product-arrow-prev {
            grid-column: 1;
            grid-row: 2;
            justify-self: end;
          }

          .product-arrow-next {
            grid-column: 2;
            grid-row: 2;
            justify-self: start;
          }
        }

        @media (max-width: 520px) {
          .hero {
            background-position: right center;
          }

          .about-primary-action {
            min-width: 0;
            width: 100%;
          }

          .about-action-shell {
            width: 100%;
          }

          .home-products-section {
            padding-left: 16px;
            padding-right: 16px;
          }

          .products-section-heading h2 {
            font-size: clamp(42px, 13vw, 58px);
          }

          .product-cards-row {
            gap: 14px;
            grid-column: 1 / -1;
            grid-row: 1;
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .product-carousel-shell {
            grid-template-columns: 1fr 1fr;
          }

          .product-arrow-prev {
            grid-column: 1;
            grid-row: 2;
            justify-self: end;
          }

          .product-arrow-next {
            grid-column: 2;
            grid-row: 2;
            justify-self: start;
          }

          .product-arrow {
            height: 58px;
            width: 58px;
          }

          .product-card {
            border-radius: 18px;
            padding: 24px 18px;
          }

          .product-card-icon {
            height: 44px;
            margin-bottom: 12px;
            width: 44px;
          }

          .product-card-icon :global(svg) {
            font-size: 25px;
          }

          .product-image-wrap {
            flex-basis: clamp(190px, 58vw, 270px);
            height: clamp(190px, 58vw, 270px);
            margin-bottom: 16px;
          }

          .product-card h3 {
            font-size: clamp(20px, 7vw, 30px);
            overflow-wrap: anywhere;
          }

          .product-card-line {
            margin: 16px 0;
            width: 44px;
          }

          .product-card-copy p {
            font-size: 13px;
            -webkit-line-clamp: 3;
          }

          .products-page-action {
            min-width: 0;
          }
        }
      `}</style>
    </>
  )
}
