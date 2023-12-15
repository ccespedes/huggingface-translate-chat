import React, { useState, useRef, useMemo } from "react"
import { nanoid } from "nanoid"
// import { HfInference } from "@huggingface/inference"
import frenchFlag from "../assets/fr-flag.png"
import spanishFlag from "../assets/sp-flag.png"
import japaneseFlag from "../assets/jpn-flag.png"
import sendBtn from "../assets/send-btn.svg"
import MessageBubble from "./MessageBubble"

// const hf = new HfInference(import.meta.env.VITE_HF_TOKEN || "")
// const hf = new HfInference(process.env.HF_TOKEN || "")

const Main = () => {
  const [formData, setFormData] = useState({
    text: "",
    language: "fr_XX",
  })
  const [messageLog, setMessageLog] = useState([])
  const messageContainerRef = useRef(null)

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    setMessageLog((prev) => [
      ...prev,
      {
        id: nanoid(),
        message: formData.text,
        type: "user",
        isDisplayed: false,
      },
    ])
    fetchReply(formData.text, formData.language)
    setFormData((prev) => ({ ...prev, text: "" }))
    scrollTop()
  }

  async function fetchReply(text, language) {
    const content = { text, language }
    messageDisplayed()
    const url =
      "https://hf-translate-chat.netlify.app/.netlify/functions/fetchHF"
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "text/plain",
        },
        body: JSON.stringify(content),
      })
      const data = await response.json()
      console.log(data)

      // const response = await hf.translation({
      //   model: "facebook/mbart-large-50-many-to-many-mmt",
      //   inputs: text,
      //   parameters: {
      //     src_lang: "en_XX",
      //     tgt_lang: language,
      //   },
      // })
      // const translation = response.translation_text
      // console.log(translation)

      setMessageLog((prev) => [
        ...prev,
        { id: nanoid(), message: translation, type: "bot", isDisplayed: false },
      ])
    } catch (error) {
      console.log(error)
    }
  }

  const scrollTop = () => {
    const messageContainer = messageContainerRef.current
    messageContainer.scrollTop = messageContainer.scrollHeight
  }

  const messageDisplayed = () => {
    console.log("messageDisplay")
    setMessageLog((prev) =>
      prev.map((message) => ({ ...message, isDisplayed: true }))
    )
    scrollTop()
  }

  const chatMessages = useMemo(() => {
    return messageLog.map((msg) => (
      <MessageBubble
        key={nanoid()}
        message={msg.message}
        type={msg.type}
        messageLog={messageLog}
        id={msg.id}
        scrollTop={scrollTop}
        messageDisplayed={() => messageDisplayed(msg.id)}
      />
    ))
  }, [messageLog])

  return (
    <main>
      <form onSubmit={handleSubmit} id="language">
        <div className="input-container mb">
          <input
            id="translate-text"
            type="text"
            autoFocus="autofocus"
            autoComplete="off"
            name="text"
            value={formData.text}
            onChange={handleChange}
            required
          ></input>
          <button>
            <img className="svg" src={sendBtn} />
          </button>
        </div>

        <div className="language-group mb">
          <label>
            <input
              type="radio"
              id="french"
              name="language"
              value="fr_XX"
              checked={formData.language === "fr_XX"}
              onChange={handleChange}
            />
            <img src={frenchFlag} alt="French Flag" />
          </label>

          <label>
            <input
              type="radio"
              id="spanish"
              name="language"
              value="es_XX"
              checked={formData.language === "es_XX"}
              onChange={handleChange}
            />
            <img src={spanishFlag} alt="Spanish Flag" />
          </label>

          <label>
            <input
              type="radio"
              id="japanese"
              name="language"
              value="ja_XX"
              checked={formData.language === "ja_XX"}
              onChange={handleChange}
            />
            <img src={japaneseFlag} alt="Japanese Flag" />
          </label>
        </div>
      </form>

      <div className="message-container" ref={messageContainerRef}>
        <div id="loading"></div>

        <div id="setup">
          <div className="message message-bot">
            Select the language you want me to translate into, type your text
            and send!
          </div>

          <div id="chat">{chatMessages}</div>
        </div>
      </div>
    </main>
  )
}

export default Main
