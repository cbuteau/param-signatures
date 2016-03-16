

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
      var errorType = formatTypeOf(propName, propObj, propSig);
      errorList.push(errorFunc);
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

function formatTypeOf(name, propObj, propSig) {
  var format = 'Prop \'' + name + '\' is type ' + typeof(propObj);
  format += ' while the signature is ' + typeof(propSig);
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
/**
* deprecated instanceof is a fast but vague test of an object's type.
**/
// @ deprecated
function validateProperty(name, propObj, propSig, errorList, options) {
  // we have to match functions first because they are objects too and we want to inspect the function signatures.
  if (propSig instanceof Number) {
    if (propObj instanceof Number) {
      // don't care if its int or float.
      // don't care if they are equal.
      if (options.props) {
        log('Sig and Obj prop \'' + name + '\' are Numbers');
      }
    }
    else {
      var anotherError = formatTypeOf(name, propObj, propSig);
      errorList.push(anotherError);
    }
  }
  else if (propSig instanceof Boolean) {
    if (propObj instanceof Boolean) {
      // cool
      if (options.props) {
        log('Sig and Obj prop \'' + name + '\' are Booleans');
      }
    }
    else {
      var errorAgain = formatTypeOf(name, propObj, propSig);
      errorList.push(errorAgain);
    }
  }
  else if (propSig instanceof Function) {
    if (propObj instanceof Function) {
      if (options.props) {
        log('Sig and Obj prop \'' + name + '\' are Functions');
      }
      validateFunctionSignatures(name, propObj, propSig, errorList, options);
    }
    else {
      var errorFunc = formatTypeOf(name, propObj, propSig);
      errorList.push(errorFunc);
    }
  }
  else if (propSig instanceof Object) {
    if (propObj instanceof Object) {
      // hurrah recurse.
      if (options.props) {
        log('Sig and Obj prop \'' + name + '\' are objects');
      }
      validateObjects(propObj, propSig, errorList);
    }
    else {
      var errorInfo = formatTypeOf(name, propObj, propSig);
      errorList.push(errorInfo);
    }
    // recurse
  }
  else {
    errorList.push('\'' + name + '\' Property types did not match. sig=' + typeof(propSig) + ' obj=' + typeof(propObj));
  }
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

function mergeObjects(sig, obj, options) {
  var typeSig = matchers.getTypeCode(sig);
  var typeObj = matchers.getTypeCode(obj);

  console.log('sig=%d obj=%d', typeSig, typeObj);

  if ((typeSig === matchers.TYPECODES.OBJECT) && (typeObj === matchers.TYPECODES.OBJECT)) {
    var keysSig = Object.keys(sig);
    var keysObj = Object.keys(obj);

    if (keysSig.length > keysObj.length)
    {
      // we add properties to the object.
      var leftovers = keysSig.reduce(function(prev, cur, index, array) {
        return keysObj.indexOf(cur) !== INVALID_INDEX;
      });

      log(leftovers);

      for (var idx = 0; idx < keys.length; idx++) {
        var propName = keys[idx];
        var type = matchers.getTypeCode(sigProp[prop]);
        if (type === matchers.TYPECODES.OBJECT) {
            obj[prop] = cloneObj(sigProp[prop]);
        } else {
          obj[prop] = sigProp[prop];
        }
      }
    }
  } else {

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
        return errors.length == 0;
      },

  mergeAndReturn: function(obj, sig) {
    return sig;
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
