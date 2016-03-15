var typecodes = require('./typecodes');

module.exports = {
  getTypeCode: function() {
    return typecodes.ARRAY;
  },

  isTypeMatch: function(objectToTest) {
    // duck typing Array.
    if (objectToTest.length && objectToTest.indexOf && objectToTest.push && objectToTest.slice) {
      return true;
    }

    return false;
  }
};
