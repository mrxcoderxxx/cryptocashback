var option = {};

option.firefox = navigator.userAgent.toLowerCase().indexOf('firefox') !== -1;

option.store = function (id, value) {
  var tmp = {};
  tmp[id] = value;
  chrome.storage.local.set(tmp, function () {});
};

option.whitelist = function () {
  chrome.storage.local.get(null, function (o) {
    var count = 1;
    var tbody = document.getElementById("whitelist");
    var WHITELIST = ("whitelist" in o) ? o["whitelist"] : {};
    /*  */
    tbody.textContent = '';
    for (var id in WHITELIST) {
      var item = document.createElement('tr');
      var close = document.createElement('td');
      var number = document.createElement('td');
      var whitelist = document.createElement('td');
      /*  */
      close.setAttribute('type', 'close');
      number.setAttribute('type', 'number');
      whitelist.setAttribute('type', 'whitelist');
      /*  */
      number.textContent = count;
      whitelist.textContent = id;
      /*  */
      close.setAttribute('whitelist', whitelist.textContent);
      close.addEventListener("click", function (e) {
        delete WHITELIST[e.target.getAttribute("whitelist")];
        chrome.storage.local.set({"whitelist": WHITELIST}, function () {});
      });
      /*  */
      item.appendChild(number);
      item.appendChild(whitelist);
      item.appendChild(close);
      tbody.appendChild(item);
      /*  */
      count++;
    }
  });
};

option.init = function () {
  option.whitelist();
  /*  */
  var log = document.getElementById("log");
  var delay = document.getElementById("delay");
  var reload = document.getElementById("reload");
  var middle = document.getElementById("middle");
  var support = document.getElementById("support");
  var noopener = document.getElementById("noopener");
  var closedopener = document.getElementById("closedopener");
  var notifications = document.getElementById("notifications");
  /*  */
  window.removeEventListener('load', option.init, false);
  reload.addEventListener("click", function () {document.location.reload()});
  /*  */
  chrome.storage.local.get(null, function (o) {
    log.checked = ("log" in o) ? o["log"] : false;
    delay.value = ("delay" in o) ? o["delay"] : 10;
    middle.checked = ("middle" in o) ? o["middle"] : true;
    noopener.checked = ("noopener" in o) ? o["noopener"] : false;
    closedopener.checked = ("closedopener" in o) ? o["closedopener"] : false;
    notifications.checked = ("notifications" in o) ? o["notifications"] : false;
    support.checked = ("support" in o) ? o["support"] : (option.firefox ? false : true);
    /*  */
    log.addEventListener("click", function (e) {option.store("log", e.target.checked)});
    delay.addEventListener("change", function (e) {option.store("delay", e.target.value)});
    middle.addEventListener("click", function (e) {option.store("middle", e.target.checked)});
    support.addEventListener("click", function (e) {option.store("support", e.target.checked)});
    noopener.addEventListener("click", function (e) {option.store("noopener", e.target.checked)});
    closedopener.addEventListener("click", function (e) {option.store("closedopener", e.target.checked)});
    notifications.addEventListener("click", function (e) {option.store("notifications", e.target.checked)});
  });
};
/*  */
window.addEventListener('load', option.init, false);
chrome.storage.onChanged.addListener(option.whitelist);
