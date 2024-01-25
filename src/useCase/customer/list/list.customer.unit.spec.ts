import CustomerFactory from "../../../domain/customer/factory/customerFactory";
import Address from "../../../domain/customer/value-object/address";
import ListCustomerUseCase from "./list.customer.usecase";

const customerOne = CustomerFactory.createWithAddress("John",
  new Address("Street One", 1, "1111111", "Jundiaí")
)

const customerTwo = CustomerFactory.createWithAddress("Maria",
new Address("Street Two", 2, "2222222", "Jundiaí")
)

const MockRepository = () => {
  return {
    create: jest.fn(),
    findAll: jest.fn().mockReturnValue(Promise.resolve([customerOne, customerTwo])),
    find: jest.fn(),
    update: jest.fn(),
  }
}

describe("Unit test for list customer usecase", () => {

  it("Should list a customer", async () => {

    const customerRepository = MockRepository();
    const listCustomerUseCase = new ListCustomerUseCase(customerRepository);
    const output = await listCustomerUseCase.execute({});
    
    expect(output.customers.length).toBe(2);
    expect(output.customers[0].id).toBe(customerOne.id);
    expect(output.customers[0].name).toBe(customerOne.name);
    expect(output.customers[0].address.street).toBe(customerOne.address.street);

    
    expect(output.customers[1].id).toBe(customerTwo.id);
    expect(output.customers[1].name).toBe(customerTwo.name);
    expect(output.customers[1].address.street).toBe(customerTwo.address.street);
  });
});