import { Request, Response } from "express";
import catchAsynch from "../../utls/catchAsynch";
import { userServices } from "./user.service";
import sendSuccessResponse from "../../utls/sendSuccessResponse";

const signUp = catchAsynch(async (req: Request, res: Response) => {
    const result = await userServices.signUp(req.body);
    return sendSuccessResponse(res, result, "SignUp successful", 201);
});

export const userControllers = {
    signUp
}