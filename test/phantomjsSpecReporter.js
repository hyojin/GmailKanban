(function() {
    
    var consoleLog = function(log) {
        window.callPhantom({
            command: 'message',
            message: log
        });
    };
    
    var PhantomjsSpecReporter = function(runner) {
        Mocha.reporters.Base.call(this, runner);
        var self = this;
        var color = Mocha.reporters.Base.color;
        var n = 0;
        var indents = 0;
        
        function indent() {
            return Array(indents).join('  ');
        }
        
        runner.on('start', function() {
            consoleLog('Testing', window.location.href);
        });
        
        runner.on('suite', function(suite) {
            ++indents;
            consoleLog(color('suite', indent() + suite.title));
        });
        
        runner.on('suite end', function() {
            --indents;
            if (indents === 1) {
                consoleLog('');
            }
        });
        
        runner.on('pending', function(test) {
            var msg = indent() + color('pending', '  - ' + test.title);
            consoleLog(msg);
        });
        
        runner.on("pass", function(test) {
            if ('fast' === test.speed) {
                var msg = indent() +
                color('checkmark', '  ' + Mocha.reporters.Base.symbols.ok) +
                color('pass', ' ' + test.title);
                consoleLog(msg);
            } else {
                var msg = indent() +
                color('checkmark', '  ' + Mocha.reporters.Base.symbols.ok) +
                color('pass', ' ' + test.title);
                color(test.speed + ' (' + test.duration +'ms)');
                consoleLog(msg);
            }
            
        });
        
        runner.on('fail', function(test, err) {
            consoleLog(indent() + color('fail', '  ' + ++n + ') ' + test.title));
        });
        
        runner.on("end", function() {
            var stats = self.stats;
            
            consoleLog('');
            
            var passes = color('bright pass', ' ') +
            color('green', ' ' + stats.passes + ' passing') +
            color('light', ' (' + stats.duration + 'ms)');
            consoleLog(passes);
            
            if (stats.pending) {
                var pending = color('pending', ' ') +
                color('pending', ' ' + stats.pending + ' pending');
                consoleLog(pending);
            }
            
            if (stats.failures) {
                var failures = color('fail', '  ' + stats.failures + ' failing');
                consoleLog(failures);
            }
            
            consoleLog('');
            
            if (window.callPhantom) {
                window.callPhantom({command: 'exit'});
            }
            
        });
    };
    
    mocha.setup({
        ui: 'bdd',
        ignoreLeaks: true,
        reporter: PhantomjsSpecReporter
    });
    
}());