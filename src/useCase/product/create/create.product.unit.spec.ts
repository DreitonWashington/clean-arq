import CreateProductUseCase from "./create.product.usecase";

const inputA = {
  type: "a",
  name: "T-Shirt",
  price: 59
}

const inputB = {
  type: "b",
  name: "T-Shirt",
  price: 100
}

const ProductRepositoryMock = () => {
  return {
    create: jest.fn(),
    find: jest.fn(),
    findAll: jest.fn(),
    update: jest.fn()
  }
}

describe("Unit test Product create", () => {

  it("Should create a product type a", async () => {

    const productRepository = ProductRepositoryMock();
    const createProductUseCase = new CreateProductUseCase(productRepository);
    const output = await createProductUseCase.execute(inputA);

    expect(output).toEqual({
      id: expect.any(String),
      name: output.name,
      price: output.price
    });
  });

  it("Should create a product type b", async () => {

    const productRepository = ProductRepositoryMock();
    const createProductUseCase = new CreateProductUseCase(productRepository);
    const output = await createProductUseCase.execute(inputB);

    expect(output).toEqual({
      id: expect.any(String),
      name: output.name,
      price: output.price
    });
  });

  it("Should throw an error when name is missing", async () => {

    const input = {
      type: "a",
      name: "",
      price: 12
    }

    const productRepository = ProductRepositoryMock();
    const createProductUseCase = new CreateProductUseCase(productRepository);
    
    expect(async () => createProductUseCase.execute(input)).rejects.toThrowError("Name is required")
  });
});