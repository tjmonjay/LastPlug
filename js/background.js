var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-31054199-1']);
_gaq.push(['_trackPageviews']);
_gaq.push(['_setCustomVar', 1, 'Version', chrome.app.getDetails().version, '3']);
_gaq.push(['_trackEvent', 'LastPlug Stats', 'Loads Into Page', chrome.app.getDetails().version]);
var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
ga.src = 'https://ssl.google-analytics.com/ga.js';
var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);

chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
	
	var notification = webkitNotifications.createHTMLNotification('notification.html?title=' + request.title + '&message=' + request.message + '&avatar=' + request.avatar);
	
	notification.show();
	
	_gaq.push(['_trackEvent', 'LastPlug Stats', 'Notifications Served', chrome.app.getDetails().version]);
	
	_gaq.push(['_trackEvent', 'LastPlug Stats', request.type, chrome.app.getDetails().version]);
	
	
	var notificationTimeout = window.localStorage["notificationTimeout"];
	if(notificationTimeout == undefined) {
		notificationTimeout = 5000;
	}
	
	setTimeout(function() { notification.cancel(); }, notificationTimeout);
	sendResponse({returnMsg: "All good!"});
});
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
	if(tab.url.indexOf('plug.dj') > -1) {
		chrome.pageAction.show(tabId);
	}
});