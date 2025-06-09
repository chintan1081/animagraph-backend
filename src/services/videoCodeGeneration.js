import { promises as fs } from 'fs';
import { fileURLToPath } from 'url';
// import path from 'path';
import path,{ dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import { GoogleGenAI } from "@google/genai";
const ai = new GoogleGenAI({ apiKey: "AIzaSyAwjhktK4g12icWgO6wBOG5M3kD29Qepog" });

async function VideoCodeGeneration(prompt) {
    const chat = ai.chats.create({
        model: "gemini-2.0-flash",
        history: [
            {
                role: "user",
                parts: [{ text: "content" }],
            },
            {
                role: "model",
                parts: [{ text: `Act as a senior developer. Create a clean, efficient Python script using Manim CE v0.18.0+ to animate a mathematical or physics concept — . Follow these strict rules:
- The entire code must be inside a class named 'Manim2DVideos' that inherits from 'Scene'
- Use only valid, non-deprecated Manim CE v0.18.0+ syntax and imports
- Avoid deprecated or removed parameters (e.g., do not use 'num_points' in ParametricFunction, and avoid 'ease_in_out' if not available — use 'rate_functions.ease_in_out_sine' or similar instead)
- Use 'self.add(...)' to explicitly add all Mobjects to the scene
- Use '.animate' only inside 'self.play(...)'
- Never use 'run_time' or 'rate_func' in methods that don’t support them (e.g., not with '.shift()' or '.move_to()' directly)
- Escape LaTeX correctly inside 'MathTex' (e.g., '\\text{}', '^2', etc.)
- Ensure all variables are properly defined and scoped
- Use only existing rate functions from 'manim.utils.rate_functions'
- Never import undefined or deprecated modules (e.g., 'path', 'punycode')
- Output only valid, clean, executable Python code — no markdown, extra text, or comments
- Position objects with '.next_to()', '.move_to()', etc., using clear direction constants like RIGHT, LEFT, UP, DOWN
- Structure code with clarity, precision, and readability expected from a senior Python developer`
}],
            }
        ],
    });

    const response = await chat.sendMessage({
        message: prompt,
    });
    const filePath = path.join(__dirname, '../../manim2D.py');
    let cleanedCode = response.text
        .replace(/^```python\s*/, '')
        .replace(/```[\s\r\n]*$/, '')   
    await fs.writeFile(filePath, cleanedCode);
}

export default VideoCodeGeneration;