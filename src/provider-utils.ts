import { resolveForwardRef } from './forward-ref.js';
import { InjectionToken } from './injection-token.js';
import {
    ClassProvider,
    ConstructorProvider,
    FactoryProvider,
    Lifecycles,
    Provider,
    TokenProvider,
    TypeProvider,
    ValueProvider
} from './provider.js';
import { Constructor } from './types.js';
import { isFunction, isNil, isObject } from './utils.js';

const USE_VALUE = 'useValue';

export function isValueProvider(value: Provider): value is ValueProvider {
    return !isNil(value) && isObject(value) && USE_VALUE in value;
}

export function isTypeProvider(value: Provider): value is TypeProvider {
    return isFunction(value);
}

export function isClassProvider(value: Provider): value is ClassProvider {
    return (value as ClassProvider).provide && !isNil((value as ClassProvider).useClass);
}

export function isConstructorProvider(value: Provider): value is ConstructorProvider {
    return isFunction((value as ConstructorProvider).provide);
}

export function isFactoryProvider(value: Provider): value is FactoryProvider {
    return (value as FactoryProvider).provide && isFunction((value as FactoryProvider).useFactory);
}

export function isTokenProvider(value: Provider): value is TokenProvider {
    return !!(value as TokenProvider).useToken;
}

export interface InnerProvider {
    token: InjectionToken;
    useToken?: InjectionToken;
    ctor?: Constructor<any>;
    lifecycle?: Lifecycles;
    factory?: Function;
    deps?: InjectionToken[];
    multi?: boolean;
}

export function normalizeProvider(provider: Provider): InnerProvider {
    if (isValueProvider(provider)) {
        return {
            token: resolveForwardRef(provider.provide),
            factory: function () {
                return resolveForwardRef(provider.useValue);
            },
            multi: provider.multi
        };
    } else if (isTypeProvider(provider)) {
        const ctor = resolveForwardRef(provider);
        return {
            token: ctor,
            ctor: ctor
        };
    } else if (isFactoryProvider(provider)) {
        return {
            token: resolveForwardRef(provider.provide),
            deps: provider.deps,
            factory: provider.useFactory,
            lifecycle: provider.lifecycle,
            multi: provider.multi
        };
    } else if (isClassProvider(provider)) {
        return {
            token: resolveForwardRef(provider.provide),
            ctor: resolveForwardRef(provider.useClass),
            lifecycle: provider.lifecycle,
            multi: provider.multi,
            deps: provider.deps
        };
    } else if (isTokenProvider(provider)) {
        return {
            token: resolveForwardRef(provider.provide),
            useToken: resolveForwardRef(provider.useToken)
        };
    } else if (isConstructorProvider(provider)) {
        const ctor = resolveForwardRef(provider.provide);
        return {
            token: ctor,
            ctor: ctor,
            lifecycle: provider.lifecycle,
            multi: provider.multi,
            deps: provider.deps
        };
    } else {
        throw new Error(`provider is invalid, ${JSON.stringify(provider, undefined, 2)}`);
    }
}
