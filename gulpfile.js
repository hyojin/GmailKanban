var gulp = require('gulp');
var fs = require("fs");
var chromeExtension = require("crx");
var crx = new chromeExtension();

gulp.task('default', function() {
    console.log("test");
    return crx.load('./src')
    .then(function(){
        console.log("test");
        return crx.loadContents();
    })
    .then(function(archiveBuffer){
        console.log(archiveBuffer);
        fs.writeFile('./dist/GmailKanban.zip', archiveBuffer);
        return crx.pack(archiveBuffer);
    })
    .then(function(crxBuffer){
        fs.writeFile('./dist/GmailKanban.crx', crxBuffer);
    });
});