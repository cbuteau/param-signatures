
# SIGNATURES

## Status

[![Build Status](https://travis-ci.org/cbuteau/param-signatures.svg?branch=master)](https://travis-ci.org/cbuteau/param-signatures)

[![Coverage Status](https://coveralls.io/repos/github/cbuteau/param-signatures/badge.svg?branch=master)](https://coveralls.io/github/cbuteau/param-signatures?branch=master)

[![npm version](http://img.shields.io/npm/v/param-signatures.svg?style=flat)](https://npmjs.org/package/param-signatures "View this project on npm")

[![npm](https://img.shields.io/npm/dt/param-signatures.svg)]()

## Background

As a developer I originally used COM and then used .NET and I learned the value of interfaces very early on and used them consistently through many different code bases.
I know these assumptions are mitigated through testing and code coverage but I wanted to learn what I could rely on in the typing system of javascript.

Being very new to javascript the thing I did not like right off the bat was the amount of assumptions that are made in complex code bases.

Take this common snippet for option processing.

```javascript

var defaultOptions = {
  debugging = false;
  smart_algo = true;
  callbacks = {
    onConnect = null,
    onDisconnect = null,
    onAdd = null,
    onRemove = null
  }
};

function initializer(param1, param2, options) {
  var opts = options || defaultOptions;
  this.options = opts;
}
```

The reason I hate that is because it assumes that it either the caller provided the right options or did not provide them at all.  It does not take into account that an empty object was passed or some of the options

Later code will assume the options object has certain properties and if it was an empty object it will pass the first test and then explode with a [TypeError](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypeError "MDN")

## Concept

The concept is simple since javascript has no sense of interfaces and the typing is too fuzzy to validate the naming is signatures.

The idea is that you validate parameters to be in the form (nested or not) like options in a function call.  The code could then decide to use the object throw an exception or replace the object with defaults.

## API

Signature for this library.

### validate

```javascript
validate(object, signature)  
```

validates an object against a signature object and throws an exception on a mismatch.

#### Example

```javascript
var signatures = require('param-signatures');

var sig = {
  fieldOne: 10,
  fieldTwo: 3.14,
  fieldThree: true,
  fieldFour: false,
  fieldFive: 'just a string',
  fieldSix: {
    subObjOne: 666,
    subObjTwo: 'whats up',
  },
  fieldSeven: {

  },
};

var obj1 = {

};

// this will throw an exception on all the missing fields from the object.
signatures.validate(sig, obj1);
```

### tryValidate

```javascript
tryValidate(object, signature)
```

validates an object against a signature object and returns a boolean whether it passed.

#### Example

```javascript
var signatures = require('param-signatures');

var defaults = {
  fieldOne: 10,
  fieldTwo: 3.14,
  fieldThree: true,
  fieldFour: false,
  fieldFive: 'The common error string',
  fieldSix: {
    subObjOne: 666,
    subObjTwo: 'The username',
  },
  fieldSeven: {

  },
};

var sig = {
  fieldOne: 10,
  fieldTwo: 3.14,
  fieldThree: true,
  fieldFour: false,
  fieldFive: 'just a string',
  fieldSix: {
    subObjOne: 666,
    subObjTwo: 'whats up',
  },
  fieldSeven: {

  },
};

var obj1 = {

};

var opts;
if (signatures.tryValidate(obj, sig)) {
  opts = obj;
} else {
  opts = defaults;
}

```

### mergeAndReturn

```javascript
var opts = mergeAndReturn(object, defaultObject);
```
Adds the properties to object that exist in defaultObject and returns a fresh object obeying the signature defined.

#### Example
```javascript
var signatures = require('param-signatures');

var sig = {
  fieldOne: 10,
  fieldTwo: 3.14,
  fieldThree: true,
  fieldFour: false,
  fieldFive: 'just a string',
  fieldSix: {
    subObjOne: 666,
    subObjTwo: 'whats up',
  },
  fieldSeven: {

  },
};

var obj = {
  fieldOne: 10,
  fieldTwo: 3.14,
  fieldThree: true,
  fieldFour: false,
  fieldFive: 'just a string',
};

var newObj = signatures.mergeAndReturn(obj, sig);
// the returned object will have the matching properties of the object
// copied over
// as well as the missing properties from the signature.

```

## Strategy

Although javascript is dynamic and always being optimized the final product is machine instructions and thus I prefer a limit of tests to perform work and would rather match against an integer versus a string.  Hopefully it will result in faster code which this is supposed to be a simple functionality.

When I originally set out to perform this work I tried to use the [instanceof](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/instanceof) operator because it was so simple and fast.  I found it to be unreliable since everything matched as Object to begin with.  Based on articles I read and some experiments I found that [duck typing](https://en.wikipedia.org/wiki/Duck_typing) was not just the most reliable method but the most efficient as well.

I also like to keep in mind the actual machine operations when code runs which is why a type is resolved to a type code versus a string so it can optimize to an integer and do int [tests](http://stackoverflow.com/questions/12665289/cmp-je-jg-how-they-work-in-assembly) to determine the type.


## Who uses this?

Right now nobody.  If you stumble on this and find a production worthy usage send me a URL and I will include it in this section.

## Future Plans

I would like to get this functional for not just [Node](https://nodejs.org/) but browsers as well.

I hope to get builds and unit tests running in the future but I have no plans for [minification][1]

[1]: https://en.wikipedia.org/wiki/Minification_(programming)
