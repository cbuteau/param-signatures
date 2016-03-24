
var signatures = require('../');

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

  it ('Super nested objects', function() {
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
      },
      customize: {
        headers: [],
        debugging: {
          level: 0,
          throws: true,
        }
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
      },
      customize: {
        headers: ["Tree", "Modified", "Owned"],
        debugging: {
          level: 0,
          throws: true,
        }
      }
    };

    expect(function() {
      signatures.validate(object, signature);
    }).not.toThrow();

  });

  it ('Merge with depth', function() {
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
      },
      customize: {
        headers: [],
        debugging: {
          level: 0,
          throws: true,
          santa: 'Kris Kringle'
        }
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
      },
      customize: {
        headers: ["Tree", "Modified", "Owned"],
        debugging: {
          level: 0,
          throws: true,
        }
      }
    };

    var newObj = signatures.mergeAndReturn(object, signature);

    expect(newObj.customize.debugging.santa).toBe('Kris Kringle');

  });

});
