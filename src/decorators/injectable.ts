import { Injector } from '../injector';
import { Constructor } from '../types';

export interface InjectableOptions {
    providedIn: 'root' | 'none';
}

export function Injectable(options?: InjectableOptions) {
    return (target: object, context: ClassDecoratorContext) => {
        context.addInitializer(() => {
            if (options?.providedIn === 'root') {
                Injector.root.register({
                    provide: target as Constructor,
                    deps: target['deps'] || []
                });
            }
        });
    };
}
