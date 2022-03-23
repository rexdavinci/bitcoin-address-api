import * as bip39 from "bip39";
import BIP32Factory from "bip32";
import * as ecc from "tiny-secp256k1";
import { BIP32Interface } from "bip32";
import { Logger } from "../utils";
import * as bitcoinjs from "bitcoinjs-lib";
import { IHDSegwitAddress, IMultisigP2SH } from "../utils/wallet";

export default class BitcoinAddressService {
  // Generate HD (Segwit) bitcoin address
  static GenerateHDSegwitAddress({ seed, path }: IHDSegwitAddress): string {
    const isValid = bip39.validateMnemonic(seed);
    if (!isValid) {
      const error = "Invalid Mnemonic Phrase";
      Logger.error(error);
      throw error;
    }
    // You must wrap a tiny-secp256k1 compatible implementation
    const bip32 = BIP32Factory(ecc);
    const mnemonicToSeed = bip39.mnemonicToSeedSync(seed);
    const node: BIP32Interface = bip32.fromSeed(mnemonicToSeed);
    const child = node.derivePath(path);
    const { address } = bitcoinjs.payments.p2wpkh({ pubkey: child.publicKey });
    if (!address) {
      throw new Error("Address Not Generated At This Time");
    }
    return address;
  }

  // Generate m-of-n Multisig (P2SH) bitcoin address
  static GenerateP2SHMultisig({ m, publicKeys }: IMultisigP2SH): string {
    const pubkeys = publicKeys.map(hex => Buffer.from(hex, "hex"));
    const { address } = bitcoinjs.payments.p2sh({
      redeem: bitcoinjs.payments.p2ms({ m, pubkeys })
    });
    return address as string;
  }
}
