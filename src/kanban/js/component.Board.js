var CardList = require('./component.CardList');

var Board = function (cardLists, $dom) {
    cardLists == null? cardLists = [{title: 'TODO', cards:[]}] : cardLists = cardLists;
    this.$dom = $dom;
    this.init(cardLists);
};

Board.prototype.init = function(cardLists) {
    this.cardLists = [];
    for (i = 0; i < cardLists.length; i++) {
        this.cardLists.push(new CardList(cardLists[i].title, cardLists[i].cards));
    }
    this.render();
};

Board.prototype.render = function() {
    for (i = 0; i < this.cardLists.length; i++) {
        this.cardLists[i].render(this.$dom);
    }
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
    for (i = 0; i < this.cardLists.length; i++) {
        board.cardLists.push(this.cardLists[i].toJson());
    }
    return board;
};

module.exports = Board;
