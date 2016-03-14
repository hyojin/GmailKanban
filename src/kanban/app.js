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
    currentBoard: {},
    store: {}
};
window.GmailKanban = GmailKanban;

var KanbanInit = function() {
    GmailKanban.store = Store;
    var savedBoard = GmailKanban.store.getBoard();
    if (!savedBoard) {
        board = new Board(null, $('#board'));
    } else {
        board = new Board(savedBoard.cardLists, $('#board'));
    }
    GmailKanban.currentBoard = board;
};

var KanbanFocused = function() {
    var addedCard = GmailKanban.store.getRecentlyAdded();
    if (!addedCard) return;
    var card = new Card(addedCard);
    GmailKanban.currentBoard.addCardFromGmail(card);
};
