import { HfInference } from "@huggingface/inference"

const hf = new HfInference(process.env.HF_TOKEN || "")

const handler = async (event) => {
  try {
    const data = JSON.parse(event.body)
    console.log(data.text)
    const response = await hf.translation({
      model: "facebook/mbart-large-50-many-to-many-mmt",
      inputs: text,
      parameters: {
        src_lang: data.text,
        tgt_lang: data.language,
      },
    })
    return {
      statusCode: 200,
      body: JSON.stringify(response),
    }
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}

module.exports = { handler }
