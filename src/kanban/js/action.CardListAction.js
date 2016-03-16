var CardListAction = {
    action: function(actionType, cardList, board) {
        switch (actionType) {
            case 'addCardList':
            cardList.render(board.$dom);
            board.cardLists.push(cardList);
            board.renderAddCardListBtn();
            cardList.editTitle();
            break;
            
            case 'editTitle':
            cardList.title = cardList.$title.text();
            break;

            default:
        }
        GmailKanban.currentBoard.save();
    }
}

module.exports = CardListAction;
