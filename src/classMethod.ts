function logged(target: any, propertyKey: string): any {
  return function (this: any, arg: string) {
    console.log(`before ${propertyKey} called`)
    const ret = target.call(this, [arg])
    console.log(`after ${propertyKey} called`)
    return ret
  }
}

function immutable(target: any, pk: string, descriptor: PropertyDescriptor) {}

class C {
  @logged
  f(arg: string) {
    console.log(`receive ${arg}`)
  }
}

export default function run() {
  new C().f('btc')
}
