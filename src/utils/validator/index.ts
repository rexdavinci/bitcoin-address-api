import Joi from "joi";
import { IHDSegwitAddress, IMultisigP2SH } from "../wallet";

const validator = {
  validateHDSegwit: (value: IHDSegwitAddress) =>
    Joi.object({
      seed: Joi.string().required(),
      path: Joi.string().required()
    }).validate(value),

  validateP2SHMultisig: (value: IMultisigP2SH) => {
    if (value.m > value.n) {
      return { error: "Required Signers More Than Total Signers", value: null };
    }
    return Joi.object({
      m: Joi.number().required(),
      n: Joi.number().required(),
      publicKeys: Joi.array().required()
    }).validate(value);
  }
};

export default validator;
