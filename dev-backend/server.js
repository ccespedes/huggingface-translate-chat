import express from "express"
import "dotenv/config"
import { HfInference } from "@huggingface/inference"

const app = express()

const hf = new HfInference(process.env.HF_TOKEN || "")

app.get("/api", async (req, res) => {
  const { text, src_lang, tgt_lang } = req.query.input
  //   res.send(text)
  const response = await hf.translation({
    model: "facebook/mbart-large-50-many-to-many-mmt",
    inputs: text,
    parameters: {
      src_lang,
      tgt_lang,
    },
  })
  res.send(response)
})

const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`Server is listening on port: ${port}`)
})
