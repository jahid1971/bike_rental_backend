import { Router } from "express";

import { authRoutes } from "../modules/auth/auth.route";
import { userRoutes } from "../modules/user/user.route";
import { bikeRoutes } from "../modules/bike/bike.route";

const router = Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/bikes", bikeRoutes);

export default router;
