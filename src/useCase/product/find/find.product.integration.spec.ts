import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import FindProductUseCase from "./find.product.usecase";
import Product from "../../../domain/product/entity/product";

describe("Test integration find a product", () => {
  
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

  it("Should find a product", async () => {

    const productRepository = new ProductRepository();
    const findProductUseCase = new FindProductUseCase(productRepository);

    await productRepository.create(new Product("123", "T-Shirt", 10));
    const output = await findProductUseCase.execute({id: "123"});

    expect(output).toEqual({
      id: "123",
      name: "T-Shirt",
      price: 10
    });
  });
});