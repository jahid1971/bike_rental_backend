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

export const rentalRoutes = router;