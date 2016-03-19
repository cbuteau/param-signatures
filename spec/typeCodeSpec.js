
var signatures = require('../signatures');

function testOne(param) {

}

describe('typeCodeSpec.js Stability and relibility in type code...', function() {
  it ('null', function() {
    var type = signatures.getTypeCode(null);
    expect(type).toBe(signatures.TYPECODES.NULL);
  });

  it ('undefined', function() {
    var thing;
    var type = signatures.getTypeCode(thing);
    expect(type).toBe(signatures.TYPECODES.UNDEFINED);
  });

  it ('object', function() {
    var type = signatures.getTypeCode({});
    expect(type).toBe(signatures.TYPECODES.OBJECT);

    var type = signatures.getTypeCode({ fieldOne: true, fieldTwo: 3.14 });
    expect(type).toBe(signatures.TYPECODES.OBJECT);
  });

  it ('number', function() {
    var type = signatures.getTypeCode(10);
    expect(type).toBe(signatures.TYPECODES.NUMBER);

    var type = signatures.getTypeCode(3.145967);
    expect(type).toBe(signatures.TYPECODES.NUMBER);
  });

  it ('boolean', function() {
    var type = signatures.getTypeCode(true);
    expect(type).toBe(signatures.TYPECODES.BOOLEAN);

    var type = signatures.getTypeCode(false);
    expect(type).toBe(signatures.TYPECODES.BOOLEAN);
  });

  it ('array', function() {
    var type = signatures.getTypeCode([]);
    expect(type).toBe(signatures.TYPECODES.ARRAY);

    var type = signatures.getTypeCode([true, false, true]);
    expect(type).toBe(signatures.TYPECODES.ARRAY);
  });

  it ('function', function() {
    var type = signatures.getTypeCode(testOne);
    expect(type).toBe(signatures.TYPECODES.FUNCTION);

    var type = signatures.getTypeCode(function () {});
    expect(type).toBe(signatures.TYPECODES.FUNCTION);
  });


});
