import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import UpdateProductUseCase from "./update.product.usecase";
import ProductFactory from "../../../domain/product/factory/productFactory";
import Product from "../../../domain/product/entity/product";

describe("Test integration update product", () => {

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

  it("Should update a product", async () => {
    
    const product = new Product("123", "T-Shirt", 10);
    const productAtt = {id: "123", name: "T-Shirt Atualizada", price: 15}
    
    const productRepository = new ProductRepository();
    const updateProductUseCase = new UpdateProductUseCase(productRepository);
    await productRepository.create(product);
    const output = await updateProductUseCase.execute(productAtt);

    expect(output).toEqual({
      id: productAtt.id,
      name: productAtt.name,
      price: productAtt.price
    })
  });
});