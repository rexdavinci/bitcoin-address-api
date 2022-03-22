export type IHDSegwitAddress = {
  seed: string;
  path: string;
};

export type IMultisigP2SH = {
  m: number;
  n: number;
  publicKeys: string[];
};
