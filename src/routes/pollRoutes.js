import { Router } from "express";
import { pollPost, pollGet } from '../controllers/pollController.js';
import { pollValidation } from '../middlewares/pollValidation.js';

const router = Router();
router.post("/poll", pollValidation, pollPost);
router.get("/poll", pollGet);

export default router;