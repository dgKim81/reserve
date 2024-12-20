import DomainEvent from "./DomainEvent";

type EventHandler = (event: DomainEvent) => void;

export default class DomainDispatcher {
    private subscriptor: Map<string, EventHandler[]> = new Map<string, EventHandler[]>();

    subscribe(eventName: string,handler: EventHandler ) {
        if (!this.subscriptor.has(eventName)) {
            this.subscriptor.set(eventName, []);
        }
        this.subscriptor.get(eventName)!.push(handler);
    }

    unsubscribe(eventName: string, handler: EventHandler) {
        if (this.subscriptor.has(eventName)) {
            const updatedHandlers = this.subscriptor.get(eventName)!.filter(h => h !== handler);
            this.subscriptor.set(eventName, updatedHandlers);
          }
    }

    publish(event: DomainEvent) {
        const eventHandlers = this.subscriptor.get(event.name) || [];
        eventHandlers.forEach(subscriptor => subscriptor(event));
    }
}