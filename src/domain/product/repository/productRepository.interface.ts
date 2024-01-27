import Product from "../entity/product";
import RepositoryInterface from "../../@shared/repository/repositoryInterface";
import ProductInterface from "../entity/productInterface";

export default interface ProductRepositoryInterface extends RepositoryInterface<ProductInterface> {
  
}