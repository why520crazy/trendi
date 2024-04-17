import { inject } from '../inject.js';
import { InjectionToken } from '../injection-token.js';

export interface InjectOptions {
    optional?: boolean;
    self?: boolean;
}

export function Inject<C, V>(token: InjectionToken, options?: InjectOptions) {
    return (target: undefined | object, context: ClassFieldDecoratorContext<C, V> | ClassMethodDecoratorContext<C>) => {
        context.addInitializer(() => {});

        return (value: any) => {
            return inject(token, options) as V;
        };
    };
}
