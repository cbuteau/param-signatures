
var jasmine = require('jasmine');

jasmine.configureDefaultReporter({
    onComplete: function(passed) {
        if(passed) {
            exit(0);
        }
        else {
            exit(1);
        }
    },
    timer: new this.jasmine.Timer(),
    print: function() {
        process.stdout.write(util.format.apply(this, arguments));
    },
    showColors: true,
    jasmineCorePath: this.jasmineCorePath
});

jasmine.execute();
