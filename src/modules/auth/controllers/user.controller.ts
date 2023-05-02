import { Request, Response, NextFunction } from "express";
import { MoreThanOrEqual } from "typeorm";
import { User } from "../models/user.model";
import { Token } from "../models/token.model";
import { myDataSource } from "../../../connections/app-data-source";

/**
 * 
 * @param req 
 * @param res 
 * @returns the list of all users
 */
export const GetAllUser = async (req: Request, res: Response) => {
    const users = await myDataSource.getRepository(User).find()
    return res.json(users)
}

/**
 * 
 * @param req 
 * @param res 
 * @returns one user by id
 */
export const GetOneUser = async function (req: Request, res: Response) {
    const results = await myDataSource.getRepository(User).findOneBy({
        id: req.params.id,
    })
    return res.send(results)
}

/**
 * 
 * @param req 
 * @param res 
 * @returns Update the user to the database
 */
export const UpdateUser = async function (req: Request, res: Response) {
    const user = await myDataSource.getRepository(User).findOneBy({
        id: req.params.id,
    })
    myDataSource.getRepository(User).merge(user, req.body)
    const results = await myDataSource.getRepository(User).save(user)
    return res.send(results)
}

/**
 * 
 * @param req 
 * @param res 
 * @returns Delete user from the database
 */
export const DeleteUser = async function (req: Request, res: Response) {
    const results = await myDataSource.getRepository(User).delete(req.params.id)
    return res.send(results)
}


