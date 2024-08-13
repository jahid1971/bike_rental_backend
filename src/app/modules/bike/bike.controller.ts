import { Request, Response } from "express";
import catchAsynch from "../../utls/catchAsynch";
import { bikeServices } from "./bike.service";
import sendSuccessResponse from "../../utls/sendSuccessResponse";

const createBike = catchAsynch(async (req: Request, res: Response) => {
    const result = await bikeServices.createBike(req.body);
    return sendSuccessResponse(res, result, "Bike created successfully", 201);
});

export const bikeControllers = {
    createBike,
};
