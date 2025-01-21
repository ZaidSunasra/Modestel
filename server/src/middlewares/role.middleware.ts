import { NextFunction, Request, RequestHandler, Response } from "express";
interface AuthenticatedRequest extends Request {
    user?: {
        username: string;
        role: string;
    };
}
export const checkRole = (allowedRoles: string[]) : RequestHandler => {
    return (req: AuthenticatedRequest, res: Response, next: NextFunction) : void => {
        
        if (!res.locals.user || !allowedRoles.includes(res.locals.user.role)) {
            res.status(403).json({ message: "Access denied. You do not have the required permissions." });
            return;
        }
        next(); 
    };
}