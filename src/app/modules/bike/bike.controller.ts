import { Request, Response } from "express";
import catchAsynch from "../../utls/catchAsynch";
import { bikeServices } from "./bike.service";
import sendSuccessResponse from "../../utls/sendSuccessResponse";

const createBike = catchAsynch(async (req: Request, res: Response) => {
    const result = await bikeServices.createBike(req.body);
    return sendSuccessResponse(res, result, "Bike created successfully", 201);
});
const getAllBikes = catchAsynch(async (req: Request, res: Response) => {
    const result = await bikeServices.getAllBikes();
    return sendSuccessResponse(res, result, "All bikea fetched successfully", 200);
})

const updateBike = catchAsynch(async (req: Request, res: Response) => {
    const result = await bikeServices.updateBike(req.params.id, req.body);
    return sendSuccessResponse(res, result, "Bike updated successfully", 200);
})

const deleteBike = catchAsynch(async (req: Request, res: Response) => {
    const result = await bikeServices.deleteBike(req.params.id);
    return sendSuccessResponse(res, result, "Bike deleted successfully", 200);
})

export const bikeControllers = {
    createBike,
    getAllBikes,
    updateBike,
    deleteBike

};
