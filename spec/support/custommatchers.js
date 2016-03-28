
/* istanbul ignore next */
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

        /* istanbul ignore else: code is written corectly just not covereed in passing tests */
        if (exception) {
          var msg = exception.message;
          /* istanbul ignore else: code is written correctly just never covered in passing tests. */
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
