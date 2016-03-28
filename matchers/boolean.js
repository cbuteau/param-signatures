var typecodes = require('./typecodes');

module.exports = {
  getTypeCode: function() {
    return typecodes.BOOLEAN;
  },

  isTypeMatch: function(objectToTest) {
    // duck typing does not matter just go for 2 strict compares to get it done.
    if ((objectToTest === true) ||
      (objectToTest === false)) {
      return true;
    }

    return false;
  }
};
