function reportableClassDecorator<T extends { new (...args: any[]): {} }>(
  constructor: T
) {
  return class extends constructor {
    reportingURL: string = 'http://www...'
  }
}

@reportableClassDecorator
class BugReport {
  type = 'report'
  title: string

  constructor(t: string) {
    this.title = t
  }
}

export default function run() {
  // const bug = new BugReport('Needs dark mode')
  // console.log(bug.title)
  // console.log(bug.type)
  // // seems hard to infer the type
  // console.log((bug as any).reportingURL)
}
