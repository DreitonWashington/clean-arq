import Address from "../value-object/address";
import CustomerFactory from "./customerFactory";

describe("Customer factory unit test", () => {

  it("Should create a customer", () => {
    let customer = CustomerFactory.create("John");

    expect(customer.id).toBeDefined();
    expect(customer.name).toBe("John");
    expect(customer.address).toBeUndefined();
  });

  it("Should create a customer with an address", () => {
    const address = new Address("Rua 1", 12, "1255478", "Jundiaí");
    let customer = CustomerFactory.createWithAddress("John", address);

    expect(customer.id).toBeDefined();
    expect(customer.name).toBe("John");
    expect(customer.address).toBe(address);
  });
});