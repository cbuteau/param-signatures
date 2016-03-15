
var signatures = require('../signatures');

describe('Options tests', function() {
  it ('Full Options', function() {
    spyOn(console, 'log');//.and.callThrough();

    var signature = {
      fieldOne: true,
      fieldTwo: 10,
      fieldThree: 3.14,
      fieldFour: function () {},
      fieldFive: function(data){},
      fieldSix: function(params, options) {},
      fieldSeven: function(params, options, suboptions) {},
    };

    var object = {
      fieldOne: false,
      fieldTwo: 0,
      fieldThree: 21.9,
      fieldFour: function() {},
      fieldFive: function(data){},
      fieldSix: function(params, options) {},
      fieldSeven: function(params, options, suboptions) {},
    };

    var options = {
      extra_logging: true,
      props: true,
    };

    expect(function() {
      signatures.validate(signature, object, options);
    }).not.toThrow();

    expect(console.log).toHaveBeenCalled();
    // we could validate the call count...but it would break upon adding new logging.

  });

  it ('Partial opts...goes to default', function(){
    spyOn(console, 'log').and.callThrough();

    var signature = {
      fieldOne: true,
      fieldTwo: 10,
      fieldThree: 3.14,
      fieldFour: function () {},
      fieldFive: function(data){},
      fieldSix: function(params, options) {},
      fieldSeven: function(params, options, suboptions) {},
    };

    var object = {
      fieldOne: false,
      fieldTwo: 0,
      fieldThree: 21.9,
      fieldFour: function() {},
      fieldFive: function(data){},
      fieldSix: function(params, options) {},
      fieldSeven: function(params, options, suboptions) {},
    };


    var options = {
      extra_logging: true,
    };

    // because the options sig does not match ...it goes to default...no logging.
    expect(function() {
      signatures.validate(signature, object, options);
    }).not.toThrow();

    expect(console.log).not.toHaveBeenCalled();
  });

});
