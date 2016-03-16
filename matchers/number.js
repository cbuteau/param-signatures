var typecodes = require('./typecodes');

module.exports = {
  getTypeCode: function() {
    return typecodes.NUMBER;
  },

  isTypeMatch: function(objectToTest) {
    if (objectToTest instanceof Number) {
      return true;
    }

    // duck typing Boolean.
    if (objectToTest.toString && objectToTest.valueOf && objectToTest.toPrecision) {
      return true;
    }

    return false;
  }
};
