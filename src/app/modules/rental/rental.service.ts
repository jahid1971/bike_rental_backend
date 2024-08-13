import mongoose from "mongoose";
import { IUser } from "../user/user.interface";
import { IRental } from "./rental.interface";
import Rental from "./rental.model";
import Bike from "../bike/bike.model";
import AppError from "../../errors/AppError";

const createRental = async (user: IUser, payload: IRental) => {
    payload.userId = user._id ?? "";
    payload.isReturned = false;
    payload.returnTime = null;
    payload.totalCost = 0;

    const session = await mongoose.startSession();

    try {
        session.startTransaction();
        const rental = await Rental.create([payload], { session: session });

        const bike = await Bike.findByIdAndUpdate(
            payload.bikeId,
            { isAvailable: false },
            { session: session }
        );

        if (!bike) throw new AppError(404, "Bike not found");

        await session.commitTransaction();
        session.endSession();

        return rental;
    } catch (err) {
        console.log(err, "error in rental creation");
        await session.abortTransaction();
        session.endSession();
        throw new AppError(500, (err as Error)?.message);
    }
};

const returnBike = async (rentalId: string) => {
    const rental = await Rental.findById(rentalId);

    if (!rental) throw new AppError(404, "Rental not found");
    // console.log(rental, "rental");

    if (rental.isReturned) throw new AppError(400, "Bike is already returned");

    const session = await mongoose.startSession();

    try {
        session.startTransaction();

        const bike = await Bike.findByIdAndUpdate(rental.bikeId, { isAvailable: true }, { new: true });

        if (!bike) throw new AppError(404, "Bike not found");

        const duration = Math.ceil((new Date().getTime() - rental.startTime.getTime()) / (1000 * 60 * 60));
        const totalCost = duration * bike.pricePerHour;

        rental.isReturned = true;
        rental.returnTime = new Date();
        rental.totalCost = totalCost;

        // Saving the updated rental
        await rental.save({ session });

        await session.commitTransaction();
        session.endSession();

        return rental;
    } catch (err) {
        console.log(err, "error in returning bike");
        await session.abortTransaction();
        session.endSession();
        throw new AppError(500, (err as Error)?.message);
    }
};

const getMyRentals = async (userId: string) => {
    const myrentals = await Rental.find({ userId: userId })

    return myrentals;
};

export const rentalServices = {
    createRental,
    returnBike,
    getMyRentals,
};
