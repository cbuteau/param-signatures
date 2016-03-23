var signatures = require('../signatures');

var customMatchers = require('./support/custommatchers');

describe('negativeSpec.js - negative tests for more coverage...', function() {

  beforeEach(function() {
    jasmine.addMatchers(customMatchers);
  });

  it ('throws if sig is null', function() {
    var signature = null;

    var object = {
      fieldOne: false,
      fieldTwo: 0,
      fieldThree: 21.9,
      fieldFour: function() {},
      fieldFive: function(data){},
      fieldSix: function(params, options) {},
    };

    expect(function() {
      var newobj = signatures.mergeAndReturn(object, signature);
    }).toThrowContains('cannot be null or undefined');


  });

  it ('throws if sig is undefined', function() {
    var signature;

    var object = {
      fieldOne: false,
      fieldTwo: 0,
      fieldThree: 21.9,
      fieldFour: function() {},
      fieldFive: function(data){},
      fieldSix: function(params, options) {},
    };

    expect(function() {
      var newobj = signatures.mergeAndReturn(object, signature);
    }).toThrowContains('cannot be null or undefined');


  });

  it ('throws if sig is undefined', function() {
    var signature;

    var object = {
      fieldOne: false,
      fieldTwo: 0,
      fieldThree: 21.9,
      fieldFour: function() {},
      fieldFive: function(data){},
      fieldSix: function(params, options) {},
    };

    expect(function() {
      var newobj = signatures.validate(object, signature);
    }).toThrowContains('Signature is null or undefined');

  });

  it ('throws if sig is null', function() {
    var signature = null;

    var object = {
      fieldOne: false,
      fieldTwo: 0,
      fieldThree: 21.9,
      fieldFour: function() {},
      fieldFive: function(data){},
      fieldSix: function(params, options) {},
    };

    expect(function() {
      var newobj = signatures.validate(object, signature);
    }).toThrowContains('Signature is null or undefined');

  });

  it ('throws if object is null', function() {
    var signature = {
      fieldOne: true,
      fieldTwo: 10,
      fieldThree: 3.14,
      fieldFour: function () {},
      fieldFive: function(data){},
      fieldSix: function(params, options) {},
      fieldSeven: function(params, options, suboptions) {},
    };

    var object = null;

    expect(function() {
      var newobj = signatures.validate(object, signature);
    }).toThrowContains('Object is null or undefined');

  });

  it ('throws if object is undefined', function() {
    var signature = {
      fieldOne: true,
      fieldTwo: 10,
      fieldThree: 3.14,
      fieldFour: function () {},
      fieldFive: function(data){},
      fieldSix: function(params, options) {},
      fieldSeven: function(params, options, suboptions) {},
    };

    var object; // undefined

    expect(function() {
      var newobj = signatures.validate(object, signature);
    }).toThrowContains('Object is null or undefined');

  });

});
