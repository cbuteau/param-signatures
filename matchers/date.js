var typecodes = require('./typecodes');

module.exports = {
  getTypeCode: function() {
    return typecodes.DATE;
  },

  isTypeMatch: function(objectToTest) {

    //console.log('Entered function...' + typeof(objectToTest));

    // if (objectToTest instanceof Function) {
    //   return true;
    // }

    // duck typing Date.
    // tets for these functions.
    if (objectToTest.getDay && objectToTest.getYear && objectToTest.getMonth && objectToTest.getHours && objectToTest.getMinutes && objectToTest.getSeconds) {
      return true;
    }

    return false;
  }
};
