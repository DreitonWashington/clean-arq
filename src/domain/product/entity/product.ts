import Entity from "../../@shared/entity/entity.abstract";
import Notification from "../../@shared/notification/notification";
import NotificationError from "../../@shared/notification/notification.error";
import ProductValidatorFactory from "../factory/product.validator.factory";
import ProductFactory from "../factory/productFactory";
import ProductInterface from "./productInterface";

export default class Product extends Entity implements ProductInterface{
 
  private _name: string;
  private _price: number;

  constructor(id: string, name: string, price: number) {
    super()
    this._id = id;
    this._name = name;
    this._price = price;
    this.validate();

    if(this.notification.hasErrors()) {
      throw new NotificationError(this.notification.getErrors());
    }
  }

  validate() {
    return ProductValidatorFactory.create().validate(this);
  }

  get notifications():Notification {
    return this.notification;
  }

  get name(): string {
    return this._name;
  }

  get price(): number {
    return this._price;
  }

  changeName(name: string) {
    this._name = name;
    this.validate();
  }

  changePrice(price: number) {
    this._price = price;
    this.validate();
  }
}