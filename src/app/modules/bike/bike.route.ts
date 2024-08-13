import { Router } from "express";
import checkAuth from "../../middleWares/checkAuth";
import { userRole } from "../../constants/user";
import { bikeControllers } from "./bike.controller";

const router = Router();

router.post("/", checkAuth(userRole.ADMIN), bikeControllers.createBike);

export const bikeRoutes = router;
