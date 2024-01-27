import { app, sequelize } from "../express";
import request from "supertest";

describe("E2E test for customer", () => {

  beforeEach(async () => {
    await sequelize.sync({force: true})
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("Should create a customer", async () => {
    const response = await request(app)
      .post("/customer")
      .send({
        name: "John",
        address: {
          street: "street",
          number: 1,
          zip: "123456789",
          city: "Jundiaí"
        }
      });
    
    expect(response.status).toBe(200);
    expect(response.body.name).toBe("John");
    expect(response.body.address.street).toBe("street");
    expect(response.body.address.number).toBe(1);
    expect(response.body.address.zip).toBe("123456789");
    expect(response.body.address.city).toBe("Jundiaí");
  });

  it("Should not create a customer", async () => {
    const response = await request(app)
      .post("/customer")
      .send({
        name: "John"
      });
    
    expect(response.status).toBe(500);
  });

  it("Should list all customers", async () => {
    const response = await request(app)
    .post("/customer")
    .send({
      name: "John",
      address: {
        street: "street",
        number: 1,
        zip: "123456789",
        city: "Jundiaí"
      }
    });
    expect(response.status).toBe(200);

    const response2 = await request(app)
    .post("/customer")
    .send({
      name: "Maria",
      address: {
        street: "street 2",
        number: 2,
        zip: "123456789",
        city: "Jundiaí"
      }
    });
    expect(response2.status).toBe(200);

    const listResponse = await request(app).get("/customer").send();
    expect(listResponse.status).toBe(200);
    expect(listResponse.body.customers.length).toBe(2);
    expect(listResponse.body.customers[0].name).toBe("John");
    expect(listResponse.body.customers[0].address.street).toBe("street");
    expect(listResponse.body.customers[1].name).toBe("Maria");
    expect(listResponse.body.customers[1].address.street).toBe("street 2");
  });
});