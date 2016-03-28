
var typecodes = require('./typecodes');

module.internals = {
  matchers:[],
  isInitialized: false,
  loadMatchers: function loadMatchers() {
    var und = require('./undefined');
    var nil = require('./null');
    var obj = require('./object');
    var bool = require('./boolean');
    var func = require('./function');
    var str = require('./string');
    var num = require('./number');
    var date = require('./date');
    var arr = require('./array');

    module.internals.matchers.push(nil);
    module.internals.matchers.push(und);
    module.internals.matchers.push(bool);
    module.internals.matchers.push(func);
    module.internals.matchers.push(date);
    module.internals.matchers.push(num);
    module.internals.matchers.push(str);
    module.internals.matchers.push(arr);
    module.internals.matchers.push(obj);
  },
  initialize: function() {
    if (!module.internals.isInitialized) {
      module.internals.loadMatchers();
      module.internals.isInitialized = true;
    }
  }
};

module.exports = {
  findMatcher: function findMatcher(testObject) {
    module.internals.initialize();
    for (var idx = 0; idx < module.internals.matchers.length; idx++)
    {
      var matcher = module.internals.matchers[idx];
      if (matcher.isTypeMatch(testObject)) {
        return matcher;
      }
    }

    // we could hit this line if we allow custom matchers.
    // for now we will disable looking for it.
    /* istanbul ignore next: never hit this line but this code is written properly. */ return null;
  },

  getTypeCode: function getTypeCode(testObject) {
    module.internals.initialize();
    var matcher = module.exports.findMatcher(testObject);
    return matcher.getTypeCode();
  },

  typeCodeToString: function typeCodeToString(typeCode) {
    /* istanbul ignore else */
    if (typecodes.STRING === typeCode) {
      return 'String';
    }
    else if (typecodes.OBJECT === typeCode) {
      return 'Object';
    }
    else if (typecodes.UNDEFINED === typeCode) {
      return 'Undefined';
    }
    else if (typecodes.NULL === typeCode) {
      return 'NULL';
    }
    else if (typecodes.NUMBER === typeCode) {
      return 'Number';
    }
    else if (typecodes.BOOLEAN === typeCode) {
      return 'Boolean';
    }
    else if (typecodes.FUNCTION === typeCode) {
      return 'Function';
    }
    else if (typecodes.DATE === typeCode) {
      return 'Date';
    }
    else if (typecodes.ARRAY === typeCode) {
      return 'Array';
    }
  },

  TYPECODES: typecodes,
};
