import express, { type Request, type Response } from "express";
import { Authorization } from "../integrations/multivende/authorization";
import { Stores } from "../integrations/multivende/Stores";
import { AppInformation } from "../integrations/multivende/AppInformation";

const router = express.Router();
router.get("/configuration", async (req: Request, res: Response) => {
  await Authorization.getInstance().authenticate(String(req.query.code));

  const app = await AppInformation.getAppInformation();
  console.log("Merchan ID", app.MerchantId);
  // await Stores.getStoresAndWarehouses(app.MerchantId); // Retorna 403

  res.status(200).send("Se ha authenticado Correctamente");
});

export { router as authRouter };
