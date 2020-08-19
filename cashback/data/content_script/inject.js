document.addEventListener("click", function (e) {
  chrome.runtime.sendMessage({
    "message": "click",
    "path": 'page-to-background',
    "data": {"button": e.button, "trusted": e.isTrusted}
  }, function () {});
});

document.addEventListener("mousedown", function (e) {
  chrome.runtime.sendMessage({
    "message": "click",
    "path": 'page-to-background',
    "data": {"button": e.button, "trusted": e.isTrusted}
  }, function () {});
});

chrome.runtime.sendMessage({"data": null, "message": "refresh", "path": 'page-to-background'}, function () {});
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {if (request === 'referer') sendResponse(document.referrer)});

if (window === window.top) {
  if (document.referrer !== document.location.href) {
    chrome.runtime.sendMessage({"data": {"referrer": document.referrer, "href": document.location.href}, "message": "referrer", "path": 'page-to-background'}, function () {});
  }
}
