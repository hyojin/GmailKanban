var Card = function(card) {
    this.label = card.label;
    this.gmailTitle = card.gmailTitle;
    this.gmailLink = card.gmailLink;
};

Card.prototype.render = function(parentDom) {
    return '<div>test</div>';
};

Card.prototype.modifyName = function() {
    console.log('modifyName Called');
};

Card.prototype.destory = function() {
    console.log('destory Called');
};

Card.prototype.html = function() {
    return '<div class="kanban-card mui-panel">' +
        '<div class="card-area">' +
            '<div class="kaban-card-label">' + this.label +'</div>'
            '<div class="kaban-card-gmail">' +
                '<i class="fa fa-envelope"></i>' +
                '<a href="' + this.gmailLink + '>' + this.gmailTitle +'</a>' +
            '</div>' +
        '</div>' +
        '<div class="button-area">' +
            '<i class="fa fa-pencil"></i>' +
            '<i class="fa fa-trash-o"></i>' +
        '</div>' +
    '</div>';
};

module.exports = Card;
