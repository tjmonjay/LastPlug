var djAdvanceEvent = document.createEvent('Event');
djAdvanceEvent.initEvent('lpDjAdvanceEvent', true, true);
var djUpdateEvent = document.createEvent('Event');
djUpdateEvent.initEvent('lpDjUpdateEvent', true, true);
var messageEvent = document.createEvent('Event');
messageEvent.initEvent('lpMessageEvent', true, true);
var userFanEvent = document.createEvent('Event')
userFanEvent.initEvent('lpUserFanEvent', true, true);

function fireLpDjAdvanceEvent(data) {
	hiddenDiv = document.getElementById('lpDjAdvanceEventDiv');	
	hiddenDiv.innerText = data
	hiddenDiv.dispatchEvent(djAdvanceEvent);
}
function fireLpDjUpdateEvent(data) {
	hiddenDiv = document.getElementById('lpDjUpdateEventDiv');	
	hiddenDiv.innerText = data
	hiddenDiv.dispatchEvent(djUpdateEvent);
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
API.addEventListener(API.DJ_UPDATE, lpDjUpdateEventFunction);
API.addEventListener(API.USER_FAN, lpUserFanEventFunction);

function lpDjAdvanceEventFunction(obj) {
	if(obj.media) {
		var jsondata = { "avatar": obj.dj.avatarID, "username": encodeURIComponent(obj.dj.username), "song": encodeURIComponent(obj.media.author) + " - " + encodeURIComponent(obj.media.title), "duration": encodeURIComponent(obj.media.duration), "type": "DJ Advances" };
		var json = JSON.stringify(jsondata);
		fireLpDjAdvanceEvent(json);
	}
}
function lpDjUpdateEventFunction(djs) {
	var users = API.getDJs();
	if(users[4].username == API.getSelf().username) {
		var jsondata = { "avatar": API.getSelf().avatarID, "song": encodeURIComponent($('#up-next').html()), "type": "Booth Notifications" };
		var json = JSON.stringify(jsondata);
		fireLpDjUpdateEvent(json);
	}
}
function lpMessageEventFunction(data) {
	if(data.from != API.getSelf().username) {
		if(data.message.indexOf("@" + API.getSelf().username) > -1) {
			var jsondata = {"from": encodeURIComponent(data.from), "message": encodeURIComponent(data.message), "avatar": API.getUser(data.fromID).avatarID, "type": "Mentions", "bit": "1"};
		} else {
			var jsondata = {"from": encodeURIComponent(data.from), "message": encodeURIComponent(data.message), "avatar": API.getUser(data.fromID).avatarID, "type": "Chat Messages", "bit": "0"};
		}
		var json = JSON.stringify(jsondata);
		fireLpMessageEvent(json);
	}
	$('.chat-from-clickable').each(function() {
		if($(this).html() == "Master Lucas") { 
			$(this).css("color", "#1AD71A"); 
		}
		if($(this).html() == "[VIDJ] EXƎ") { 
			$(this).css("color", "brown"); 
		}
		if($(this).html() == "One time, at band camp") { 
			$(this).css("color", "darkBlue"); 
		}
		if($(this).html() == ".ŃōıɀɛƦɇƀȇʟ`") { 
			$(this).css({'color' : '#baff00', 'background-image' : "url('img/sparkle.gif')"}); 
		}
	});
}

function lpUserFanEventFunction(user) {
	var jsondata = {"avatar": user.avatarID, "from": encodeURIComponent(user.username), "type": "Fans"}
	var json = JSON.stringify(jsondata);
	fireLpUserFanEvent(json);
}