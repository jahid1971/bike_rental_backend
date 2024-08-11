/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import catchAsynch from "../../utls/catchAsynch";
import sendSuccessResponse from "../../utls/sendSuccessResponse";
import { authServices } from "./auth.service";

const signUp = catchAsynch(async (req: Request, res: Response) => {
    const result = await authServices.signUp(req.body);
    return sendSuccessResponse(res, result, "SignUp successful", 201);
});

const logIn = catchAsynch(async (req: Request, res: Response) => {
    const { accessToken, refreshToken, userObject } = await authServices.logIn(req.body);

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
    });

    res.status(200).json({
        success: true,
        statusCode: 200,
        message: "User logged in successfully",
        token: accessToken,
        data: userObject, 
    });
});

export const authControllers = {
    signUp,
    logIn,
};
