import { app } from "./app";
import * as dotenv from "dotenv";
import * as open from "open";

dotenv.config();

const start = async (): Promise<void> => {
  const { CLIENT_ID, REDIRECT_URI, PORT, CLIENT_SECRET } = process.env;
  if (CLIENT_ID == null) throw new Error("CLIENT_ID be defined");
  if (CLIENT_SECRET == null) throw new Error("SECRET be defined");
  if (REDIRECT_URI == null) throw new Error("REDIRECT_URI be defined");
  if (PORT == null) throw new Error("PORT must be defined");

  app.listen(Number(PORT), async () => {
    await open.default(
      `https://app.multivende.com/apps/authorize?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}/configuration&scope=read:checkouts`,
    );
    console.log("Autorice la sesion en el navegador");
    console.log("listening on port ", PORT);
  });
};

void start();
