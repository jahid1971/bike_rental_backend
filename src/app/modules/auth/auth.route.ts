import { Router } from "express";
import { authControllers } from "./auth.controller";
// import checkAuth from "../../middleWares/checkAuth";
// import { userRole } from "../../constants/user";

const router = Router();

router.post("/signup", authControllers.signUp);
router.post("/login", authControllers.logIn);

export const authRoutes = router;
