
var signatures = require('../signatures');

describe('nestedSpec.js Processing nested objects...', function() {
  it ('first test', function() {
    var signature = {
      fieldOne: true,
      fieldTwo: 10,
      fieldThree: 3.14,
      fieldFour: [],
      callbacks: {
        onConnect: function() {},
        onDisconnect: function(err) {},
        onData: function(data, err) {},
        onCustomize: function(field, options, data) {}
      }
    };

    var object = {
      fieldOne: false,
      fieldTwo: 0,
      fieldThree: 21.9,
      fieldFour: [],
      callbacks: {
        onConnect: function() {},
        onDisconnect: function(err) {},
        onData: function(data, err) {},
        onCustomize: function(field, options, data) {}
      }
    };

    expect(function() {
      signatures.validate(object, signature);
    }).not.toThrow();

  });

  it ('One of the functions doesn\'t match', function() {
    var signature = {
      fieldOne: true,
      fieldTwo: 10,
      fieldThree: 3.14,
      fieldFour: [],
      callbacks: {
        onConnect: function() {},
        onDisconnect: function(err) {},
        onData: function(data, err) {},
        onCustomize: function(field, options, data) {}
      }
    };

    var object = {
      fieldOne: false,
      fieldTwo: 0,
      fieldThree: 21.9,
      fieldFour: [],
      callbacks: {
        onConnect: function(param1) {},
        onDisconnect: function(err) {},
        onData: function(data, err) {},
        onCustomize: function(field, options, data) {}
      }
    };

    expect(function() {
      signatures.validate(object, signature);
    }).toThrow();

  });
});
