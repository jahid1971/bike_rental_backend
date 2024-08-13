import mongoose from "mongoose";
import { IRental } from "./rental.interface";

const rentalSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    bikeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Bike",
        required: true,
    },
    startTime: {
        type: Date,
        required: true,
    },
    returnTime: {
        type: Date,
    },
    totalCost: {
        type: Number,
        required: true,
    },
    isReturned: {
        type: Boolean,
        default: false,
    },
});

const Rental = mongoose.model<IRental>("Rental", rentalSchema);

export default Rental;
