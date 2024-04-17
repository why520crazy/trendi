import { Constructor } from "./types.js";

export interface ForwardRefFn<T> {
    (): T;
}

export function forwardRef<T>(forwardRefFn: ForwardRefFn<Constructor<T>>): Constructor<T>;
export function forwardRef<T>(forwardRefFn: ForwardRefFn<any>): Constructor;
export function forwardRef<T>(forwardRefFn: ForwardRefFn<Constructor<T>> | ForwardRefFn<any>): Constructor<T> | Constructor {
    (<any>forwardRefFn).__forward_ref__ = forwardRef;
    return forwardRefFn as unknown as Constructor<T>;
}

export function resolveForwardRef<T>(type: T): T {
    return isForwardRef(type) ? type() : type;
}

export function isForwardRef(fn: any): fn is () => any {
    return (
        typeof fn === "function" &&
        fn.hasOwnProperty("__forward_ref__") &&
        fn.__forward_ref__ === forwardRef
    );
}
