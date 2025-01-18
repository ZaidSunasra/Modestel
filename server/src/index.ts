import express from 'express';
import cors from 'cors';
import {router as mainRouter} from './routes/main.routes';

const app = express();

app.use(cors({
    origin: "http://localhost:1420",
}))
app.use(express.json());

app.use("/api/v1", mainRouter);

app.listen("3000", () => {
    console.log("Server running on Port:3000");
})

