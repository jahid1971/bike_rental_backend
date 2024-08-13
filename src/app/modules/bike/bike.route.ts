import { Router } from "express";
import checkAuth from "../../middleWares/checkAuth";
import { userRole } from "../../constants/user";
import { bikeControllers } from "./bike.controller";

const router = Router();

router.post("/", checkAuth(userRole.ADMIN), bikeControllers.createBike);
router.get("/", checkAuth(userRole.ADMIN, userRole.USER), bikeControllers.getAllBikes);
router.put("/:id", checkAuth(userRole.ADMIN), bikeControllers.updateBike);
router.delete("/:id", checkAuth(userRole.ADMIN), bikeControllers.deleteBike);

export const bikeRoutes = router;
