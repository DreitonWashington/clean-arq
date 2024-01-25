import { Sequelize } from "sequelize-typescript"
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import ListProductUseCase from "./list.product.usecase";
import Product from "../../../domain/product/entity/product";

describe("Integration test product list", () => {

  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true},
    });

  sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  const productOne = new Product("a", "T-Shirt", 10);
  const productTwo = new Product("b", "Jacket", 10);

  it("Should list products", async () => {
    const productRepository = new ProductRepository();
    const listProductUseCase = new ListProductUseCase(productRepository);
    
    await productRepository.create(productOne)
    await productRepository.create(productTwo)
    const output = await listProductUseCase.execute({})

    expect(output.products).toHaveLength(2);
    expect(output.products[0].name).toBe(productOne.name)
    expect(output.products[0].price).toBe(productOne.price)

    expect(output.products[1].name).toBe(productTwo.name)
    expect(output.products[1].price).toBe(productTwo.price)
  });
})