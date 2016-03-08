var GmailHelper = function() {};

GmailHelper.prototype.isGmailOpen = function() {
    if (document.getElementsByClassName('iH').length > 0 &&
    document.getElementsByClassName('h7').length > 0) {
        return true;
    }
    return false;
};

GmailHelper.prototype.addKanbanButton = function() {
    var buttonElement = this.getButtonElement();
    buttonElement.addEventListener("click", this.addGmailToKanban);
    document.getElementsByClassName('iH')[0].children[0].appendChild(buttonElement);
};

GmailHelper.prototype.getButtonElement = function() {
    var button = document.createElement('div');
    button.classList.add('T-I');
    button.classList.add('J-J5-Ji');
    button.classList.add('nX');
    button.classList.add('T-I-ax7');
    button.classList.add('T-I-Js-Gs');
    button.classList.add('ar7');
    button.classList.add('T-I-Zf-aw2');
    button.setAttribute('role', 'button');
    button.setAttribute('tabindex', '0');
    button.setAttribute('data-tooltip', 'Add to Kanban');
    button.setAttribute('aria-label', 'Add to Kanban');
    
    var contentWrap = document.createElement('div');
    contentWrap.classList.add('asa');
    
    var buttonContent = document.createElement('div');
    // TODO
    buttonContent.innerText = 'Add to Kanban';
    
    contentWrap.appendChild(buttonContent);
    button.appendChild(contentWrap);
    
    return button;   
};

GmailHelper.prototype.getWrapperElement = function() {
    var wrapper = document.createElement('div');
    wrapper.classList.add('G-Ni');
    wrapper.classList.add('J-J5-Ji');
    return wrapper;
};

GmailHelper.prototype.addGmailToKanban = function() {
    var self = this;
    cMessageController.send({
        cmd: 'addCardFromGmail',
        title: document.getElementsByClassName("hP")[0].innerText
    });
};

var gmailHelper = new GmailHelper();

var CMessageController = function() {};

CMessageController.prototype.listen = function(request, sender, sendResponse) {
    if(request.cmd === 'initialize') {
        if (gmailHelper.isGmailOpen()) {
            gmailHelper.addKanbanButton();
        }
    }
};

CMessageController.prototype.send = function(message, cb) {
    chrome.runtime.sendMessage(message, function(response) {
        if(cb instanceof Function) {
            cb(response);
        }
    });
};

var cMessageController = new CMessageController();

chrome.runtime.onMessage.addListener(cMessageController.listen);
