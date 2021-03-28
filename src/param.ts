import 'reflect-metadata'
const requiredMetadataKey = Symbol('required')

function required(
  target: Object,
  propertyKey: string | symbol,
  parameterIndex: number
) {
  let existingRequiredParameters: number[] =
    Reflect.getOwnMetadata(requiredMetadataKey, target, propertyKey) || []
  console.log('existingRequiredParameters: ', existingRequiredParameters)
  existingRequiredParameters.push(parameterIndex)
  Reflect.defineMetadata(
    requiredMetadataKey,
    existingRequiredParameters,
    target,
    propertyKey
  )
}

function validate(
  target: any,
  propertyName: string,
  descriptor: TypedPropertyDescriptor<(verbose: boolean) => string>
) {
  let method = descriptor.value!

  descriptor.value = function () {
    let requiredParameters: number[] = Reflect.getOwnMetadata(
      requiredMetadataKey,
      target,
      propertyName
    )
    console.log('requiredParameters: ', requiredParameters)
    if (requiredParameters) {
      for (let parameterIndex of requiredParameters) {
        if (
          parameterIndex >= arguments.length ||
          arguments[parameterIndex] === undefined
        ) {
          throw new Error('Missing required argument.')
        }
      }
    }
    return method.apply(this, arguments as any)
  }
}

class BugReport {
  type = 'report'
  title: string

  constructor(t: string) {
    this.title = t
  }

  @validate
  print(@required verbose: boolean) {
    if (verbose) {
      return this.title
    } else {
      return `type: ${this.type}\ntitle: ${this.title}`
    }
  }
}

export default function run() {
  const br: any = new BugReport('my report')
  br.print()
}
