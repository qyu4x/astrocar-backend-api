import {healthRouter} from "./health.route.js";
import {userRouter} from "./user.route.js";
import express from "express";
const router = express.Router();

// Health API
router.use("/api/v1/healths", healthRouter);

// View
router.use("/", userRouter);

router.use("/api/v1/users", userRouter)

export {
    router
};