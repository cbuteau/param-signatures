var typecodes = require('./typecodes');

module.exports = {
  getTypeCode: function() {
    return typecodes.NULL;
  },

  isTypeMatch: function(objectToTest) {
    if (objectToTest === null) {
      return true;
    }

    return false;
  }
};
