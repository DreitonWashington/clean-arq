import NotificationError from "../../@shared/notification/notification.error";
import Address from "../value-object/address";
import Customer from "./customer";

describe("Customer unit test", () => {
  
  it("Should throw error when id is empty", () => {

    expect(() => {
      let customer = new Customer("", "Felipe");
    }).toThrowError("customer: Id is required");
  });

  it("Should throw error when name is empty", () => {

    expect(() => {
      let customer = new Customer("123", "");
    }).toThrowError("customer: Name is required");
  });

  it("Should throw error when name and id are empty", () => {

    expect(() => {
      let customer = new Customer("", "");
    }).toThrowError("customer: Id is required,customer: Name is required");
  });

  it("Should change name", () => {
    
    const customer = new Customer("123", "Jhon");
    customer.changeName("Jane");

    expect(customer.name).toBe("Jane");
  });

  it("Should activate customer", () => {
      const customer = new Customer("123", "Felipe");
      const address = new Address("Street 1", 123, "12544-610", "São Paulo");
      customer.changeAddress(address);

      customer.activate();

      expect(customer.isActive()).toBe(true);        
  });

  it("Should deactivate customer", () => {
    const customer = new Customer("123", "Felipe");

      customer.deactive;

      expect(customer.isActive()).toBe(false);
  });

  it("Should throw error when address is undefined when activate a customer", () => {
    
    expect(() => {
      const customer = new Customer("123", "Felipe");
  
      customer.activate();

    }).toThrowError("Address is mandatory to activate a customer");       
  });

  it("Should add reward points", () => {

    const customer = new Customer("1", "Customer 1");
    expect(customer.rewardPoints).toBe(0);

    customer.addRewardPoints(10);
    expect(customer.rewardPoints).toBe(10);

    customer.addRewardPoints(10);
    expect(customer.rewardPoints).toBe(20);
  })
});