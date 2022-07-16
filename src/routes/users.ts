import express, { Request, Response } from 'express'
import { isAuthenticated, encrypt, mapUser } from '@utils';
import { UserModel } from '@models';

const router = express.Router();

router.get("/", isAuthenticated, async (req: Request, res: Response) => {
    try {
        const user = await UserModel.findById(req.user.id);

        res.status(200).json(mapUser(user));
    } catch (err) {
        res.status(500).json(err);
    }
});

// PUT /api/users/:id
router.put("/", isAuthenticated, async (req: Request, res: Response) => {
    if (!req.body)
        res.status(200).json({ message: "User updated !" });

    if (req.body.password)
        req.body.password = encrypt(req.body.password)

    try {

        const updatedUser = await UserModel.findByIdAndUpdate(
            req.user.id,
            { $set: req.body },
            { new: true });

        res.status(200).json({
            message: "User updated !",
            user: mapUser(updatedUser)
        });

    } catch (err) {
        res.status(500).json(err);
    }
})

// DELETE /api/users/:id
router.delete("/", isAuthenticated, async (req: Request, res: Response) => {
    try {
        await UserModel.findByIdAndDelete(req.user?.id);
        res.status(200).json({ message: "User has been deleted !" });
    } catch (err) {
        res.status(500).json(err);
    }
})

export { router as usersRouter };