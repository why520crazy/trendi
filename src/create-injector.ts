import { Injector } from './injector';
import { InjectorImpl } from './injector-impl';

export function createInjector() {}

const ROOT_KEY = Symbol('ROOT');
let root: Injector;

export function getRootInjector() {
    if (!root) {
        root = new InjectorImpl(ROOT_KEY);
    }
    return root;
}
