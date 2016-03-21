
var signatures = require('../signatures');

describe('Tests for single types...', function() {
  it ('boolean', function() {
    var sig = false;
    var obj = true;

    expect(function() {
      signatures.validate(sig, obj);
    }).not.toThrow();
  });

  it ('boolean mismatch', function() {
    var sig = false;
    var obj = 10;

    expect(function() {
      signatures.validate(sig, obj);
    }).toThrow();
  });

  it ('number', function() {
    var sig = 100;
    var obj = 3.14;

    expect(function() {
      signatures.validate(sig, obj);
    }).not.toThrow();
  });

  it ('number mismatch', function() {
    var sig = 100;
    var obj = '10';

    expect(function() {
      signatures.validate(sig, obj);
    }).toThrow();
  });

  it ('string', function() {
    var sig = '';
    var obj = 'The quick brown fox...';

    expect(function() {
      signatures.validate(sig, obj);
    }).not.toThrow();
  });

  it ('string mismatch', function() {
    var sig = '';
    var obj = Math.PI;

    expect(function() {
      signatures.validate(sig, obj);
    }).toThrow();
  });


  it ('date', function() {
    var sig = new Date();
    var obj = new Date(12,11,1971);

    expect(function() {
      signatures.validate(sig, obj);
    }).not.toThrow();
  });

  it ('date mismatch', function() {
    var sig = new Date();
    var obj = 'new Date(12,11,1971)';

    expect(function() {
      signatures.validate(sig, obj);
    }).toThrow();
  });


  it ('function', function() {
    var sig = function() {};
    var obj = function() {
      console.log('Entered');
    };

    expect(function() {
      signatures.validate(sig, obj);
    }).not.toThrow();
  });

  it ('function mismatch', function() {
    var sig = function() {};
    var obj = 'new Date(12,11,1971)';

    expect(function() {
      signatures.validate(sig, obj);
    }).toThrow();
  });


});
