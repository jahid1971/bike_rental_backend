import { IBike } from "./bike.interface";
import Bike from "./bike.model";

const createBike = async (payload: IBike) => {
    const bike = await Bike.create(payload);
    return bike;
};

const getAllBikes = async () => {
    const bikes = await Bike.find();
    return bikes;
}

const updateBike = async (id: string, payload: IBike) => {
    const bike = await Bike.findByIdAndUpdate(id, payload, { new: true });
    return bike;
}

const deleteBike = async (id: string) => {
    const bike = await Bike.findByIdAndDelete(id);
    return bike;
}

export const bikeServices = {
    createBike,
    getAllBikes,
    updateBike,
    deleteBike
};
