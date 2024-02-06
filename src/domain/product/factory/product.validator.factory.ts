import ValidatorInterface from "../../@shared/validator/validator.interface";
import ProductInterface from "../entity/productInterface";
import ProductYupValidator from "../validator/product.yup.validator";

export default class ProductValidatorFactory {
  static create(): ValidatorInterface<ProductInterface> {
    return new ProductYupValidator();
  }
}