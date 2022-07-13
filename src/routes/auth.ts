import express, { Request, Response } from 'express'
import { encrypt } from '../utils/pwd';
import User from '../models/User';

const router = express.Router();

// POST /api/auth/register
router.post("/register", async (req: Request, res: Response) => {

    const { username, email, password } = req.body;

    const newUser = new User({
        username: username,
        email: email,
        password: encrypt(password)
    });

    try {
        const user = await newUser.save();
        res.status(201).json({
            id: user.id
        });
    } catch (err) {
        res.status(500).json(err);
    }
})

export { router as authRouter };