/* eslint-disable @typescript-eslint/no-explicit-any */
import { JwtPayload, sign } from "jsonwebtoken";
import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { passwordHash } from "../../utls/passwordHash";

import User from "../user/user.model";
import { jwtToken } from "../../utls/jwtToken";
import config from "../../config";
import { IUser } from "../user/user.interface";




// signUp......................signUp

const signUp = async ( payload: IUser) => {
    const user = await User.findOne({ email: payload.email });
    if (user) throw new AppError(httpStatus.BAD_REQUEST, "user is already created with this email");
  
    const hashedPassword = await passwordHash.hashPassword(payload.password ?? '');

    payload.password = hashedPassword;

    const result = await User.create(payload);
    const userObject = result.toObject();
    delete userObject.password;
    return userObject;
};

export const userServices = {
    signUp
}

// logIn......................logIn

const logIn = async (payload: { email: string; password: string }) => {
    const user = await User.findOne({ email: payload.email }).select("+password");

    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, "User not found");
    }

    const plainPassword = payload.password;
    const hashedPassword = user.password;

    const isPasswordMatched = await passwordHash.comparePassword(plainPassword, hashedPassword as string);

    if (!isPasswordMatched) throw new AppError(404, "Invalid password");

    const jwtPayload: JwtPayload = {
        id: user._id,
        role: user.role,
        email: user.email,
        address: user.address,
        phone: user.phone,
    
    };

    const accessToken = jwtToken.createToken(
        jwtPayload,
        config.jwt_access_secret as string,
        config.jwt_access_expiry as string
    );

    const refreshToken = jwtToken.createToken(
        jwtPayload,
        config.jwt_refresh_secret as string,
        config.jwt_refresh_expiry as string
    );

    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    const { password, createdAt, updatedAt, ...userObject } = (user as any).toObject();

    return { accessToken, refreshToken, userObject };
};


export const authServices = {
    signUp,
    logIn,
};
