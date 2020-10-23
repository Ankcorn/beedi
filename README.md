# BeeDI / 🐝 DI

BeeDI is a opinionated and lightweight library for building lambdas to help you build tidy and testable lambda functions.

```js
import { jsonapi } from 'beedi';

async function handler(event, { dep1 }) {

  // The handler just contains the logic

  await dep1(event.body.id);
  return {
    message: 'I get json stringified'
  }
}

export const main = jsonapi({
 handler,
 cors: '*',
 errors: {
   '*': (e) => ({
     statusCode: 500,
     body: { message: 'it broke' }
  }),
  dependencies: () => ({ dep1: () => /* some 3rd party dep*/})
 }
})
```
