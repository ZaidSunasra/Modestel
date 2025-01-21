import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export const authMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const token = req.cookies.Token;
    if (!token) {
        return res.status(401).send({ msg: "No token provided" });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { username: string; role: string };
        if (!decoded.username || !decoded.role) {
            return res.status(401).send({ msg: "Invalid token" });
        }
        res.locals.user = decoded;
        next();
    } catch (error) {
        console.log("Middleware error: ", error);
    return res.status(500).send({ msg: "Internal server error" });
    }
}