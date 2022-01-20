import WebSocket from 'ws'
import fs from 'fs'
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const wssConnect = (server) => {
    const wss = new WebSocket.Server({ server })
    
    const sendFile = () => {
        wss.clients.forEach((client) => {
            fs.readFile(__dirname+'/assets/sample.jpg', function(err, buf){
                client.send(JSON.stringify({ image: true, buffer: buf.toString('base64') }))
                console.log('file sent')
            })
            //client.send(JSON.stringify({ image: true, buffer: buf.toString('base64') }))
        });
    }

    return {wss, sendFile}
}


export default wssConnect