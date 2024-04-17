import { getRootInjector } from './create-injector.js';
import { InjectOptions } from './decorators/index.js';
import { InjectionToken } from './injection-token.js';
import { InjectorImpl } from './injector-impl.js';
import { Provider } from './provider.js';

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

    abstract get<T>(token: InjectionToken<T>, options: InjectOptions & { optional: true }): T | undefined;
    abstract get<T>(token: InjectionToken<T>, options?: InjectOptions): T;
    abstract get<T extends object>(type: InjectionToken<T>, options?: InjectOptions & { optional: true }): T | undefined;
    abstract get<T extends object>(type: InjectionToken<T>, options?: InjectOptions): T;
}
