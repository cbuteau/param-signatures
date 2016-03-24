
var signatures = require('../');

describe('optionsSpec.js Options tests', function() {
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
      enable_logging: true,
      props: true,
    };

    expect(function() {
      signatures.validate(signature, object, options);
    }).not.toThrow();

    expect(console.log).toHaveBeenCalled();
    // we could validate the call count...but it would break upon adding new logging.

  });

  it ('Wrong sig...goes to default', function(){
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
      enable_logging_wrong_name: true,
    };

    // because the options sig does not match ...it goes to default...no logging.
    expect(function() {
      signatures.validate(signature, object, options);
    }).not.toThrow();

    expect(console.log).not.toHaveBeenCalled();
  });

  it ('Partial options...should merge', function() {
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
      enable_logging: true,
    };

    // because the options sig does not match ...it goes to default...no logging.
    expect(function() {
      signatures.validate(signature, object, options);
    }).not.toThrow();

    expect(console.log).toHaveBeenCalled();
    // 2 for each property...1 for each function.
    expect(console.log.calls.count()).toBe(18);
  });

});
