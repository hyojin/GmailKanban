var $ = jQuery = require('jquery');
var CardList = require('./component.CardList');
var AddCardListBtn = require('./component.AddCardListBtn');
var ConsoleLog = require('./util.ConsoleLog');

var Board = function (cardLists, $dom) {
    cardLists == null? cardLists = [{title: 'TODO', cards:[]}] : cardLists = cardLists;
    this.$dom = $dom;
    this.init(cardLists);
};

Board.prototype.init = function(cardLists) {
    this.cardLists = [];
    for (var i = 0; i < cardLists.length; i++) {
        this.cardLists.push(new CardList(this, cardLists[i].title, cardLists[i].cards));
    }
    this.addCardListBtn = new AddCardListBtn(this);
    this.render();
    this.cardSortable();
};

Board.prototype.render = function() {
    for (var i = 0; i < this.cardLists.length; i++) {
        this.cardLists[i].render(this.$dom);
    }
    this.renderAddCardListBtn();
};

Board.prototype.renderAddCardListBtn = function() {
    this.addCardListBtn.render();
};

Board.prototype.addCardFromGmail = function(cardInfo) {
    if (!this.cardLists.length > 0) ConsoleLog.log('this.cardLists.length <= 0');
    this.cardLists[0].addCard(cardInfo);
};

Board.prototype.removeCardList = function(cardList) {
    for (var i = 0; i < this.cardLists.length; i++) {
        if (cardList === this.cardLists[i]) {
            this.cardLists.splice(i, 1);
            break;
        }
    }
};

Board.prototype.cardSortable = function() {
    $('.sortable').sortable({
        placeholder: 'sortable-placeholder kanban-card',
        connectWith: '.connectSortable',
        tolerance: 'pointer',
        start: function(e, ui) {
            ui.placeholder.css('height', ui.helper.height() + 20);
        },
        update: function(e, ui) {
            ConsoleLog.log(e);
            ConsoleLog.log(ui);
            var index = ui.item.index();
            $(ui.item).trigger('cardMoved', [index]);
        }
    });
};

Board.prototype.save = function() {
    GmailKanban.store.saveBoard(this.toJson());
};

Board.prototype.toJson = function() {
    var board = {
        cardLists: []
    };
    for (var i = 0; i < this.cardLists.length; i++) {
        board.cardLists.push(this.cardLists[i].toJson());
    }
    return board;
};

module.exports = Board;
