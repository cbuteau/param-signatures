var typecodes = require('./typecodes');

module.exports = {
  getTypeCode: function() {
    return typecodes.BOOLEAN;
  },

  isTypeMatch: function(objectToTest) {
    // duck typing Boolean.
    if (objectToTest.valueOf && objectToTest.toString) {
      // use strict equality to prove it is a bool.
      if ((objectToTest === true) ||
        (objectToTest === false)) {
        return true;
      }
    }

    return false;
  }
};
