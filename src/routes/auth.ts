import express, { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { encrypt, decrypt } from '../_utils/pwd';
import User from '@models/User';

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

// POST /api/auth/login
router.post("/login", async (req: Request, res: Response) => {

    const { email, password } = req.body;

    try {
        const user: any = await User.findOne({ email: email });

        if (!user)
            res.status(401).json({ message: "Wrong Username or Password" });

        const originalPassword = decrypt(user.password);

        if (originalPassword !== password)
            res.status(401).json({ message: "Wrong Username or Password" });

        const accessToken = jwt.sign(
            { id: user._id, isAdmin: user.isAdmin },
            process.env.JWT_SECRET_KEY!, 
            { expiresIn: "3d" }
        );

        res.status(200).json({ 
            message: "Successfully logged in!",
            "access-token": accessToken, 
            "uid":  user._id });
        
    } catch (err) {
        res.status(500).json(err);
    }
})

export { router as authRouter };