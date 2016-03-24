

var matchers = require('./matchers/all');

var log = emptyLog;

// constants
var INVALID_INDEX = -1;

function isNullOrUndefined(objectToTest) {
  if ((objectToTest === null) || (objectToTest === undefined)) {
    return true;
  }

  return false;
}

function validateObjects(obj, sig, errorList, options) {
  // if (isNullOrUndefined(options)) {
  //   console.error('options are null or undefined');
  // }

  // possibly check the typecode for null or undefined...
  if (isNullOrUndefined(obj)) {
    errorList.push('Object is null or undefined');
    return;
  }

  if (isNullOrUndefined(sig)) {
    errorList.push('Signature is null or undefined');
    return;
  }

  var rootSigType = matchers.getTypeCode(sig);
  var rootObjType = matchers.getTypeCode(obj);

  if (rootSigType === rootObjType) {
    // hurray
    if (rootSigType === matchers.TYPECODES.OBJECT) {
      validateObjectProperties('root', obj, sig, errorList, options);
    } else if (rootSigType === matchers.TYPECODES.FUNCTION) {
      validateFunctionSignatures('root', obj, sig, errorList, options);
    }
  } else {
    var errorType = formatTypeOf('root', obj, sig, rootObjType, rootSigType);
    errorList.push(errorType);
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

function validateObjectProperties(name, obj, sig, errorList, options) {
  var keys = Object.keys(sig);
  var keysObj = Object.keys(obj);

  if (keys.length !== keysObj.length) {
    var mismatchError = 'Objects do not have the same list of properties.';
    errorList.push(mismatchError);
    return;
  }

  for (var idx = 0; idx < keys.length; idx++) {
    var propName = keys[idx];

    if (options.enable_logging) {
      log('BEGIN propName=' + propName);
    }

    var sigProp = sig[propName];
    var objProp = obj[propName];

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


    if (options.enable_logging) {
      log('END propName=' + propName);
    }
  }
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
    var val = obj[prop];
    var type = matchers.getTypeCode(val);
    if (type === matchers.TYPECODES.OBJECT) {
      newobj[prop] = cloneObj(val);
    }
    newobj[prop] = val;
  }

  return newobj;
}

function getComparison(objFieldArray, sigFieldArray) {
  var comparison = {
    matches: [],
    missing: [],
    extra: []
  };

  for (var i = 0; i < sigFieldArray.length; i++) {
    var val = sigFieldArray[i];
    if (objFieldArray.indexOf(val) === INVALID_INDEX) {
      comparison.missing.push(val);
    } else {
      comparison.matches.push(val);
    }
  }

  for (var j = 0; j < objFieldArray.length; j++) {
    var valO = objFieldArray[j];
    if (sigFieldArray.indexOf(valO) === INVALID_INDEX) {
      comparison.extra.push(valO);
    }
  }

  return comparison;
}

function mergeObjects(obj, sig, options) {
  var typeSig = matchers.getTypeCode(sig);
  var typeObj = matchers.getTypeCode(obj);

  //console.log('sig=%d obj=%d', typeSig, typeObj);

  if ((typeSig === matchers.TYPECODES.OBJECT) && (typeObj === matchers.TYPECODES.OBJECT)) {
    var keysSig = Object.keys(sig);
    var keysObj = Object.keys(obj);

    var comp = getComparison(keysObj, keysSig);

    // make a new object every time.
    var newObj = {};

    for (var i = 0; i < comp.missing.length; i++) {
      var propName = comp.missing[i];
      var sigData = sig[propName];
      var sigType = matchers.getTypeCode(sigData);
      if (sigType === matchers.TYPECODES.OBJECT) {
        newObj[propName] = cloneObj(sigData);
      } else {
        newObj[propName] = sigData;
      }
    }

    for (var j = 0; j < comp.matches.length; j++) {
        propName = comp.matches[j];
        var objData = obj[propName];

        var objType = matchers.getTypeCode(objData);
        if (objType === matchers.TYPECODES.OBJECT) {
          var sigData = sig[propName];
          newObj[propName] = mergeObjects(objData, sigData, options);
          //newObj[propName] = cloneObj(objData);
        } else {
          newObj[propName] = objData;
        }
    }

    return newObj;
  } else {
    // for now...we will get smarter once testing single types.
    return sig;
  }
}

var optionsSignature = {
  enable_logging: false,
  props: true,
};

var defaultOptions = {
  enable_logging: false,
  props: false,
};

module.exports = {
  validate: function(obj, sig, options) {
    var errors = [];

    // Dogfooding the mechanism to decide on the options to use.
    //var opts = mergeObjects(options, optionsSignature);
    var optsTemp = module.exports.mergeAndReturn(options, defaultOptions);
    var opts = optsTemp;

    if (opts.enable_logging) {
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
        throw new Error('signature/default cannot be null or undefined');
    }

    var errors = [];
    validateObjects(obj, sig, errors, defaultOptions);
    if (errors.length === 0) {
      return obj;
    } else {
      return mergeObjects(obj, sig);
    }
  },

  TYPECODES: matchers.TYPECODES,

  getTypeCode: function(obj) {
    return matchers.getTypeCode(obj);
  },

  typeCodeToString: function(code) {
    return matchers.typeCodeToString(code);
  }
};
