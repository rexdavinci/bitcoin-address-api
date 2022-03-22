import { Router } from "express";
import address from "./addressRouter";

export default () => {
  const app = Router();
  address(app);
  return app;
};
