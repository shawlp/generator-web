declare module '*'

declare module '*.json' {
  const value: any
  export default value
}

declare module '*.less' {
  const classes: { readonly [key: string]: string }
  export default classes
}
