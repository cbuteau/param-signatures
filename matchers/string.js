var typecodes = require('./typecodes');

module.exports = {
  getTypeCode: function() {
    return typecodes.STRING;
  },

  isTypeMatch: function(objectToTest) {
    if (objectToTest instanceof String) {
      return true;
    }

    // duck typing String.
    if (objectToTest.length && objectToTest.indexOf && objectToTest.toLowerCase && objectToTest.toUpperCase) {
      return true;
    }

    return false;
  }
};
