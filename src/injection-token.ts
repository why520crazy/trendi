import { AbstractType, Constructor } from "./types";

export type InjectionToken<T = unknown> = Constructor<T> | symbol | AbstractType<T>;
