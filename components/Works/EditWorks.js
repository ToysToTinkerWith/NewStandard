import React from "react"

import { db, storage } from "../../Firebase/FirebaseInit"
import {
  doc,
  collection,
  addDoc,
  updateDoc,
  serverTimestamp,
  onSnapshot,
  deleteDoc,
  getDocs,
} from "firebase/firestore"
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

export default class EditWorks extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      item: "",
      collection: "",
      description: "",
      oldPictures: [],
      newPictures: [],
      progress: 0,
      pictureWarning: false,
      deleteWarning: false,
      viewPicture: null,
      loading: false,
      uploadComplete: false,
    }

    this.handleChange = this.handleChange.bind(this)
    this.handlePicture = this.handlePicture.bind(this)
    this.deletePicture = this.deletePicture.bind(this)
    this.deletePictureFirebase = this.deletePictureFirebase.bind(this)
    this.deleteItem = this.deleteItem.bind(this)
    this.updateWork = this.updateWork.bind(this)
  }

  componentDidMount() {
    this.setState({ newPictures: [] })

    const worksRef = doc(db, "works", this.props.work)

    this.unsub = onSnapshot(worksRef, (docSnap) => {
      const data = docSnap.data() || {}

      this.setState({
        item: data.item || "",
        collection: data.collection || "",
        description: data.description || "",
      })

      const imgsRef = collection(db, "works", this.props.work, "imgs")

      this.unsub2 = onSnapshot(imgsRef, (querySnap) => {
        const oldPictures = []

        querySnap.forEach((imgDoc) => {
          oldPictures.push([
            {
              ...imgDoc.data(),
              collection:
                imgDoc.data()?.collection || data.collection || "",
              item: imgDoc.data()?.item || data.item || "",
              workId: imgDoc.data()?.workId || this.props.work,
            },
            imgDoc.id,
          ])
        })

        this.setState({ oldPictures })
      })
    })
  }

  componentWillUnmount() {
    if (this.unsub) this.unsub()
    if (this.unsub2) this.unsub2()

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

  async deletePictureFirebase(pictureId) {
    const imgRef = doc(db, "works", this.props.work, "imgs", pictureId)
    await deleteDoc(imgRef)
    this.setState({ pictureWarning: false })
  }

  async deleteItem() {
    for (const picture of this.state.oldPictures) {
      await this.deletePictureFirebase(picture[1])
    }

    const workRef = doc(db, "works", this.props.work)
    await deleteDoc(workRef)

    this.setState({ deleteWarning: false })
    this.props.closeModal()
  }

  async updateWork() {
    try {
      this.setState({
        loading: true,
        progress: 0,
        uploadComplete: false,
      })

      const collectionName = String(this.state.collection || "").trim()
      const itemName = String(this.state.item || "").trim()

      const imgsRef = collection(db, "works", this.props.work, "imgs")
      const imgQuery = await getDocs(imgsRef)

      for (const imgDoc of imgQuery.docs) {
        const imgMessage =
          this.state[imgDoc.id] || this.state[imgDoc.id] === ""
            ? this.state[imgDoc.id]
            : imgDoc.data().message

        const imgRef = doc(db, "works", this.props.work, "imgs", imgDoc.id)

        await updateDoc(imgRef, {
          message: imgMessage,
          collection: collectionName,
          item: itemName,
          workId: this.props.work,
        })
      }

      const workRef = doc(db, "works", this.props.work)

      await updateDoc(workRef, {
        item: itemName,
        collection: collectionName,
        description: this.state.description,
        updated: serverTimestamp(),
      })

      const uploadPictures = this.state.newPictures || []

      if (uploadPictures.length === 0) {
        this.setState({
          loading: false,
          progress: 100,
          uploadComplete: true,
        })
        this.props.closeModal()
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

            const imgRef = ref(storage, `worksImages/${this.props.work}/${safeFileName}`)
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
                  const imgCol = collection(db, "works", this.props.work, "imgs")
                  const imgMessage = this.state[picture.id] ? this.state[picture.id] : ""

                  await addDoc(imgCol, {
                    index:
                      this.state.oldPictures.length + index,
                    url: downloadURL,
                    message: imgMessage,
                    created: picture.lastModified || Date.now(),
                    fileName: picture.name || "",
                    contentType: picture.type || "",
                    collection: collectionName,
                    item: itemName,
                    workId: this.props.work,
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

      this.state.newPictures.forEach((picture) => {
        if (picture.previewUrl) URL.revokeObjectURL(picture.previewUrl)
      })

      this.setState({
        newPictures: [],
        loading: false,
        progress: 100,
        uploadComplete: true,
      })

      this.props.closeModal()
    } catch (error) {
      console.error(error)
      alert(error?.message || "There was an issue updating this item.")
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
            Edit Item
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
            Update this item and manage its images.
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
                type="text"
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
            {this.state.oldPictures.length > 0 ? (
              <>
                <Typography
                  variant="h6"
                  style={{ color: "#49BC88", marginBottom: 16 }}
                >
                  Current Images
                </Typography>

                <Grid container spacing={2}>
                  {this.state.oldPictures.map((picture, index) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={picture[1] || index}>
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
                          onClick={() => this.setState({ viewPicture: picture[0].url })}
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
                            src={picture[0].url}
                            alt="img"
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

                        <TextField
                          onChange={this.handleChange}
                          multiline
                          rows={3}
                          defaultValue={picture[0].message || ""}
                          variant="outlined"
                          type="text"
                          label="Description"
                          name={picture[1]}
                          sx={fieldSx}
                        />

                        <Button
                          variant="contained"
                          style={{
                            ...dangerButtonStyle,
                            width: "100%",
                            marginTop: 8,
                          }}
                          onClick={() => this.setState({ pictureWarning: picture[1] })}
                        >
                          Del
                        </Button>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </>
            ) : null}

            {this.state.newPictures.length > 0 ? (
              <>
                <Typography
                  variant="h6"
                  style={{ color: "#49BC88", marginTop: 28, marginBottom: 16 }}
                >
                  New Images
                </Typography>

                <Grid container spacing={2}>
                  {this.state.newPictures.map((picture, index) => (
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
                  ))}
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

            <div
              style={{
                display: "flex",
                gap: 12,
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <Button
                variant="contained"
                style={{
                  ...buttonStyle,
                  width: 180,
                }}
                onClick={this.updateWork}
                disabled={this.state.loading}
              >
                <Typography variant="subtitle2" style={{ color: "#49BC88" }}>
                  {this.state.loading ? "Uploading..." : "Edit Item"}
                </Typography>
              </Button>

              <Button
                variant="contained"
                style={{
                  ...dangerButtonStyle,
                  width: 180,
                }}
                onClick={() => this.setState({ deleteWarning: true })}
              >
                <Typography style={{ color: "#49BC88" }}>Delete Item</Typography>
              </Button>
            </div>
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
                    onClick={() => this.deletePictureFirebase(this.state.pictureWarning)}
                  >
                    Yes
                  </Button>
                </Grid>
              </Grid>
            </div>
          </Modal>
        ) : null}

        {this.state.deleteWarning ? (
          <Modal
            open={true}
            onClose={() => this.setState({ deleteWarning: false })}
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
                Delete this item?
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Button
                    variant="contained"
                    style={{ ...buttonStyle, width: "100%" }}
                    onClick={() => this.setState({ deleteWarning: false })}
                  >
                    Back
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button
                    variant="contained"
                    style={{ ...buttonStyle, width: "100%" }}
                    onClick={this.deleteItem}
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