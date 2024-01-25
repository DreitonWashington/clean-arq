import CustomerFactory from "../../../domain/customer/factory/customerFactory";
import Address from "../../../domain/customer/value-object/address";
import UpdateCustomerUseCase from "./update.customer.usecase";

const customer = CustomerFactory.createWithAddress("John", new Address("Street", 12, "12345678", "São Paulo"));
const input = {
  id: customer.id,
  name: "John Jones",
  address: {
    street: "Maringa",
    number: 11,
    zip: "5444784",
    city: "Moca"
  }
}

const MockRepository = () => {
  return {
    create: jest.fn(),
    findAll: jest.fn(),
    find: jest.fn().mockReturnValue(Promise.resolve(customer)),
    update: jest.fn()
  }
}

describe("Unit test for customer updateUseCase", () => {

  it("Should update customer", async () => {

    const customerRepository = MockRepository();
    const customerUpdateUseCase = new UpdateCustomerUseCase(customerRepository);

    const output = await customerUpdateUseCase.execute(input);

    expect(output).toEqual(input);
  });
});