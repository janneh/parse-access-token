parse-access-token
=====================

Parse OAuth 2.0 bearer token from request body, query param or headers.

ref: https://tools.ietf.org/html/rfc6750#section-2

## Install

```bash
$ npm install --save parse-access-token
```

## Usage

Exposes functions `parseHeaderToken`, `parseQueryToken`, `parseBodyToken` as named exports
to parse token from headers, query or body respectively and a function as default export that check all three
and throws an error if found in more than one of them. All functions return the access token if found, else `undefined`.
Note that the access token is not verified, just parsed form the request.

ES6 module available at `parse-access-token/es6` and commonjs ES5 at `parse-access-token`. Note: using `require` the default export is accessible as `default`:

```js
const parseToken = require("parse-access-token").default
```

Works on an express, koa or hapi request object.

```js
import parseToken from 'parse-access-token/es6'

app.get('/resource', (req, res, next) => {
  const token = parseToken(req)

  if (verify(token)) {
    res.status(200).send('Resource')
  } else {
    res.status(401).send('Unauthorized')
  }
})
```
