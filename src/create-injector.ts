import { Injector } from './injector.js';
import { InjectorImpl } from './injector-impl.js';

export function createInjector() {}

const ROOT_KEY = Symbol('ROOT');
let root: Injector;

export function getRootInjector() {
    if (!root) {
        root = new InjectorImpl(ROOT_KEY);
    }
    return root;
}
