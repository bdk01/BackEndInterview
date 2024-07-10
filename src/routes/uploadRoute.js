import express from "express";


import uploadCtrl from "../controllers/uploadCtrl";
const uploadRoute = express.Router();

uploadRoute.post("/upload", uploadCtrl.createUpload);

uploadRoute.post("/destroy-upload", uploadCtrl.destroyUpload);

export default uploadRoute;


