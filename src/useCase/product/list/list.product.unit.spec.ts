import ProductFactory from "../../../domain/product/factory/productFactory"
import ListProductUseCase from "./list.product.usecase";

const productOne = ProductFactory.create("a", "T-Shirt", 10);
const productTwo = ProductFactory.create("b", "Jacket", 25);

const ProductRepositoryMock = () => {
  return {
    find: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    findAll: jest.fn().mockReturnValue(Promise.resolve([productOne, productTwo]))
  }
}

describe("Unit test product list", () => {

  it("Should find all products", async () => {

    const productRepository = ProductRepositoryMock();
    const listProductUsecase = new ListProductUseCase(productRepository);
    const output = await listProductUsecase.execute({});

    expect(output.products).toHaveLength(2);
    expect(output.products[0]).toEqual({id: productOne.id, name: productOne.name, price: productOne.price});
    expect(output.products[1]).toEqual({id: productTwo.id, name: productTwo.name, price: productTwo.price});
  });
  
});