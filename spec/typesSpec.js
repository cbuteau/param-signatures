
var signatures = require('../');

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

  describe('Functions...', function() {
    it ('Function 0 params', function() {
      var sig = {
        fieldOne: /* istanbul ignore next */ function () {},
      };

      var obj = {
        fieldOne: /* istanbul ignore next */ function() {},
      };

      expect(function(){
        signatures.validate(sig, obj);
      }).not.toThrow();

    });

    it ('Function 1 params', function() {
      var sig = {
        fieldOne: /* istanbul ignore next */ function (param) {},
      };

      var obj = {
        fieldOne: /* istanbul ignore next */ function(anon) {},
      };

      expect(function(){
        signatures.validate(sig, obj);
      }).not.toThrow();

    });

    it ('Function 2 params', function() {
      var sig = {
        fieldOne: /* istanbul ignore next */ function (param, options) {},
      };

      var obj = {
        fieldOne: /* istanbul ignore next */ function(param, options) {},
      };

      expect(function(){
        signatures.validate(sig, obj);
      }).not.toThrow();

    });

    it ('Function 3 params', function() {
      var sig = {
        fieldOne: /* istanbul ignore next */ function (param, options, details) {},
      };

      var obj = {
        fieldOne: /* istanbul ignore next */ function(param, options, details) {},
      };

      expect(function(){
        signatures.validate(sig, obj);
      }).not.toThrow();

    });

    it ('Function 4 params', function() {
      var sig = {
        fieldOne: /* istanbul ignore next */ function (param, options, details, subdetails) {},
      };

      var obj = {
        fieldOne: /* istanbul ignore next */ function(param, options, details, subdetails) {},
      };

      expect(function(){
        signatures.validate(sig, obj);
      }).not.toThrow();

    });

    it ('Function 5 params', function() {
      var sig = {
        fieldOne: /* istanbul ignore next */ function (param, options, details, subdetails, param5) {},
      };

      var obj = {
        fieldOne: /* istanbul ignore next */ function(param, options, details, subdetails, param5) {},
      };

      expect(function(){
        signatures.validate(sig, obj);
      }).not.toThrow();

    });

    it ('Function 6 params', function() {
      var sig = {
        fieldOne: /* istanbul ignore next */ function (param, options, details, subdetails, param5, param6) {},
      };

      var obj = {
        fieldOne: /* istanbul ignore next */ function(param, options, details, subdetails, param5, param6) {},
      };

      expect(function(){
        signatures.validate(sig, obj);
      }).not.toThrow();

    });

    it ('Function 7 params', function() {
      var sig = {
        fieldOne: /* istanbul ignore next */ function (param, options, details, subdetails, param5, param6, param7) {},
      };

      var obj = {
        fieldOne: /* istanbul ignore next */ function(param, options, details, subdetails, param5, param6, param7) {},
      };

      expect(function(){
        signatures.validate(sig, obj);
      }).not.toThrow();

    });

    it ('Function 8 params', function() {
      var sig = {
        fieldOne: /* istanbul ignore next */ function (param, options, details, subdetails, param5, param6, param7, param8) {},
      };

      var obj = {
        fieldOne: /* istanbul ignore next */ function(param, options, details, subdetails, param5, param6, param7, param8) {},
      };

      expect(function(){
        signatures.validate(sig, obj);
      }).not.toThrow();

    });


    it ('Function 9 params', function() {
      var sig = {
        fieldOne: /* istanbul ignore next */ function (param, options, details, subdetails, param5, param6, param7, param8, param9) {},
      };

      var obj = {
        fieldOne: /* istanbul ignore next */ function(param, options, details, subdetails, param5, param6, param7, param8, param9) {},
      };

      expect(function(){
        signatures.validate(sig, obj);
      }).not.toThrow();

    });


    it ('Function 10 params', function() {
      var sig = {
        fieldOne: /* istanbul ignore next */ function (param, options, details, subdetails, param5, param6, param7, param8, param9, param10) {},
      };

      var obj = {
        fieldOne: /* istanbul ignore next */ function(param, options, details, subdetails, param5, param6, param7, param8, param9, param10) {},
      };

      expect(function(){
        signatures.validate(sig, obj);
      }).not.toThrow();
    });

    it ('Function 50 params', function() {
      var sig = {
        fieldOne: /* istanbul ignore next */ function(param, options, details, subdetails, param5, param6, param7, param8, param9, param10, param11, param12, param13, param14, param15, param16, param17, param18, param19, param20, param21, param22, param23, param24, param25, param26, param27, param28, param29, param30, param31, param32, param33, param34, param35, param36, param37, param38, param39, param40, param41, param42, param43, param44, param45, param46, param47, param48, param49, param50) {},
      };

      var obj = {
        fieldOne: /* istanbul ignore next */ function(param, options, details, subdetails, param5, param6, param7, param8, param9, param10, param11, param12, param13, param14, param15, param16, param17, param18, param19, param20, param21, param22, param23, param24, param25, param26, param27, param28, param29, param30, param31, param32, param33, param34, param35, param36, param37, param38, param39, param40, param41, param42, param43, param44, param45, param46, param47, param48, param49, param50) {},
      };

      expect(function(){
        signatures.validate(sig, obj);
      }).not.toThrow();
    });

    it ('Function Mismatch', function() {
      var sig = {
        fieldOne: /* istanbul ignore next */ function (param, options, details, subdetails) {},
      };

      var obj = {
        fieldOne: /* istanbul ignore next */ function() {},
      };

      expect(function(){
        signatures.validate(sig, obj);
      }).toThrow();

    });

  });
});
