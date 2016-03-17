

var matchers = require('./matchers/all');

var log = emptyLog;

// constants
var INVALID_INDEX = -1;

function totallyEquals(a, b) {
  // i hate you.
  return (a === b);
}

function isNullOrUndefined(objectToTest) {
  if ((objectToTest === null) || (objectToTest === undefined)) {
    return true;
  }

  return false;
}

function validateObjects(obj, sig, errorList, options) {
  //console.log('valid objests options follow');
  //console.log(options);
  if (isNullOrUndefined(obj)) {
    errorList.push('Object is null or undefined');
    return;
  }

  if (isNullOrUndefined(sig)) {
    errorList.push('Signature is null or undefined');
    return;
  }

  var keys = Object.keys(sig);
  var keysObj = Object.keys(obj);

  if (keys.length !== keysObj.length) {
    var mismatchError = 'Objects do not have the same list of properties.';
    errorList.push(mismatchError);
    return;
  }

  //console.log(keys);
  //var sigprops = [];
  for (var idx = 0; idx < keys.length; idx++) {
    var propName = keys[idx];

    if (options.extra_logging) {
      log('BEGIN propName=' + propName);
    }

    var sigProp = sig[propName];
    var objProp = obj[propName];

    //console.log('sig=' + sigProp);
    //console.log('obj=' + objProp);


    var sigType = matchers.getTypeCode(sigProp);
    var objType = matchers.getTypeCode(objProp);

    if (sigType === objType) {
      if (options.props) {
        log('Types match ...' + matchers.typeCodeToString(sigType));
      }
      //console.log('Types match ...' + matchers.typeCodeToString(sigType));
      // types match...custom handlign by type.
      if (sigType === matchers.TYPECODES.OBJECT) {
        validateObjects(sigProp, objProp, errorList, options);
      }
      else if (sigType === matchers.TYPECODES.FUNCTION) {
        //console.log('before valid sigs opts');
        //console.log(options);
        validateFunctionSignatures(propName, sigProp, objProp, errorList, options);
      }
    }
    else {
      var errorType = formatTypeOf(propName, objProp, sigProp, objType, sigType);
      errorList.push(errorType);
    }


    if (options.extra_logging) {
      log('END propName=' + propName);
    }
  }
}

function throwIfErrors(errorList) {
  if (errorList.length > 0) {
    var fullString = '';
    for (var i = 0; i < errorList.length; i++) {
      var err = errorList[i];
      fullString += err + '\n';
    }
    throw new Error(fullString);
  }
}

function formatTypeOf(name, propObj, propSig, typeObj, typeSig) {
  var format = 'Prop \"' + name + '\" is type ' + typeof(propObj);
  format += ' while the signature is ' + typeof(propSig);
  format += ' and we think sig=' + matchers.typeCodeToString(typeSig) + ' obj=' +  matchers.typeCodeToString(typeObj);
  return format;
}

function validateFunctionSignatures(name, propObj, propSig, errorList, options) {

  //console.log('in func sig opts=' + options);
  if (propObj.length === propSig.length) {
    // awesome.
    log('Function parameters length match');
    if (options.props) {
      log('sig.length=' + propSig.length + ' obj.length=' + propObj.length);
    }
  }
  else {
    var funcError = 'Prop \'' + name + '\' has ' + propObj.length + ' parameters while the signature has ' + propSig.length + ' parameters';
    errorList.push(funcError);
  }
}

function emptyLog(data) {
}

function cloneObj(obj) {
  var newobj = {};
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    var prop = keys[i];
    var type = matchers.getTypeCode(sigProp[prop]);
    if (type === matchers.TYPECODES.OBJECT) {

    }
    newobj[prop] = obj[prop];
  }

  return newobj;
}

function getLeftovers(biggerArray, smallerArray) {
  var leftovers = [];
  for (var i = 0; i < biggerArray.length; i++) {
    var val = biggerArray[i];
    if (smallerArray.indexOf(val) === INVALID_INDEX) {
      leftovers.push(val);
    }
  }

  return leftovers;
}

function mergeObjects(obj, sig, options) {
  var typeSig = matchers.getTypeCode(sig);
  var typeObj = matchers.getTypeCode(obj);

  console.log('sig=%d obj=%d', typeSig, typeObj);

  if ((typeSig === matchers.TYPECODES.OBJECT) && (typeObj === matchers.TYPECODES.OBJECT)) {
    var keysSig = Object.keys(sig);
    var keysObj = Object.keys(obj);

    if (keysSig.length > keysObj.length)
    {
      // we add properties to the object.
      var leftovers = getLeftovers(keysSig, keysObj);
      log(leftovers);

      for (var idx = 0; idx < leftovers.length; idx++) {
        var propName = leftovers[idx];
        var type = matchers.getTypeCode(sig[propName]);
        if (type === matchers.TYPECODES.OBJECT) {
            obj[propName] = cloneObj(sig[propName]);
        } else {
          obj[propName] = sig[propName];
        }
      }

      return obj;
    } else if (keysSig.length < keysObj.length) {
      // make a shorter object.
      var newObj = {};
      for (var idx = 0; idx < keysSig.length; idx++) {
        var propName = keysSig[idx];
        var type = matchers.getTypeCode(obj[propName]);
        if (type === matchers.TYPECODES.OBJECT) {
            newObj[propName] = cloneObj(obj[propName]);
        } else {
          newObj[propName] = obj[propName];
        }
      }

      return newObj;
  }

  }

  return obj;
}

var optionsSignature = {
  extra_logging: false,
  props: true,
};

var defaultOptions = {
  extra_logging: false,
  props: false,
};

module.exports = {
  validate: function(obj, sig, options) {
    var errors = [];

    // Dogfooding the mechanism to decide on the options to use.
    //var opts = mergeObjects(options, optionsSignature);
    var optsTemp = module.exports.mergeAndReturn(options, defaultOptions);
    var tempErrors = [];
    validateObjects(options, optionsSignature, tempErrors, defaultOptions);
    var opts = options;
    if (tempErrors.length > 0) {
      opts = defaultOptions;
    }

    //console.log('selected options');
    //console.log(opts);

    if (opts.extra_logging) {
      log = console.log;
    }
    else {
      log = emptyLog;
    }

    validateObjects(obj, sig, errors, opts);
    throwIfErrors(errors);
  },

  tryValidate: function(obj,sig,errors) {
        errors = errors || [];
        validateObjects(obj, sig, errors, defaultOptions);
        //console.log(errors);
        return errors.length == 0;
      },

  mergeAndReturn: function(obj, sig) {
    //return sig;

    // make empty object
    if (isNullOrUndefined(obj)) {
        obj = {};
    }

    if (isNullOrUndefined(sig)) {
        throw new Error('signature cannot be null or undefined');
    }

    var errors = [];
    validateObjects(obj, sig, errors);
    if (errors.length === 0) {
      return obj;
    } else {
      return mergeObjects(obj, sig);
    }
  },

  TYPECODES: matchers.TYPECODES,

  getTypeCode: function(obj) {
    return matchers.getTypeCode(obj);
  }
};
