var typecodes = require('./typecodes');

module.exports = {
  getTypeCode: function() {
    return typecodes.BOOLEAN;
  },

  isTypeMatch: function(objectToTest) {
    // if (objectToTest instanceof Boolean) {
    //   return true;
    // }

    // duck typing Boolean.
    if (objectToTest.valueOf && objectToTest.toString) {
      //console.log('bool sig match true=' + objectToTest === true + ' false=' + objectToTest === false);

      // use strict equality to prove it is a bool.
      if ((objectToTest === true) ||
        (objectToTest === false)) {
        return true;
      }
    }

    return false;
  }
};
