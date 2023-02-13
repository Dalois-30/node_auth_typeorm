import { Request, Response, NextFunction } from "express";
import { MoreThanOrEqual } from "typeorm";
import { hash, compare } from 'bcryptjs';
import { sign, verify } from 'jsonwebtoken';

import { User } from "../models/user.model";
import { Token } from "../models/token.model";
import { myDataSource } from "../../../app-data-source";

/**
 * 
 * @param req 
 * @param res 
 * @returns return the user newly created
 */
export const Register = async (req: Request, res: Response) => {

    // get the user from the request object
    const { firstName, lastName, birthDate, email, password } = req.body;

    // create the user and set his status to false
    const user = myDataSource.getRepository(User).create({
        firstName: firstName,
        lastName: lastName,
        birthDate: birthDate,
        email: email,
        active: false,
        password: await hash(password, 12)
    });

    // save the user to the database
    const results = await myDataSource.getRepository(User).save(user)
    // return the results
    return res.send(results);
}

/**
 * 
 * @param req 
 * @param res 
 * @returns the token of the user
 */
export const Login = async (req: Request, res: Response) => {

    // first get the user
    const user = await myDataSource.getRepository(User).findOneBy({
        email: req.body.email,
    });

    // then check if the user exists
    if (!user) {
        return res.status(400).send({
            message: 'Invalid credentials'
        })
    }

    // check the validity of the credentials
    if (!await compare(req.body.password, user.password)) {
        return res.status(400).send({
            message: 'Invalid credentials'
        })
    }

    // encrypt the refresh token
    const refreshToken = sign({
        id: user.id
    }, "refresh_secret", { expiresIn: '1w' });

    // set the value of expire_at to one week
    const expired_at = new Date();
    expired_at.setDate(expired_at.getDate() + 7);

    // save the refresh token in the database
    await myDataSource.getRepository(Token).save({
        userId: user,
        token: refreshToken,
        expired_at
    });

    // encrypt the access token
    const token = sign({
        id: user.id
    }, "access_secret", { expiresIn: '1W' });

    // send all the tokens to the user (access and refresh tokens)
    return res.send({
        access_token: token,
        refresh_token: refreshToken
    });
}


/**
 * 
 * @param req 
 * @param res 
 * @returns the response containing the new access token of the user
 */
export const Refresh = async (req: Request, res: Response) => {
    try {
        // get the refresh token from the parameters
        const refreshToken = req.params.refresh_token;
        // verify the refresh token
        const payload: any = verify(refreshToken, "refresh_secret");
        if (!payload) {
            return res.status(401).send({
                message: 'unauthenticated'
            });
        }

        // check the correspondance with the current user
        try {

            // create a query object that will be used to retrieve the tokens valid corresponding to the user
            const dbToken = await myDataSource
                .getRepository(Token)
                .createQueryBuilder("token")
                .leftJoinAndSelect("token.user", "user")
                .where("user.id = :id", { id: payload.id })
                .andWhere("token.expired_at >= :expiration", { expiration: new Date() })
                .getOne()

            // chech if the corresponding token exists
            if (!dbToken) {
                return res.status(401).send({
                    message: 'unauthenticated'
                });
            }

            // encrypt the access token
            const token = sign({
                id: payload.id
            }, "access_secret", { expiresIn: '1W' });

            // return the new access token
            return res.send({
                access_token: token,
            });
        } catch (error) {
            console.log(error);

        }
    } catch (e) {
        return res.status(401).send({
            message: 'unauthenticated'
        });
    }
}

/**
 * 
 * @param req 
 * @param res 
 * @returns logout the user
 */
export const Logout = async (req: Request, res: Response) => {
    // get the refresh token from the parameters
    const refreshToken = req.params.refresh_token;

    await myDataSource.getRepository(Token).delete({ token: refreshToken });

    return res.send({
        message: 'success'
    });
}
