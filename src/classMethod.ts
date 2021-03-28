function logged(target: any, propertyKey: string): any {
  return function (this: any, arg: string) {
    console.log(`before ${propertyKey} called`)
    const ret = target.call(this, [arg])
    console.log(`after ${propertyKey} called`)
    return ret
  }
}

function readonly(target: any, pk: string, descriptor: PropertyDescriptor) {
  descriptor.writable = false
  return descriptor
}

class C {
  @logged
  f(arg: string) {
    console.log(`receive ${arg}`)
  }
  @readonly
  g() {
    console.log('g method')
  }
}

export default function run() {
  // const c = new C()
  // c.f('btc')
  // c.g = () => {
  //   console.log('new g method')
  // }
  // c.g()
}
