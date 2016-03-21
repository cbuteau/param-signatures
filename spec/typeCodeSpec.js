
var signatures = require('../signatures');

function testOne(param) {

}

describe('typeCodeSpec.js Stability and relibility in type code...', function() {

  describe('type codes', function() {
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

    it ('date', function() {
      var type = signatures.getTypeCode(new Date(Date.now()));
      expect(type).toBe(signatures.TYPECODES.DATE);
    });

    it ('function', function() {
      var type = signatures.getTypeCode(testOne);
      expect(type).toBe(signatures.TYPECODES.FUNCTION);

      var type = signatures.getTypeCode(function () {});
      expect(type).toBe(signatures.TYPECODES.FUNCTION);
    });
  });

  describe('Type strings', function() {
    it ('null string', function() {
      var typeString = signatures.typeCodeToString(signatures.getTypeCode(null));
      expect(typeString).toBe('NULL');
    });

    it ('undefined string', function() {
      var testUndef;
      var typeString = signatures.typeCodeToString(signatures.getTypeCode(testUndef));
      expect(typeString).toBe('Undefined');
    });

    it ('number string', function() {
      var testNum = 10;
      var typeString = signatures.typeCodeToString(signatures.getTypeCode(testNum));
      expect(typeString).toBe('Number');
    });

    it ('array string', function() {
      var testArray = [10,20,30];
      var typeString = signatures.typeCodeToString(signatures.getTypeCode(testArray));
      expect(typeString).toBe('Array');
    });

    it ('boolean string', function() {
      var testBool = false;
      var typeString = signatures.typeCodeToString(signatures.getTypeCode(testBool));
      expect(typeString).toBe('Boolean');
    });

    it ('date string', function() {
      var testDate = new Date(Date.now());
      var typeString = signatures.typeCodeToString(signatures.getTypeCode(testDate));
      expect(typeString).toBe('Date');
    });


    it ('function string', function() {
      var testFun = function() {};
      var typeString = signatures.typeCodeToString(signatures.getTypeCode(testFun));
      expect(typeString).toBe('Function');
    });
  });
});
