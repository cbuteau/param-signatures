
var signatures = require('../signatures');

describe('typesSpec.js Validate handling of each type...', function() {
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


    expect(function(){
      signatures.validate(sig, obj);
    }).not.toThrow();
  });

  it ('Number', function(){
    var sig = {
        fieldOne: 0,
    };

    var obj = {
      fieldOne: 10,
    };


    expect(function(){
      signatures.validate(sig, obj);
    }).not.toThrow();
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


    expect(function(){
      signatures.validate(sig, obj);
    }).not.toThrow();
  });

  it ('String', function(){
    var sig = {
      fieldOne: '',
    };

    var obj = {
      fieldOne: 'An actual string with data',
    };


    expect(function(){
      signatures.validate(sig, obj);
    }).not.toThrow();
  });

  it ('Array', function() {
    var sig = {
      fieldOne: [],
    };

    var obj = {
      fieldOne: ['An actual string with data', 3.14, []],
    };

    expect(function(){
      signatures.validate(sig, obj);
    }).not.toThrow();

  });

  describe('Functions', function() {
    it ('Function 0', function() {
      var sig = {
        fieldOne: function () {},
      };

      var obj = {
        fieldOne: function() {},
      };

      expect(function(){
        signatures.validate(sig, obj);
      }).not.toThrow();

    });

    it ('Function 1', function() {
      var sig = {
        fieldOne: function (param) {},
      };

      var obj = {
        fieldOne: function(anon) {},
      };

      expect(function(){
        signatures.validate(sig, obj);
      }).not.toThrow();

    });

    it ('Function 2', function() {
      var sig = {
        fieldOne: function (param, options) {},
      };

      var obj = {
        fieldOne: function(param, options) {},
      };

      expect(function(){
        signatures.validate(sig, obj);
      }).not.toThrow();

    });

    it ('Function 3', function() {
      var sig = {
        fieldOne: function (param, options, details) {},
      };

      var obj = {
        fieldOne: function(param, options, details) {},
      };

      expect(function(){
        signatures.validate(sig, obj);
      }).not.toThrow();

    });

    it ('Function 4', function() {
      var sig = {
        fieldOne: function (param, options, details, subdetails) {},
      };

      var obj = {
        fieldOne: function(param, options, details, subdetails) {},
      };

      expect(function(){
        signatures.validate(sig, obj);
      }).not.toThrow();

    });

    it ('Function Mismatch', function() {
      var sig = {
        fieldOne: function (param, options, details, subdetails) {},
      };

      var obj = {
        fieldOne: function() {},
      };

      expect(function(){
        signatures.validate(sig, obj);
      }).toThrow();

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

    expect(function(){
      signatures.validate(sig, obj);
    }).not.toThrow();
  });
});
