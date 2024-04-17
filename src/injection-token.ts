import { AbstractType, Constructor } from "./types.js";

export type InjectionToken<T = unknown> = Constructor<T> | symbol | AbstractType<T>;
