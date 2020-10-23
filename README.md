# BeeDI / 🐝 DI

BeeDI is a opinionated and lightweight library for building lambdas to help you build tidy and testable lambda functions.


## Simple Example

```js
import { jsonapi } from 'beedi';

async function handler(event) {
  // The handler just contains the logic.
  // event.body has been json parsed.
  return {
    message: 'I get json stringified'
  }
}

export const main = jsonapi({
 handler
})
```

## Why choose BeeDI

## Table of Contents
  * [Simple Example](#simple-example)
  * [Why choose BeeDI](#why-choose-beedi)
  * [Table of Contents](#table-of-contents)
  * [Installation](#installation)
  * [Requirements](#requirements)
  * [Options](#options)
  * [Testing](#testing)
  * [Contributions](#contributions)


## Installation

## Requirements

## Options

## Testing

## Contributions
