import React, { useState } from "react"

import { Button, Card, TextField, Typography } from "@mui/material"
import LiveHelpIcon from "@mui/icons-material/LiveHelp"
import { motion } from "framer-motion"

import Typewriter from "./typewriter"

const accentGreen = "#49BC88"

const suggestedPrompts = [
  "What is New Standard?",
  "What kinds of products does New Standard offer?",
  "What product would help me with sleep?",
  "What sets New Standard apart from other cannabis brands?",
]

export default function ChatBot() {
  const [expand, setExpand] = useState(false)
  const [prompt, setPrompt] = useState("Hello")
  const [response, setResponse] = useState("Hello, how can I help you today?")
  const [loading, setLoading] = useState(false)

  const askModel = async (ask) => {
    const cleanPrompt = ask.trim()

    if (!cleanPrompt) {
      return
    }

    setLoading(true)
    setResponse("")
    setPrompt(cleanPrompt)

    try {
      const modelResponse = await fetch("/api/customModel", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: cleanPrompt,
        }),
      })

      const session = await modelResponse.json()
      setResponse(session.response || "I could not find an answer for that.")
    } catch (error) {
      setResponse("Sorry, I could not reach the New Standard assistant.")
    } finally {
      setLoading(false)
    }
  }

  const handlePromptChange = (event) => {
    setPrompt(event.target.value.replace(/(\r\n|\n|\r)/gm, ""))
  }

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault()
      askModel(prompt)
    }
  }

  return (
    <div className="chatbot-shell">
      {expand ? (
        <Card
          className="chatbot-card"
          component={motion.section}
          initial={{ opacity: 0, y: 28, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="chatbot-header">
            <div className="chatbot-mark">
              <img alt="" src="/logo.png" />
            </div>
            <div>
              <Typography component="p" className="chatbot-eyebrow">
                New Standard
              </Typography>
              <Typography component="h2" className="chatbot-title">
                Ask the Assistant
              </Typography>
            </div>
          </div>

          <div className="chatbot-prompts">
            {suggestedPrompts.map((item) => (
              <button key={item} onClick={() => askModel(item)} type="button">
                {item}
              </button>
            ))}
          </div>

          <TextField
            autoComplete="off"
            className="chatbot-input"
            multiline
            name="prompt"
            onChange={handlePromptChange}
            onKeyDown={handleKeyDown}
            placeholder="Ask about products, effects, or the brand"
            type="text"
            value={prompt}
          />

          <Button
            className="chatbot-ask"
            disabled={loading}
            onClick={() => askModel(prompt)}
            type="button"
          >
            Ask
          </Button>

          <div className="chatbot-response" aria-live="polite">
            {loading && response === "" ? (
              <motion.img
                animate={{ opacity: [0.28, 1, 0.28] }}
                transition={{ duration: 2.4, repeat: Infinity }}
                src="/logo.png"
                alt=""
              />
            ) : (
              <Typewriter text={response} delay={20} />
            )}
          </div>
        </Card>
      ) : null}

      <button
        aria-label={expand ? "Close New Standard assistant" : "Open New Standard assistant"}
        className="chatbot-launcher"
        onClick={() => setExpand((value) => !value)}
        type="button"
      >
        <LiveHelpIcon />
      </button>

      <style jsx global>{`
        .chatbot-shell {
          bottom: 20px;
          pointer-events: none;
          position: fixed;
          right: 20px;
          z-index: 2147483000;
        }

        .chatbot-card {
          background: rgba(2, 15, 13, 0.92);
          border: 1px solid rgba(73, 188, 136, 0.58);
          border-radius: 18px;
          box-shadow: 0 28px 78px rgba(0, 0, 0, 0.58),
            0 0 36px rgba(73, 188, 136, 0.18);
          color: #ffffff;
          margin-bottom: 18px;
          max-height: min(76vh, 720px);
          overflow: auto;
          padding: 24px;
          pointer-events: auto;
          position: relative;
          width: min(calc(100vw - 40px), 480px);
        }

        .chatbot-card::before {
          background: radial-gradient(
              circle at 20% 0%,
              rgba(73, 188, 136, 0.22),
              transparent 46%
            ),
            rgba(255, 255, 255, 0.035);
          content: "";
          inset: 0;
          pointer-events: none;
          position: absolute;
        }

        .chatbot-card > * {
          position: relative;
          z-index: 1;
        }

        .chatbot-header {
          align-items: center;
          display: flex;
          gap: 16px;
          margin-bottom: 20px;
        }

        .chatbot-mark {
          align-items: center;
          border: 1px solid rgba(73, 188, 136, 0.62);
          border-radius: 50%;
          display: flex;
          flex: 0 0 auto;
          height: 64px;
          justify-content: center;
          width: 64px;
        }

        .chatbot-mark img {
          display: block;
          height: 42px;
          object-fit: contain;
          width: 42px;
        }

        .chatbot-eyebrow {
          color: ${accentGreen};
          font-family: "Montserrat", sans-serif;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.16em;
          line-height: 1.3;
          margin: 0 0 6px;
          text-transform: uppercase;
        }

        .chatbot-title {
          color: #ffffff;
          font-family: "Cormorant Garamond", Georgia, serif;
          font-size: clamp(30px, 3vw, 42px);
          font-weight: 600;
          letter-spacing: 0;
          line-height: 0.98;
          margin: 0;
        }

        .chatbot-prompts {
          display: grid;
          gap: 10px;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          margin-bottom: 18px;
        }

        .chatbot-prompts button {
          background: rgba(73, 188, 136, 0.1);
          border: 1px solid rgba(73, 188, 136, 0.32);
          border-radius: 8px;
          color: rgba(255, 255, 255, 0.88);
          cursor: pointer;
          font-family: "Montserrat", sans-serif;
          font-size: 13px;
          font-weight: 600;
          line-height: 1.35;
          min-height: 54px;
          padding: 10px 12px;
          text-align: left;
          transition: background 160ms ease, border-color 160ms ease,
            color 160ms ease, transform 160ms ease;
        }

        .chatbot-prompts button:hover {
          background: rgba(73, 188, 136, 0.18);
          border-color: rgba(73, 188, 136, 0.68);
          color: #ffffff;
          transform: translateY(-1px);
        }

        .chatbot-input {
          background: rgba(0, 0, 0, 0.24);
          border-radius: 10px;
          display: block;
          margin-bottom: 14px;
          max-width: none;
          width: 100%;
        }

        .chatbot-input.MuiFormControl-root,
        .chatbot-input .MuiInputBase-root,
        .chatbot-input .MuiOutlinedInput-root,
        .chatbot-input textarea {
          width: 100%;
        }

        .chatbot-input .MuiOutlinedInput-root {
          color: #ffffff;
          font-family: "Montserrat", sans-serif;
          min-height: 58px;
        }

        .chatbot-input .MuiOutlinedInput-notchedOutline {
          border-color: rgba(255, 255, 255, 0.22);
        }

        .chatbot-input .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline,
        .chatbot-input .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline {
          border-color: ${accentGreen};
        }

        .chatbot-input textarea::placeholder {
          color: rgba(255, 255, 255, 0.52);
          opacity: 1;
        }

        .chatbot-ask {
          background: linear-gradient(135deg, #55c985, #3ba565);
          border-radius: 8px;
          box-shadow: 0 0 28px rgba(73, 188, 136, 0.26);
          color: #ffffff;
          font-family: "Montserrat", sans-serif;
          font-weight: 700;
          min-height: 48px;
          text-transform: none;
          width: 100%;
        }

        .chatbot-ask:hover {
          background: linear-gradient(135deg, #62d491, #45b571);
          box-shadow: 0 0 34px rgba(73, 188, 136, 0.36);
        }

        .chatbot-response {
          color: rgba(255, 255, 255, 0.82);
          font-family: "Montserrat", sans-serif;
          font-size: 15px;
          line-height: 1.58;
          margin-top: 18px;
          min-height: 44px;
        }

        .chatbot-response img {
          display: block;
          margin: 18px auto 0;
          width: 54px;
        }

        .chatbot-launcher {
          align-items: center;
          background: rgba(2, 15, 13, 0.92);
          border: 1px solid rgba(73, 188, 136, 0.72);
          border-radius: 50%;
          box-shadow: 0 18px 42px rgba(0, 0, 0, 0.46),
            0 0 24px rgba(73, 188, 136, 0.22);
          color: ${accentGreen};
          cursor: pointer;
          display: flex;
          height: 62px;
          justify-content: center;
          margin-left: auto;
          pointer-events: auto;
          transition: background 160ms ease, color 160ms ease,
            transform 160ms ease;
          width: 62px;
        }

        .chatbot-launcher:hover {
          background: rgba(73, 188, 136, 0.18);
          color: #ffffff;
          transform: translateY(-2px);
        }

        .chatbot-launcher svg {
          font-size: 31px;
        }

        @media (max-width: 640px) {
          .chatbot-shell {
            bottom: 14px;
            left: 14px;
            right: 14px;
          }

          .chatbot-card {
            max-height: 72vh;
            padding: 20px 16px;
            width: 100%;
          }

          .chatbot-prompts {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  )
}
