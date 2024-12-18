import DomainEventHandler from "./DomainEventHandler";
import DomainEventTypeName from "./DomainEventTypeName";

export default class DomainEvent {
    private static subscriptor: Map<DomainEventTypeName, DomainEventHandler[]> = new Map<DomainEventTypeName, DomainEventHandler[]>();

    static registEvent(eventName: DomainEventTypeName) {
        if (!DomainEvent.subscriptor.has(eventName)) {
            DomainEvent.subscriptor.set(eventName, []);
        }
    }

    registHanler(eventName: DomainEventTypeName, handle: DomainEventHandler) {
        if (!DomainEvent.subscriptor.has(eventName)) { 
            throw new Error(`${eventName}는 존재하지 않는 이벤트 입니다.`);
        } else {
            const idx = DomainEvent.subscriptor.get(eventName)?.findIndex(v => v === handle);
            if (idx === -1) {
                DomainEvent.subscriptor.get(eventName)?.push(handle);
            }
        }
    }

    notify(eventName: DomainEventTypeName, sender: any, args: any) {
        if (!DomainEvent.subscriptor.has(eventName)) { 
            throw new Error(`${eventName}는 존재하지 않는 이벤트 입니다.`);
        } else {
            const handlers = DomainEvent.subscriptor.get(eventName)!;
            for (const handle of handlers) {
                handle.eventHandle(sender, args);
            }
        }
    }
}