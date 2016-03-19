
var signatures = require('../signatures');

describe('Basic Tests', function (){
  it('Basic PASS', function() {
    //console.log('Begin basic PASS');
    var signature = {
      fieldOne: true,
      fieldTwo: 10,
      fieldThree: 3.14,
      fieldFour: function () {},
      fieldFive: function(data){},
      fieldSix: function(params, options) {},
      fieldSeven: function(params, options, suboptions) {},
    };

    var obj3 = {
      fieldOne: false,
      fieldTwo: 0,
      fieldThree: 21.9,
      fieldFour: function() {},
      fieldFive: function(data){},
      fieldSix: function(params, options) {},
      fieldSeven: function(params, options, suboptions) {},
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
      fieldFour: function () {},
      fieldFive: function(data){},
      fieldSix: function(params, options) {},
      fieldSeven: function(params, options, suboptions) {},
    };

    var obj3 = {
      fieldOne: undefined,
      fieldTwo: 0,
      fieldThree: 21.9,
      fieldFour: function() {},
      fieldFive: function(data){},
      fieldSix: function(params, options) {},
      fieldSeven: function(params, options, suboptions) {},
    };

    expect( function() {
        signatures.validate(signature, obj3);
    }).toThrow();

  });

  it ('NULL sig', function() {
    var obj3 = {
      fieldOne: undefined,
      fieldTwo: 0,
      fieldThree: 21.9,
      fieldFour: function() {},
      fieldFive: function(data){},
      fieldSix: function(params, options) {},
      fieldSeven: function(params, options, suboptions) {},
    };

    expect( function() {
        signatures.validate(null, obj3);
    }).toThrow();

  });

  it ('NULL obj', function() {
    var signature = {
      fieldOne: true,
      fieldTwo: 10,
      fieldThree: 3.14,
      fieldFour: function () {},
      fieldFive: function(data){},
      fieldSix: function(params, options) {},
      fieldSeven: function(params, options, suboptions) {},
    };

    var obj3 = {
      fieldOne: undefined,
      fieldTwo: 0,
      fieldThree: 21.9,
      fieldFour: function() {},
      fieldFive: function(data){},
      fieldSix: function(params, options) {},
      fieldSeven: function(params, options, suboptions) {},
    };

    expect( function() {
        signatures.validate(signature, null);
    }).toThrow();

  });

  it ('undefined sig', function() {
    var signature;
    //  = {
    //   fieldOne: true,
    //   fieldTwo: 10,
    //   fieldThree: 3.14,
    //   fieldFour: function () {},
    //   fieldFive: function(data){},
    //   fieldSix: function(params, options) {},
    //   fieldSeven: function(params, options, suboptions) {},
    // };

    var obj3 = {
      fieldOne: undefined,
      fieldTwo: 0,
      fieldThree: 21.9,
      fieldFour: function() {},
      fieldFive: function(data){},
      fieldSix: function(params, options) {},
      fieldSeven: function(params, options, suboptions) {},
    };

    expect( function() {
        signatures.validate(signature, obj3);
    }).toThrow();

  });

  it ('undefined obj', function() {
    var signature = {
      fieldOne: true,
      fieldTwo: 10,
      fieldThree: 3.14,
      fieldFour: function () {},
      fieldFive: function(data){},
      fieldSix: function(params, options) {},
      fieldSeven: function(params, options, suboptions) {},
    };

    var obj3;
    //  = {
    //   fieldOne: undefined,
    //   fieldTwo: 0,
    //   fieldThree: 21.9,
    //   fieldFour: function() {},
    //   fieldFive: function(data){},
    //   fieldSix: function(params, options) {},
    //   fieldSeven: function(params, options, suboptions) {},
    // };

    expect( function() {
        signatures.validate(signature, obj3);
    }).toThrow();

  });

});
