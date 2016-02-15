var BgInfo = BgInfo || {};
BgInfo.currentTabUrl = '';

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if (changeInfo.status === 'complete' &&
    tab.url.search('https://mail.google.com/mail/') === 0) {
        BgInfo.currentTabUrl = tab.url;
        bgMessageController.send({cmd: 'initilize'});
    }
});

var BgMessageController = function() {};

BgMessageController.prototype.listen = function(request, sender, sendResponse) {
    if(request.cmd === 'addTicketFromGmail') {
        console.log(request);
        console.log(BgInfo.currentTabUrl);
    }
};

BgMessageController.prototype.send = function(message, cb) {
    chrome.tabs.query({active: true}, function(tabs){
        chrome.tabs.sendMessage(tabs[0].id, message, function(response) {
            if(cb instanceof Function) {
                cb(response);
            }
        });  
    });
};

var bgMessageController = new BgMessageController();

chrome.runtime.onMessage.addListener(bgMessageController.listen);
