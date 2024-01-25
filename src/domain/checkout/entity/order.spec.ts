import Order from "./order";
import OrderItem from "./orderItem";


describe("Order unit tests", () => {

  it("Should throw error when id is empty", () => {

    expect(() => {
      let order = new Order("", "123", []);
    }).toThrowError("Id is required");
  });
  it("Should throw error when customerId is empty", () => {

    expect(() => {
      let order = new Order("1", "", []);
    }).toThrowError("CustomerId is required");
  });
  it("Should throw error when items is empty", () => {

    expect(() => {
      let order = new Order("1", "12", []);
    }).toThrowError("Items are required");
  });
  it("Should calculate total", () => {

    const item = new OrderItem("i1", "item 1", 100, "p1", 2);
    const item2 = new OrderItem("i2", "item 2", 200, "p2", 2);
    const order = new Order("1", "123", [item]);

    let total = order.total();

    expect(total).toBe(200);

    const order2 = new Order("2", "123", [item, item2])
    let total2 = order2.total();

    expect(total2).toBe(600);
  });

  it("Should throw error if the item quantity is greater than zero", () => {
    expect(() => {
      const item = new OrderItem("i1", "item 1", 100, "p1", 0);
      const order = new Order("1", "123", [item]);
    }).toThrowError("Quantity must be greater than zero");
  });
});