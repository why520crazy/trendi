import { Inject, Injectable, Injector, inject, injector } from '../dist/index.js';

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
    static deps = [Bar];

    @Inject(Bar) #bar2: Bar;

    bar3 = inject(Bar);

    constructor(private bar1: Bar) {}
}

// class Bar {
//     name = 'Bar';
// }
// class Foo {
//     static deps = [Bar];

//     bar3 = inject(Bar);

//     constructor(private bar1: Bar) {}
// }

// injector.register([
//     Bar,
//     {
//         provide: Foo,
//         deps: [Bar]
//     }
// ]);

console.log(injector.get(Foo));


