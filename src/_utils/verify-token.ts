import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

export function verify(req: Request, res: Response, next: NextFunction) {

    const authHeader = req.headers.authorization;

    if (authHeader || authHeader !== undefined) {
        const token = authHeader.split(" ")[1]; // Bearer <token>

        jwt.verify(token, process.env.JWT_SECRET_KEY!, (err, user) => {
            if (err) res.status(403);
                
            req.user = user;
    
            next();
        });
    }

    res.status(401).json({ message: "Unauthorized !" });
    next();
}