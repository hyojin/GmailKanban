var Board = function (cardLists, dom) {
    cardLists == null? this.cardLists = [] : this.cardLists = cardLists;
    this.dom = dom;
    this.init();
};

Board.prototype.init = function() {
    this.render();
};

Board.prototype.render = function() {
    for (i = 0; i < this.cardLists.length; i++) {
        this.cardLists[i].render(this.dom);
    }
};

Board.prototype.toJson = function() {
    
};

module.exports = Board;
