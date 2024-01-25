import EventHandlerInterface from "../../../@shared/event/eventHandler.interface";
import CustomerAddressChangedEvent from "../customerAddressChangedEvent";

export default class EnviaConsoleLogHandler implements EventHandlerInterface<CustomerAddressChangedEvent> {
  
  handle(event: CustomerAddressChangedEvent): void {
    console.log(`Endereço do cliente: ${event.eventData.id}, ${event.eventData.name} alterado para: ${event.eventData.address}`)
  }
  
}