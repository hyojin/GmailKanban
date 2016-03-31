var page = require('webpage').create();
var fs = require('fs');

page.open(fs.workingDirectory + '/src/kanban.html', function(status) {  
    if (status !== 'success') {
        console.log('status is failed');
        phantom.exit();
    }
    page.injectJs('../node_modules/mocha/mocha.js');
    page.injectJs('../node_modules/chai/chai.js');
    page.injectJs('phantomjsSpecReporter.js');
    page.injectJs('specs.js');
    page.evaluate(function() {
        window.mocha.run();
    });
});

page.onCallback = function(data) {
    if (data) {
        switch (data.command) {
            case 'message':
            console.log(data.message);
            break;
            
            case 'exit':
            phantom.exit();
            break;
            
            default:
        }
    }
};
