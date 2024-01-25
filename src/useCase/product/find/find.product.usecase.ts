import ProductRepositoryInterface from "../../../domain/product/repository/productRepository.interface";
import { InputFindProductDto, OutputFindProductDto } from "./find.product.dto";

export default class FindProductUseCase {
  private productrepository: ProductRepositoryInterface;

  constructor(productRepository: ProductRepositoryInterface) {
    this.productrepository = productRepository
  }

  async execute(input: InputFindProductDto): Promise<OutputFindProductDto> {
    const product = await this.productrepository.find(input.id)
    return {
      id: product.id,
      name: product.name,
      price: product.price
    }
  }
}