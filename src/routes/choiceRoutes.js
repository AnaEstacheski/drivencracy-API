import { Router } from "express";
import { choicePost } from '../controllers/choiceController.js';
import { choiceValidation } from '../middlewares/choiceValidation.js';

const router = Router();
router.post("/choice", choiceValidation, choicePost);
// router.get("/choice", choiceGet);

export default router;