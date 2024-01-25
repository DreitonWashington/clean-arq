import Address from "../value-object/address";
import Customer from "../entity/customer";

describe("Customer event tests", () => {

  it("Should print a message when change address", () => {

    const customer = new Customer("123","João Paulo");
    const consoleLogSpy = jest.spyOn(console, 'log')

    const address = new Address("Rua 1", 12, "132559610", "Jundiaí");
    customer.changeAddress(address);
    
    expect(consoleLogSpy).toHaveBeenCalledWith(
      `Endereço do cliente: ${customer.id}, ${customer.name} alterado para: ${address}`
    );
    
  });

  it("Should print a message when customer is created", () => {

    const customer = new Customer("123","João Paulo");
    const consoleLogSpy = jest.spyOn(console, 'log')
    
    expect(consoleLogSpy).toHaveBeenCalledWith(
      `Esse é o primeiro console.log do evento: CustomerCreated`
    );

    expect(consoleLogSpy).toHaveBeenCalledWith(
      `Esse é o segundo console.log do evento: CustomerCreated`
    );
    
  });
});