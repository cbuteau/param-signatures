
var signatures = require('../');

var customMatchers = require('./support/custommatchers');

describe('Basic Tests', function (){

  beforeEach(function() {
    jasmine.addMatchers(customMatchers);
  });

  it('Basic PASS', function() {
    //console.log('Begin basic PASS');
    var signature = {
      fieldOne: true,
      fieldTwo: 10,
      fieldThree: 3.14,
      // we are ignoring these because they are never called and are testing the module.
      fieldFour: /* istanbul ignore next */ function () {},
      fieldFive: /* istanbul ignore next */ function(data){},
      fieldSix: /* istanbul ignore next */ function(params, options) {},
      fieldSeven: /* istanbul ignore next */ function(params, options, suboptions) {},
    };

    var obj3 = {
      fieldOne: false,
      fieldTwo: 0,
      fieldThree: 21.9,
      fieldFour: /* istanbul ignore next */ function() {},
      fieldFive: /* istanbul ignore next */ function(data){},
      fieldSix: /* istanbul ignore next */ function(params, options) {},
      fieldSeven: /* istanbul ignore next */ function(params, options, suboptions) {},
    };


    var options = {
      enable_logging: true,
      props: true,
      detail: false
    };

    expect( function() {
        signatures.validate(signature, obj3);//, options);
    }).not.toThrow();
    //signatures.validate(signature, obj3).toThrow();
  });

  it ('Undefined mismatch', function() {
    var signature = {
      fieldOne: true,
      fieldTwo: 10,
      fieldThree: 3.14,
      fieldFour: /* istanbul ignore next */ function () {},
      fieldFive: /* istanbul ignore next */ function(data){},
      fieldSix: /* istanbul ignore next */ function(params, options) {},
      fieldSeven: /* istanbul ignore next */ function(params, options, suboptions) {},
    };

    var obj3 = {
      fieldOne: undefined,
      fieldTwo: 0,
      fieldThree: 21.9,
      fieldFour:/* istanbul ignore next */ function() {},
      fieldFive:/* istanbul ignore next */ function(data){},
      fieldSix:/* istanbul ignore next */ function(params, options) {},
      fieldSeven:/* istanbul ignore next */ function(params, options, suboptions) {},
    };

    expect( function() {
        signatures.validate(signature, obj3);
    }).toThrowContains('fieldOne');

  });

  it ('NULL sig', function() {
    var obj3 = {
      fieldOne: undefined,
      fieldTwo: 0,
      fieldThree: 21.9,
      fieldFour:/* istanbul ignore next */ function() {},
      fieldFive:/* istanbul ignore next */ function(data){},
      fieldSix:/* istanbul ignore next */ function(params, options) {},
      fieldSeven:/* istanbul ignore next */ function(params, options, suboptions) {},
    };

    expect( function() {
        signatures.validate(obj3, null);
    }).toThrowContains('Signature is null or undefined');

  });

  it ('NULL obj', function() {
    var signature = {
      fieldOne: true,
      fieldTwo: 10,
      fieldThree: 3.14,
      fieldFour: /* istanbul ignore next */ function () {},
      fieldFive: /* istanbul ignore next */ function(data){},
      fieldSix: /* istanbul ignore next */ function(params, options) {},
      fieldSeven: /* istanbul ignore next */ function(params, options, suboptions) {},
    };

    var obj3 = {
      fieldOne: undefined,
      fieldTwo: 0,
      fieldThree: 21.9,
      fieldFour: /* istanbul ignore next */ function() {},
      fieldFive: /* istanbul ignore next */ function(data){},
      fieldSix: /* istanbul ignore next */ function(params, options) {},
      fieldSeven: /* istanbul ignore next */ function(params, options, suboptions) {},
    };

    expect( function() {
        signatures.validate(null, signature);
    }).toThrowContains('Object is null or undefined');

  });

  it ('undefined sig', function() {
    var signature;

    var obj3 = {
      fieldOne: undefined,
      fieldTwo: 0,
      fieldThree: 21.9,
      fieldFour: /* istanbul ignore next */ function() {},
      fieldFive: /* istanbul ignore next */ function(data){},
      fieldSix: /* istanbul ignore next */ function(params, options) {},
      fieldSeven: /* istanbul ignore next */ function(params, options, suboptions) {},
    };

    expect( function() {
        signatures.validate(obj3, signature);
    }).toThrowContains('Signature is null or undefined');

  });

  it ('undefined obj', function() {
    var signature = {
      fieldOne: true,
      fieldTwo: 10,
      fieldThree: 3.14,
      fieldFour: /* istanbul ignore next */ function () { },
      fieldFive: /* istanbul ignore next */ function(data){ },
      fieldSix: /* istanbul ignore next */ function(params, options) {},
      fieldSeven: /* istanbul ignore next */ function(params, options, suboptions) {},
    };

    var obj3;

    expect( function() {
        signatures.validate(obj3, signature);
    }).toThrowContains('Object is null or undefined');

  });

});
