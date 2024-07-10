import express from "express";
import userRoute from "./userRoute";
import uploadRoute from "./uploadRoute";

const appRouter = express.Router();

appRouter.use("/api", userRoute);
appRouter.use("/api",uploadRoute);
export default appRouter;
