import { injector } from '../src';

class B {
    name = 'B Name';
}

class A {
    name = 'A Name';

    constructor(private b: B) {}
}

injector.register([
    {
        provide: A,
        deps: [B]
    },
    B
]);

console.log(injector.get(A));
