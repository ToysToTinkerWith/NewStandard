import React from "react"

import Head from "next/head"

import WorksDatabase from "../../../components/Works/WorksDatabase"
import NewWorks from "../../../components/Works/NewWorks"
import EditWorks from "../../../components/Works/EditWorks"

import { AuthContext } from "../../../Firebase/FirebaseAuth"

import {
  Grid,
  Card,
  Button,
  Modal,
  Typography,
} from "@mui/material"

const normalizeSlugValue = (value) =>
  decodeURIComponent(String(value || ""))
    .replace(/_/g, " ")
    .trim()
    .toLowerCase()

export default class ID extends React.Component {
  static contextType = AuthContext

  constructor(props) {
    super(props)
    this.state = {
      works: [],
      newWorks: false,
      editWorks: null,
      collection: "",
      piece: "",
    }
  }

  componentDidMount() {
    let place = window.location.pathname.split("/")

    this.setState({
      collection: place[2] ? decodeURIComponent(place[2]).replace(/_/g, " ") : "",
    })

    if (place.length > 3 && place[3]) {
      this.setState({
        piece: decodeURIComponent(place[3]).replace(/_/g, " "),
      })
    }
  }

  getPageStyle() {
    return {
      backgroundColor: "#011000",
      minHeight: "100vh",
      padding: "28px 18px 56px",
    }
  }

  getContainerStyle() {
    return {
      width: "100%",
      maxWidth: 1220,
      margin: "0 auto",
    }
  }

  getPanelStyle() {
    return {
      background:
        "radial-gradient(circle at top left, rgba(73,188,136,0.08), transparent 35%), #011000",
      border: "1px solid #49BC88",
      borderRadius: 18,
      boxShadow: "0 0 24px rgba(73,188,136,0.08)",
    }
  }

  getButtonStyle() {
    return {
      border: "1px solid #49BC88",
      borderRadius: 10,
      color: "#49BC88",
      backgroundColor: "#011000",
      textTransform: "none",
    }
  }

