import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import router from './routes';
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import { testOpenAiAsync } from './openai/quizzes.openai';

// enable dotenv
dotenv.config();

// access config
const port = process.env.PORT || 3000;
const databaseUrl = process.env.DATABASE_URL || '';
const databaseName = process.env.DATABASE_NAME;

// create server
const app = express();

// configure server
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json()); // enable JSON body parser

// set routes
app.use('/', router);

// start server
const startAsync = async () => {
    try {
        // connect to db
        await mongoose.connect(databaseUrl, { dbName: databaseName });

        // start server
        app.listen(port, () => console.log(`Server started at http://localhost:${port}`));
    } 
    catch (error) {
        console.error(error);
        process.exit(1);
    }
};

startAsync();

// export app
export default app;