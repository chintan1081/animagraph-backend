import { Router } from 'express';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


import { exec } from 'child_process';
import { promisify } from 'util';
const execPromise = promisify(exec);

const router = Router();

import VideoCodeGeneration from '../services/videoCodeGeneration.js'
import { broadcast } from '../services/websocket.js';
import TextGeneration from '../services/textGeneration.js';
import AppDataSource from '../database/ormconfig.js';
import { log } from 'console';


router.post('/', async (req, res) => {
    const prompt = req.body.prompt;
    const codeGenerated = await VideoCodeGeneration(prompt)
    TextGeneration(prompt)

    const cmd = `python -m manim -qh "${path.join(__dirname, '../../', 'manim2D.py')}" Manim2DVideos`;
    try {
        await execPromise(cmd);

        console.log(path.join(__dirname, '../../', '/media/videos/manim2D/1080p60/Manim2DVideos.mp4'), "................................wo");

        const fileUrl = await fileUpload(path.join(__dirname, '../../', '/media/videos/manim2D/1080p60/Manim2DVideos.mp4'))

        if (!AppDataSource.isInitialized) await AppDataSource.initialize();
        const repo = AppDataSource.getRepository("UserGeneration");
        const record = repo.create({
            prompt,
            codeGenerated,
            videoUrl: fileUrl
        });

        await repo.save(record);


        res.json({ videoUrl: fileUrl })
    } catch (error) {
        res.json({ videoGernerationError: error })
    }
})

export default router;
