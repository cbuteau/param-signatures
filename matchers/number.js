var typecodes = require('./typecodes');

module.exports = {
  getTypeCode: function() {
    return typecodes.NUMBER;
  },

  isTypeMatch: function(objectToTest) {
    // duck typing Number.
    if (objectToTest.toString && objectToTest.valueOf && objectToTest.toPrecision) {
      return true;
    }

    return false;
  }
};
