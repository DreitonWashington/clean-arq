import ProductFactory from "../../../domain/product/factory/productFactory";
import UpdateProductUseCase from "./update.product.usecase";


const product =  ProductFactory.create("a", "T-Shirt atualizado", 15);

const ProductRepositoryMock = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(product)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn()
  }
}

describe("Test unit update product", () => {

  it("Should update a product", async () => {

    const productRepository = ProductRepositoryMock();
    const updateProductUseCase = new UpdateProductUseCase(productRepository);
    const output = await updateProductUseCase.execute(product);

    expect(output).toEqual({
      id: product.id,
      name: product.name,
      price: product.price
    });
  });
})