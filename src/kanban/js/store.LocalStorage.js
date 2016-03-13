var LocalStorage = function() {};

LocalStorage.prototype.getRecentlyAdded = function() {
    if (!localStorage.addedCardFromGmail) return false;
    var addedCard = JSON.parse(localStorage.addedCardFromGmail);
    localStorage.removeItem('addedCardFromGmail');
    return addedCard;
}

module.exports = LocalStorage;
