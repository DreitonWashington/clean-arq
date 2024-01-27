import { Sequelize } from "sequelize-typescript";
import CustomerModel from "./customer.model";
import CustomerRepository from "./customer.repository";
import Customer from "../../../../domain/customer/entity/customer";
import Address from "../../../../domain/customer/value-object/address";

describe("Customer Repository test", () => {
  
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true},
    });
    
    sequelize.addModels([CustomerModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("Should create a customer", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("1", "Mario");
    const address = new Address("Rua vinte", 12, "13211510", "Jundiaí");
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const customerModel = await CustomerModel.findOne({ where: {id: "1" } });

    expect(customerModel.toJSON()).toStrictEqual({
      id: customer.id,
      name: customer.name,
      active: customer.isActive(),
      rewardPoints: customer.rewardPoints,
      street: customer.address.street,
      number: customer.address.number,
      zipcode: customer.address.zip,
      city: customer.address.city,
    });
  });

  it("Should update a customer", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("1", "Mario");
    const address = new Address("Rua vinte", 12, "13211510", "Jundiaí");
    customer.changeAddress(address);
    await customerRepository.create(customer);

    customer.changeName("Mario Bros");
    await customerRepository.update(customer);

    const customerModel = await CustomerModel.findOne({ where: {id: "1"} });

    expect(customerModel.toJSON()).toStrictEqual({
      id: customer.id,
      name: customer.name,
      active: customer.isActive(),
      rewardPoints: customer.rewardPoints,
      street: customer.address.street,
      number: customer.address.number,
      zipcode: customer.address.zip,
      city: customer.address.city,
    });
  });

  it("Should find a customer", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("1", "Mario");
    const address = new Address("Rua vinte", 12, "13211510", "Jundiaí");
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const customerResult = await customerRepository.find("1");

    expect(customer).toStrictEqual(customerResult);
  });

  it("Should throw an error when customer is not found", async () => {
    const customerRepository = new CustomerRepository();

    expect(async () => {
      await customerRepository.find("12521565");
    }).rejects.toThrow("Customer not found");
  });

  it("Should find all customers", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("1", "Mario");
    const address = new Address("Rua vinte", 12, "13211510", "Jundiaí");
    customer.changeAddress(address);
    customer.addRewardPoints(10);
    customer.activate();

    const customer2 = new Customer("2", "Luka");
    const address2 = new Address("Rua vinte", 15, "13211510", "Jundiaí");
    customer2.changeAddress(address2);
    customer2.addRewardPoints(10);
    customer2.activate();


    await customerRepository.create(customer);
    await customerRepository.create(customer2);

    const customers = await customerRepository.findAll();

    expect(customers).toHaveLength(2);
    expect(customers).toContainEqual(customer);
    expect(customers).toContainEqual(customer2);
  });
});