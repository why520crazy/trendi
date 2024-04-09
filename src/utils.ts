export function coerceArray<T>(value: T | T[]): T[] {
  return Array.isArray(value) ? value : [value];
}

export function isUndefined(value: any): boolean {
  return value === undefined;
}

export function isNull(value: any): boolean {
  return value === null;
}

export function isNil(value: any): boolean {
  return isUndefined(value) || isNull(value);
}

export function isFunction(value: any): value is Function {
  return typeof value === 'function';
}

export function isObject(value: any): value is object {
  // Avoid a V8 JIT bug in Chrome 19-20.
  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
  const type = typeof value;
  return !!value && (type === 'object' || type === 'function');
}
