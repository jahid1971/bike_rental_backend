/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import catchAsynch from "../../utls/catchAsynch";
import { rentalServices } from "./rental.service";
import sendSuccessResponse from "../../utls/sendSuccessResponse";

const createRental = catchAsynch(async (req: any, res: Response) => {
    const result = await rentalServices.createRental(req.user, req.body);
    return sendSuccessResponse(res, result, "Rental created successfully", 201);
});

const returnBike = catchAsynch(async (req: any, res: Response) => {
    const result = await rentalServices.returnBike(req.params.id);
    return sendSuccessResponse(res, result, "Bike returned successfully");
})

const getMyRentals = catchAsynch(async (req: any, res: Response) => {
    const result = await rentalServices.getMyRentals(req.user._id);
    return sendSuccessResponse(res, result, "My rentals fetched successfully");
})

export const rentalController = {
    createRental,
    returnBike,
    getMyRentals
};
