import express from 'express';
import * as dotenv from 'dotenv'
import { dbConnection } from './databases/dbConnection.js';
import cors from "cors"
import { Server } from 'socket.io';
import { socketConnection } from './src/services/socket.io.js';
import { cornJob } from './src/services/corn-job.js';
import { init } from './src/index.routes.js';

dotenv.config()
const app = express();
const port = 3000;
dbConnection()
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cors())
app.use(express.json())
init(app);


const server = app.listen(process.env.PORT || port, () => {
    console.log(`app is listening on ${port}`);
})
export const io = new Server(server, {
    cors: "*"
})

socketConnection(io);
cornJob(io);


