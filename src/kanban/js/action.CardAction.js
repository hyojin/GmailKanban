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
            break;
            
            case 'removeCard':
            card.$dom.remove();
            cardList.removeCardFromCards(card);
            break;

            default:
        }
        GmailKanban.currentBoard.save();
    }
}

module.exports = CardAction;
