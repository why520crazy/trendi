import { InjectionToken } from './injection-token';
import { Injector } from './injector';
import { Provider } from './provider';
import { InnerProvider, normalizeProvider } from './provider-utils';
import { coerceArray } from './utils';

export class InjectorImpl implements Injector {
    private resolvers = new Map<
        InjectionToken,
        {
            provider: InnerProvider;
            value?: any;
        }
    >();

    private name: string | symbol;

    private parent?: Injector;

    constructor(name: string | symbol, parent?: Injector) {
        this.name = name;
        this.parent = parent;
    }

    register(providers: Provider | Provider[]): void {
        coerceArray(providers).forEach(provider => {
            const innerProvider = normalizeProvider(provider);

            this.resolvers.set(innerProvider.token, {
                provider: innerProvider
            });
        });
    }

    get<T>(token: InjectionToken): T {
        const resolver = this.resolvers.get(token);
        if (resolver) {
            if (resolver.value) {
                return resolver.value as T;
            } else {
                if (resolver.provider.ctor) {
                    const deps = resolver.provider.deps;
                    if (deps) {
                        const depsValue = deps.map((token: InjectionToken) => {
                            return this.get(token);
                        });
                        console.log(depsValue)
                        resolver.value = new resolver.provider.ctor(...depsValue);
                    } else {
                        resolver.value = new resolver.provider.ctor();
                    }
                }
            }
        } else {
            throw new Error(`No provider for ${token.toString()}!`);
        }
        return resolver?.value as T;
    }
}
