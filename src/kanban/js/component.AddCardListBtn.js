var $ = jQuery = require('jquery');
var CardList = require('./component.CardList');
var CardListAction = require('./action.CardListAction');

var AddCardListBtn = function(parent) {
    this.parent = parent;
};

AddCardListBtn.prototype.render = function() {
    if (this.$dom != null) this.$dom.remove();
    var $html = $(this.html());
    this.bindEvent($html);
    this.$dom = $html;
    this.parent.$dom.append($html);
};

AddCardListBtn.prototype.html = function() {
    return '<div class="card-list-wrapper new-list-btn-wrapper">' +
        '<button class="mui-btn mui-btn--raised new-list-btn">Add New List</button>' +
    '</div>';
};

AddCardListBtn.prototype.bindEvent = function($html) {
    var self = this;
    $html.find('.new-list-btn').click(function() {
        self.addCardList();
    });
};

AddCardListBtn.prototype.addCardList = function() {
    var cardList = new CardList('');
    CardListAction.action('addCardList', cardList, this.parent);
};

module.exports = AddCardListBtn;
