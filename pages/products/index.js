import React, { useEffect, useMemo, useState } from "react"

import Head from "next/head"
import { motion } from "framer-motion"
import AutoAwesomeOutlinedIcon from "@mui/icons-material/AutoAwesomeOutlined"
import OpacityOutlinedIcon from "@mui/icons-material/OpacityOutlined"
import SpaOutlinedIcon from "@mui/icons-material/SpaOutlined"

const ALL_CATEGORIES = "All"
const FALLBACK_PRODUCT_COPY =
  "Premium New Standard cannabis product crafted with care, quality, and attention to detail."

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

const cardsContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.14,
    },
  },
}

const productCardVariants = {
  hidden: {
    opacity: 0,
    scale: 0.98,
    y: 28,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.9,
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
      duration: 0.84,
      ease: easeOut,
    },
  },
}

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

const formatProductPathValue = (value = "") => String(value).replace(/ /g, "_")

export default function Products({ works = [], imgs = [] }) {
  const [activeCategory, setActiveCategory] = useState(ALL_CATEGORIES)
  const [brokenProductImageIds, setBrokenProductImageIds] = useState([])

  const productItems = useMemo(() => {
    return [...works]
      .sort(sortByProductText)
      .map((work) => {
        const workImages = imgs
          .filter((img) => {
            const isSameWork = img.workId && work.id && img.workId === work.id
            const hasSameNames =
              img.collection === work.collection && img.item === work.item

            return img.url && (isSameWork || hasSameNames)
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
          title: productTitle,
          category: productCategory,
          accent: work.color3 || work.color2 || work.color1 || "#49BC88",
          description:
            primaryImage.message || work.description || FALLBACK_PRODUCT_COPY,
          image: primaryImage.url || "",
          href: `/products/${formatProductPathValue(
            productCategory
          )}/${formatProductPathValue(productTitle)}`,
        }
      })
      .filter((product) => {
        return product.image && !brokenProductImageIds.includes(product.id)
      })
  }, [works, imgs, brokenProductImageIds])

  const categories = useMemo(() => {
    return Array.from(new Set(productItems.map((product) => product.category)))
      .filter(Boolean)
      .sort((a, b) => a.localeCompare(b, undefined, { sensitivity: "base" }))
  }, [productItems])

  const categoryCounts = useMemo(() => {
    return productItems.reduce(
      (counts, product) => ({
        ...counts,
        [product.category]: (counts[product.category] || 0) + 1,
      }),
      {}
    )
  }, [productItems])

  const filteredProducts = useMemo(() => {
    if (activeCategory === ALL_CATEGORIES) return productItems

    return productItems.filter(
      (product) => product.category === activeCategory
    )
  }, [activeCategory, productItems])

  useEffect(() => {
    if (
      activeCategory !== ALL_CATEGORIES &&
      !categories.includes(activeCategory)
    ) {
      setActiveCategory(ALL_CATEGORIES)
    }
  }, [activeCategory, categories])

  const markProductImageBroken = (productId) => {
    setBrokenProductImageIds((oldIds) =>
      oldIds.includes(productId) ? oldIds : [...oldIds, productId]
    )
  }

  return (
    <>
      <Head>
        <title>Products | New Standard</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="Explore New Standard cannabis products by category, with product images, descriptions, and item details."
        />
      </Head>

      <main className="products-page">
        <motion.section
          className="products-hero"
          initial="hidden"
          variants={introVariants}
          viewport={{ once: true, amount: 0.25 }}
          whileInView="visible"
        >
          <motion.p className="section-eyebrow" variants={fadeUpVariants}>
            <SpaOutlinedIcon className="section-eyebrow-icon" />
            <span>Our Products</span>
          </motion.p>
          <motion.h1 variants={fadeUpVariants}>
            <span>Explore</span>{" "}
            <em>Our Products.</em>
          </motion.h1>
          <motion.div
            className="products-heading-line"
            variants={lineVariants}
          />
          <motion.p className="products-hero-copy" variants={fadeUpVariants}>
            Carefully crafted. Thoughtfully sourced. Browse every New Standard
            product by category.
          </motion.p>
        </motion.section>

        {productItems.length > 0 ? (
          <>
            <motion.div
              className="category-filter"
              initial="hidden"
              variants={cardsContainerVariants}
              viewport={{ once: true, amount: 0.25 }}
              whileInView="visible"
            >
              {[ALL_CATEGORIES, ...categories].map((category) => {
                const isActive = activeCategory === category
                const count =
                  category === ALL_CATEGORIES
                    ? productItems.length
                    : categoryCounts[category] || 0

                return (
                  <motion.button
                    aria-pressed={isActive}
                    className={
                      isActive
                        ? "category-filter-button category-filter-button-active"
                        : "category-filter-button"
                    }
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    type="button"
                    variants={fadeUpVariants}
                  >
                    <span>{category}</span>
                    <strong>{count}</strong>
                  </motion.button>
                )
              })}
            </motion.div>

            <motion.section
              className="products-grid"
              initial="hidden"
              key={activeCategory}
              variants={cardsContainerVariants}
              viewport={{ once: true, amount: 0.01 }}
              whileInView="visible"
            >
              {filteredProducts.map((product, index) => {
                const Icon = getProductIcon(product.category)

                return (
                  <motion.article
                    className="product-card"
                    key={product.id}
                    style={{ "--product-accent": product.accent }}
                    variants={productCardVariants}
                  >
                    <img
                      alt=""
                      aria-hidden="true"
                      className="product-card-watermark"
                      src="/logo.png"
                    />
                    <div className="product-card-icon">
                      <Icon />
                    </div>
                    <div className="product-image-wrap">
                      <img
                        alt={product.title}
                        className="product-image"
                        decoding="async"
                        loading={index < 6 ? "eager" : "lazy"}
                        onError={() => markProductImageBroken(product.id)}
                        src={product.image}
                      />
                    </div>
                    <div className="product-card-copy">
                      <h2>{product.title}</h2>
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
                      <a className="product-detail-link" href={product.href}>
                        View Details
                      </a>
                    </div>
                  </motion.article>
                )
              })}
            </motion.section>
          </>
        ) : (
          <motion.div
            className="product-empty"
            initial="hidden"
            variants={productCardVariants}
            viewport={{ once: true, amount: 0.35 }}
            whileInView="visible"
          >
            Products are loading from Firebase.
          </motion.div>
        )}
      </main>

      <style jsx global>{`
        .products-page {
          background: radial-gradient(
              circle at 50% 24%,
              rgba(73, 188, 136, 0.13),
              rgba(73, 188, 136, 0.04) 32%,
              transparent 58%
            ),
            linear-gradient(180deg, #010504 0%, #020b09 48%, #010504 100%);
          color: #ffffff;
          font-family: "Montserrat", sans-serif;
          min-height: 100vh;
          overflow: hidden;
          padding: clamp(170px, 15vw, 220px) clamp(20px, 5vw, 96px)
            clamp(72px, 8vw, 126px);
          position: relative;
        }

        .products-page::before {
          background: radial-gradient(
              circle at 14% 22%,
              rgba(73, 188, 136, 0.09),
              transparent 28%
            ),
            radial-gradient(
              circle at 86% 18%,
              rgba(73, 188, 136, 0.07),
              transparent 26%
            ),
            radial-gradient(
              circle at 72% 84%,
              rgba(73, 188, 136, 0.08),
              transparent 30%
            );
          content: "";
          inset: 0;
          pointer-events: none;
          position: absolute;
        }

        .products-page > * {
          position: relative;
          z-index: 1;
        }

        .products-hero {
          margin: 0 auto clamp(38px, 5vw, 72px);
          max-width: 860px;
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

        .products-hero .section-eyebrow {
          justify-content: center;
          margin-bottom: 18px;
        }

        .products-hero h1 {
          color: #f8f8f3;
          font-family: "Cormorant Garamond", Georgia, serif;
          font-size: clamp(52px, 6vw, 94px);
          font-weight: 600;
          letter-spacing: 0;
          line-height: 0.96;
          margin: 0;
          text-shadow: 0 2px 16px rgba(0, 0, 0, 0.52);
        }

        .products-hero h1 span,
        .products-hero h1 em {
          display: inline-block;
          font-style: normal;
        }

        .products-hero h1 em {
          color: #49bc88;
          margin-left: 0.08em;
        }

        .products-heading-line {
          background: #49bc88;
          height: 3px;
          margin: 28px auto 28px;
          transform-origin: center;
          width: 58px;
        }

        .products-hero-copy {
          color: rgba(255, 255, 255, 0.78);
          font-size: clamp(17px, 1.25vw, 23px);
          line-height: 1.55;
          margin: 0 auto;
          max-width: 720px;
        }

        .category-filter {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          justify-content: center;
          margin: 0 auto clamp(34px, 4vw, 58px);
          max-width: 1240px;
        }

        .category-filter-button {
          align-items: center;
          background: rgba(4, 15, 13, 0.72);
          border: 1px solid rgba(73, 188, 136, 0.42);
          border-radius: 999px;
          color: rgba(255, 255, 255, 0.82);
          cursor: pointer;
          display: inline-flex;
          font-family: "Montserrat", sans-serif;
          font-size: 14px;
          font-weight: 700;
          gap: 12px;
          letter-spacing: 0.06em;
          min-height: 46px;
          padding: 11px 17px 11px 20px;
          text-transform: uppercase;
          transition: background 180ms ease, border-color 180ms ease,
            box-shadow 180ms ease, color 180ms ease, transform 180ms ease;
        }

        .category-filter-button:hover,
        .category-filter-button-active {
          background: rgba(73, 188, 136, 0.16);
          border-color: #49bc88;
          box-shadow: 0 0 24px rgba(73, 188, 136, 0.16);
          color: #ffffff;
          transform: translateY(-1px);
        }

        .category-filter-button strong {
          align-items: center;
          background: rgba(73, 188, 136, 0.16);
          border: 1px solid rgba(73, 188, 136, 0.28);
          border-radius: 999px;
          color: #49bc88;
          display: inline-flex;
          font-size: 12px;
          height: 24px;
          justify-content: center;
          min-width: 24px;
          padding: 0 7px;
        }

        .products-grid {
          display: grid;
          gap: clamp(22px, 2.3vw, 40px);
          grid-template-columns: repeat(3, minmax(0, 1fr));
          margin: 0 auto;
          max-width: 1620px;
        }

        .product-card {
          --product-accent: #49bc88;
          background: rgba(4, 15, 13, 0.66);
          border: 1px solid rgba(255, 255, 255, 0.24);
          border-radius: 22px;
          box-shadow: 0 24px 62px rgba(0, 0, 0, 0.34);
          display: flex;
          flex-direction: column;
          min-height: 620px;
          overflow: hidden;
          padding: clamp(28px, 2.3vw, 38px) clamp(24px, 2.1vw, 36px)
            clamp(28px, 2.1vw, 38px);
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

        .product-card-copy {
          display: flex;
          flex: 1;
          flex-direction: column;
        }

        .product-card h2 {
          color: #ffffff;
          font-family: "Cormorant Garamond", Georgia, serif;
          font-size: clamp(29px, 2.1vw, 40px);
          font-weight: 700;
          letter-spacing: 0;
          line-height: 1.02;
          margin: 0;
          overflow-wrap: anywhere;
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
          -webkit-line-clamp: 5;
          line-height: 1.55;
          margin: 0 0 26px;
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

        .product-detail-link {
          align-items: center;
          align-self: flex-start;
          border: 1px solid rgba(73, 188, 136, 0.58);
          border-radius: 8px;
          color: #49bc88;
          display: inline-flex;
          font-size: 14px;
          font-weight: 700;
          justify-content: center;
          letter-spacing: 0.05em;
          margin-top: 24px;
          min-height: 42px;
          padding: 11px 18px;
          text-decoration: none;
          text-transform: uppercase;
          transition: background 180ms ease, color 180ms ease,
            box-shadow 180ms ease, transform 180ms ease;
        }

        .product-detail-link:hover {
          background: rgba(73, 188, 136, 0.14);
          box-shadow: 0 0 22px rgba(73, 188, 136, 0.16);
          color: #ffffff;
          transform: translateY(-1px);
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
          .products-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .product-card {
            min-height: auto;
          }

          .product-image-wrap {
            flex-basis: clamp(220px, 34vw, 340px);
            height: clamp(220px, 34vw, 340px);
          }
        }

        @media (max-width: 720px) {
          .products-page {
            padding-left: 18px;
            padding-right: 18px;
            padding-top: clamp(164px, 25vw, 196px);
          }

          .products-hero {
            text-align: left;
          }

          .products-hero .section-eyebrow {
            justify-content: flex-start;
          }

          .products-hero h1 {
            font-size: clamp(46px, 14vw, 70px);
          }

          .products-hero h1 span,
          .products-hero h1 em {
            display: inline;
          }

          .products-heading-line {
            margin-left: 0;
            transform-origin: left center;
          }

          .category-filter {
            justify-content: flex-start;
          }

          .category-filter-button {
            font-size: 12px;
            min-height: 42px;
            padding: 10px 14px 10px 16px;
          }

          .products-grid {
            grid-template-columns: 1fr;
          }

          .product-card {
            border-radius: 18px;
            padding: 28px 22px;
          }

          .product-image-wrap {
            flex-basis: clamp(210px, 68vw, 330px);
            height: clamp(210px, 68vw, 330px);
          }
        }

        @media (max-width: 480px) {
          .products-page {
            padding-left: 14px;
            padding-right: 14px;
            padding-top: clamp(212px, 56vw, 248px);
          }

          .products-hero h1 {
            font-size: clamp(40px, 14vw, 58px);
          }

          .product-card {
            padding: 24px 14px;
          }

          .product-card-icon {
            height: 48px;
            width: 48px;
          }

          .product-card-icon :global(svg) {
            font-size: 28px;
          }

          .product-image-wrap {
            flex-basis: clamp(170px, 58vw, 260px);
            height: clamp(170px, 58vw, 260px);
            margin-bottom: 18px;
          }

          .product-card h2 {
            font-size: clamp(25px, 8vw, 34px);
          }

          .product-card-copy p {
            font-size: 14px;
          }

          .product-meta {
            gap: 16px;
          }

          .product-meta div + div {
            padding-left: 16px;
          }

          .product-detail-link {
            width: 100%;
          }
        }
      `}</style>
    </>
  )
}
