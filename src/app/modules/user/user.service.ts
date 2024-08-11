import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { IUser } from "./user.interface";
import User from "./user.model";
import { passwordHash } from "../../utls/passwordHash";

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