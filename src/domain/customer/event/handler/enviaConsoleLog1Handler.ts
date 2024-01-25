import EventInterface from "../../../@shared/event/event.interface";
import EventHandlerInterface from "../../../@shared/event/eventHandler.interface";

export default class EnviaConsoleLog1Handler implements EventHandlerInterface {
  
  handle(event: EventInterface): void {
    console.log("Esse é o primeiro console.log do evento: CustomerCreated");
  }
}