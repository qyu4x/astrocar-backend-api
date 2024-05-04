import express from "express";
import userHandler from "../handler/user.handler.js";

const userRouter = express.Router();

userRouter.get("/login", userHandler.getLoginView);
userRouter.post("/login", userHandler.login);
userRouter.post("/", userHandler.create);
userRouter.get("/:id", userHandler.findById)
userRouter.put("/:id", userHandler.updateById);
userRouter.delete("/:id", userHandler.deleteById);


export  {
    userRouter
};