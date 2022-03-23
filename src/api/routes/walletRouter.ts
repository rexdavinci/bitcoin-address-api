import { Router } from "express";
import { generateHDSegwitAddress, generateP2SHMultisigAddress } from "../controllers/walletController";

const appRouter = Router();

const addressRouter = (app: Router) => {
  app.use("/create", appRouter);
  appRouter.route("/segwit-address").post(generateHDSegwitAddress);

  appRouter.route("/multisig-address").post(generateP2SHMultisigAddress);
  return app;
};

export default addressRouter;
