import { Sequelize } from "sequelize-typescript";
import ProductModel from "./product.model";
import Product from "../../../../domain/product/entity/product";
import ProductRepository from "./product.repository";
import ProductB from "../../../../domain/product/entity/productB";

describe("Product Repository tests", () => {

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

  it("Should create a product", async () => {
    const productRepository = new ProductRepository();
    const product = new Product("1", "Product 1", 100);

    await productRepository.create(product);

    const productModel = await ProductModel.findOne({where: {id: "1"}});


    expect(productModel.toJSON()).toStrictEqual({
      id: "1",
      name: "Product 1",
      price: 100
    });
  });

  it("Should update a product", async () => {
    const productRepository = new ProductRepository();
    const product = new Product("1", "Product 1", 100);

    await productRepository.create(product);

    const productModel = await ProductModel.findOne({where: {id: "1"}});


    expect(productModel.toJSON()).toStrictEqual({
      id: "1",
      name: "Product 1",
      price: 100
    });

    product.changeName("Product 2");
    product.changePrice(200);

    await productRepository.update(product);

    const productAtt = await ProductModel.findOne({ where: {id: "1"}});
    
    expect(productAtt.toJSON()).toStrictEqual({
      id: "1",
      name: "Product 2",
      price: 200
    });
  });

  it("Should find a product", async () => {

    const productRepository = new ProductRepository();
    const product = new Product("1", "Product 1", 100);

    await productRepository.create(product);

    const productModel = await ProductModel.findOne({where: {id: "1"}});
    const foundProduct = await productRepository.find("1");

    expect(productModel.toJSON()).toStrictEqual({
      id: foundProduct.id,
      name: foundProduct.name,
      price: foundProduct.price
    });
  });

  it("Should find all products", async () => {

    const productRepository = new ProductRepository();
    const product = new Product("1", "Product 1", 100);
    await productRepository.create(product);

    const product2 = new ProductB("2", "Product 2", 200);
    await productRepository.create(product2);
    product2.changePrice(400);
    
    const foundProducts = await productRepository.findAll(); 
    const products = [product, product2];

    expect(products).toEqual(foundProducts);
  });

});