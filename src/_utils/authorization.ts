import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { AppError } from '@utils';

export function isAuthenticated(req: Request, res: Response, next: NextFunction) {

    const authHeader = req.headers.authorization;

    if (authHeader || authHeader !== undefined) {
        const token = authHeader.split(" ")[1]; // Bearer <token>

        jwt.verify(token, process.env.JWT_SECRET_KEY!, (err, user) => {
            if (err)
                return next(new AppError(403, err?.message!));

            req.user = user;

            return next();
        });
    } else {
        res.status(401).json({ message: "Unauthorized !" });
        return next();
    }

}

export function isAdmin(req: Request, res: Response, next: NextFunction) {

    if (!req.user)
        return next(new AppError(401, "Unauthorized"));

    if (!req.user.isAdmin)
        return next(new AppError(403, "Unauthorized"));

    return next();
}