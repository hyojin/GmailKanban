var $ = jQuery = require('jquery');
var Card = require('./component.Card');
var CardAction = require('./action.CardAction');
var CardListAction = require('./action.CardListAction');

var CardList = function(parent, title, cards) {
    this.parent = parent;
    this.title = title;
    cards == null? cards = [] : cards = cards;
    this.init(cards);
};

CardList.prototype.init = function(cards) {
    this.cards = [];
    for (var i = 0; i < cards.length; i++) {
        this.cards.push(new Card(this, cards[i]));
    }
};

CardList.prototype.render = function($parentDom) {
    var $html = $(this.html());
    this.$dom = $html;
    this.$title = $html.find('.card-list-title-area');
    this.$cardListBody = $html.find('.card-list-body');
    console.log($html);
    this.bindEvent($html);
    for (var i = 0; i < this.cards.length; i++) {
        this.cards[i].render(this.$cardListBody);
    }
    $parentDom.append($html);
};

CardList.prototype.bindEvent = function($html) {
    var self = this;
    $html.find('.card-list-edit').click(function() {
        self.editTitle();
    });
    $html.find('.card-list-remove').click(function() {
        self.remove();
    });
    self.$title.blur(function() {
        self.$title.attr('contentEditable', false);
        CardListAction.action('editTitle', self);
    });
    self.$title.keydown(function(e) {
        if (e.keyCode === 13) {
            self.$title.trigger('blur');
            return false;
        }
    });
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

CardList.prototype.editTitle = function(text) {
    var self = this;
    self.$title.attr('contentEditable', true);
    self.$title.trigger('focus');
};

CardList.prototype.remove = function() {
    CardListAction.action('removeCardList', this, this.parent);
};

CardList.prototype.html = function() {
    return '<div class="card-list-wrapper">' +
        '<div class="mui-panel card-list">' +
            '<div class="card-list-header">' +
                '<div class="card-list-title-area noselect">' +
                    this.title +
                '</div>' +
                '<div class="card-list-button-area">' +
                    '<button class="mui-btn mui-btn--small mui-btn--flat card-list-edit"><i class="fa fa-pencil"></i></button>' +
                    '<button class="mui-btn mui-btn--small mui-btn--flat card-list-remove"><i class="fa fa-trash-o"></i></button>' +
                '</div>' +
            '</div>' +
            '<div class="mui-divider"></div>' +
            '<div class="card-list-body sortable connectSortable">' +
        '</div>' +
    '</div>';
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
