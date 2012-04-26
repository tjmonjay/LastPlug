var djAdvanceEvent = document.createEvent('Event');
djAdvanceEvent.initEvent('lpDjAdvanceEvent', true, true);
var messageEvent = document.createEvent('Event');
messageEvent.initEvent('lpMessageEvent', true, true);
var userFanEvent = document.createEvent('Event')
userFanEvent.initEvent('lpUserFanEvent', true, true);

function fireLpDjAdvanceEvent(data) {
	hiddenDiv = document.getElementById('lpDjAdvanceEventDiv');	
	hiddenDiv.innerText = data
	hiddenDiv.dispatchEvent(djAdvanceEvent);
}
function fireLpMessageEvent(data) {
	hiddenDiv = document.getElementById('lpMessageEventDiv');
	hiddenDiv.innerText = data
	hiddenDiv.dispatchEvent(messageEvent);
}
function fireLpUserFanEvent(data) {
	hiddenDiv = document.getElementById('lpUserFanEventDiv');	
	hiddenDiv.innerText = data
	hiddenDiv.dispatchEvent(userFanEvent);
}

API.addEventListener(API.CHAT, lpMessageEventFunction);
API.addEventListener(API.DJ_ADVANCE, lpDjAdvanceEventFunction);
API.addEventListener(API.USER_FAN, lpUserFanEventFunction);

function lpDjAdvanceEventFunction(obj) {
	if(obj.media) {
		var jsondata = { "avatar": obj.dj.avatarID, "username": encodeURIComponent(obj.dj.username), "song": encodeURIComponent(obj.media.author) + " - " + encodeURIComponent(obj.media.title), "duration": encodeURIComponent(obj.media.duration), "type": "DJ Advances" };
		var json = JSON.stringify(jsondata);
		fireLpDjAdvanceEvent(json);
	}
}

function lpMessageEventFunction(data) {
	if(data.message.indexOf("@" + API.getSelf().username) > -1) {
		var jsondata = {"from": encodeURIComponent(data.from), "message": encodeURIComponent(data.message), "avatar": API.getUser(data.fromID).avatarID, "type": "Mentions", "bit": "1"};
	} else {
		var jsondata = {"from": encodeURIComponent(data.from), "message": encodeURIComponent(data.message), "avatar": API.getUser(data.fromID).avatarID, "type": "Chat Messages", "bit": "0"};
	}
	var json = JSON.stringify(jsondata);
	fireLpMessageEvent(json);	
}

function lpUserFanEventFunction(user) {
	var jsondata = {"avatar": user.avatarID, "from": encodeURIComponent(user.username), "type": "Fans"}
	var json = JSON.stringify(jsondata);
	fireLpUserFanEvent(json);
}