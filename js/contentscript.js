var s = document.createElement('script');
s.src = chrome.extension.getURL("js/script.js");
document.head.appendChild(s);

function createHiddenDiv(divname) {
	var t = document.createElement('div');
	t.id = divname;
	t.style.cssText = "display:none;";
	document.body.appendChild(t);
}

createHiddenDiv("lpMessageEventDiv")
createHiddenDiv("lpDjAdvanceEventDiv")
createHiddenDiv("lpUserFanEventDiv")

document.getElementById('lpDjAdvanceEventDiv').addEventListener('lpDjAdvanceEvent', function() {
	var eventData = document.getElementById('lpDjAdvanceEventDiv').innerText;
	var data = JSON.parse(eventData);
	chrome.extension.sendRequest({avatar: 'http://www.plug.dj/images/avatars/thumbs/' + data.avatar + '.png', title: data.username + ' ' + chrome.i18n.getMessage("NOTIFICATION_ISNOWPLAYING"), message: data.song});
});
document.getElementById('lpMessageEventDiv').addEventListener('lpMessageEvent', function() {
	var eventData = document.getElementById('lpMessageEventDiv').innerText;
	var data = JSON.parse(eventData);
	chrome.extension.sendRequest({avatar: 'http://www.plug.dj/images/avatars/thumbs/' + data.avatar + '.png', title: chrome.i18n.getMessage("NOTIFICATION_MENTIONED"), message: "<b>" + data.from + " " + chrome.i18n.getMessage("GENERAL_SAYS") + ":</b> " + data.message});
});
document.getElementById('lpUserFanEventDiv').addEventListener('lpUserFanEvent', function() {
	var eventData = document.getElementById('lpUserFanEventDiv').innerText;
	var data = JSON.parse(eventData);
	chrome.extension.sendRequest({avatar: 'http://www.plug.dj/images/avatars/thumbs/' + data.avatar + '.png', title: chrome.i18n.getMessage("NOTIFICATION_FANNED"), message: "<b>" + data.from + "</b> " + chrome.i18n.getMessage("NOTIFICATION_ISNOWYOURFAN") + "!"});
});