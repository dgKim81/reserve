import DomainDispatcher from "../DomainDispatcher";
import DomainEvent from "../DomainEvent";
import Entity from "./Entity";

export default abstract class AggregateRoot extends Entity {
    private events: DomainEvent[] = [];

    protected addEvent(event: DomainEvent) {
        this.events.push(event);
    }

    getEvents(): DomainEvent[] {
        return this.events;
    }

    clearEvents() {
        this.events = [];
    }

    dispatchEvents() {
        this.events.forEach(event => {
            DomainDispatcher.dispatch(event);
        });
        this.clearEvents();
    }
}