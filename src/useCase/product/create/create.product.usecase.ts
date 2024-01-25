import ProductFactory from "../../../domain/product/factory/productFactory";
import ProductRepositoryInterface from "../../../domain/product/repository/productRepository.interface";
import { InputCreateProductDto, OutputCreateProductDto } from "./create.product.dto";

export default class CreateProductUseCase {
  private productRepository: ProductRepositoryInterface;

  constructor(productRepository: ProductRepositoryInterface) {
    this.productRepository = productRepository;
  }

  async execute(input: InputCreateProductDto): Promise<OutputCreateProductDto> {
    const product = ProductFactory.create(input.type, input.name, input.price);
    return {
      id: product.id,
      name: product.name,
      price: product.price
    }
  }
}