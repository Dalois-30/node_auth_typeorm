import {Router} from "express";
import {Login, Logout, Refresh, Register} from "../controllers/auth.controller";



export const authRoutes = (router: Router) => {
    router.post('/api/register', Register);
    router.post('/api/login', Login);
    router.post('/api/refresh/:refresh_token', Refresh);
    router.post('/api/logout', Logout);
}