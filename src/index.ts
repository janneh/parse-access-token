interface Request {
  headers?: { authorization?: string, Authorization?: string }
  query?: { access_token: string }
  body?: { access_token: string }
}

function parseHeaderToken(req: Request): string {
  const header = req.headers.authorization || req.headers.Authorization
  const [scheme, token] = (header || "").split(" ")
  if (scheme === "Bearer") return token
}

function parseQueryToken(req: Request): string {
  return req.query && req.query.access_token
}

function isFormRequest(req) {
  return req.headers["Content-Type"] === "application/x-www-form-urlencoded"
}

function parseBodyToken(req: Request): string {
  if (!isFormRequest(req)) return

  return req.body && req.body.access_token
}

function parseToken(req: Request): string {
  const rawTokens = [parseHeaderToken(req), parseQueryToken(req), parseBodyToken(req)]
  const tokens = rawTokens.filter(token => token)
  if (tokens.length > 1) throw Error("Access Token found more than once")
  return tokens[0]
}

export { parseHeaderToken, parseQueryToken, parseBodyToken }
export default parseToken