
var typecodes = require('./typecodes');

module.exports = {
  getTypeCode: function() {
    return typecodes.OBJECT;
  },

  isTypeMatch: function(objectToTest) {
    // if (objectToTest instanceof Object) {
    //   return true;
    // }

    // duck typing object.
    // tets for these functions.
    if (objectToTest.isPrototypeOf && objectToTest.hasOwnProperty && objectToTest.toString) {
      return true;
    }

    return false;
  }
};
