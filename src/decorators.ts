export interface InjectOptions {
  optional?: boolean;
}

export function Inject(options: InjectOptions) {
  return (target: object, context: ClassDecoratorContext) => {};
}

export function Injectable() {
  return (target: object, context: ClassDecoratorContext) => {
    console.log(context.name);
  };
}

@Injectable()
class A {}
