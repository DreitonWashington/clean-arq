import FindProductUseCase from "./find.product.usecase";

const product = {
  id: "123", 
  name: "T-Shirt", 
  price: 100
};

const ProductRepositoryMock = () =>{
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(product)),
    create: jest.fn(),
    findAll: jest.fn(),
    update: jest.fn(),
  }
}

describe("Test unit product find", () => {

  it("Should find a product", async () => {
    const input = {id: "123"}
    const productRepository = ProductRepositoryMock();
    const findProductUseCase = new FindProductUseCase(productRepository);
    const output = await findProductUseCase.execute(input);
    
    expect(output).toEqual(product);
  });

  it("Should throw an error when id is missing", async () => {
    const input = {id: ""}
    const productRepository = ProductRepositoryMock();
    productRepository.find.mockImplementation(() => {
      throw new Error("Id is missing")
    });
    const findProductUseCase = new FindProductUseCase(productRepository);
    
    expect(() => findProductUseCase.execute(input)).rejects.toThrowError("Id is missing");
  });
});