import { getRootInjector } from './create-injector';
import { InjectionToken } from './injection-token';
import { InjectorImpl } from './injector-impl';
import { Provider } from './provider';

export interface CreateInjectorOptions {
    parent: Injector;
}

export abstract class Injector {
    static get root() {
        return getRootInjector();
    }

    static create(options: CreateInjectorOptions) {
        return null;
    }

    abstract register(providers: Provider[] | Provider): void;

    abstract get<T>(token: InjectionToken): T;
}
