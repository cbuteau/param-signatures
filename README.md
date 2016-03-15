
# SIGNATURES

## Background

Originatting in COM and then in .NET I learned the value of interfaces very early on and used them consistenly through many different code bases.

Being very new to javascript the thing I did not like right off the bat was the amount of assumptions that are made in complex code bases.

Like take this common snippet for option processing.

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

Later code will assume the options object

## Concept

The concept is simple since javascript has no sense of interfaces and the typing is too fuzzy to validate the naming is signatures.

The idea is that you validate parameters to be in the form (nested or not) like options in a function call.  The code could then decide to use the object throw an exception or replace the object with defaults.


Signature for this library.

```javascript
validate(object, signature)  
```

validates an object against a signature object and throws an exception on a mismatch.

```javascript
tryValidate(object, signature)
```

validates an object against a signature object and returns a collection of errors.

```javascript
var signatures = require('signatures');

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


signatures.validate(sig, obj1);
```
## Strategy

Although javascript is dynamic and always being optimized the final product is machine instructions and thus I prefer a limit of tests to perform work and would rather match against an integer versus a string.  Hopefully it will result in faster code which this is supposed to be a simple functionality.

## Who uses this?

Right now nobody.  If you stumble on this and find a production worthy usage send me a URL and I will include it in this section.

## Future Plans

I hope to get builds and unit tests running in the future but I have no plans for minification 
