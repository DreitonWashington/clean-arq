import ProductRepositoryInterface from "../../../domain/product/repository/productRepository.interface";
import { InputListProductDto, OutputListProductDto } from "./list.product.dto";

export default class ListProductUseCase {
  private productRepository: ProductRepositoryInterface;

  constructor(productRepository: ProductRepositoryInterface) {
    this.productRepository = productRepository;
  }

  async execute(input: InputListProductDto): Promise<OutputListProductDto> {
    const products = await this.productRepository.findAll();
    return {
      products: products.map((product) => ({
        id: product.id,
        name: product.name,
        price: product.price
      }))
    }
  }
}