import express, { Application } from 'express';
import mongoose, { ConnectOptions } from 'mongoose';
import dotenv from 'dotenv';
import { authRouter, usersRouter } from '@routes';

dotenv.config();

const app: Application = express();

app.use(express.json())

mongoose.connect(process.env.MONGO_URL!, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
} as ConnectOptions)
    .then(() => console.log("Successfully connected to Database"))
    .catch(err => console.log(err));

app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);

app.listen(process.env.PORT, () => {
    console.log(`Running on http://localhost:${process.env.PORT}`);
})