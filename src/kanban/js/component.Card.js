var $ = jQuery = require('jquery');
var CardAction = require('./action.CardAction');

var Card = function(card) {
    card.label == null ? this.label = '' : this.label = card.label;
    card.gmailTitle == null ? this.gmailTitle = '' : this.gmailTitle = card.gmailTitle;
    card.gmailLink == null ? this.gmailLink = '' : this.gmailLink = card.gmailLink;
};

Card.prototype.render = function($parentDom) {
    var $html = $(this.html());
    this.$label = $html.find('.kanban-card-label')
    $parentDom.append($html);
};

Card.prototype.editLabel = function(text) {
    var self = this;
    self.$label.attr('contentEditable', true);
    self.$label.trigger('focus');
    self.$label.blur(function() {
        self.$label.attr('contentEditable', false);
        CardAction.action('editLabel', self);
    });
};

Card.prototype.remove = function() {
    console.log('remove Called');
};

Card.prototype.html = function() {
    return '<div class="kanban-card mui-panel">' +
        '<div class="card-area">' +
            '<div class="kanban-card-label noselect">' + this.label +'</div>' +
            '<div class="kanban-card-gmail">' +
                '<i class="fa fa-envelope"></i>' +
                '<a href="' + this.gmailLink + '"">' + this.gmailTitle +'</a>' +
            '</div>' +
        '</div>' +
        '<div class="button-area">' +
            '<div class="mui-dropdown">' +
                '<button class="mui-btn card-dropdown-btn" data-mui-toggle="dropdown">' +
                    '<span class="mui-caret"></span>' +
                '</button>' +
                '<ul class="mui-dropdown__menu mui-dropdown__menu--right">' +
                    '<li><a href="#"><i class="fa fa-pencil"></i></a></li>' +
                    '<li><a href="#"><i class="fa fa-trash-o"></i></a></li>' +
                '</ul>' +
            '</div>' +
        '</div>' +
    '</div>';
};

Card.prototype.toJson = function() {
    var card = {
        label: this.label,
        gmailTitle: this.gmailTitle,
        gmailLink: this.gmailLink
    };
    return card;
};

module.exports = Card;