  render() {
    let sortedWorks = []

    if (this.state.piece) {
      this.props.works.forEach((work) => {
        if (
          normalizeSlugValue(this.state.collection) ==
            normalizeSlugValue(work.collection) &&
          normalizeSlugValue(this.state.piece) == normalizeSlugValue(work.item)
        ) {
          sortedWorks.push(work)
        }
      })
    } else {
      this.props.works.forEach((work) => {
        if (
          normalizeSlugValue(this.state.collection) ==
          normalizeSlugValue(work.collection)
        ) {
          sortedWorks.push(work)
        }
      })
    }

    if (sortedWorks.length > 0) {
      const collectionTitle = sortedWorks[0]?.collection || this.state.collection

      if (this.state.piece) {
        const activeWork = sortedWorks[0]
        const matchingImgs =
          this.props.imgs?.filter(
            (img) =>
              img.collection == activeWork.collection &&
              img.item == activeWork.item
          ) || []

        return (
          <div style={this.getPageStyle()}>
            <Head>
              <title>{activeWork.item} | Products</title>
              <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>

            <div style={this.getContainerStyle()}>
              <Card
                elevation={0}
                style={{
                  ...this.getPanelStyle(),
                  padding: "28px 20px 30px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginBottom: 18,
                  }}
                >
                  <Button
                    href={`/products/${String(activeWork.collection || "").replace(/ /g, "_")}`}
                    style={{
                      ...this.getButtonStyle(),
                      padding: "8px 14px",
                    }}
                  >
                    <Typography
                      variant="body2"
                      style={{ color: "#49BC88", fontWeight: 500 }}
                    >
                      ← Back to {activeWork.collection}
                    </Typography>
                  </Button>
                </div>

                <Typography
                  color="primary"
                  align="center"
                  variant="h3"
                  style={{
                    marginBottom: 8,
                    color: "#49BC88",
                  }}
                >
                  {activeWork.item}
                </Typography>

                <Typography
                  color="primary"
                  align="center"
                  variant="h5"
                  style={{
                    marginBottom: activeWork.description ? 14 : 26,
                    color: "#49BC88",
                    opacity: 0.9,
                  }}
                >
                  {activeWork.collection}
                </Typography>

                {activeWork.description ? (
                  <Typography
                    align="center"
                    variant="body1"
                    style={{
                      maxWidth: 760,
                      margin: "0 auto 28px",
                      color: "#49BC88",
                      opacity: 0.88,
                      lineHeight: 1.7,
                    }}
                  >
                    {activeWork.description}
                  </Typography>
                ) : null}

                <Grid container spacing={3}>
                  {matchingImgs.map((img, index) => (
                    <Grid item xs={12} md={6} key={index}>
                      <Card
                        elevation={0}
                        style={{
                          backgroundColor: "rgba(73,188,136,0.03)",
                          border: "1px solid rgba(73,188,136,0.35)",
                          borderRadius: 16,
                          padding: 16,
                          height: "100%",
                        }}
                      >
                        <img
                          src={img.url}
                          style={{
                            width: "100%",
                            maxWidth: 520,
                            height: "auto",
                            maxHeight: 420,
                            objectFit: "contain",
                            display: "block",
                            margin: "0 auto",
                            borderRadius: 14,
                          }}
                        />
                        {img.message ? (
                          <Typography
                            color="primary"
                            align="center"
                            variant="body2"
                            style={{
                              marginTop: 14,
                              color: "#49BC88",
                              opacity: 0.9,
                              lineHeight: 1.65,
                            }}
                          >
                            {img.message}
                          </Typography>
                        ) : null}
                      </Card>
                    </Grid>
                  ))}
                </Grid>

                <div style={{ display: "flex", justifyContent: "center", marginTop: 28 }}>
                  <Button
                    style={{
                      ...this.getButtonStyle(),
                      width: 220,
                      padding: "12px 16px",
                    }}
                    onClick={() =>
                      window.open(
                        "https://www.iheartjane.com/brands/24293/new-standard"
                      )
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
              </Card>
            </div>
          </div>
        )
      } else {
        return (
          <div style={this.getPageStyle()}>
            <Head>
              <title>{this.state.collection} | Products</title>
              <meta name="viewport" content="width=device-width, initial-scale=1" />
              <meta
                name="description"
                content="Discover the essence of choice and quality with New Standard. Our diverse range of top-tier cannabis products, from unique live resin cartridges to adaptable serums, is crafted to cater to every preference."
              />
              <meta
                name="keywords"
                content="Products, Serum, Cartridges, Variety."
              />
            </Head>

            <div style={this.getContainerStyle()}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 16,
                  flexWrap: "wrap",
                  marginBottom: 22,
                }}
              >
                <Button
                  href="/products"
                  style={{
                    ...this.getButtonStyle(),
                    padding: "8px 14px",
                  }}
                >
                  <Typography
                    align="center"
                    variant="body1"
                    style={{ color: "#49BC88" }}
                  >
                    ← Products
                  </Typography>
                </Button>

                {this.context.currentUser &&
                this.context.currentUser.email == "abergquist96@gmail.com" ? (
                  <Button
                    style={{
                      ...this.getButtonStyle(),
                      minWidth: 48,
                      height: 48,
                      padding: 0,
                    }}
                    onClick={() => this.setState({ newWorks: true })}
                  >
                    <Typography variant="h5" style={{ color: "#49BC88" }}>
                      +
                    </Typography>
                  </Button>
                ) : null}
              </div>

              <Card
                elevation={0}
                style={{
                  ...this.getPanelStyle(),
                  padding: "26px 20px 24px",
                  marginBottom: 28,
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
                  {collectionTitle}
                </Typography>

                <Typography
                  align="center"
                  variant="body1"
                  style={{
                    color: "#49BC88",
                    opacity: 0.85,
                    maxWidth: 760,
                    margin: "0 auto",
                    lineHeight: 1.7,
                  }}
                >
                  Browse the items in this collection and open each one for its
                  images and details.
                </Typography>
              </Card>

              <Grid container spacing={3}>
                {sortedWorks.map((work, index) => {
                  const workImgs =
                    this.props.imgs?.filter(
                      (img) =>
                        img.collection == work.collection && img.item == work.item
                    ) || []

                  const previewImg = workImgs[0]

                  return (
                    <Grid item xs={12} md={6} key={index}>
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
                        href={
                          window.location.pathname +
                          "/" +
                          String(work.item || "").replace(/ /g, "_")
                        }
                      >
                        <div style={{ padding: 22 }}>
                          <Typography
                            align="left"
                            variant="h4"
                            style={{
                              marginBottom: 10,
                              color: "#49BC88",
                            }}
                          >
                            {work.item}
                          </Typography>

                          {work.description ? (
                            <Typography
                              align="left"
                              variant="body2"
                              style={{
                                color: "#49BC88",
                                opacity: 0.88,
                                lineHeight: 1.7,
                                marginBottom: previewImg ? 20 : 0,
                              }}
                            >
                              {work.description}
                            </Typography>
                          ) : null}

                          {previewImg ? (
                            <Grid
                              container
                              spacing={2.5}
                              alignItems="center"
                              style={{ marginTop: 2 }}
                            >
                              <Grid item xs={12} sm={6}>
                                <img
                                  src={previewImg.url}
                                  style={{
                                    width: "100%",
                                    maxWidth: 320,
                                    height: 240,
                                    objectFit: "contain",
                                    display: "block",
                                    margin: "0 auto",
                                    borderRadius: 14,
                                  }}
                                />
                              </Grid>

                              <Grid item xs={12} sm={6}>
                                {previewImg.message ? (
                                  <Typography
                                    align="left"
                                    variant="body2"
                                    style={{
                                      color: "#49BC88",
                                      opacity: 0.9,
                                      lineHeight: 1.7,
                                    }}
                                  >
                                    {previewImg.message}
                                  </Typography>
                                ) : (
                                  <Typography
                                    align="left"
                                    variant="body2"
                                    style={{
                                      color: "#49BC88",
                                      opacity: 0.6,
                                      lineHeight: 1.7,
                                    }}
                                  >
                                    View item details
                                  </Typography>
                                )}
                              </Grid>
                            </Grid>
                          ) : null}
                        </div>
                      </Button>
                    </Grid>
                  )
                })}
              </Grid>

              <div style={{ display: "flex", justifyContent: "center", margin: "28px 0" }}>
                <Button
                  style={{
                    ...this.getButtonStyle(),
                    width: 220,
                    padding: "12px 16px",
                  }}
                  onClick={() =>
                    window.open(
                      "https://www.iheartjane.com/brands/24293/new-standard"
                    )
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
                  works={sortedWorks}
                  imgs={this.props.imgs}
                  editWorks={(editWorks) => this.setState({ editWorks: editWorks })}
                  user={this.context.currentUser}
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
            </div>
          </div>
        )
      }
    } else {
      return <div style={{ backgroundColor: "#011000", minHeight: "100vh" }} />
    }
  }
}
