import Product from "./product";
import ProductB from "./productB";

describe("Product unit tests", () => {

  it("Should throw error when id is empty", () => {
    expect(() => {
      const product = new Product("", "Product 1", 100); 
    }).toThrowError("product: Id is required");
  });

  it("Should throw error when name is empty", () => {
    expect(() => {
      const product = new Product("1", "", 100); 
    }).toThrowError("product: Name is required");
  });

  it("Should throw error when price is less than zero", () => {
    expect(() => {
      const product = new Product("1", "Product 1", -1); 
    }).toThrowError("product: Price must be greater than zero");
  });

  it("Should throw error when id and name is missing and price is less than zero", () => {
    expect(() => {
      const product = new Product("", "", -1); 
    }).toThrowError("product: Id is required,product: Name is required,product: Price must be greater than zero");
  });

  it("Should throw error when id is empty in ProductB", () => {
    expect(() => {
      const product = new ProductB("", "Product 1", 100); 
    }).toThrowError("product: Id is required");
  });
  
  it("Should throw error when name is empty in ProductB", () => {
    expect(() => {
      const product = new ProductB("1", "", 100); 
    }).toThrowError("product: Name is required");
  });

  it("Should change name", () => {
    const product = new Product("1", "Product 1", 10);
    product.changeName("Product 2");
    expect(product.name).toBe("Product 2");
  });

  it("Should change price", () => {
    const product = new Product("1", "Product 1", 10);
    product.changePrice(150);
    expect(product.price).toBe(150);
  });
})