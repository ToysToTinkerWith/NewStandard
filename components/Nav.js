import React from "react"

import { useRouter } from "next/router"
import SpaOutlinedIcon from "@mui/icons-material/SpaOutlined"

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/products", label: "Products" },
  { href: "/press", label: "Press" },
]

export default function Nav({ isNwLeafPage = false }) {
  const router = useRouter()
  const activePath = router.asPath?.split("?")[0] || "/"
  const shouldUseNwLeafNav =
    isNwLeafPage || activePath === "/nwleaf" || activePath === "/nwleaf3"

  return (
    <header
      className={`site-nav${shouldUseNwLeafNav ? " site-nav-nwleaf" : ""}`}
    >
      <a className="brand" href="/">
        <img className="brand-mark" src="/logo.png" alt="New Standard" />
        <span className="brand-name">New Standard</span>
      </a>

      <nav className="nav-links" aria-label="Primary navigation">
        {links.map((link) => {
          const isActive =
            activePath === link.href ||
            (link.href !== "/" && activePath.startsWith(link.href))

          return (
            <a
              className={`nav-link${isActive ? " active" : ""}`}
              href={link.href}
              key={link.href}
            >
              {link.label}
            </a>
          )
        })}

        <a
          className="shop-link"
          href="https://www.iheartjane.com/brands/24293/new-standard"
          rel="noreferrer"
          target="_blank"
        >
          <SpaOutlinedIcon className="shop-icon" />
          <span>Shop Now</span>
        </a>
      </nav>

      <style jsx>{`
        .site-nav {
          align-items: center;
          animation: navFadeIn 1440ms ease both;
          display: flex;
          gap: 36px;
          justify-content: space-between;
          left: 0;
          padding: 50px clamp(24px, 6vw, 120px) 24px;
          position: absolute;
          right: 0;
          top: 0;
          z-index: 40;
        }

        .site-nav.site-nav-nwleaf {
          background-color: #010b08;
          background-image: linear-gradient(
              180deg,
              rgba(1, 11, 8, 0.18) 0%,
              rgba(1, 11, 8, 0.42) 58%,
              rgba(1, 11, 8, 0.68) 100%
            ),
            url("/nwleafNavBackground.png");
          background-position: center 38%;
          background-repeat: no-repeat;
          background-size: cover;
          left: auto;
          min-height: clamp(136px, 12vw, 208px);
          padding: clamp(24px, 3.4vw, 52px) clamp(24px, 6vw, 120px);
          position: relative;
          right: auto;
          top: auto;
          width: 100%;
        }

        .brand {
          align-items: center;
          color: #ffffff;
          display: inline-flex;
          gap: 24px;
          text-decoration: none;
        }

        .brand-mark {
          display: block;
          height: 90px;
          object-fit: contain;
          width: 90px;
        }

        .brand-name {
          color: #ffffff;
          font-family: "Oswald", "Montserrat", sans-serif;
          font-size: clamp(24px, 2vw, 36px);
          font-weight: 500;
          letter-spacing: 0.16em;
          line-height: 1;
          text-transform: uppercase;
        }

        .nav-links {
          align-items: center;
          display: flex;
            gap: clamp(22px, 3vw, 54px);
        }

        .nav-link {
          color: rgba(255, 255, 255, 0.92);
          font-family: "Montserrat", sans-serif;
          font-size: clamp(15px, 1.2vw, 22px);
          font-weight: 500;
          padding: 8px 0 16px;
          position: relative;
          text-decoration: none;
        }

        .nav-link::after {
          background: #49bc88;
          bottom: 0;
          content: "";
          height: 2px;
          left: 50%;
          opacity: 0;
          position: absolute;
          transform: translateX(-50%);
          transition: opacity 160ms ease, width 160ms ease;
          width: 0;
        }

        .nav-link.active::after,
        .nav-link:hover::after {
          opacity: 1;
          width: 82px;
        }

        .shop-link {
          align-items: center;
          border: 1px solid #49bc88;
          border-radius: 12px;
          color: #49bc88;
          display: inline-flex;
          font-family: "Montserrat", sans-serif;
          font-size: clamp(15px, 1.2vw, 22px);
          font-weight: 600;
          gap: 14px;
          padding: 18px 28px;
          text-decoration: none;
          transition: background 160ms ease, box-shadow 160ms ease,
            transform 160ms ease;
          white-space: nowrap;
        }

        .shop-link:hover {
          background: rgba(73, 188, 136, 0.1);
          box-shadow: 0 0 28px rgba(73, 188, 136, 0.18);
          transform: translateY(-1px);
        }

        .shop-icon {
          font-size: 28px;
        }

        @keyframes navFadeIn {
          from {
            opacity: 0;
            transform: translateY(-12px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 900px) {
          .site-nav {
            align-items: flex-start;
            gap: 20px;
            padding-top: 24px;
          }

          .site-nav.site-nav-nwleaf {
            padding-top: 24px;
          }

          .brand {
            gap: 12px;
          }

          .brand-mark {
            height: 58px;
            width: 58px;
          }

          .nav-links {
            flex-wrap: wrap;
            gap: 14px 24px;
            justify-content: flex-end;
          }

          .shop-link {
            padding: 12px 16px;
          }
        }

        @media (max-width: 640px) {
          .site-nav {
            background: linear-gradient(
              180deg,
              rgba(1, 16, 0, 0.88),
              rgba(1, 16, 0, 0.18)
            );
            flex-direction: column;
            padding: 18px 18px 12px;
            position: absolute;
          }

          .site-nav.site-nav-nwleaf {
            background-color: #010b08;
            background-image: linear-gradient(
                180deg,
                rgba(1, 11, 8, 0.18) 0%,
                rgba(1, 11, 8, 0.46) 60%,
                rgba(1, 11, 8, 0.72) 100%
              ),
              url("/nwleafNavBackground.png");
            background-position: center 34%;
            background-repeat: no-repeat;
            background-size: cover;
            min-height: 164px;
            position: relative;
          }

          .brand-name {
            font-size: 22px;
          }

          .nav-links {
            justify-content: flex-start;
            width: 100%;
          }

          .nav-link {
            font-size: 14px;
            padding-bottom: 8px;
          }

          .nav-link.active::after,
          .nav-link:hover::after {
            width: 44px;
          }

          .shop-link {
            font-size: 14px;
          }
        }
      `}</style>
    </header>
  )
}
