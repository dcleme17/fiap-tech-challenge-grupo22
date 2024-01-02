export class CustomError extends Error {
    readonly statusCode: number
    readonly errors: Array<any>
    readonly logging: boolean
    
    constructor(message: string, statusCode: number, logging: boolean, errors: Array<any>) {
      super(message)
      this.statusCode = statusCode
      this.logging = logging
      this.errors = errors
      
      if (logging) console.error(errors)
    }
}