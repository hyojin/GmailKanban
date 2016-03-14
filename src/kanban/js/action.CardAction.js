var CardAction = {
    action: function(actionType, card, cardList) {
        switch (actionType) {
            case 'addCard':
            card.render(cardList.$cardListBody);
            cardList.cards.push(card);
            card.editLabel();
            break;
            
            case 'editLabel':
            card.label = card.$label.text();
            console.log(card);
            break;
            
            default:
        }
        GmailKanban.currentBoard.save();
    }
}

module.exports = CardAction;
