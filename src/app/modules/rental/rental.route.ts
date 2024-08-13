import { Router } from "express";
import checkAuth from "../../middleWares/checkAuth";
import { userRole } from "../../constants/user";
import validateRequest from "../../middleWares/validateRequest";
import { rentalValidation } from "./rental.validation";
import { rentalController } from "./rental.controller";

const router = Router();

router.post(
    "/",
    checkAuth(userRole.ADMIN, userRole.USER),
    validateRequest(rentalValidation.rentalSchema),
    rentalController.createRental
);
router.put("/:id/return", checkAuth(userRole.ADMIN), rentalController.returnBike);
router.get("/", checkAuth(userRole.ADMIN, userRole.USER), rentalController.getMyRentals);

export const rentalRoutes = router;
