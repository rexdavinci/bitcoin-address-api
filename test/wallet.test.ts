import supertest, { Response } from "supertest";
import { app } from "../src/api/app";
import { ResponseData, ResponseError } from "./utils";

const addressAPI = supertest(app);
const baseUrl = "/api/create";
const publicKeys = [
  "02b874c0775a1ab1559e016e9f43c84ee2a73cfaf3ca6d36594457f475507aea2a",
  "02cdfbefa6747c0d8d666ae608c6f81e21f834cb373c91f7f361e7446ebb663390",
  "0337120615835a1464b7950993cc3bc9773f0b1127ca16ec3d53ba96059f1d5eb7",
  "03bbc18e91a9d4dcb3c8e3f0cef3b018667bc3bc3335f9974833d208b63dba567b"
];

describe("Generate a (HD) SegWit bitcoin address from a given seed and path", () => {
  test("generates correct address with given path and seed", async () => {
    const requestBody = {
      seed: "toward village recycle federal fiber health suspect warfare sausage hero erode order",
      path: `m/84'/0'/0'/0/0`
    };
    const response: Response = await addressAPI
      .post(`${baseUrl}/segwit-address`)
      .send(requestBody)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const { data, success } = response.body as ResponseData;

    expect(success).toBe(true);
    expect(data.address).toBe("bc1qdl9v7jtnsmv387wen422jawrr6xchurvel703v");
    expect(data.path).toBe(requestBody.path);
  });

  test("generates another correct address with different path and same seed", async () => {
    const requestBody = {
      seed: "toward village recycle federal fiber health suspect warfare sausage hero erode order",
      path: `m/84'/0'/0'/0/1`
    };
    const response = await addressAPI
      .post(`${baseUrl}/segwit-address`)
      .send(requestBody)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const { success, data } = response.body as ResponseData;

    expect(success).toBe(true);
    expect(data.address).toBe("bc1qum7z2mrfl7ptqr5kkjvxhgh4srprqlzmrfqeqf");
    expect(data.path).toBe(requestBody.path);
  });

  test("throw error when invalid mnemonic seed is provided ", async () => {
    const requestBody = {
      seed: "toward village satoshi federal fiber health suspect warfare sausage hero erode order", // invalid seed phrase
      path: `m/84'/0'/0'/0/0`
    };
    const response = await addressAPI
      .post(`${baseUrl}/segwit-address`)
      .send(requestBody)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    const { success, error } = response.body as ResponseError;

    expect(success).toBe(false);
    expect(error).toBe("Invalid Mnemonic Phrase");
  });

  test("throw error when invalid path is provided ", async () => {
    const requestBody = {
      seed: "toward village recycle federal fiber health suspect warfare sausage hero erode order",
      path: "a/random/path"
    };
    const response: Response = await addressAPI
      .post(`${baseUrl}/segwit-address`)
      .send(requestBody)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    const { success, error } = response.body as ResponseError;

    expect(success).toBe(false);
    expect(error).toBe(`Expected BIP32Path, got String "${requestBody.path}"`);
  });
});

describe("Generate an m-of-n Multisignature (multi-sig) Pay-To-Script-Hash (P2SH) bitcoin address,", () => {
  test("generates correct multisig address for the supplied public keys", async () => {
    const requestBody = {
      m: 3,
      n: 4,
      publicKeys
    };

    const response: Response = await addressAPI
      .post(`${baseUrl}/multisig-address`)
      .send(requestBody)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const { success, data } = response.body as ResponseData;

    expect(success).toBe(true);
    expect(data.address).toBe("3B2G6reHpTvD2Ef7MdrB2JT4d8EXRPRZtb");
  });

  test("throw error if required signers are more than available signers", async () => {
    const requestBody = {
      m: 5,
      n: 4,
      publicKeys
    };

    const response: Response = await addressAPI
      .post(`${baseUrl}/multisig-address`)
      .send(requestBody)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    const { success, error } = response.body as ResponseError;
    expect(success).toBe(false);
    expect(error).toBe("Required Signers More Than Total Signers");
  });
});
