# BeeDI / 🐝 DI

BeeDI is an opinionated and lightweight library of helpers for building lambdas. It helps you build tidy and testable lambda functions.
It simplifies interfacing with aws event sources by limiting and preparsing the input. The aim is to support all the most common event sources.

## Simple Example

```js
import { jsonapi } from 'beedi';

async function main(event) {
  // The handler just contains the logic.
  // event.body has been json parsed.
  return {
    message: 'I get json stringified'
  }
}

export const handler = jsonapi(main);
```

## Why choose BeeDI

Its super early days. BeeDI is not used in production anywhere and is just a fun hobby project. I would not recomend using this in production. If you want something with a similar style but more feature complete, better tested, and well maintained check out https://middy.js.org/ and https://laconiajs.io/.

With that disclamer out the way beedi does have some upsides.

* It's really lightweight. (1kb unminified)
* It has no external dependencies.
* The interface is really simple. Each helper takes an object that contains just a couple of parameters.
* No legacy bagage. No support for callbacks. This means less work to maintain it and it is much lighter. This also could be considered a bad thing. 🤷‍♂️
* The internal code is very low abstraction and very simple. Take a peek under the hood. There really is very little magic to make this happen.

If you give it a try let me know by leaving a star

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
