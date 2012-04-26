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
	chrome.extension.sendRequest({method: "getLocalStorage", value: "enable_djadvances"}, function(response) {
		if(response.value == "true") {
			var eventData = document.getElementById('lpDjAdvanceEventDiv').innerText;
			var data = JSON.parse(eventData);
			chrome.extension.sendRequest({avatar: 'http://www.plug.dj/images/avatars/thumbs/' + data.avatar + '.png', title: data.username + ' ' + chrome.i18n.getMessage("NOTIFICATION_ISNOWPLAYING"), message: data.song + " <b>(" + secondsToString(decodeURIComponent(data.duration)) + ")</b>"});
		}
	});
});
document.getElementById('lpMessageEventDiv').addEventListener('lpMessageEvent', function() {
	var eventData = document.getElementById('lpMessageEventDiv').innerText;
	var data = JSON.parse(eventData);
	
	chrome.extension.sendRequest({method: "getLocalStorage", value: "enable_mentions"}, function(response) {
		if(response.value == "true") {
			if(data.bit == "1") {
				chrome.extension.sendRequest({avatar: 'http://www.plug.dj/images/avatars/thumbs/' + data.avatar + '.png', title: chrome.i18n.getMessage("NOTIFICATION_MENTIONED"), message: "<b>" + data.from + " " + chrome.i18n.getMessage("GENERAL_SAYS") + ":</b> " + data.message});
			}
		}
	});
	chrome.extension.sendRequest({method: "getLocalStorage", value: "enable_chatmessages"}, function(response) {
		if(response.value == "true") {
			if(data.bit == "0") {
				chrome.extension.sendRequest({avatar: 'http://www.plug.dj/images/avatars/thumbs/' + data.avatar + '.png', title: "Someone wrote a message on plug.dj!", message: "<b>" + data.from + " " + chrome.i18n.getMessage("GENERAL_SAYS") + ":</b> " + data.message});
			}
		}
	});
});
document.getElementById('lpUserFanEventDiv').addEventListener('lpUserFanEvent', function() {
	chrome.extension.sendRequest({method: "getLocalStorage", value: "enable_fans"}, function(response) {
		if(response.value == "true") {
			var eventData = document.getElementById('lpUserFanEventDiv').innerText;
			var data = JSON.parse(eventData);
			chrome.extension.sendRequest({avatar: 'http://www.plug.dj/images/avatars/thumbs/' + data.avatar + '.png', title: chrome.i18n.getMessage("NOTIFICATION_FANNED"), message: "<b>" + data.from + "</b> " + chrome.i18n.getMessage("NOTIFICATION_ISNOWYOURFAN") + "!"});
		}
	});
});

function secondsToString(seconds) {
	var numdays = Math.floor(seconds / 86400);
	var numhours = Math.floor((seconds % 86400) / 3600);
	var numminutes = Math.floor(((seconds % 86400) % 3600) / 60);
	var numseconds = ((seconds % 86400) % 3600) % 60;
	if(numdays > 0) {
		return ">1 day"
	} else {
		if(numhours > 0) {
			return ">" + numhours + " hours"
		} else {
			if(numminutes > 9) {
				if(numseconds > 9) {
					return numminutes + ":" + numseconds
				} else {
					return numminutes + ":0" + numseconds
				}
			} else {
				if(numseconds > 9) {
					return "0" + numminutes + ":" + numseconds
				} else {
					return "0" + numminutes + ":0" + numseconds
				}
			}
		}
	}
}