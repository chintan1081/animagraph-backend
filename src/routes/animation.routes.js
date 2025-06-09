import { Router } from 'express';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import http from 'http';
import { exec } from 'child_process';
import { promisify } from 'util';
const execPromise = promisify(exec);

const router = Router();

import VideoCodeGeneration from '../services/videoCodeGeneration.js'
import { broadcast } from '../services/websocket.js';
import TextGeneration from '../services/textGeneration.js';


router.post('/', async (req, res) => {
    const prompt = req.body.prompt;
    await VideoCodeGeneration(prompt)
    TextGeneration(prompt)
    const cmd = `python -m manim -qh "${path.join(__dirname, '../../', 'manim2D.py')}" Manim2DVideos`;
    try{
        await execPromise(cmd);
        console.log(`${process.env.BACKEND_URL}/videos/manim2D/1080p60/Manim2DVideos.mp4`);
        
    res.json({ videoUrl : `${process.env.BACKEND_URL}/videos/manim2D/1080p60/Manim2DVideos.mp4` })
    }catch(error) {
        res.json({ videoGernerationError : error })
    }
})

export default router;













    // const videoPath = path.join(__dirname, '../../media/videos/manim2D/1080p60', 'Manim2DVideos.mp4'); // Path to your video file
    // console.log(req.body,"fsdfffffffffffffff");
    
    // if (!fs.existsSync(videoPath)) {
    //     res.status(404).send('Video file not found');
    //     return;
    // }

    // const stat = fs.statSync(videoPath);
    // const fileSize = stat.size;
   
    //     // Serve the entire video
    //     const head = {
    //         'Content-Length': fileSize,
    //         'Content-Type': 'video/mp4',
    //     };

    //     res.writeHead(200, head);
    //     fs.createReadStream(videoPath).pipe(res); // Stream the entire video