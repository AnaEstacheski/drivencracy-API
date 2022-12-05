import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import pollRoutes from "./routes/pollRoutes.js"
import choiceRoutes from "./routes/choiceRoutes.js"

const app = express();

app.use(express.json());
app.use(cors());
app.use(pollRoutes)
app.use(choiceRoutes)

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running at port ${port}`));