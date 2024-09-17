import express from 'express';
import Connection from './database/db.js';
import dotenv from 'dotenv';
import router from './routes/route.js';
import cors from 'cors';
import bodyParser from 'body-parser';

dotenv.config();
const app = express();

const corsOptions = {
  origin: 'http://localhost:5173',
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/', router);

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server is running at port: ${PORT}`);
});

// Database connection
const userName = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
Connection(userName, password);
