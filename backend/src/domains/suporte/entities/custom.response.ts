export class CustomResponse {
    readonly statusCode: number
    readonly message: string
    readonly content: any
    readonly logging: boolean
    
    constructor(statusCode: number, message: string, content: any, logging: boolean) {
      this.statusCode = statusCode
      this.message = message
      this.content = content
      this.logging = logging
      
      // if (logging) console.info(this)
    }
  }