var $ = jQuery = require('jquery');
require('jquery-ui');

var Board = require('./js/component.Board');
var CardList = require('./js/component.CardList');
var Card = require('./js/component.Card');

console.log($);
console.log(window);

window.addEventListener('load', function() {
    console.log('loaded');
    var event = document.createEvent('HTMLEvents');
    // var wrapper = document.getElementsByClassName('input-test');
    // event.initEvent('focus', true, true);
    // wrapper[0].dispatchEvent(event);
    KanbanInit();
});

window.addEventListener('focus', function() {
    console.log('focused');
    // var wrapper = document.getElementsByClassName('input-test');
    wrapper[0].focus();
});

var GmailKanban = GmailKanban || {
    board: {}
};
window.GmailKanban = GmailKanban;

var KanbanInit = function() {
    var cardInfo = {
        label: 'testName',
        gmailTitle: 'mail for test!!!',
        gmailLink: 'https://mail.google.com/mail/u/0/#inbox'
    };
    var cardTest = new Card(cardInfo);
    var cardArray = [cardTest];
    var cardList = new CardList(cardArray);
    var cardListArray = [cardList];
    var board = new Board(cardListArray, $('#board'));
    GmailKanban.board = board;
};
