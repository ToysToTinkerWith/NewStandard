import React from "react"

import { db, storage } from "../../Firebase/FirebaseInit"
import { collection, addDoc, serverTimestamp } from "firebase/firestore"
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"

import {
  Modal,
  Button,
  TextField,
  Typography,
  Card,
  Grid,
  LinearProgress,
} from "@mui/material"

export default class NewWorks extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      collection: "",
      item: "",
      description: "",
      newPictures: [],
      confirm: false,
      viewPicture: null,
      loading: false,
      progress: 0,
      uploadComplete: false,
      pictureWarning: false,
      requestWarning: false,
    }

    this.handleChange = this.handleChange.bind(this)
    this.handlePicture = this.handlePicture.bind(this)
    this.deletePicture = this.deletePicture.bind(this)
    this.addWorks = this.addWorks.bind(this)
  }

  componentWillUnmount() {
    this.state.newPictures.forEach((picture) => {
      if (picture.previewUrl) {
        URL.revokeObjectURL(picture.previewUrl)
      }
    })
  }

  getFieldSx() {
    return {
      width: "100%",
      "& .MuiInputLabel-root": {
        color: "#49BC88",
      },
      "& .MuiInputLabel-root.Mui-focused": {
        color: "#49BC88",
      },
      "& .MuiOutlinedInput-root": {
        color: "#49BC88",
        backgroundColor: "rgba(1, 16, 0, 0.72)",
        "& input": {
          color: "#49BC88",
          WebkitTextFillColor: "#49BC88",
        },
        "& textarea": {
          color: "#49BC88",
          WebkitTextFillColor: "#49BC88",
        },
        "& fieldset": {
          borderColor: "#49BC88",
        },
        "&:hover fieldset": {
          borderColor: "#49BC88",
        },
        "&.Mui-focused fieldset": {
          borderColor: "#49BC88",
        },
      },
      "& .MuiFormHelperText-root": {
        color: "#49BC88",
      },
    }
  }

  getPanelStyle() {
    return {
      width: "100%",
      maxWidth: 1100,
      margin: "0 auto",
      background:
        "radial-gradient(circle at top left, rgba(73,188,136,0.10), transparent 35%), #011000",
      border: "1px solid #49BC88",
      borderRadius: 18,
      padding: "28px 22px",
      boxShadow: "0 0 24px rgba(73,188,136,0.16)",
    }
  }

  getButtonStyle() {
    return {
      backgroundColor: "#011000",
      color: "#49BC88",
      border: "1px solid #49BC88",
      borderRadius: 10,
      padding: "10px 18px",
      boxShadow: "0 0 14px rgba(73,188,136,0.15)",
    }
  }

  getDangerButtonStyle() {
    return {
      backgroundColor: "#011000",
      color: "#49BC88",
      border: "1px solid #49BC88",
      borderRadius: 10,
      padding: "10px 18px",
    }
  }

  handleChange(event) {
    const target = event.target
    const value = target.type === "checkbox" ? target.checked : target.value
    const name = target.name

    this.setState({
      [name]: value,
    })
  }

  handlePicture(e) {
    const files = Array.from(e.target.files || [])
    if (!files.length) return

    const preparedFiles = files.map((file) => {
      const id = `${file.name}-${file.lastModified}-${Math.random()
        .toString(36)
        .slice(2)}`

      return {
        id,
        file,
        name: file.name,
        type: file.type,
        size: file.size,
        lastModified: file.lastModified,
        previewUrl: URL.createObjectURL(file),
      }
    })

    this.setState((prevState) => {
      const nextState = {
        newPictures: [...prevState.newPictures, ...preparedFiles],
      }

      preparedFiles.forEach((picture) => {
        nextState[picture.id] = ""
      })

      return nextState
    })

    e.target.value = null
  }

  deletePicture(pictureId) {
    const pictureToDelete = this.state.newPictures.find((img) => img.id === pictureId)

    if (pictureToDelete?.previewUrl) {
      URL.revokeObjectURL(pictureToDelete.previewUrl)
    }

    this.setState((prevState) => ({
      newPictures: prevState.newPictures.filter((img) => img.id !== pictureId),
      [pictureId]: "",
      viewPicture:
        prevState.viewPicture === pictureToDelete?.previewUrl
          ? null
          : prevState.viewPicture,
    }))
  }

  async addWorks() {
    try {
      this.setState({
        loading: true,
        progress: 0,
        uploadComplete: false,
      })

      const collectionName = String(this.state.collection || "").trim()
      const itemName = String(this.state.item || "").trim()

      const requestRef = collection(db, "works")

      const worksDoc = await addDoc(requestRef, {
        collection: collectionName,
        item: itemName,
        description: this.state.description,
        created: serverTimestamp(),
      })

      const uploadPictures = this.state.newPictures || []

      if (uploadPictures.length === 0) {
        this.setState({
          loading: false,
          progress: 100,
          uploadComplete: true,
        })
        return
      }

      let completedUploads = 0

      await Promise.all(
        uploadPictures.map((picture, index) => {
          return new Promise((resolve, reject) => {
            const sourceFile = picture.file
            const fileExt = picture.name?.includes(".")
              ? picture.name.substring(picture.name.lastIndexOf("."))
              : ""
            const safeFileName = `${picture.id}${fileExt}`

            const imgRef = ref(storage, `worksImages/${worksDoc.id}/${safeFileName}`)
            const uploadTask = uploadBytesResumable(imgRef, sourceFile)

            uploadTask.on(
              "state_changed",
              (snapshot) => {
                const fileProgress =
                  snapshot.totalBytes > 0
                    ? snapshot.bytesTransferred / snapshot.totalBytes
                    : 0

                const overallProgress = Math.round(
                  ((completedUploads + fileProgress) / uploadPictures.length) * 100
                )

                this.setState({ progress: overallProgress })
              },
              (error) => {
                reject(error)
              },
              async () => {
                try {
                  const downloadURL = await getDownloadURL(uploadTask.snapshot.ref)
                  const imgCol = collection(db, "works", worksDoc.id, "imgs")
                  const imgMessage = this.state[picture.id] ? this.state[picture.id] : ""

                  await addDoc(imgCol, {
                    index,
                    url: downloadURL,
                    message: imgMessage,
                    created: picture.lastModified || Date.now(),
                    fileName: picture.name || "",
                    contentType: picture.type || "",
                    collection: collectionName,
                    item: itemName,
                    workId: worksDoc.id,
                  })

                  completedUploads += 1
                  this.setState({
                    progress: Math.round(
                      (completedUploads / uploadPictures.length) * 100
                    ),
                  })

                  resolve()
                } catch (err) {
                  reject(err)
                }
              }
            )
          })
        })
      )

      this.setState((prevState) => {
        prevState.newPictures.forEach((picture) => {
          if (picture.previewUrl) URL.revokeObjectURL(picture.previewUrl)
        })

        return {
          collection: "",
          item: "",
          description: "",
          newPictures: [],
          confirm: false,
          viewPicture: null,
          loading: false,
          progress: 100,
          uploadComplete: true,
        }
      })
    } catch (error) {
      console.error(error)
      alert(error?.message || "There was an issue uploading this item.")
      this.setState({
        loading: false,
        uploadComplete: false,
      })
    }
  }

  render() {
    const fieldSx = this.getFieldSx()
    const buttonStyle = this.getButtonStyle()
    const dangerButtonStyle = this.getDangerButtonStyle()

    return (
      <div
        style={{
          minHeight: "100vh",
          backgroundColor: "#011000",
          padding: "36px 18px 60px 18px",
        }}
      >
        <div style={this.getPanelStyle()}>
          <Typography
            variant="h4"
            align="center"
            style={{
              color: "#49BC88",
              marginBottom: 10,
            }}
          >
            Add Item
          </Typography>

          <Typography
            variant="body1"
            align="center"
            style={{
              color: "#49BC88",
              opacity: 0.9,
              marginBottom: 28,
            }}
          >
            Create a new work item and upload images with captions.
          </Typography>

          <Grid container spacing={2.5}>
            <Grid item xs={12} md={6}>
              <TextField
                variant="outlined"
                value={this.state.collection}
                type="text"
                label="Collection Name"
                name="collection"
                onChange={this.handleChange}
                sx={fieldSx}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                variant="outlined"
                value={this.state.item}
                label="Item Name"
                name="item"
                onChange={this.handleChange}
                sx={fieldSx}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                multiline
                rows={5}
                value={this.state.description}
                label="Item Description"
                name="description"
                onChange={this.handleChange}
                sx={fieldSx}
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                variant="contained"
                component="label"
                style={{
                  ...buttonStyle,
                  width: "100%",
                  height: 56,
                }}
              >
                <Typography variant="subtitle2" style={{ color: "#49BC88" }}>
                  Add Photos
                </Typography>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={this.handlePicture}
                  style={{ width: 0, opacity: 0 }}
                />
              </Button>
            </Grid>
          </Grid>

          <div style={{ marginTop: 28 }}>
            {this.state.newPictures.length > 0 ? (
              <>
                <Typography
                  variant="h6"
                  style={{ color: "#49BC88", marginBottom: 16 }}
                >
                  Selected Images
                </Typography>

                <Grid container spacing={2}>
                  {this.state.newPictures.map((picture, index) => {
                    return (
                      <Grid item xs={12} sm={6} md={4} lg={3} key={picture.id || index}>
                        <Card
                          style={{
                            backgroundColor: "#011000",
                            border: "1px solid #49BC88",
                            borderRadius: 16,
                            padding: 12,
                            boxShadow: "0 0 18px rgba(73,188,136,0.10)",
                          }}
                        >
                          <Button
                            onClick={() =>
                              this.setState({ viewPicture: picture.previewUrl })
                            }
                            style={{
                              padding: 0,
                              width: "100%",
                              display: "block",
                              borderRadius: 12,
                              overflow: "hidden",
                              marginBottom: 12,
                            }}
                          >
                            <img
                              src={picture.previewUrl}
                              alt={picture.name || "preview"}
                              style={{
                                width: "100%",
                                height: 220,
                                objectFit: "cover",
                                display: "block",
                                borderRadius: 12,
                                border: "1px solid #49BC88",
                              }}
                            />
                          </Button>

                          <Typography
                            variant="body2"
                            style={{
                              color: "#49BC88",
                              marginBottom: 10,
                              wordBreak: "break-word",
                              opacity: 0.9,
                            }}
                          >
                            {picture.name}
                          </Typography>

                          <TextField
                            onChange={this.handleChange}
                            multiline
                            rows={3}
                            value={this.state[picture.id] || ""}
                            variant="outlined"
                            type="text"
                            label="Description"
                            name={picture.id}
                            sx={fieldSx}
                          />

                          <Button
                            variant="contained"
                            style={{
                              ...dangerButtonStyle,
                              width: "100%",
                              marginTop: 8,
                            }}
                            onClick={() => this.deletePicture(picture.id)}
                          >
                            Del
                          </Button>
                        </Card>
                      </Grid>
                    )
                  })}
                </Grid>
              </>
            ) : null}
          </div>

          <div style={{ marginTop: 28 }}>
            {this.state.loading ? (
              <div style={{ maxWidth: 500, margin: "0 auto 18px auto" }}>
                <LinearProgress
                  variant="determinate"
                  value={this.state.progress}
                  sx={{
                    height: 10,
                    borderRadius: 999,
                    backgroundColor: "rgba(73,188,136,0.14)",
                    "& .MuiLinearProgress-bar": {
                      backgroundColor: "#49BC88",
                    },
                  }}
                />
                <Typography
                  align="center"
                  variant="body1"
                  style={{ color: "#49BC88", marginTop: 10 }}
                >
                  Uploading... {this.state.progress}%
                </Typography>
              </div>
            ) : this.state.uploadComplete ? (
              <Typography
                align="center"
                variant="h6"
                style={{ color: "#49BC88", marginBottom: 18 }}
              >
                Uploaded
              </Typography>
            ) : null}

            <Button
              variant="contained"
              style={{
                ...buttonStyle,
                width: 180,
                display: "flex",
                margin: "0 auto",
              }}
              onClick={this.addWorks}
              disabled={this.state.loading}
            >
              <Typography variant="subtitle2" style={{ color: "#49BC88" }}>
                {this.state.loading ? "Uploading..." : "Add Item"}
              </Typography>
            </Button>
          </div>
        </div>

        {this.state.pictureWarning ? (
          <Modal
            open={true}
            onClose={() => this.setState({ pictureWarning: false })}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: 20,
            }}
          >
            <div
              style={{
                backgroundColor: "#011000",
                border: "1px solid #49BC88",
                borderRadius: 16,
                padding: 24,
                width: "100%",
                maxWidth: 420,
              }}
            >
              <Typography
                variant="body1"
                style={{ paddingBottom: 20, color: "#49BC88" }}
              >
                Delete this picture?
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Button
                    variant="contained"
                    style={{ ...buttonStyle, width: "100%" }}
                    onClick={() => this.setState({ pictureWarning: false })}
                  >
                    Back
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button
                    variant="contained"
                    style={{ ...buttonStyle, width: "100%" }}
                    onClick={() => this.deletePictureFirebase?.()}
                  >
                    Yes
                  </Button>
                </Grid>
              </Grid>
            </div>
          </Modal>
        ) : null}

        {this.state.requestWarning ? (
          <Modal
            open={true}
            onClose={() => this.setState({ requestWarning: false })}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: 20,
            }}
          >
            <div
              style={{
                backgroundColor: "#011000",
                border: "1px solid #49BC88",
                borderRadius: 16,
                padding: 24,
                width: "100%",
                maxWidth: 420,
              }}
            >
              <Typography
                variant="body1"
                style={{ paddingBottom: 20, color: "#49BC88" }}
              >
                Upload this request?
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Button
                    variant="contained"
                    style={{ ...buttonStyle, width: "100%" }}
                    onClick={() => this.setState({ requestWarning: false })}
                  >
                    Back
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button
                    variant="contained"
                    style={{ ...buttonStyle, width: "100%" }}
                    onClick={() => [this.sendrequest?.(), this.props.closeModal?.()]}
                  >
                    Yes
                  </Button>
                </Grid>
              </Grid>
            </div>
          </Modal>
        ) : null}

        {this.state.viewPicture ? (
          <Modal
            open={true}
            onClose={() => this.setState({ viewPicture: null })}
            onClick={() => this.setState({ viewPicture: null })}
            style={{
              overflowY: "auto",
              overflowX: "hidden",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: 20,
              backgroundColor: "rgba(0,0,0,0.85)",
            }}
          >
            <img
              src={this.state.viewPicture}
              alt=""
              style={{
                width: "100%",
                maxWidth: 1100,
                height: "auto",
                borderRadius: 16,
                border: "1px solid #49BC88",
                boxShadow: "0 0 24px rgba(73,188,136,0.18)",
              }}
            />
          </Modal>
        ) : null}
      </div>
    )
  }
}