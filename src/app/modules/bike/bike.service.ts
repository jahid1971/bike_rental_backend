import { IBike } from "./bike.interface";
import Bike from "./bike.model";

const createBike = async (payload: IBike) => {
    const bike = await Bike.create(payload);
    return bike;
};

export const bikeServices = {
    createBike,
};
