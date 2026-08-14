import React from "react"
import Head from "next/head"

import { auth, db } from "../Firebase/FirebaseInit"
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth"
import { doc, setDoc, serverTimestamp } from "firebase/firestore"

import {
  Grid,
  Button,
  Typography,
  TextField,
  Alert,
  CircularProgress,
  Divider,
} from "@mui/material"

export default class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loginEmail: "",
      loginPassword: "",
      resetOpen: false,
      resetEmail: "",

      signUpEmail: "",
      signUpPassword: "",
      signUpConfPassword: "",

      loginSubmitting: false,
      signUpSubmitting: false,
      googleSubmitting: false,

      loginSuccess: "",
      loginError: "",
      signUpSuccess: "",
      signUpError: "",

      touched: {},
    }

    this.handleChange = this.handleChange.bind(this)
    this.setTouched = this.setTouched.bind(this)
    this.logIn = this.logIn.bind(this)
    this.sendPasswordReset = this.sendPasswordReset.bind(this)
    this.createAccount = this.createAccount.bind(this)
    this.signInWithGoogle = this.signInWithGoogle.bind(this)
  }

  setTouched(key) {
    this.setState((prev) => ({
      touched: {
        ...prev.touched,
        [key]: true,
      },
    }))
  }

  handleChange(event) {
    const target = event.target
    const value = target.type === "checkbox" ? target.checked : target.value
    const name = target.name

    this.setState({
      [name]: value,
      loginSuccess: "",
      loginError: "",
      signUpSuccess: "",
      signUpError: "",
    })
  }

  getNeonInputSx() {
    return {
      marginBottom: "12px",
      "& .MuiInputLabel-root": {
        color: "#49BC88",
      },
      "& .MuiInputLabel-root.Mui-focused": {
        color: "#49BC88",
      },
      "& .MuiOutlinedInput-root": {
        color: "#49BC88",
        "& input": {
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

  validateLogin() {
    const errors = {}
    const email = String(this.state.loginEmail || "").trim()
    const password = String(this.state.loginPassword || "")
    const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)

    if (!email) errors.loginEmail = "Email is required."
    else if (!isEmail(email)) errors.loginEmail = "Please enter a valid email."

    if (!password) errors.loginPassword = "Password is required."

    return errors
  }

  validateReset() {
    const errors = {}
    const email = String(this.state.resetEmail || "").trim()
    const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)

    if (!email) errors.resetEmail = "Email is required."
    else if (!isEmail(email)) errors.resetEmail = "Please enter a valid email."

    return errors
  }

  validateSignUp() {
    const errors = {}
    const email = String(this.state.signUpEmail || "").trim()
    const password = String(this.state.signUpPassword || "")
    const confPassword = String(this.state.signUpConfPassword || "")
    const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)

    if (!email) errors.signUpEmail = "Email is required."
    else if (!isEmail(email)) errors.signUpEmail = "Please enter a valid email."

    if (!password) errors.signUpPassword = "Password is required."
    if (!confPassword) errors.signUpConfPassword = "Please confirm your password."
    if (password && confPassword && password !== confPassword) {
      errors.signUpConfPassword = "Passwords do not match."
    }

    return errors
  }

  async logIn() {
    this.setState((prev) => ({
      loginSuccess: "",
      loginError: "",
      touched: {
        ...prev.touched,
        loginEmail: true,
        loginPassword: true,
      },
    }))

    const errors = this.validateLogin()
    if (Object.keys(errors).length) {
      this.setState({ loginError: "Please enter your email and password." })
      return
    }

    try {
      this.setState({
        loginSubmitting: true,
        loginError: "",
        loginSuccess: "",
      })

      await signInWithEmailAndPassword(
        auth,
        String(this.state.loginEmail || "").trim(),
        String(this.state.loginPassword || "")
      )

      window.location.href = "/products"
    } catch (error) {
      this.setState({
        loginSubmitting: false,
        loginSuccess: "",
        loginError: error?.message || "Login failed. Please try again.",
      })
    }
  }

  async signInWithGoogle() {
    try {
      this.setState({
        googleSubmitting: true,
        loginError: "",
        loginSuccess: "",
      })

      const provider = new GoogleAuthProvider()
      const result = await signInWithPopup(auth, provider)

      await setDoc(
        doc(db, "users", result.user.uid),
        {
          email: result.user.email || "",
          displayName: result.user.displayName || "",
          photoURL: result.user.photoURL || "",
          provider: "google",
          updated: serverTimestamp(),
          createdAt: serverTimestamp(),
        },
        { merge: true }
      )

      window.location.href = "/products"
    } catch (error) {
      this.setState({
        googleSubmitting: false,
        loginSuccess: "",
        loginError: error?.message || "Google sign-in failed. Please try again.",
      })
    }
  }

  async sendPasswordReset() {
    this.setState((prev) => ({
      loginSuccess: "",
      loginError: "",
      touched: {
        ...prev.touched,
        resetEmail: true,
      },
    }))

    const errors = this.validateReset()
    if (Object.keys(errors).length) {
      this.setState({ loginError: "Please enter a valid email for password reset." })
      return
    }

    try {
      this.setState({
        loginSubmitting: true,
        loginError: "",
        loginSuccess: "",
      })

      await sendPasswordResetEmail(auth, String(this.state.resetEmail || "").trim())

      this.setState({
        loginSubmitting: false,
        loginSuccess: `Password reset link sent to ${String(
          this.state.resetEmail || ""
        ).trim()}`,
        loginError: "",
      })
    } catch (error) {
      this.setState({
        loginSubmitting: false,
        loginSuccess: "",
        loginError: error?.message || "Unable to send password reset email.",
      })
    }
  }

  async createAccount() {
    this.setState((prev) => ({
      signUpSuccess: "",
      signUpError: "",
      touched: {
        ...prev.touched,
        signUpEmail: true,
        signUpPassword: true,
        signUpConfPassword: true,
      },
    }))

    const errors = this.validateSignUp()
    if (Object.keys(errors).length) {
      const firstKey = Object.keys(errors)[0]
      this.setState({
        signUpError: errors[firstKey] || "Please complete the required fields.",
      })
      return
    }

    try {
      this.setState({
        signUpSubmitting: true,
        signUpError: "",
        signUpSuccess: "",
      })

      const email = String(this.state.signUpEmail || "").trim()
      const password = String(this.state.signUpPassword || "")

      const authUser = await createUserWithEmailAndPassword(auth, email, password)

      await setDoc(doc(db, "users", authUser.user.uid), {
        email,
        createdAt: serverTimestamp(),
      })

      window.location.href = "/products"
    } catch (error) {
      this.setState({
        signUpSubmitting: false,
        signUpSuccess: "",
        signUpError:
          error?.message || "Something went wrong while creating your account.",
      })
    }
  }

  renderLoginPanel(showErr) {
    const loginErrors = this.validateLogin()
    const resetErrors = this.validateReset()
    const neonInputSx = this.getNeonInputSx()

    return (
      <div
        style={{
          width: "100%",
          maxWidth: 560,
          margin: "0 auto",
          padding: "32px 24px",
          border: "1px solid #49BC88",
          borderRadius: 10,
        }}
      >
        <Typography
          variant="h4"
          align="center"
          color="primary"
          style={{ marginBottom: 16 }}
        >
          {this.state.resetOpen ? "Reset Password" : "Log In"}
        </Typography>

        <Typography
          variant="body1"
          align="center"
          color="primary"
          style={{ marginBottom: 24 }}
        >
          {this.state.resetOpen
            ? "Enter your email and we’ll send you a reset link."
            : "Sign in to continue to your account."}
        </Typography>

        {!this.state.resetOpen ? (
          <>
            <Button
              fullWidth
              style={{
                border: "1px solid #49BC88",
                borderRadius: 5,
                height: 46,
                marginBottom: 16,
              }}
              onClick={this.signInWithGoogle}
              disabled={this.state.googleSubmitting || this.state.loginSubmitting}
            >
              {this.state.googleSubmitting ? (
                <CircularProgress size={22} />
              ) : (
                <Typography color="primary">Continue with Google</Typography>
              )}
            </Button>

            <Divider
              style={{
                marginBottom: 16,
                borderColor: "#49BC88",
                opacity: 0.35,
              }}
            />

            <TextField
              fullWidth
              label="Email"
              name="loginEmail"
              type="email"
              value={this.state.loginEmail}
              onChange={this.handleChange}
              onBlur={() => this.setTouched("loginEmail")}
              error={showErr("loginEmail", loginErrors)}
              helperText={
                showErr("loginEmail", loginErrors) ? loginErrors.loginEmail : " "
              }
              sx={neonInputSx}
            />

            <TextField
              fullWidth
              label="Password"
              name="loginPassword"
              type="password"
              value={this.state.loginPassword}
              onChange={this.handleChange}
              onBlur={() => this.setTouched("loginPassword")}
              error={showErr("loginPassword", loginErrors)}
              helperText={
                showErr("loginPassword", loginErrors)
                  ? loginErrors.loginPassword
                  : " "
              }
              sx={neonInputSx}
            />

            {this.state.loginError ? (
              <Alert severity="error" style={{ marginBottom: 16 }}>
                {this.state.loginError}
              </Alert>
            ) : null}

            {this.state.loginSuccess ? (
              <Alert severity="success" style={{ marginBottom: 16 }}>
                {this.state.loginSuccess}
              </Alert>
            ) : null}

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Button
                  fullWidth
                  style={{
                    border: "1px solid #49BC88",
                    borderRadius: 5,
                    height: 46,
                  }}
                  onClick={() =>
                    this.setState({
                      resetOpen: true,
                      loginError: "",
                      loginSuccess: "",
                      touched: {},
                    })
                  }
                  disabled={this.state.loginSubmitting || this.state.googleSubmitting}
                >
                  <Typography color="primary">Forgot Password?</Typography>
                </Button>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Button
                  fullWidth
                  style={{
                    border: "1px solid #49BC88",
                    borderRadius: 5,
                    height: 46,
                  }}
                  onClick={this.logIn}
                  disabled={this.state.loginSubmitting || this.state.googleSubmitting}
                >
                  {this.state.loginSubmitting ? (
                    <CircularProgress size={22} />
                  ) : (
                    <Typography color="primary">Log In</Typography>
                  )}
                </Button>
              </Grid>
            </Grid>
          </>
        ) : (
          <>
            <TextField
              fullWidth
              label="Email"
              name="resetEmail"
              type="email"
              value={this.state.resetEmail}
              onChange={this.handleChange}
              onBlur={() => this.setTouched("resetEmail")}
              error={showErr("resetEmail", resetErrors)}
              helperText={
                showErr("resetEmail", resetErrors) ? resetErrors.resetEmail : " "
              }
              sx={neonInputSx}
            />

            {this.state.loginError ? (
              <Alert severity="error" style={{ marginBottom: 16 }}>
                {this.state.loginError}
              </Alert>
            ) : null}

            {this.state.loginSuccess ? (
              <Alert severity="success" style={{ marginBottom: 16 }}>
                {this.state.loginSuccess}
              </Alert>
            ) : null}

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Button
                  fullWidth
                  style={{
                    border: "1px solid #49BC88",
                    borderRadius: 5,
                    height: 46,
                  }}
                  onClick={() =>
                    this.setState({
                      resetOpen: false,
                      resetEmail: "",
                      loginError: "",
                      loginSuccess: "",
                      touched: {},
                    })
                  }
                  disabled={this.state.loginSubmitting}
                >
                  <Typography color="primary">Back</Typography>
                </Button>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Button
                  fullWidth
                  style={{
                    border: "1px solid #49BC88",
                    borderRadius: 5,
                    height: 46,
                  }}
                  onClick={this.sendPasswordReset}
                  disabled={this.state.loginSubmitting}
                >
                  {this.state.loginSubmitting ? (
                    <CircularProgress size={22} />
                  ) : (
                    <Typography color="primary">Send Reset</Typography>
                  )}
                </Button>
              </Grid>
            </Grid>
          </>
        )}
      </div>
    )
  }

  renderSignupPanel(showErr) {
    const signUpErrors = this.validateSignUp()
    const neonInputSx = this.getNeonInputSx()

    return (
      <div
        style={{
          width: "100%",
          maxWidth: 560,
          margin: "0 auto",
          padding: "32px 24px",
          border: "1px solid #49BC88",
          borderRadius: 10,
        }}
      >
        <Typography
          variant="h4"
          align="center"
          color="primary"
          style={{ marginBottom: 16 }}
        >
          Sign Up
        </Typography>

        <Typography
          variant="body1"
          align="center"
          color="primary"
          style={{ marginBottom: 24 }}
        >
          Create an account to get started.
        </Typography>

        <TextField
          fullWidth
          label="Email"
          name="signUpEmail"
          type="email"
          value={this.state.signUpEmail}
          onChange={this.handleChange}
          onBlur={() => this.setTouched("signUpEmail")}
          error={showErr("signUpEmail", signUpErrors)}
          helperText={
            showErr("signUpEmail", signUpErrors) ? signUpErrors.signUpEmail : " "
          }
          sx={neonInputSx}
        />

        <TextField
          fullWidth
          label="Password"
          name="signUpPassword"
          type="password"
          value={this.state.signUpPassword}
          onChange={this.handleChange}
          onBlur={() => this.setTouched("signUpPassword")}
          error={showErr("signUpPassword", signUpErrors)}
          helperText={
            showErr("signUpPassword", signUpErrors)
              ? signUpErrors.signUpPassword
              : " "
          }
          sx={neonInputSx}
        />

        <TextField
          fullWidth
          label="Confirm Password"
          name="signUpConfPassword"
          type="password"
          value={this.state.signUpConfPassword}
          onChange={this.handleChange}
          onBlur={() => this.setTouched("signUpConfPassword")}
          error={showErr("signUpConfPassword", signUpErrors)}
          helperText={
            showErr("signUpConfPassword", signUpErrors)
              ? signUpErrors.signUpConfPassword
              : " "
          }
          sx={neonInputSx}
        />

        {this.state.signUpError ? (
          <Alert severity="error" style={{ marginBottom: 16 }}>
            {this.state.signUpError}
          </Alert>
        ) : null}

        {this.state.signUpSuccess ? (
          <Alert severity="success" style={{ marginBottom: 16 }}>
            {this.state.signUpSuccess}
          </Alert>
        ) : null}

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Button
              fullWidth
              style={{
                border: "1px solid #49BC88",
                borderRadius: 5,
                height: 46,
              }}
              onClick={() =>
                this.setState({
                  signUpEmail: "",
                  signUpPassword: "",
                  signUpConfPassword: "",
                  signUpError: "",
                  signUpSuccess: "",
                  touched: {},
                })
              }
              disabled={this.state.signUpSubmitting}
            >
              <Typography color="primary">Clear</Typography>
            </Button>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Button
              fullWidth
              style={{
                border: "1px solid #49BC88",
                borderRadius: 5,
                height: 46,
              }}
              onClick={this.createAccount}
              disabled={this.state.signUpSubmitting}
            >
              {this.state.signUpSubmitting ? (
                <CircularProgress size={22} />
              ) : (
                <Typography color="primary">Create Account</Typography>
              )}
            </Button>
          </Grid>
        </Grid>
      </div>
    )
  }

  render() {
    const showErr = (key, bag) => Boolean(this.state.touched[key] && bag[key])

    return (
      <div
        style={{
          minHeight: "100vh",
          paddingBottom: 60,
        }}
      >
        <Head>
          <title>Login | New Standard</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta
            name="description"
            content="Log in, reset your password, or create an account."
          />
          <meta name="keywords" content="Login, Sign Up, Password Reset" />
        </Head>

        <Typography
          variant="h4"
          align="center"
          color="primary"
          style={{ margin: "48px 5% 20px 5%" }}
        >
          Account Access
        </Typography>

        <Typography variant="h6" align="center" color="primary">
          Log in to continue, reset your password if needed, or create a new
          account to get started.
        </Typography>

        <Grid
          container
          spacing={4}
          style={{
            width: "100%",
            maxWidth: 1200,
            margin: "0 auto",
            padding: "0 24px",
          }}
        >
          <Grid item xs={12} md={6}>
            {this.renderLoginPanel(showErr)}
          </Grid>

          <Grid item xs={12} md={6}>
            {this.renderSignupPanel(showErr)}
          </Grid>
        </Grid>

        <div
          style={{
            width: "90%",
            maxWidth: 1000,
            margin: "56px auto 0 auto",
          }}
        >
          <Divider style={{ marginBottom: 24 }} />
        </div>
      </div>
    )
  }
}