export type Predicate<T> = (item: T) => boolean;

export const and = <T>(...predicates: Predicate<T>[]): Predicate<T> => {
    return (item: T) => predicates.every(predicate => predicate(item));
};

export const or = <T>(...predicates: Predicate<T>[]): Predicate<T> => {
    return (item: T) => predicates.some(predicate => predicate(item));
};