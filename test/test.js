
function setMetadata(_target, context) {
    context.metadata[context.name] = true;
}

// @Injectable()
class B {
    name = 'B Name';
}

class A {
    name = 'A Name';


    // @Inject() dd = 1

    @setMetadata
    method() {}

    constructor() {}
}