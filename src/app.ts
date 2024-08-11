import express, { Application, Request, Response } from "express";
import cors from "cors";
import router from "./app/routes";
import globalErrorHandler from "./app/middleWares/globalErrorHandler";
import notFound from "./app/middleWares/notFound";

const app: Application = express();

app.use(express.json());

app.use(cors({ origin: ["http://localhost:5173"], credentials: true }));

app.use("/api", router);

app.use(globalErrorHandler);

app.get("/", (req: Request, res: Response) => {
    res.send("server is running");
});

app.use(notFound);

export default app;
