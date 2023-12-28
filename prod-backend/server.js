import express from "express"
import { HfInference } from "@huggingface/inference"

const app = express()

app.use(express.static("dist"))

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

const port = process.env.PORT || 3010
app.listen(port, () => {
  console.log(`Server is listening on port: ${port}`)
})
