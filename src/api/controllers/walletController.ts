import { Request, Response, NextFunction } from "express";
import { validator, IHDSegwitAddress, IMultisigP2SH } from "../../utils";
import BitcoinAddressService from "../../services/walletService";

// handle segwit address generation
export const generateHDSegwitAddress = (req: Request, res: Response, next: NextFunction) => {
  const { path, seed } = req.body as IHDSegwitAddress;
  const joiResult = validator.validateHDSegwit({
    path,
    seed
  });
  if (joiResult.error) {
    return next(joiResult.error);
  }
  const value = joiResult.value as IHDSegwitAddress;
  const segwitAddress = BitcoinAddressService.GenerateHDSegwitAddress({
    path: value.path,
    seed: value.seed
  });
  return res.status(200).json({
    success: true,
    data: { address: segwitAddress, path }
  });
};

// handle m-of-n multisig address generation
export const generateP2SHMultisigAddress = (req: Request, res: Response, next: NextFunction) => {
  const { m, n, publicKeys } = req.body as IMultisigP2SH;
  const joiResult = validator.validateP2SHMultisig({
    m,
    n,
    publicKeys
  });
  if (joiResult.error) {
    return next(joiResult.error);
    // return next(joiResult.error);
  }
  const value = joiResult.value as IMultisigP2SH;
  const multisigP2SH = BitcoinAddressService.GenerateP2SHMultisig({
    m: value.m,
    n: value.n,
    publicKeys: value.publicKeys
  });
  return res.status(200).json({
    success: true,
    data: { address: multisigP2SH, policy: `${m}-of-${n}` }
  });
};
