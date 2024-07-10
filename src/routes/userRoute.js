import express from "express";
import userCtrl from "../controllers/userCtrl";

const userRoute = express.Router();

userRoute.get("/user/getUsers", userCtrl.getAllUser);
userRoute.post("/user/createUser", userCtrl.createUser);
userRoute.patch("/user/updateUser", userCtrl.updateUser);
userRoute.delete("/user/deleteUser/:id", userCtrl.deleteUser);


export default userRoute;
