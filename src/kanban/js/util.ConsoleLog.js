var DEV_MODE = true;

var ConsoleLog = {
    log: function(log) {
        if (DEV_MODE === true) console.log(log);
    }
}

module.exports = ConsoleLog;
