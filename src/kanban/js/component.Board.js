var CardList = require('./component.CardList');
var AddCardListBtn = require('./component.AddCardListBtn');

var Board = function (cardLists, $dom) {
    cardLists == null? cardLists = [{title: 'TODO', cards:[]}] : cardLists = cardLists;
    this.$dom = $dom;
    this.init(cardLists);
};

Board.prototype.init = function(cardLists) {
    this.cardLists = [];
    for (var i = 0; i < cardLists.length; i++) {
        this.cardLists.push(new CardList(cardLists[i].title, cardLists[i].cards));
    }
    this.addCardListBtn = new AddCardListBtn(this);
    this.render();
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
    if (!this.cardLists.length > 0) console.log('this.cardLists.length > 0');
    this.cardLists[0].addCard(cardInfo);
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
