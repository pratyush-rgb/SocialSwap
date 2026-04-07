import express from "express";
import { syncLoggedInUser } from "../controller/authController.js";
import { protect } from "../middlewires/authmiddlewire.js";

const authRouter = express.Router();

authRouter.post("/sync", protect, syncLoggedInUser);

export default authRouter;
