import Entity from "../../@shared/entity/entity.abstract";
import EventDispatcher from "../../@shared/event/eventDispatcher";
import NotificationError from "../../@shared/notification/notification.error";
import CustomerAddressChangedEvent from "../event/customerAddressChangedEvent";
import CustomerCreatedEvent from "../event/customerCreatedEvent";
import EnviaConsoleLog1Handler from "../event/handler/enviaConsoleLog1Handler";
import EnviaConsoleLog2Handler from "../event/handler/enviaConsoleLog2Handler";
import EnviaConsoleLogHandler from "../event/handler/enviaConsoleLogHandler";
import CustomerValidatorFactory from "../factory/customer.validator.factory";
import Address from "../value-object/address";

export default class Customer extends Entity{
  
  private _name: string;
  private _address!: Address;
  private _active: boolean = false;
  private _rewardPoints = 0;

  constructor(id:string, name:string) {
    super()
    this._id = id;
    this._name = name;
    this.validate();

    if(this.notification.hasErrors()) {
      throw new NotificationError(this.notification.getErrors());
    }
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new EnviaConsoleLog1Handler();
    const eventHandler2 = new EnviaConsoleLog2Handler();
    eventDispatcher.register("CustomerCreatedEvent", eventHandler);
    eventDispatcher.register("CustomerCreatedEvent", eventHandler2);
    const customerCreatedEvent = new CustomerCreatedEvent(this);
    eventDispatcher.notify(customerCreatedEvent);
  }

  validate() {
    CustomerValidatorFactory.create().validate(this)
  }

  get name(): string {
    return this._name;
  }

  get rewardPoints(): number {
    return this._rewardPoints;
  }

  get address(): Address {
    return this._address;
  }

  changeName(name:string) {
    this._name = name;
  }

  changeAddress(address:Address) {
    this._address = address;
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new EnviaConsoleLogHandler();
    eventDispatcher.register("CustomerAddressChangedEvent", eventHandler);
    const customerAddressChangedEvent = new CustomerAddressChangedEvent(this)
    eventDispatcher.notify(customerAddressChangedEvent);
  }

  isActive(): boolean {
    return this._active;
  }

  activate() {
    if(this._address === undefined) {
      throw new Error("Address is mandatory to activate a customer")
    }
    this._active = true;
  }

  deactive() {
    this._active = false;
  }

  addRewardPoints(points: number) {
    this._rewardPoints += points;
  }

}