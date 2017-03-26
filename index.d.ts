// Type definitions for 'parse-access-token' version 1.1.0
// Definitions by: janneh

declare module "parse-access-token" {
  export interface Request {
    headers?: { authorization?: string, Authorization?: string }
    query?: { access_token: string }
    body?: { access_token: string }
  }

  export function parseHeaderToken(req: Request): string
  export function parseQueryToken(req: Request): string
  export function parseBodyToken(req: Request): string
  export default function parseToken(req: Request): string
}
