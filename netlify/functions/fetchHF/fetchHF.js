import { HfInference } from "@huggingface/inference"

const hf = new HfInference(process.env.HF_TOKEN || "")

const handler = async (event) => {
  try {
    const data = JSON.parse(event.body)
    return {
      statusCode: 200,
      body: JSON.stringify(data.text),
    }
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}

module.exports = { handler }
