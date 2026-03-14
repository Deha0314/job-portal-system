import express from "express";
import { login, logout, register, updateProfile } from "../controllers/user.controllers.js";
import authUser from "../middlewares/authUser.js";
import { singleUpload } from "../middlewares/multer.js";

const userRouter = express.Router()

userRouter.post("/register", singleUpload, register);
userRouter.post("/login", login)
userRouter.post("/logout", logout);
userRouter.post("/profile/update", authUser,singleUpload, updateProfile);

export default userRouter;


