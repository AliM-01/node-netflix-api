import express, { Application, Request, Response, NextFunction } from 'express';
import mongoose, { ConnectOptions } from 'mongoose';
import dotenv from 'dotenv';
import { authRouter, adminUsersRouter, accountRouter, moviesRouter } from '@routes';
import { AppError } from '@utils';

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
app.use('/api/admin/users', adminUsersRouter);
app.use('/api/account', accountRouter);
app.use('/api/movies', moviesRouter);

// Error handler
app.use((err:AppError, req: Request, res: Response, next: NextFunction) => {
    res.status(err.status || 500)
        .json({
            status: err.status || 500,
            message: err.message
        });
});

app.listen(process.env.PORT, () => {
    console.log(`Running on http://localhost:${process.env.PORT}`);
})