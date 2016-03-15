
var SEP_BAR = '\n==========================\n';

function trapAndLog(func) {
  try {
    func();
  }
  catch (e) {
    console.log('message\n');
    console.log(e);
    console.log('stack\n');
    console.log(e.stack);
  }
}

console.log('before require');
var signatures = require('./main');
console.log(signatures);
console.log('after require');

var signature = {
  fieldOne: true,
  fieldTwo: 10,
  fieldThree: 3.14,
  fieldFour: function () {},
  fieldFive: function(data){},
  fieldSix: function(params, options) {},
  fieldSeven: function(params, options, suboptions) {},
};

var testOptions = {
  extra_logging: true,
  props: true,
  detail: false,
};

trapAndLog(function() {
  console.log(SEP_BAR);
  console.log('test one');
  console.log(SEP_BAR);
  signatures.validate({}, signature, testOptions);
});


var obj1 = {
  fieldOne: 0,
  fieldTwo: false,
};

trapAndLog(function(){
  console.log(SEP_BAR);
  console.log('test two');
  console.log(SEP_BAR);
  signatures.validate(obj1, signature, testOptions);
});

// TEST THREE

var obj2 = {
  fieldOne: 0,
  fieldTwo: false,
  fieldThree: 21.9,
  fieldFour: function(one,two,three) {},
  fieldFive: function(data){},
  fieldSix: function(params, options) {},
};

trapAndLog(function(){
  console.log(SEP_BAR);
  console.log('test three');
  console.log(SEP_BAR);
  signatures.validate(obj2, signature, testOptions);
});

// TEST FOUR

var obj3 = {
  fieldOne: false,
  fieldTwo: 0,
  fieldThree: 21.9,
  fieldFour: function() {},
  fieldFive: function(data){},
  fieldSix: function(params, options) {},
  fieldSeven: function(params, options, suboptions) {},
};

trapAndLog(function(){
  console.log(SEP_BAR);
  console.log('test four');
  console.log(SEP_BAR);
  signatures.validate(obj3, signature, testOptions);
});
