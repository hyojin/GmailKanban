var $ = jQuery = require('jquery');
var Card = require('./component.Card');
var CardAction = require('./action.CardAction');

var CardList = function(title, cards) {
    this.title = title;
    cards == null? cards = [] : cards = cards;
    this.init(cards);
};

CardList.prototype.init = function(cards) {
    this.cards = [];
    for (i = 0; i < cards.length; i++) {
        this.cards.push(new Card(this, cards[i]));
    }
};

CardList.prototype.render = function($parentDom) {
    var $html = $(this.html());
    this.$cardListBody = $html.find('.card-list-body')
    console.log($html);
    for (var i = 0; i < this.cards.length; i++) {
        this.cards[i].render(this.$cardListBody);
        console.log($html);
    }
    $parentDom.append($html);
};

CardList.prototype.html = function() {
    return '<div class="card-list-wrapper">' +
        '<div class="mui-panel card-list">' +
            '<div class="card-list-header">' +
                '<div class="card-list-title-area">' +
                    '<span class="card-list-title noselect">' + this.title + '</span>' +
                '</div>' +
                '<div class="card-list-button-area">' +
                    '<button class="mui-btn mui-btn--small mui-btn--primary mui-btn--flat">Add Card</button>' +
                '</div>' +
            '</div>' +
            '<div class="mui-divider"></div>' +
            '<div class="card-list-body">' +
        '</div>' +
    '</div>';
};

CardList.prototype.addCard = function(cardInfo) {
    var card = new Card(this, cardInfo);
    CardAction.action('addCard', card, this);
};

CardList.prototype.removeCardFromCards = function(card) {
    for (var i = 0; i < this.cards.length; i++) {
        if (card === this.cards[i]) {
            this.cards.splice(i, 1);
            break;
        }
    }
};

CardList.prototype.toJson = function() {
    var cardList = {
        title: this.title,
        cards: []
    };
    for (var i = 0; i < this.cards.length; i++) {
        cardList.cards.push(this.cards[i].toJson());
    }
    return cardList;
};

module.exports = CardList;
