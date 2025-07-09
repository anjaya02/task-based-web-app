import express from "express";
import { register, login, getProfile } from "../controllers/authController.js";
import { protect } from "../middleware/auth.js";
import {
  registerValidation,
  loginValidation,
  validateRequest,
} from "../middleware/validation.js";

const router = express.Router();

router.post("/register", registerValidation, validateRequest, register);
router.post("/login", loginValidation, validateRequest, login);
router.get("/profile", protect, getProfile);

export default router;
