import express, { json } from "express";
import { authRouter } from "./routes/auth-route";
import { errorHandler } from "./middlewares/error-handler";

const app = express();
app.use(json());

app.use(authRouter);
app.all("*", (req) => {
  console.log(req.path, req.query, req.body);
  throw new Error("No se hallo path");
});
app.use(errorHandler);

export { app };
