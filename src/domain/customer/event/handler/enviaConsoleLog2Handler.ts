import EventInterface from "../../../@shared/event/event.interface";
import EventHandlerInterface from "../../../@shared/event/eventHandler.interface";

export default class EnviaConsoleLog2Handler implements EventHandlerInterface {
  
  handle(event: EventInterface): void {
    console.log("Esse é o segundo console.log do evento: CustomerCreated");
  }
}