var CardAction = {
    action: function(actionType, card, cardList, index) {
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

            case 'moveCard':
            card.parent.removeCardFromCards(card);
            card.parent = cardList;
            card.parent.cards.splice(index, 0, card);
            break;

            default:
        }
        GmailKanban.currentBoard.save();
    }
}

module.exports = CardAction;
