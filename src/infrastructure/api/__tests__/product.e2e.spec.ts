import { app, sequelize } from "../express";
import request from "supertest";

describe("E2E test for Product", () => {

  beforeEach(async () => {
    await sequelize.sync({force: true})
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("Should create a product", async () => {

    const response = await request(app)
      .post("/product")
      .send({
        type: "b",
        name: "T-Shirt",
        price: 10,
      });

    expect(response.status).toBe(200);
    expect(response.body.name).toBe("T-Shirt")
  });

  it("Should list all products", async () => {
    const response = await request(app)
      .post("/product")
      .send({
        type: "a",
        name: "T-Shirt",
        price: 10,
      });
    expect(response.status).toBe(200);

    const response2 = await request(app)
      .post("/product")
      .send({
        type: "b",
        name: "Jacket",
        price: 20,
      });
    expect(response2.status).toBe(200);

    const listResponse = await request(app).get("/product").send();

    expect(listResponse.status).toBe(200);
    expect(listResponse.body.products.length).toBe(2);
    expect(listResponse.body.products[0].name).toBe("T-Shirt");
    expect(listResponse.body.products[1].name).toBe("Jacket");
  });
});