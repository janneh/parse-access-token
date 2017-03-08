import * as test from "tape";
import parseToken, { parseBodyToken, parseQueryToken, parseHeaderToken } from "./index"

test("parseBodyToken", (t) => {
  const expected = "foo"
  const req = { 
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: { access_token: expected } 
  }
  t.equal(parseBodyToken(req), expected, "should parsed token from body")
  t.end()
})

test("parseQueryToken", (t) => {
  const expected = "foo"
  const req = { 
    query: { access_token: expected }
  }
  t.equal(parseQueryToken(req), expected, "should parsed token from query")
  t.end()
})

test("parseHeaderToken from 'authorization' header", (t) => {
  const expected = "foo"
  const req = {
    headers: { authorization: `Bearer ${expected}` }
  }
  t.equal(parseHeaderToken(req), expected, "should parsed token from headers")
  t.end()
})

test("parseHeaderToken from 'Authorization' header", (t) => {
  const expected = "foo"
  const req = { 
    headers: { authorization: `Bearer ${expected}` } 
  }
  t.equal(parseHeaderToken(req), expected, "should parsed token from headers")
  t.end()
})

test("parseToken", (t) => {
  const expected = "foo"
  const req = {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: { access_token: expected },
    query: { access_token: expected } 
  }
  t.throws(() => parseToken(req), "should throw when token is provided multiple times")
  t.end()
})

test("parseToke", (t) => {
  const expected = "foo"
  const req = {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: { access_token: expected }
  }
  t.equal(parseToken(req), expected, "should parsed token from body")
  t.end()
})

test("parseToken", (t) => {
  const expected = "foo"
  const req = {
    headers: {},
    query: { access_token: expected }
  }
  t.equal(parseToken(req), expected, "should parsed token from query")
  t.end()
})

test("parseToken", (t) => {
  const expected = "foo"
  const req = {
    headers: { authorization: `Bearer ${expected}` }
  }
  t.equal(parseToken(req), expected, "should parsed token from headers")
  t.end()
})

test("parseToken", (t) => {
  const req = { headers: {} }
  t.equal(parseToken(req), undefined, "should parsed token not found")
  t.end()
})