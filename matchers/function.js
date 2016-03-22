var typecodes = require('./typecodes');

module.exports = {
  getTypeCode: function() {
    return typecodes.FUNCTION;
  },

  isTypeMatch: function(objectToTest) {
    // duck typing function.
    // test for these functions.
    if (objectToTest.apply && objectToTest.call && objectToTest.bind) {
      return true;
    }

    return false;
  }
};
