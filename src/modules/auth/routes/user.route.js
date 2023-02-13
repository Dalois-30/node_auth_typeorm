"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
var auth_1 = require("../../../middlewares/auth");
var user_controller_1 = require("../controllers/user.controller");
var userRoutes = function (router) {
    router.get('/users/getall', user_controller_1.GetAllUser);
    router.get('/users/get/:id', auth_1.AuthenticatedUser, user_controller_1.GetOneUser);
    router.put('/users/update:id', user_controller_1.UpdateUser);
    router.delete('/users/delete/:id', user_controller_1.DeleteUser);
};
exports.userRoutes = userRoutes;
