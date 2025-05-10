import app from "../server"; // Update if using exported app
import request from "supertest";

describe("Main", () => {
  it("creates new file", async () => {
    const response = await request(app).post("/data/test").send({
      message: "Hello",
    });
    expect(response.status).toEqual(201);
  });

  it("reads file", async () => {
    const response = await request(app).get("/data/test");
    expect(response.status).toEqual(200);
    expect(response.body).toEqual({
      message: "Hello",
    });
  });

  it("searches for an unexistent file", async () => {
    const response = await request(app).get("/data/test2");
    expect(response.status).toEqual(404);
  });
});
