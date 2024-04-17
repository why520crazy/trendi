import { Injector } from '../injector.js';
import { Constructor } from '../types.js';

export interface InjectableOptions {
    providedIn: 'root' | 'none';
}

export function Injectable(options?: InjectableOptions) {
    return (target: object, context: ClassDecoratorContext) => {
        // if (context && context.metadata) {
        //     context.metadata['options'] = options;
        // }
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
