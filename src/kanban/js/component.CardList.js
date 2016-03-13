var $ = jQuery = require('jquery');

var CardList = function(title, cards) {
    this.title = title;
    cards == null? this.cards = [] : this.cards = cards;
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

CardList.prototype.addCard = function(card) {
    card.render(this.$cardListBody);
    this.cards.push(card);
    card.editLabel();
};

module.exports = CardList;
