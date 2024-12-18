export default interface DomainEventHandler {
    eventHandle(sender: any, args: any): void;
}