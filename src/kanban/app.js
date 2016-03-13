var $ = jQuery = require('jquery');
require('jquery-ui');

var Board = require('./js/component.Board');
var CardList = require('./js/component.CardList');
var Card = require('./js/component.Card');
var Store = require('./js/store.LocalStorage');

console.log($);
console.log(window);

window.addEventListener('load', function() {
    console.log('loaded');
    KanbanInit();
    var event = document.createEvent('HTMLEvents');
    var wrapper = document.getElementsByClassName('wrapper');
    event.initEvent('focus', true, true);
    wrapper[0].dispatchEvent(event);
});

window.addEventListener('focus', function() {
    console.log('focused');
    KanbanFocused();
});

var GmailKanban = GmailKanban || {
    board: {},
    store: {}
};
window.GmailKanban = GmailKanban;

var KanbanInit = function() {
    var cardInfo = {
        label: 'Min Height setu',
        gmailTitle: 'mail for test!!!',
        gmailLink: 'https://mail.google.com/mail/u/0/#inbox'
    };
    var cardTest = new Card(cardInfo);
    var cardArray = [cardTest];
    var cardList = new CardList('task list', cardArray);
    var cardListArray = [cardList];
    var board = new Board(cardListArray, $('#board'));
    var store = new Store();
    GmailKanban.board = board;
    GmailKanban.store = store;
};

var KanbanFocused = function() {
    var addedCard = GmailKanban.store.getRecentlyAdded();
    if (!addedCard) return;
    var card = new Card(addedCard);
    GmailKanban.board.addCardFromGmail(card);
};
