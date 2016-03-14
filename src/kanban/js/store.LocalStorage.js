var LocalStorage = {
    getRecentlyAdded: function() {
        if (!localStorage.addedCardFromGmail) return false;
        var addedCard = JSON.parse(localStorage.addedCardFromGmail);
        localStorage.removeItem('addedCardFromGmail');
        return addedCard;
    },
    saveBoard: function(boardJson) {
        console.log(boardJson);
        localStorage.setItem('defaultBoard', JSON.stringify(boardJson));
    },
    getBoard: function() {
        if (!localStorage.defaultBoard) return false;
        return JSON.parse(localStorage.defaultBoard);
    }
};

module.exports = LocalStorage;
