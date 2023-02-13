import {Request, Response, NextFunction} from "express";

import {sign, verify} from 'jsonwebtoken';
import { User } from "../modules/auth/models/user.model";
import { myDataSource } from "../app-data-source";


/**
 * 
 * @param req 
 * @param res 
 * @returns return the authorization and the token
 */
export const AuthenticatedUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // get the authorization
        const accessToken = req.header('Authorization')?.split(" ")[1] || "";
        // verify the validity of the token
        const payload: any = verify(accessToken, "access_secret");
        // if invalid, return unauthorized
        if (!payload) {
            return res.status(401).send({
                message: 'unauthenticated not found'
            });
        }
        // get the user information
        const user = await myDataSource.getRepository(User).findOneBy({
            id: payload.id,
        });
        // if user is not found, return unauthorized
        if (!user) {
            return res.status(401).send({
                message: 'unauthenticated'
            });
        }
        // if ok, go to the next middleware
        return next();
    } catch (e) {
        return res.status(401).send({
            message: 'unauthenticated'
        });
    }
}


