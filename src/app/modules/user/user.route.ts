import { Router } from "express";
import { userControllers } from "./user.controller";
import { userRole } from "../../constants/user";
import checkAuth from "../../middleWares/checkAuth";

const router = Router();

router.get("/me", checkAuth(userRole.ADMIN, userRole.USER), userControllers.getProfile);
router.put("/me", checkAuth(userRole.ADMIN, userRole.USER), userControllers.updateProfile);

export const userRoutes = router;
