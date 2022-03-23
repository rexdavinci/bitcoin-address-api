import supertest from "supertest";
import { app } from "../src/api/app";
import { ResponseData, ResponseError } from "./utils";

const serverAPI = supertest(app);

describe("Server", () => {
  test('respond with "pong" when /ping end point is called', async () => {
    const response = await serverAPI
      .get("/ping")
      .expect(200)
      .expect("Content-Type", /application\/json/);
    const { message } = response.body as ResponseData;
    expect(message).toBe("pong");
  });

  test("handle unknown endpoint correctly", async () => {
    const response = await serverAPI
      .get("/api/satoshi")
      .expect(404)
      .expect("Content-Type", /application\/json/);
    const { error } = response.body as ResponseError;
    expect(error).toBe("Unknown Endpoint");
  });
});
