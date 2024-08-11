import { GoogleGenerativeAI } from "@google/generative-ai"
import dotenv from 'dotenv'

dotenv.config()

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.VITE_API_KEY)

const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

async function run() {
  const prompt = 'Write a story about a AI and magic'

  const result = await model.generateContent(prompt)
  const response = await result.response
  const text = response.text()
  console.log(response.candidates[0].content.parts[0].text)
}

run();