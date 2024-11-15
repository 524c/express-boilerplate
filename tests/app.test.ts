import request from "supertest";
import express, { Express } from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { Server } from "http";

// Import the main app (or configure it for testing)
dotenv.config();

const app: Express = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes (reuse from your code)
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/data", (req, res) => {
  res.send("Data received");
});

describe("Express Application", () => {
  let server: Server;

  // Start the server before tests
  beforeAll(() => {
    server = app.listen(3000); // You can use any test-specific port
  });

  // Close the server after tests
  afterAll(() => {
    server.close();
  });

  test("GET / should return 'Hello World!'", async () => {
    const response = await request(app).get("/");
    expect(response.status).toBe(200);
    expect(response.text).toBe("Hello World!");
  });

  test("POST /data should return 'Data received'", async () => {
    const response = await request(app).post("/data").send({ key: "value" });

    expect(response.status).toBe(200);
    expect(response.text).toBe("Data received");
  });
});
