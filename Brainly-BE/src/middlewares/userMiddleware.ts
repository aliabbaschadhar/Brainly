import type { Request, Response, NextFunction } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";

// Extend the Request interface
declare global {
    namespace Express {
        interface Request {
            userId?: string;
        }
    }
}

const SECRET = process.env.JWT_SECRET;

export const userMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    if (!token) {
        res.status(403).json({
            msg: "No token found"
        })
        return;
    }

    if (!SECRET) {
        res.status(403).json({
            msg: "JWT secret is not defined!"
        })
        return;
    }

    try {
        const decoded = jwt.verify(token as string, SECRET) as JwtPayload;
        req.userId = decoded.id;
        next();
    } catch (error) {
        res.status(403).json({
            msg: "You are not loggedIn"
        })
    }
}