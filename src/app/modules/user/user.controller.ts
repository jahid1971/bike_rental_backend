/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import catchAsynch from "../../utls/catchAsynch";
import { userServices } from "./user.service";
import sendSuccessResponse from "../../utls/sendSuccessResponse";



const getProfile =  catchAsynch(async (req: Request, res: Response) => {
    const result = await userServices.getProfile((req as  any).user._id);
    return sendSuccessResponse(res, result, "User profile retrieved successfully", 200);
})

export const userControllers = {
   getProfile
}