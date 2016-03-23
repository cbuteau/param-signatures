
function enquote(str) {
  return '\'' + str + '\'';
}

module.exports = {
  toThrowContains: function(util, customEqualityTesters) {
    return {
      compare: function (actual, expected) {
        var exception;

        try {
          actual();
        } catch (e) {
          exception = e;
        }

        var result = {};

        if (exception) {
          var msg = exception.message;
          if (msg.indexOf(expected) !== -1) {
            result.pass = true;
          } else {
            result.pass = false;
            result.message = enquote(msg) + ' did not contain ' + enquote(expected);
          }
        }

        return result;
      }

    };
  }
};
