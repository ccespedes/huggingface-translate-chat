import { HfInference } from "@huggingface/inference"

const hf = new HfInference(process.env.HF_TOKEN || "")

const handler = async (event) => {
  try {
    //   const response = await hf.translation({
    //     model: "facebook/mbart-large-50-many-to-many-mmt",
    //     inputs: text,
    //     parameters: {
    //       src_lang: "en_XX",
    //       tgt_lang: language,
    //     },
    // })
    const data = JSON.parse(event.body)

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    }
    //   return {
    //     statusCode: 200,
    //     body: JSON.stringify({ message: `Hello ${subject}` }),
    //   }
  } catch (error) {
    //   return { statusCode: 500, body: error.toString() }
  }
}

module.exports = { handler }
