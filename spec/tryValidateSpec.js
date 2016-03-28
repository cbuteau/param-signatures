

var signatures = require('../');

describe('tryValidatSpec.js Validate tryValidate function...', function() {
  it ('null', function() {
    var sig = {
      fieldOne: null,
    };

    var obj = {
      fieldOne: null,
    };

    expect(function(){
      signatures.validate(sig, obj);
    }).not.toThrow();
  });

  it ('undefined', function(){
    var sig = {
      fieldOne: undefined,
    };

    var obj = {
      fieldOne: undefined,
    };

    expect(function(){
      signatures.validate(sig, obj);
    }).not.toThrow();
  });

  it ('Boolean', function(){
    var sig = {
        fieldOne: true,
    };

    var obj = {
      fieldOne: false,
    };

    expect(signatures.tryValidate(sig, obj)).toBe(true);

  });

  it ('Number', function(){
    var sig = {
        fieldOne: 0,
    };

    var obj = {
      fieldOne: 10,
    };

    expect(signatures.tryValidate(sig, obj)).toBe(true);

  });

  it ('Number decimal', function(){
    // it cannot differentiate between decimal and whole number.
    // maybe a feature to add in the future?
    var sig = {
        fieldOne: 3.14,
    };

    var obj = {
      fieldOne: 10,
    };

    expect(signatures.tryValidate(sig, obj)).toBe(true);

  });

  it ('String', function(){
    var sig = {
      fieldOne: '',
    };

    var obj = {
      fieldOne: 'An actual string with data',
    };

    expect(signatures.tryValidate(sig, obj)).toBe(true);

  });

  it ('Array', function() {
    var sig = {
      fieldOne: [],
    };

    var obj = {
      fieldOne: ['An actual string with data', 3.14, []],
    };

    expect(signatures.tryValidate(sig, obj)).toBe(true);


  });

  describe('Functions', function() {
    it ('Function 0', function() {
      var sig = {
        fieldOne: /* istanbul ignore next */ function () {},
      };

      var obj = {
        fieldOne: /* istanbul ignore next */ function() {},
      };

      expect(signatures.tryValidate(sig, obj)).toBe(true);


    });

    it ('Function 1', function() {
      var sig = {
        fieldOne: /* istanbul ignore next */ function (param) {},
      };

      var obj = {
        fieldOne: /* istanbul ignore next */ function(anon) {},
      };

      expect(signatures.tryValidate(sig, obj)).toBe(true);


    });

    it ('Function 2', function() {
      var sig = {
        fieldOne: /* istanbul ignore next */ function (param, options) {},
      };

      var obj = {
        fieldOne: /* istanbul ignore next */ function(param, options) {},
      };

      expect(signatures.tryValidate(sig, obj)).toBe(true);


    });

    it ('Function 3', function() {
      var sig = {
        fieldOne: /* istanbul ignore next */ function (param, options, details) {},
      };

      var obj = {
        fieldOne: /* istanbul ignore next */ function(param, options, details) {},
      };

      expect(signatures.tryValidate(sig, obj)).toBe(true);

      expect(function(){
        signatures.validate(sig, obj);
      }).not.toThrow();

    });

    it ('Function 4', function() {
      var sig = {
        fieldOne: /* istanbul ignore next */ function (param, options, details, subdetails) {},
      };

      var obj = {
        fieldOne: /* istanbul ignore next */ function(param, options, details, subdetails) {},
      };

      expect(signatures.tryValidate(sig, obj)).toBe(true);
    });

    it ('Function Mismatch', function() {
      var sig = {
        fieldOne: /* istanbul ignore next */ function (param, options, details, subdetails) {},
      };

      var obj = {
        fieldOne: /* istanbul ignore next */ function() {},
      };

      expect(signatures.tryValidate(sig, obj)).toBe(false);
    });

  });


  it ('Date', function() {
    var sig = {
      fieldOne: new Date(),
    };

    // modified
    // 2016-03-02T18:22:38Z
    //
    // created
    // 2016-03-02T18:22:34Z

    var obj = {
      fieldOne: new Date('2016-03-02T18:22:34Z'),
    };

    expect(signatures.tryValidate(sig, obj)).toBe(true);
  });

});
