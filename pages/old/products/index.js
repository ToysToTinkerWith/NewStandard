import React, { useState, useEffect, useContext } from "react"

import Head from "next/head"

import WorksDatabase from "../../../components/Works/WorksDatabase"

import NewWorks from "../../../components/Works/NewWorks"
import EditWorks from "../../../components/Works/EditWorks"

import { getAuth } from "firebase/auth"

import { motion } from "framer-motion"

import { Grid, Card, Button, Modal, Typography } from "@mui/material"

export default class Work extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      works: [],
      imgs: [],
      newWorks: false,
      editWorks: null,
      selWork: null,
      selCol: null,
    }

    this.preloadedProductImageUrls = new Set()
    this.activeProductImagePreloads = new Map()
  }

  componentDidMount() {
    this.preloadCollectionImages(this.props.imgs)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.imgs !== this.props.imgs) {
      this.preloadCollectionImages(this.props.imgs)
    }
  }

  getCollectionPreviewImageUrls(imgs = [], limitPerCollection = 4) {
    const imageUrlsByCollection = {}

    imgs.forEach((img) => {
      const collectionName = String(img?.collection || "")
      const imageUrl = img?.url

      if (!collectionName || !imageUrl) {
        return
      }

      if (!imageUrlsByCollection[collectionName]) {
        imageUrlsByCollection[collectionName] = []
      }

      if (
        imageUrlsByCollection[collectionName].length < limitPerCollection &&
        !imageUrlsByCollection[collectionName].includes(imageUrl)
      ) {
        imageUrlsByCollection[collectionName].push(imageUrl)
      }
    })

    const preloadedImageUrls = []
    const collectionNames = Object.keys(imageUrlsByCollection)

    for (let index = 0; index < limitPerCollection; index += 1) {
      collectionNames.forEach((collectionName) => {
        const imageUrl = imageUrlsByCollection[collectionName][index]

        if (imageUrl) {
          preloadedImageUrls.push(imageUrl)
        }
      })
    }

    return preloadedImageUrls
  }

  preloadCollectionImages(imgs = []) {
    if (typeof window === "undefined" || !Array.isArray(imgs)) {
      return
    }

    this.getCollectionPreviewImageUrls(imgs).forEach((imageUrl) => {
      if (this.preloadedProductImageUrls.has(imageUrl)) {
        return
      }

      this.preloadedProductImageUrls.add(imageUrl)

      const preloadImage = new window.Image()
      preloadImage.onload = () => this.activeProductImagePreloads.delete(imageUrl)
      preloadImage.onerror = () => this.activeProductImagePreloads.delete(imageUrl)
      preloadImage.decoding = "async"
      this.activeProductImagePreloads.set(imageUrl, preloadImage)
      preloadImage.src = imageUrl
    })
  }

  getPageStyle() {
    return {
      minHeight: "100vh",
      backgroundColor: "#011000",
      overflow: "hidden",
      padding: "28px 18px 56px",
    }
  }

  getContainerStyle() {
    return {
      width: "100%",
      maxWidth: 1240,
      margin: "0 auto",
    }
  }

  getPanelStyle() {
    return {
      background:
        "radial-gradient(circle at top left, rgba(73,188,136,0.10), transparent 35%), #011000",
      border: "1px solid #49BC88",
      borderRadius: 18,
      boxShadow: "0 0 24px rgba(73,188,136,0.08)",
    }
  }

  getButtonStyle() {
    return {
      border: "1px solid #49BC88",
      borderRadius: 10,
      backgroundColor: "#011000",
      color: "#49BC88",
      textTransform: "none",
    }
  }

  render() {
    let sortedWorks = []

    this.props.works.forEach((work) => {
      let found = false
      sortedWorks.forEach((sWork, index) => {
        if (work.collection == sWork.works[0].collection) {
          found = true
          sortedWorks[index] = {
            works: [...sWork.works, work],
            num: sWork.num + 1,
          }
        }
      })
      if (!found) {
        sortedWorks.push({ works: [work], num: 1 })
      }
    })

    const auth = getAuth()
    const user = auth.currentUser

    return (
      <div style={this.getPageStyle()}>
        <Head>
          <title>Products</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta
            name="description"
            content="Discover the essence of choice and quality with New Standard. Our diverse range of top-tier cannabis products, from unique live resin cartridges to adaptable serums, is crafted to cater to every preference."
          />
          <meta name="keywords" content="Products, Serum, Cartridges, Variety." />
        </Head>

        <div style={this.getContainerStyle()}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 16,
              flexWrap: "wrap",
              marginBottom: 22,
              position: "relative",
            }}
          >
            <div style={{ width: "100%" }}>
              <Typography
                align="center"
                variant="h3"
                style={{
                  color: "#49BC88",
                  marginBottom: 8,
                }}
              >
                Products
              </Typography>

              <Typography
                align="center"
                variant="body1"
                style={{
                  color: "#49BC88",
                  opacity: 0.85,
                  lineHeight: 1.7,
                  maxWidth: 720,
                  margin: "0 auto",
                }}
              >
                Explore the current product collections and open any collection to
                view its individual items and details.
              </Typography>
            </div>

            {user &&
            (user.email == "abergquist96@gmail.com" ||
              user.email == "newstandard710@gmail.com") ? (
              <Button
                style={{
                  ...this.getButtonStyle(),
                  minWidth: 52,
                  height: 52,
                  padding: 0,
                  position: "absolute",
                  right: 0,
                  top: 0,
                }}
                onClick={() => this.setState({ newWorks: true })}
              >
                <Typography variant="h5" style={{ color: "#49BC88" }}>
                  +
                </Typography>
              </Button>
            ) : null}
          </div>

          <Grid container spacing={3}>
            {sortedWorks.length > 0
              ? sortedWorks.map((work, index) => {
                  const collectionName = String(work?.works?.[0]?.collection || "")
                  const collectionHref = collectionName
                    ? "/products/" + collectionName.replace(/ /g, "_")
                    : "/products"

                  const collectionImgs = this.props.imgs.filter(
                    (img) => img.collection == collectionName
                  )

                  return (
                    <Grid item key={index} xs={12} md={6}>
                      <Button
                        style={{
                          ...this.getPanelStyle(),
                          width: "100%",
                          height: "100%",
                          padding: 0,
                          overflow: "hidden",
                          display: "block",
                          textAlign: "left",
                        }}
                        href={collectionHref}
                      >
                        <div
                          style={{
                            padding: 22,
                            minHeight: 420,
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                          }}
                        >
                          <div>
                            <Typography
                              align="center"
                              variant="h4"
                              style={{
                                color: "#49BC88",
                                marginBottom: 10,
                              }}
                            >
                              {collectionName || "Untitled Collection"}
                            </Typography>

                            <Typography
                              align="center"
                              variant="h6"
                              style={{
                                color: "#49BC88",
                                opacity: 0.85,
                                marginBottom: 10,
                              }}
                            >
                              {work.num} items
                            </Typography>
                          </div>

                          <div
                            style={{
                              position: "relative",
                              minHeight: 250,
                              height: 250,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              overflow: "hidden",
                            }}
                          >
                            {collectionImgs.length > 0
                              ? collectionImgs.map((img, imgIndex) => (
                                  <motion.div
                                    key={`${collectionName}-${imgIndex}`}
                                    animate={{
                                      x: [120, 0, 0, 0, -120],
                                      opacity: [0, 1, 1, 1, 0],
                                    }}
                                    transition={{
                                      duration: 8,
                                      delay: 8 * imgIndex,
                                      repeat: Infinity,
                                      repeatDelay: Math.max(
                                        0,
                                        8 * (collectionImgs.length - 1)
                                      ),
                                    }}
                                    style={{
                                      position: "absolute",
                                      inset: 0,
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "center",
                                      padding: 16,
                                    }}
                                  >
                                    <img
                                      src={img.url}
                                      alt={img.message || collectionName}
                                      loading="eager"
                                      decoding="async"
                                      style={{
                                        maxWidth: "100%",
                                        maxHeight: "100%",
                                        width: "auto",
                                        height: "auto",
                                        objectFit: "contain",
                                        borderRadius: 16,
                                        display: "block",
                                        margin: "auto",
                                      }}
                                    />
                                  </motion.div>
                                ))
                              : null}
                          </div>
                        </div>
                      </Button>
                    </Grid>
                  )
                })
              : null}
          </Grid>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: 28,
              marginBottom: 34,
            }}
          >
            <Button
              style={{
                ...this.getButtonStyle(),
                width: 220,
                padding: "12px 16px",
              }}
              onClick={() =>
                window.open("https://www.iheartjane.com/brands/24293/new-standard")
              }
            >
              <Typography
                align="center"
                variant="h6"
                style={{ color: "#49BC88" }}
              >
                Order Online
              </Typography>
            </Button>
          </div>


            <WorksDatabase
              works={this.props.works}
              imgs={this.props.imgs}
              selWork={(work) => this.setState({ selWork: work })}
              editWorks={(editWorks) => this.setState({ editWorks: editWorks })}
              user={user}
            />

          {this.state.newWorks ? (
            <Modal
              open={true}
              onClose={() => this.setState({ newWorks: false })}
              style={{
                overflowY: "auto",
                overflowX: "hidden",
                padding: 18,
              }}
            >
              <Card
                style={{
                  backgroundColor: "#011000",
                  maxWidth: 1200,
                  margin: "30px auto",
                  borderRadius: 18,
                  border: "1px solid #49BC88",
                }}
              >
                <Button
                  variant="outlined"
                  color="primary"
                  style={{
                    margin: 20,
                    backgroundColor: "#011000",
                    borderColor: "#49BC88",
                  }}
                  onClick={() => this.setState({ newWorks: false })}
                >
                  <Typography style={{ color: "#49BC88" }}>Back</Typography>
                </Button>
                <NewWorks closeModal={() => this.setState({ newWorks: false })} />
              </Card>
            </Modal>
          ) : null}

          {this.state.editWorks ? (
            <Modal
              open={true}
              onClose={() => this.setState({ editWorks: null })}
              style={{
                overflowY: "auto",
                overflowX: "hidden",
                padding: 18,
              }}
            >
              <Card
                style={{
                  backgroundColor: "#011000",
                  maxWidth: 1200,
                  margin: "30px auto",
                  borderRadius: 18,
                  border: "1px solid #49BC88",
                }}
              >
                <Button
                  variant="outlined"
                  color="primary"
                  style={{
                    margin: 20,
                    backgroundColor: "#011000",
                    borderColor: "#49BC88",
                  }}
                  onClick={() => this.setState({ editWorks: null })}
                >
                  <Typography style={{ color: "#49BC88" }}>Back</Typography>
                </Button>
                <EditWorks
                  closeModal={() => this.setState({ editWorks: null })}
                  work={this.state.editWorks}
                />
              </Card>
            </Modal>
          ) : null}

          {this.state.selWork ? (
            <Modal
              open={true}
              onClick={() => this.setState({ selWork: null })}
              onClose={() => this.setState({ selWork: null })}
              style={{
                overflowY: "auto",
                overflowX: "hidden",
                padding: 18,
              }}
            >
              <Card
                style={{
                  backgroundColor: "#011000",
                  maxWidth: 1000,
                  margin: "30px auto",
                  borderRadius: 18,
                  border: "1px solid #49BC88",
                  padding: "26px 20px",
                }}
              >
                <Typography
                  align="center"
                  variant="h3"
                  style={{
                    color: "#49BC88",
                    marginBottom: 10,
                  }}
                >
                  {this.state.selWork.item}
                </Typography>

                <Typography
                  align="center"
                  variant="h5"
                  style={{
                    color: "#49BC88",
                    opacity: 0.9,
                    marginBottom: 20,
                  }}
                >
                  {this.state.selWork.collection}
                </Typography>

                {this.props.imgs.length > 0
                  ? this.props.imgs.map((img, index) => {
                      if (
                        img.collection == this.state.selWork.collection &&
                        img.item == this.state.selWork.item
                      ) {
                        return (
                          <div
                            key={index}
                            style={{
                              display: "grid",
                              padding: 20,
                            }}
                          >
                            <img
                              src={img.url}
                              style={{
                                width: "100%",
                                maxWidth: 700,
                                margin: "0 auto",
                                borderRadius: 16,
                              }}
                            />
                            <Typography
                              align="center"
                              variant="subtitle1"
                              style={{
                                color: "#49BC88",
                                marginTop: 14,
                              }}
                            >
                              {img.message}
                            </Typography>
                          </div>
                        )
                      }

                      return null
                    })
                  : null}
              </Card>
            </Modal>
          ) : null}
        </div>
      </div>
    )
  }
}
