import { InjectionToken } from "./injection-token";
import { Constructor } from "./types";

export enum Lifecycles {
    singleton = 1,

    instantiate = 2,
}

export interface ValueSansProvider<T = unknown> {
    useValue: T;
}

export interface ValueProvider<T = unknown> extends ValueSansProvider<T> {
    provide: InjectionToken;
    multi?: boolean;
}

export interface ClassSansProvider {
    useClass: Constructor;
    deps?: InjectionToken[];
}

export interface ClassProvider extends ClassSansProvider {
    provide: InjectionToken;
    lifecycle?: Lifecycles;
    multi?: boolean;
}

export interface ConstructorProvider {
    provide: Constructor;
    lifecycle?: Lifecycles;
    multi?: boolean;
    deps?: InjectionToken[];
}

export interface FactorySansProvider {
    useFactory: Function;
    deps?: InjectionToken[];
}

export interface FactoryProvider extends FactorySansProvider {
    provide: InjectionToken;
    lifecycle?: Lifecycles;
    multi?: boolean;
}

export interface TokenSansProvider {
    useToken: InjectionToken;
}

export interface TokenProvider extends TokenSansProvider {
    provide: InjectionToken;
}

export interface TypeProvider extends Constructor<any> {}

export type Provider = ValueProvider | ClassProvider | ConstructorProvider | TypeProvider | FactoryProvider | TokenProvider;

export type SansProvider = ValueSansProvider | ClassSansProvider | FactorySansProvider | TokenSansProvider;
