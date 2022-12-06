import { Router } from "express";
import { choicePost, choiceVotePost } from '../controllers/choiceController.js';
import { choiceValidation } from '../middlewares/choiceValidation.js';

const router = Router();
router.post("/choice", choiceValidation, choicePost);
router.post("/choice/:id/vote", choiceVotePost);

export default router;