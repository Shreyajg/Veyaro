console.log("SERVER FILE STARTED");

import dns from 'dns';
dns.setServers(['8.8.8.8', '8.8.4.4']);

import express from 'express';
import dotenv from 'dotenv';
import ConnectDB from './config/db.js';
import { errorHandler } from './middleware/error.middleware.js';
import userRouter from './routes/users.routes.js';
import studentRouter from './routes/students.routes.js';
import schoolRouter from './routes/schools.routes.js';
import programmeRouter from './routes/programmes.routes.js';
import yearGroupRouter from './routes/yearGroups.routes.js';
import teacherRouter from './routes/teachers.routes.js';
import adminRouter from './routes/admins.routes.js';
import classRouter from './routes/classes.routes.js';
import assignmentRouter from './routes/assignments.routes.js';
import announcementRouter from './routes/announcements.routes.js';
import timeRouter from './routes/timtables.routes.js';
import cors from 'cors';

dotenv.config();

const app = express();

const PORT = process.env.PORT || 8000;

await ConnectDB();
app.use(cors({
    origin: 'http://localhost:5500'
}));
app.use(express.json());
app.use('/api/users',userRouter);
app.use('/api/students',studentRouter);
app.use('/api/schools', schoolRouter);
app.use('/api/programmes', programmeRouter);
app.use('/api/year-groups', yearGroupRouter);
app.use('/api/teachers',teacherRouter);
app.use('/api/admins',adminRouter);
app.use('/api/classes',classRouter);
app.use('/api/assignments',assignmentRouter);
app.use('/api/announcements',announcementRouter);
app.use('/api/timetable',timeRouter);

app.get('/', (req, res) => {
    res.send("Hello World");
});

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`);
});