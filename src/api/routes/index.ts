import { Router } from "express";
import address from "./walletRouter";

export default () => {
  const app = Router();
  address(app);
  return app;
};
