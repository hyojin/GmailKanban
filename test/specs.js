var assert = chai.assert;

describe('initialize', function() {
    describe('board', function () {
        it('should show a default cardlist', function () {
            assert.equal(1, jQuery('.card-list').length);
            assert.equal(1, GmailKanban.currentBoard.cardLists.length);
            assert.equal('TODO', jQuery('.card-list').find('.card-list-title-area').html());
        });
        it('should show the add cardlist button', function () {
            assert.equal(1, jQuery('.new-list-btn').length);
        });
    });
    describe('cardlist', function () {
        it('should have no card in default cardlist ', function () {
            assert.equal(0, jQuery('.kanban-card').length);
        });
    });
});

describe('cardlist', function() {
    describe('new cardlist', function () {
        it('should add a new cardlist when add cardlist button is clicked', function () {
            jQuery('.new-list-btn').click();
            assert.equal(2, jQuery('.card-list').length);
            assert.equal(2, GmailKanban.currentBoard.cardLists.length);
        });
        it('should editmode', function () {
            assert.equal('true',
            jQuery(jQuery('.card-list')[1]).find('.card-list-title-area').prop('contenteditable'));
        });
        it('should have no card', function () {
            assert.equal(0, jQuery(jQuery('.card-list')[1]).find('.kanban-card').length);
            assert.equal(0, GmailKanban.currentBoard.cardLists[1].cards.length);
        });
    });
    describe('edit title', function () {
        it('should change to edit mode when title of cardlist is clicked', function () {
            jQuery(jQuery('.card-list')[0]).find('.card-list-title-area').click();
            assert.equal('true',
            jQuery(jQuery('.card-list')[0]).find('.card-list-title-area').prop('contenteditable'));
        });
        it('should change to view mode when it is blurred', function () {
            jQuery(jQuery('.card-list')[0]).find('.card-list-title-area').blur();
            assert.equal('false',
            jQuery(jQuery('.card-list')[0]).find('.card-list-title-area').prop('contenteditable'));
        });
    });
    describe('add card', function () {
        it('should add a new card when add card button is clicked', function () {
            jQuery(jQuery('.card-list')[1]).find('.card-list-add-card').click();
            assert.equal(1, jQuery(jQuery('.card-list')[1]).find('.kanban-card').length);
            assert.equal(1, GmailKanban.currentBoard.cardLists[1].cards.length);
        });
    });
    describe('remove cardlist', function () {
        it('should remove cardlist when trash button is clicked', function () {
            // dummy function
            window.confirm = function() {
                return true;
            };
            jQuery(jQuery('.card-list')[1]).find('.card-list-remove').click();
            assert.equal(1, jQuery('.card-list').length);
            assert.equal(1, GmailKanban.currentBoard.cardLists.length);
        });
    });
});

describe('card', function() {
    before(function() {
        jQuery('.new-list-btn').click();
    });
    describe('new card with add card button', function () {
        before(function() {
            jQuery(jQuery('.card-list')[1]).find('.card-list-add-card').click();
        });
        it('should editmode', function () {
            assert.equal('true',
            jQuery(jQuery('.card-list')[1]).find('.kanban-card-label').prop('contenteditable'));
        });
        it('should have no gmail link', function () {
            assert.equal(0, jQuery(jQuery('.card-list')[1]).find('.kanban-card-gmail').length);
        });
    });
    describe('edit label', function () {
        it('should change to edit mode when edit card label button is clicked', function () {
            jQuery(jQuery('.card-list')[1]).find('.card-edit').click();
            assert.equal('true',
            jQuery(jQuery('.card-list')[1]).find('.kanban-card-label').prop('contenteditable'));
        });
        it('should change to view mode when it is blurred', function () {
            jQuery(jQuery('.card-list')[1]).find('.kanban-card-label').blur();
            assert.equal('false',
            jQuery(jQuery('.card-list')[1]).find('.kanban-card-label').prop('contenteditable'));
        });
    });
    describe('remove card', function () {
        it('should remove card when trash button is clicked', function () {
            jQuery(jQuery('.card-list')[1]).find('.card-remove').click();
            assert.equal(0, jQuery(jQuery('.card-list')[1]).find('.kanban-card').length);
            assert.equal(0, GmailKanban.currentBoard.cardLists[1].cards.length);
        });
    });
    describe('new card with gmail', function () {
        it('should add card when add card button on gmail is clicked', function () {
            var addedCardFromGmail = {
                gmailTitle: 'title',
                gmailLink: 'senderUrl'
            };
            localStorage.setItem('addedCardFromGmail', JSON.stringify(addedCardFromGmail));
            var addedCard = GmailKanban.store.getRecentlyAdded();
            GmailKanban.currentBoard.addCardFromGmail(addedCard);
            assert.equal(1, jQuery(jQuery('.card-list')[0]).find('.kanban-card').length);
            assert.equal(1, GmailKanban.currentBoard.cardLists[0].cards.length);
        });
        it('should have gmail title and link', function () {
            assert.equal(1, jQuery(jQuery('.card-list')[0]).find('.kanban-card-gmail').length);
        });
    });
    describe('move card', function () {
        before(function() {
            jQuery(jQuery('.card-list')[0]).find('.card-list-add-card').click();
        });
        it('should move the card when it is drag and droped', function () {
            // before
            assert.equal(2, jQuery(jQuery('.card-list')[0]).find('.kanban-card').length);
            assert.equal('title', GmailKanban.currentBoard.cardLists[0].cards[0].gmailTitle);
            assert.equal('', GmailKanban.currentBoard.cardLists[0].cards[1].gmailTitle);
            jQuery(jQuery(jQuery('.card-list')[0]).find('.kanban-card')[0]).trigger('cardMoved', [1]);
            // after
            assert.equal('', GmailKanban.currentBoard.cardLists[0].cards[0].gmailTitle);
            assert.equal('title', GmailKanban.currentBoard.cardLists[0].cards[1].gmailTitle);
        });
    });
});
