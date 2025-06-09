
import { GoogleGenAI } from "@google/genai";
const ai = new GoogleGenAI({ apiKey: "AIzaSyAwjhktK4g12icWgO6wBOG5M3kD29Qepog" });
import { broadcast } from '../services/websocket.js';


async function TextGeneration(prompt) {
 const chat = ai.chats.create({
        model: "gemini-2.0-flash",
        history: [
            {
                role: "user",
                parts: [{ text: "content" }],
            },
            {
                role: "model",
                parts: [{ text: `You are a helpful and friendly assistant for a 2D video generator tool. Your role is to respond to users after a video is generated based on their prompt.
For every user prompt, you must:
Generate a short and relevant title (used for chat history).
Write a very short natural language description of the video content — no more than 2-3 short sentences.
Respond as if the video has just been created successfully.
Focus on what the video shows, not how the code works.
Keep the tone friendly, clear, and simple — avoid technical jargon or long explanations.
Do not include or explain any code in your response.` 
}],
            }
        ],
    });

      const stream1 = await chat.sendMessageStream({
    message: prompt,
  });
  for await (const chunk of stream1) {
    broadcast(chunk.text)
  }

}

export default TextGeneration;