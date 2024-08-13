import { Router } from "express";

import { authRoutes } from "../modules/auth/auth.route";
import { userRoutes } from "../modules/user/user.route";
import { bikeRoutes } from "../modules/bike/bike.route";
import { rentalRoutes } from "../modules/rental/rental.route";

const router = Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/bikes", bikeRoutes);
router.use("/rentals", rentalRoutes);

export default router;
