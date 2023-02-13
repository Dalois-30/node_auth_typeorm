"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = void 0;
var auth_1 = require("../../../middlewares/auth");
var auth_controller_1 = require("../controllers/auth.controller");
var authRoutes = function (router) {
    router.post('/api/register', auth_controller_1.Register);
    router.post('/api/login', auth_controller_1.Login);
    router.get('/api/user', auth_1.AuthenticatedUser);
    router.post('/api/refresh/:refresh_token', auth_controller_1.Refresh);
    router.post('/api/logout', auth_controller_1.Logout);
};
exports.authRoutes = authRoutes;
