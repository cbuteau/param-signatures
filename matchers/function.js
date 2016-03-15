var typecodes = require('./typecodes');

module.exports = {
  getTypeCode: function() {
    return typecodes.FUNCTION;
  },

  isTypeMatch: function(objectToTest) {

    // console.log('Entered function...' + typeof(objectToTest));
    //
    // if (objectToTest.call) {
    //   console.log('call exists');
    // }
    //
    // if (objectToTest.apply) {
    //   console.log('apply exists');
    // }
    //
    // if (objectToTest.bind) {
    //   console.log('bind exists');
    // }

    // duck typing object.
    // tets for these functions.
    if (objectToTest.apply && objectToTest.call && objectToTest.bind) {
      return true;
    }

    return false;
  }
};
