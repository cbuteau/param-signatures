
var signatures = require('../');

describe('mergeSpec.js merge exercises...', function() {
  it('merges easily', function() {
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
      fieldFour: function () {},
    };

    var object = {
      fieldOne: false,
      fieldTwo: 0,
      fieldThree: 21.9,
      fieldFour: function() {},
      fieldFive: function(data){},
      fieldSix: function(params, options) {},
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
      fieldFour: function () {},
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
      fieldFour: function() {},
      fieldFive: function(data){},
      fieldSix: function(params, options) {},
    };

    var newobj = signatures.mergeAndReturn(object, signature);

    expect(newobj).not.toBeNull();

    var keys = Object.keys(newobj);
    expect(keys.length).toBe(5);

    var keysSub = Object.keys(newobj.fieldSeven);
    expect(keysSub.length).toBe(3);


  });

});
