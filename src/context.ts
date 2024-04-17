import { Injector } from "./injector.js";

/**
 * Current Injector value used by `inject`.
 * - `undefined`: it is an error to call `inject`
 * - Injector instance: Use the Injector for resolution.
 */
let currentInjector: Injector | undefined | null;

export function getCurrentInjector(): Injector | undefined | null {
    return currentInjector;
}

export function setCurrentInjector(Injector: Injector | undefined | null): Injector | undefined | null {
    const former = getCurrentInjector();
    currentInjector = Injector;
    return former;
}

export function runInInjectionContext<ReturnT>(Injector: Injector, fn: () => ReturnT): ReturnT {
    return runInInjectionContextInternal<ReturnT>(Injector, fn);
}

export function runInInjectionContextInternal<ReturnT>(
    Injector: Injector,
    fn: () => ReturnT,
    // prevContext?: {
    //     parentDependency: Dependency,
    //     target: string,
    //     type: Type
    // }
): ReturnT {
    const prevInjector = setCurrentInjector(Injector);
    try {
        return fn();
    }
    catch (e) {
        // (e as Error).message += (`\n previous injection context: inject ${prevContext ? `type ${typeToString(prevContext.type)} into ${prevContext.target} of type ${typeToString(prevContext.parentDependency.type)}` : ""} inside Injector ${Injector.key.toString()}${!prevInjector || prevInjector === Injector ? `, no Injector change` : `, change Injector from ${(prevInjector ?? Injector).key.toString()}`}`);
        throw e;
    }
    finally {
        setCurrentInjector(prevInjector);
    }
}
