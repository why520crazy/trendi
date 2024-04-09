export interface AbstractType<T> extends Function {
    prototype: T;
}

export type Constructor<T = any> = new (...args: any) => T;
