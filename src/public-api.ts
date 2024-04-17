// (Symbol as any).metadata ??= Symbol("Symbol.metadata");

import { Injector } from './injector.js';

export * from './injector.js';
export * from './decorators/index.js';
export * from './inject.js';
export * from './types.js';
export * from './injection-token.js';
export const injector = Injector.root;