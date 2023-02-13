"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logout = exports.Refresh = exports.Login = exports.Register = void 0;
var bcryptjs_1 = require("bcryptjs");
var jsonwebtoken_1 = require("jsonwebtoken");
var user_model_1 = require("../models/user.model");
var token_model_1 = require("../models/token.model");
var app_data_source_1 = require("../../../app-data-source");
/**
 *
 * @param req
 * @param res
 * @returns return the user newly created
 */
var Register = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, firstName, lastName, birthDate, email, password, user, _b, _c, results;
    var _d;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                _a = req.body, firstName = _a.firstName, lastName = _a.lastName, birthDate = _a.birthDate, email = _a.email, password = _a.password;
                _c = (_b = app_data_source_1.myDataSource.getRepository(user_model_1.User)).create;
                _d = {
                    firstName: firstName,
                    lastName: lastName,
                    birthDate: birthDate,
                    email: email,
                    active: false
                };
                return [4 /*yield*/, (0, bcryptjs_1.hash)(password, 12)];
            case 1:
                user = _c.apply(_b, [(_d.password = _e.sent(),
                        _d)]);
                return [4 /*yield*/, app_data_source_1.myDataSource.getRepository(user_model_1.User).save(user)
                    // return the results
                ];
            case 2:
                results = _e.sent();
                // return the results
                return [2 /*return*/, res.send(results)];
        }
    });
}); };
exports.Register = Register;
/**
 *
 * @param req
 * @param res
 * @returns the token of the user
 */
var Login = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, refreshToken, expired_at, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, app_data_source_1.myDataSource.getRepository(user_model_1.User).findOneBy({
                    email: req.body.email,
                })];
            case 1:
                user = _a.sent();
                // then check if the user exists
                if (!user) {
                    return [2 /*return*/, res.status(400).send({
                            message: 'Invalid credentials'
                        })];
                }
                return [4 /*yield*/, (0, bcryptjs_1.compare)(req.body.password, user.password)];
            case 2:
                // check the validity of the credentials
                if (!(_a.sent())) {
                    return [2 /*return*/, res.status(400).send({
                            message: 'Invalid credentials'
                        })];
                }
                refreshToken = (0, jsonwebtoken_1.sign)({
                    id: user.id
                }, "refresh_secret", { expiresIn: '1w' });
                expired_at = new Date();
                expired_at.setDate(expired_at.getDate() + 7);
                // save the refresh token in the database
                return [4 /*yield*/, app_data_source_1.myDataSource.getRepository(token_model_1.Token).save({
                        userId: user,
                        token: refreshToken,
                        expired_at: expired_at
                    })];
            case 3:
                // save the refresh token in the database
                _a.sent();
                token = (0, jsonwebtoken_1.sign)({
                    id: user.id
                }, "access_secret", { expiresIn: '1W' });
                // send all the tokens to the user (access and refresh tokens)
                return [2 /*return*/, res.send({
                        access_token: token,
                        refresh_token: refreshToken
                    })];
        }
    });
}); };
exports.Login = Login;
/**
 *
 * @param req
 * @param res
 * @returns the response containing the new access token of the user
 */
var Refresh = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var refreshToken, payload, dbToken, token, error_1, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                refreshToken = req.params.refresh_token;
                payload = (0, jsonwebtoken_1.verify)(refreshToken, "refresh_secret");
                if (!payload) {
                    return [2 /*return*/, res.status(401).send({
                            message: 'unauthenticated'
                        })];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, app_data_source_1.myDataSource
                        .getRepository(token_model_1.Token)
                        .createQueryBuilder("token")
                        .leftJoinAndSelect("token.user", "user")
                        .where("user.id = :id", { id: payload.id })
                        .andWhere("token.expired_at >= :expiration", { expiration: new Date() })
                        .getOne()
                    // chech if the corresponding token exists
                ];
            case 2:
                dbToken = _a.sent();
                // chech if the corresponding token exists
                if (!dbToken) {
                    return [2 /*return*/, res.status(401).send({
                            message: 'unauthenticated'
                        })];
                }
                token = (0, jsonwebtoken_1.sign)({
                    id: payload.id
                }, "access_secret", { expiresIn: '1W' });
                // return the new access token
                return [2 /*return*/, res.send({
                        access_token: token,
                    })];
            case 3:
                error_1 = _a.sent();
                console.log(error_1);
                return [3 /*break*/, 4];
            case 4: return [3 /*break*/, 6];
            case 5:
                e_1 = _a.sent();
                return [2 /*return*/, res.status(401).send({
                        message: 'unauthenticated'
                    })];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.Refresh = Refresh;
var Logout = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var refreshToken;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                refreshToken = req.params.refresh_token;
                return [4 /*yield*/, app_data_source_1.myDataSource.getRepository(token_model_1.Token).delete({ token: refreshToken })];
            case 1:
                _a.sent();
                return [2 /*return*/, res.send({
                        message: 'success'
                    })];
        }
    });
}); };
exports.Logout = Logout;
