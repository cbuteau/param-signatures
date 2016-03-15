var typecodes = require('./typecodes');

module.exports = {
  getTypeCode: function() {
    return typecodes.UNDEFINED;
  },

  isTypeMatch: function(objectToTest) {
    if (objectToTest === undefined) {
      return true;
    }

    return false;
  }
};
