/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";
import AppError from "../errors/AppError";

import User from "../modules/user/user.model";

import catchAsynch from "../utls/catchAsynch";
import { jwtToken } from "../utls/jwtToken";
import config from "../config";
import httpStatus from "http-status";
import { TUserRole } from "../constants/user";

const checkAuth = (...requiredRoles: Array<TUserRole>) => {
    return catchAsynch(async (req: Request, res: Response, next: NextFunction) => {
        const tokenWithBearer = req.headers.authorization;

        const token = (tokenWithBearer as string).split(" ")[1];

        if (!token) {
            throw new AppError(401, "Unauthorized access");
        }

        const decodedToken = jwtToken.verifyToken(token, config.jwt_access_secret as string);
        const { id, role } = decodedToken;

        // checking if the user is exist
        const user = await User.findById(id);

        if (!user) throw new AppError(404, "User  not found !");

        if (requiredRoles && !requiredRoles.includes(role)) {
            throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized !");
        }
        (req as any).user = user;

        next();
    });
};

export default checkAuth;
