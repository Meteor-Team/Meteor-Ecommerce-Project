import express from "express";
import formidable from "express-formidable";

import { createedukaanController, edukaanPhotoController, getSingleEdukaanController, getedukanController } from "../controllers/edukaanController.js";
import { isAdmin, requireSignIn } from "./../middlewares/authMiddleware.js";
const router = express.Router();
// router.get("/get-edukaan",  requireSignIn,
// isAdmin,
// getedukanController);
router.post("/create-edukaan",  requireSignIn,
isAdmin,formidable(),
createedukaanController);
router.get("/get-edukaan", getedukanController);
router.get("/get-edukaan/:pid", getSingleEdukaanController);

//get photo
router.get("/edukaan-photo/:pid", edukaanPhotoController);

export default router;
