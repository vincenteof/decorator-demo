function logged(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
): any {
  console.log('target: ', target)
  console.log('propertyKey: ', propertyKey)
  console.log('descriptor: ', descriptor)
  return function (arg: string) {
    return target.call(this, [arg])
  }
}

class C {
  @logged
  f(arg: string) {
    console.log(`receive ${arg}`)
  }
}

export default function run() {
  new C().f('btc')
}
