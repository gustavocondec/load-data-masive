import express, { type Request, type Response } from "express";

const router = express.Router();
router.get("/products", async (req: Request, res: Response) => {
  // guardar file
  res.status(200).send("Se ha guardado el file correctamente");
});

export { router as productRouter };
