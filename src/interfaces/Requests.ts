import { JwtPayload } from 'jsonwebtoken'

export interface IHeaders {
  [header: string]: string
}

export interface IRequestOptions {
  type?: string
  url?: string
  user?: string | JwtPayload
  password?: string
  headers: IHeaders
  timeout?: number
  data?: string
  followRedirects?: number
  proxyAuthorization?: string
}

export interface IRequestContext {
  res: {
    headers: IHeaders
    statusCode: number
  }
}
