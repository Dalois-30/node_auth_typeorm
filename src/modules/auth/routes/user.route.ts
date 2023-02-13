import { Router } from "express";
import { AuthenticatedUser } from "../../../middlewares/auth";
import { GetAllUser, GetOneUser, UpdateUser, DeleteUser } from "../controllers/user.controller";


export const userRoutes = (router: Router) => {
    router.get('/users/getall', GetAllUser);
    router.get('/users/get/:id',AuthenticatedUser, GetOneUser);
    router.put('/users/update:id', UpdateUser);
    router.delete('/users/delete/:id', DeleteUser);
}