import express, { Request, Response } from 'express'
import { verify, encrypt } from '@utils';
import { UserModel } from '@models';

const router = express.Router();

router.get("/", verify, async (req: Request, res: Response) => {
    
    if (!req.user.isAdmin)
        res.status(403);

    const query = req.query.new;

    try {
        let users;

        if (query)
            users = await UserModel.find().limit(10)
        else
            users = await UserModel.find();

        res.status(200).json(users);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get("/:id", verify, async (req: Request, res: Response) => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
        try {
            const user = await UserModel.findById(req.user.id);

            res.status(200).json({
                "uid": user?._id,
                username: user?.username,
                email: user?.email,
            });
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(403);
    }
});

// PUT /api/users/:id
router.put("/:id", verify, async (req: Request, res: Response) => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
        console.log("equals");

        if (req.body.password) {
            req.body.password = encrypt(req.body.password)
        }


        try {

            if (!req.body) {
                res.status(200).json({ message: "User updated !" });
            }

            const updatedUser = await UserModel.findByIdAndUpdate(
                req.user.id,
                { $set: req.body },
                { new: true });

            res.status(200).json({
                message: "User updated !",
                user: {
                    uid: updatedUser?._id,
                    email: updatedUser?.email,
                    username: updatedUser?.username,
                    pfp: updatedUser?.pfp,
                    isAdmin: updatedUser?.isAdmin,
                }
            });

        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(403);
    }
})

// DELETE /api/users/:id
router.delete("/:id", verify, async (req: Request, res: Response) => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
        try {
            await UserModel.findByIdAndDelete(req.user.id);
            res.status(200).json({ message: "User has been deleted !" });
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(403);
    }
})

export { router as usersRouter };