
var signatures = require('../');

describe('mergeSpec.js merge exercises...', function() {
  describe('More complex objects', function() {
    it('merges easily', function() {
      var signature = {
        fieldOne: true,
        fieldTwo: 10,
        fieldThree: 3.14,
        fieldFour: /* istanbul ignore next */ function () {},
        fieldFive:/* istanbul ignore next */ function(data){},
        fieldSix: /* istanbul ignore next */ function(params, options) {},
        fieldSeven: /* istanbul ignore next */ function(params, options, suboptions) {},
      };

      var object = {
        fieldOne: false,
        fieldTwo: 0,
        fieldThree: 21.9,
        fieldFour: /* istanbul ignore next */ function() {},
        fieldFive: /* istanbul ignore next */ function(data){},
        fieldSix: /* istanbul ignore next */ function(params, options) {},
      };

      var newobj = signatures.mergeAndReturn(object, signature);

      expect(newobj).not.toBeNull();

      var keys = Object.keys(newobj);
      expect(keys.length).toBe(7);

      //expect('This test ').toBeNull();


    });

    it ('Merges less than', function() {
      var signature = {
        fieldOne: true,
        fieldTwo: 10,
        fieldThree: 3.14,
        fieldFour: /* istanbul ignore next */ function () {},
      };

      var object = {
        fieldOne: false,
        fieldTwo: 0,
        fieldThree: 21.9,
        fieldFour: /* istanbul ignore next */ function() {},
        fieldFive: /* istanbul ignore next */ function(data){},
        fieldSix: /* istanbul ignore next */ function(params, options) {},
      };

      var newobj = signatures.mergeAndReturn(object, signature);

      expect(newobj).not.toBeNull();

      var keys = Object.keys(newobj);
      expect(keys.length).toBe(4);

    });

    it ('Merge cover missing prop in sig', function() {
      var signature = {
        fieldOne: true,
        fieldTwo: 10,
        fieldThree: 3.14,
        fieldFour: /* istanbul ignore next */ function () {},
        fieldSeven: {
          subFieldOne: true,
          subFieldTwo: 100.001,
          subFieldThree: {
            ReallyDeep: 'Really Deep',
            AndReallyNested: {
              superDeep: 'Troy',
              superNested: 2.71828
            },
          }
        }
      };

      var object = {
        fieldOne: false,
        fieldTwo: 0,
        fieldThree: 21.9,
        fieldFour: /* istanbul ignore next */ function() {},
        fieldFive: /* istanbul ignore next */ function(data){},
        fieldSix: /* istanbul ignore next */ function(params, options) {},
      };

      var newobj = signatures.mergeAndReturn(object, signature);

      expect(newobj).not.toBeNull();

      var keys = Object.keys(newobj);
      expect(keys.length).toBe(5);

      var keysSub = Object.keys(newobj.fieldSeven);
      expect(keysSub.length).toBe(3);


    });

    it ('Merge object missing two big objects on signature', function() {
      var signature = {
        fieldOne: true,
        fieldTwo: 10,
        fieldThree: 3.14,
        fieldFour: /* istanbul ignore next */ function () {},
        fieldSeven: {
          subFieldOne: true,
          subFieldTwo: 100.001,
          subFieldThree: {
            ReallyDeep: 'Really Deep',
            AndReallyNested: {
              superDeep: 'Troy',
              superNested: 2.71828
            },
          }
        },
        fieldEight: {
          subFieldThree: [],
          subFieldFour: '',
          subFieldFive: 13,
        },
        fieldNine: {
          subFieldSix: 1,
          subFieldSeven: '',
          subFieldEight: /* istanbul ignore next */ function() {}
        }
      };

      var object = {
        fieldOne: false,
        fieldTwo: 0,
        fieldThree: 21.9,
        fieldFour: /* istanbul ignore next */ function() {},
        fieldFive: /* istanbul ignore next */ function(data){},
        fieldSix: /* istanbul ignore next */ function(params, options) {},
      };

      var newobj = signatures.mergeAndReturn(object, signature);

      expect(newobj).not.toBeNull();

      var keys = Object.keys(newobj);
      expect(keys.length).toBe(7);

      var keysSub = Object.keys(newobj.fieldSeven);
      expect(keysSub.length).toBe(3);

      var typeCode = signatures.getTypeCode(newobj.fieldEight.subFieldThree);
      expect(typeCode).toBe(signatures.TYPECODES.ARRAY);
      //expect(newobj.fieldEight.subFieldThree).toBe([]);
    });
  });

  describe('Single objects', function() {
    it ('Single bool', function() {
      var signature = false;
      var object = true;

      var newObj = signatures.mergeAndReturn(object, signature);

      expect(newObj).toBe(true);
    });

    it ('Single bool mismatch', function() {
      var signature = false;
      var object = {};

      var newObj = signatures.mergeAndReturn(object, signature);

      expect(newObj).toBe(false);

    });

    it ('Single String', function() {
      var TEST_STRING = 'Hello World!!!';

      var signature = '';
      var object = TEST_STRING;

      var newObj = signatures.mergeAndReturn(object, signature);
      expect(newObj).toBe(TEST_STRING);
    });

    it ('Single String mismatch', function() {
      var PLACEHOLDER_STRING = 'Placeholder signature!!!';

      var signature = PLACEHOLDER_STRING;
      var object = 13;

      var newObj = signatures.mergeAndReturn(object, signature);
      expect(newObj).toBe(PLACEHOLDER_STRING);

    });

    it ('Single number', function() {
      var signature = 10;
      var object = Math.PI;

      var newObj = signatures.mergeAndReturn(object, signature);
      expect(newObj).toBe(Math.PI);

    });

    it ('Single number mismatch', function() {
      var PART_OF_E = 3.14;
      var signature = PART_OF_E;
      var object = [];

      var newObj = signatures.mergeAndReturn(object, signature);
      expect(newObj).toBe(PART_OF_E);

    });

    it ('Single array', function() {
      var TEST_ARRAY = [5,10,15,20];
      var signature = [];
      var object = TEST_ARRAY;

      var newObj = signatures.mergeAndReturn(object, signature);
      expect(newObj).toBe(TEST_ARRAY);

    });

    it ('Single array mismatch', function() {
      var SIG_ARRAY = [2,4,6,8];
      var signature = SIG_ARRAY;
      var object = 'TEST_ARRAY';

      var newObj = signatures.mergeAndReturn(object, signature);
      expect(newObj).toBe(SIG_ARRAY);

    });

    it ('Single function', function() {
      var matchingObjectCalled = false;
      var TEST_PARAM = true;
      var signature = /* istanbul ignore next */ function(param) {};
      var object = function (param) {
        matchingObjectCalled = param;
      };

      var newObj = signatures.mergeAndReturn(object, signature);
      newObj(TEST_PARAM);

      expect(matchingObjectCalled).toBe(TEST_PARAM);
    });

    it ('Single function mismatch', function() {
      var sigFuncCalled = false;
      var TEST_PARAM = Math.PI;
      var signature = function(param) {
        sigFuncCalled = TEST_PARAM;
      };
      var object = /* istanbul ignore next */ function() {
        // function with param count mismatch.
      };

      var newObj = signatures.mergeAndReturn(object, signature);
      newObj(TEST_PARAM);
      expect(sigFuncCalled).toBe(TEST_PARAM);

    });


  });

});
