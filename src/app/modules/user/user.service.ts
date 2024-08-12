import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import User from "./user.model";




const getProfile = async (userId: string) => {
    const user = await User.findById(userId);
    if (!user) throw new AppError(httpStatus.NOT_FOUND, "User not found");
    return user;
}

export const userServices = {
    getProfile

}