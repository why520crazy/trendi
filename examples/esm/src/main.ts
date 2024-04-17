import { Inject, Injectable, Injector, inject, injector } from 'trendi';

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

    @Inject(Bar) bar2: Bar;

    bar3 = inject(Bar);

    constructor(private bar1: Bar) {}
}

console.log(injector.get(Foo));
