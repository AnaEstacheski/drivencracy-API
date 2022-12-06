import { Router } from "express";
import { pollPost, pollGet, pollGetChoice, pollResult } from '../controllers/pollController.js';
import { pollValidation } from '../middlewares/pollValidation.js';

const router = Router();
router.post("/poll", pollValidation, pollPost);
router.get("/poll", pollGet);
router.get("/poll/:id/choice", pollGetChoice);
router.get("/poll/:id/result", pollResult);

export default router;