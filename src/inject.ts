import { getCurrentInjector } from './context';
import { getRootInjector } from './create-injector';
import { InjectOptions } from './decorators';
import { InjectionToken } from './injection-token';

/**
 * @param type A token that represents a dependency that should be injected.
 * @param options control how injection is executed
 * @returns the injected value if operation is successful, `null` otherwise.
 */
export function inject<T>(token: InjectionToken<T>, options: InjectOptions & { optional: true }): T | undefined;
export function inject<T>(token: InjectionToken<T>, options?: InjectOptions): T;
export function inject<T = unknown>(token: InjectionToken<T>, options: InjectOptions = {}): T | undefined {
    const container = getCurrentInjector();
    if (!container) {
        if (options.self) {
            throw new Error(
                `inject() must be called from an injection context such as a constructor, a factory function, a field initializer.`
            );
        } else {
            return getRootInjector().get(token, options) as T;
        }
    } else {
        return container.get(token, options) as T;
    }
}
