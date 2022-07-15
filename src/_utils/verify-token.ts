import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

export function verify(req: Request, res: Response, next: NextFunction) {

    console.log("jwt");

    const authHeader = req.headers.authorization;

    if (!authHeader || authHeader === undefined) {
        console.log("Unauthorized");

        res.status(401).json({ message: "Unauthorized !" });

    } else {
        const token = authHeader.split(" ")[1]; // Bearer <token>

        jwt.verify(token, process.env.JWT_SECRET_KEY!, (err, user) => {
            if (err) res.status(403);
            console.log("verified");
            
            req.user = user;
            console.log(req.user);

            next();
        });
    }


}