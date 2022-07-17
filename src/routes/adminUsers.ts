import express, { Request, Response } from 'express'
import { isAuthenticated, isAdmin, encrypt, mapUser } from '@utils';
import { UserModel } from '@models';

const router = express.Router();

// GET /api/admin/users
router.get("/", isAuthenticated, isAdmin, async (req: Request, res: Response) => {

    const query = req.query.new;

    try {
        const users = query ? await UserModel.find().sort({ _id: -1 }).limit(10)
            : await UserModel.find();

        res.status(200).json(
            users.map(item => mapUser(item))
        );
    } catch (err) {
        res.status(500).json(err);
    }
});

// GET /api/admin/users/stats
router.get("/stats", isAuthenticated, isAdmin, async (req: Request, res: Response) => {

    try {
        const data = await UserModel.aggregate([
            {
                $project: {
                    month: { $month: "$createdAt" },
                },
            },
            {
                $group: {
                    _id: "$month",
                    total: { $sum: 1 },
                },
            },
        ]);
        res.status(200).json(data)
    } catch (err) {
        res.status(500).json(err);
    }
});

// GET /api/admin/users/:id
router.get("/:id", isAuthenticated, isAdmin, async (req: Request, res: Response) => {
    try {
        const user = await UserModel.findById(req.user.id);
        res.status(200).json(mapUser(user));
    } catch (err) {
        res.status(500).json(err);
    }
});

// PUT /api/admin/users/:id
router.put("/:id", isAuthenticated, isAdmin, async (req: Request, res: Response) => {

    if (!req.body)
        res.status(200).json({ message: "User updated !" });

    if (req.body.password)
        req.body.password = encrypt(req.body.password);

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

// DELETE /api/admin/users/:id
router.delete("/:id", isAuthenticated, isAdmin, async (req: Request, res: Response) => {
    try {
        await UserModel.findByIdAndDelete(req.user.id);
        res.status(200).json({ message: "User has been deleted !" });
    } catch (err) {
        res.status(500).json(err);
    }
})

export { router as adminUsersRouter };