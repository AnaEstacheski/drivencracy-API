import { Router } from "express";
import { pollPost, pollGet, pollGetChoice } from '../controllers/pollController.js';
import { pollValidation } from '../middlewares/pollValidation.js';

const router = Router();
router.post("/poll", pollValidation, pollPost);
router.get("/poll", pollGet);
router.get("/poll/:id/choice", pollGetChoice);

export default router;