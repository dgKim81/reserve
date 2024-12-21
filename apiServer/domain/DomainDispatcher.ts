import DomainEvent from "./DomainEvent";

type EventHandler = (event: DomainEvent) => void;

export default class DomainDispatcher {
    private static subscriptor: Map<string, EventHandler[]> = new Map<string, EventHandler[]>();

    static subscribe(eventName: string,handler: EventHandler ) {
        if (!this.subscriptor.has(eventName)) {
            this.subscriptor.set(eventName, []);
        }
        this.subscriptor.get(eventName)!.push(handler);
    }

    static dispatch(event: DomainEvent) {
        const eventHandlers = this.subscriptor.get(event.name) || [];
        eventHandlers.forEach(subscriptor => subscriptor(event));
    }
}