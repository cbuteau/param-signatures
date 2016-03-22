
var typecodes = require('./typecodes');

module.exports = {
  getTypeCode: function() {
    return typecodes.OBJECT;
  },

  isTypeMatch: function(objectToTest) {
    // duck typing object.
    // tets for these functions.
    if (objectToTest.isPrototypeOf && objectToTest.hasOwnProperty && objectToTest.toString) {
      return true;
    }

    return false;
  }
};
