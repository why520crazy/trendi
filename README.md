# Trendi

Futuristic TypeScript DI Library.

## Usage

Property @Inject:
```ts
import { Inject, Injectable, inject, injector } from 'trendi';

@Injectable({
    providedIn: 'root'
})
class Bar {
    name = 'Bar';
}

@Injectable({
    providedIn: 'root'
})
class Foo {
    @Inject(Bar) bar: Bar;
}

injector.get(Foo); // Foo { bar: Bar { name: 'Bar' } }

```

Property Initialize Inject:
```ts

@Injectable({
    providedIn: 'root'
})
class Foo {
    bar = inject(Bar);
}

injector.get(Foo); // Foo { bar: Bar { name: 'Bar' } }
```

Constructor Inject
```ts
import { Inject, Injectable, inject, injector } from 'trendi';

@Injectable({
    providedIn: 'root'
})
class Foo {
    static deps = [Bar];

    constructor(private bar: Bar) {}
}

injector.get(Foo); // Foo { bar: Bar { name: 'Bar' } }
```