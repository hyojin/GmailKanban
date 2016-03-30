var openBoardFromPopup = function() {
    chrome.runtime.sendMessage({cmd: 'openBoard'}, function(response) {});
};

window.onload = function() {
    document.getElementById('board-button').onclick = openBoardFromPopup;
}
