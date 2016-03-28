
var typecodes = require('./typecodes');

module.exports = {
  getTypeCode: function() {
    return typecodes.OBJECT;
  },

  isTypeMatch: function(objectToTest) {
    // duck typing object.
    // test for these functions.
    /* istanbul ignore else */
    if (objectToTest.isPrototypeOf && objectToTest.hasOwnProperty && objectToTest.toString) {
      return true;
    }

    // We will probably never hit this line in testing this matcher is last in the list.
    /* istanbul ignore next: probably never hit this line. */ return false;
  }
};
