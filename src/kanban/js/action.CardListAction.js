var CardListAction = {
    action: function(actionType, cardList, board) {
        switch (actionType) {
            case 'addCardList':
            cardList.render(board.$dom);
            board.cardLists.push(cardList);
            board.renderAddCardListBtn();
            board.cardSortable();
            cardList.editTitle();
            break;
            
            case 'editTitle':
            cardList.title = cardList.$title.text();
            break;

            case 'removeCardList':
            cardList.$dom.remove();
            board.removeCardList(cardList);
            break;

            default:
        }
        GmailKanban.currentBoard.save();
    }
}

module.exports = CardListAction;
