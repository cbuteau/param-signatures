var typecodes = require('./typecodes');

module.exports = {
  getTypeCode: function() {
    return typecodes.STRING;
  },

  isTypeMatch: function(objectToTest) {
    // duck typing String.
    if (objectToTest.trim && objectToTest.indexOf && objectToTest.toLowerCase && objectToTest.toUpperCase) {
      return true;
    }

    return false;
  }
};
