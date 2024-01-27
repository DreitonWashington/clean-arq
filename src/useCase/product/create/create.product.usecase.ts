import Product from "../../../domain/product/entity/product";
import ProductB from "../../../domain/product/entity/productB";
import ProductInterface from "../../../domain/product/entity/productInterface";
import ProductFactory from "../../../domain/product/factory/productFactory";
import ProductRepositoryInterface from "../../../domain/product/repository/productRepository.interface";
import { InputCreateProductDto, OutputCreateProductDto } from "./create.product.dto";

export default class CreateProductUseCase {
  private productRepository: ProductRepositoryInterface;

  constructor(productRepository: ProductRepositoryInterface) {
    this.productRepository = productRepository;
  }

  async execute(input: InputCreateProductDto): Promise<OutputCreateProductDto> {
    var product: ProductInterface = ProductFactory.create(input.type, input.name, input.price);
    switch(input.type) {
      case "a": {
        product = new Product(product.id, product.name, product.price);
        await this.productRepository.create(product);
        break;
      }
      case "b": {
        product = new ProductB(product.id, product.name, product.price);
        await this.productRepository.create(product);
        break;
      }
    }
    return {
      id: product.id,
      name: product.name,
      price: product.price
    }
  }
}