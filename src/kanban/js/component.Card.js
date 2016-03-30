var $ = jQuery = require('jquery');
var CardAction = require('./action.CardAction');
var ConsoleLog = require('./util.ConsoleLog');

var Card = function(parent, card) {
    this.parent = parent;
    card.label == null ? this.label = '' : this.label = card.label;
    card.gmailTitle == null ? this.gmailTitle = '' : this.gmailTitle = card.gmailTitle;
    card.gmailLink == null ? this.gmailLink = '' : this.gmailLink = card.gmailLink;
};

Card.prototype.render = function($parentDom) {
    var $html = $(this.html());
    this.$label = $html.find('.kanban-card-label');
    this.bindEvent($html);
    this.$dom = $html;
    $parentDom.append($html);
};

Card.prototype.editLabel = function(text) {
    var self = this;
    self.$label.attr('contentEditable', true);
    self.$label.trigger('focus');
};

Card.prototype.bindEvent = function($html) {
    var self = this;
    $html.find('.card-edit').click(function() {
        self.editLabel();
    });
    $html.find('.card-remove').click(function() {
        self.remove();
    });
    $html.find('.gmailLink').click(function() {
        self.openGmailInNewTab(self.gmailLink);
    });
    self.$label.blur(function() {
        self.$label.attr('contentEditable', false);
        CardAction.action('editLabel', self);
    });
    self.$label.keydown(function(e) {
        if (e.keyCode === 13) {
            self.$label.trigger('blur');
            return false;
        }
    });
    $html.on('cardMoved', function(event, index) {
        ConsoleLog.log('cardMoved');
        $html.parent().trigger('cardDropped', [index, self]);
    });
};

Card.prototype.openGmailInNewTab = function(gmailLink) {
    chrome.tabs.create({url: gmailLink}, function(tab) {
    });
};

Card.prototype.remove = function() {
    ConsoleLog.log('remove Called');
    CardAction.action('removeCard', this, this.parent);
};

Card.prototype.html = function() {
    if (this.gmailTitle !== '' && this.gmailLink !== '') {
        return '<div class="kanban-card mui-panel">' +
            '<div class="card-area">' +
                '<div class="kanban-card-label noselect">' + this.label +'</div>' +
                '<div class="kanban-card-gmail">' +
                    '<i class="fa fa-envelope"></i>' +
                    '<a href="#" class="gmailLink">' + this.gmailTitle +'</a>' +
                '</div>' +
            '</div>' +
            '<div class="button-area">' +
                '<div class="mui-dropdown">' +
                    '<button class="mui-btn card-dropdown-btn" data-mui-toggle="dropdown">' +
                        '<span class="mui-caret"></span>' +
                    '</button>' +
                    '<ul class="mui-dropdown__menu mui-dropdown__menu--right">' +
                        '<li><a class="card-edit" href="#"><i class="fa fa-pencil"></i></a></li>' +
                        '<li><a class="card-remove" href="#"><i class="fa fa-trash-o"></i></a></li>' +
                    '</ul>' +
                '</div>' +
            '</div>' +
        '</div>';
    } else {
        return '<div class="kanban-card mui-panel">' +
            '<div class="card-area">' +
                '<div class="kanban-card-label noselect">' + this.label +'</div>' +
            '</div>' +
            '<div class="button-area">' +
                '<div class="mui-dropdown">' +
                    '<button class="mui-btn card-dropdown-btn" data-mui-toggle="dropdown">' +
                        '<span class="mui-caret"></span>' +
                    '</button>' +
                    '<ul class="mui-dropdown__menu mui-dropdown__menu--right">' +
                        '<li><a class="card-edit" href="#"><i class="fa fa-pencil"></i></a></li>' +
                        '<li><a class="card-remove" href="#"><i class="fa fa-trash-o"></i></a></li>' +
                    '</ul>' +
                '</div>' +
            '</div>' +
        '</div>';
    }
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
