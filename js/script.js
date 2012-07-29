﻿var chatEvent = document.createEvent('Event');
chatEvent.initEvent('lpChatEvent', true, true);
var djAdvanceEvent = document.createEvent('Event');
djAdvanceEvent.initEvent('lpDjAdvanceEvent', true, true);
var djUpdateEvent = document.createEvent('Event');
djUpdateEvent.initEvent('lpDjUpdateEvent', true, true);
var userFanEvent = document.createEvent('Event')
userFanEvent.initEvent('lpUserFanEvent', true, true);

function fireLpChatEvent(data) {
	hiddenDiv = document.getElementById('lpChatEventDiv');
	hiddenDiv.innerText = data
	hiddenDiv.dispatchEvent(chatEvent);
}
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
function fireLpUserFanEvent(data) {
	hiddenDiv = document.getElementById('lpUserFanEventDiv');	
	hiddenDiv.innerText = data
	hiddenDiv.dispatchEvent(userFanEvent);
}

API.addEventListener(API.CHAT, lpChatEventFunction);
API.addEventListener(API.DJ_ADVANCE, lpDjAdvanceEventFunction);
API.addEventListener(API.DJ_UPDATE, lpDjUpdateEventFunction);
API.addEventListener(API.USER_FAN, lpUserFanEventFunction);
API.addEventListener(API.USER_JOIN, lpUserJoinEventFunction);
API.addEventListener(API.VOTE_UPDATE, lpVoteUpdateEventFunction);

setTimeout(function() {
	$.each(Models.room.getUsers(), function(index, value) { 
		value.timeIdle = 0;
	});
}, 10000);

setTimeout(function() {
	setInterval(function() {
		$.each(Models.room.getUsers(), function(index, value) { 
			value.timeIdle++;
		});
		var users = API.getDJs();
		if(users[4] != undefined) {
			$('#idle-timer-1').html(secondsToString(Models.room.userHash[users[4].id].timeIdle));
		} else {
			$('#idle-timer-1').html('N/A');
		}
		if(users[3] != undefined) {
			$('#idle-timer-2').html(secondsToString(Models.room.userHash[users[3].id].timeIdle));
		} else {
			$('#idle-timer-2').html('N/A');
		}
		if(users[2] != undefined) {
			$('#idle-timer-3').html(secondsToString(Models.room.userHash[users[2].id].timeIdle));
		} else {
			$('#idle-timer-3').html('N/A');
		}
		if(users[1] != undefined) {
			$('#idle-timer-4').html(secondsToString(Models.room.userHash[users[1].id].timeIdle));
		} else {
			$('#idle-timer-4').html('N/A');
		}
	}, 1000);
}, 10000);

function lpChatEventFunction(data) {
	Models.room.userHash[data.fromID].timeIdle = 0;
	if(data.from != API.getSelf().username) {
		if(data.message.indexOf("@" + API.getSelf().username) > -1) {
			var jsondata = {"from": encodeURIComponent(data.from), "message": encodeURIComponent(data.message), "avatar": API.getUser(data.fromID).avatarID, "type": "Mentions", "bit": "1"};
		} else {
			var jsondata = {"from": encodeURIComponent(data.from), "message": encodeURIComponent(data.message), "avatar": API.getUser(data.fromID).avatarID, "type": "Chat Messages", "bit": "0"};
		}
		var json = JSON.stringify(jsondata);
		fireLpChatEvent(json);
	}
	$('.chat-from-clickable').each(function() {
		if($(this).html() == "Master Lucas") { 
			$(this).css("color", "#1AD71A"); 
		}
		if($(this).html() == "[VDJ] EXƎ") { 
			$(this).css("color", "brown"); 
		}
		if($(this).html() == "Maxorq") { 
			$(this).css({'color' : 'red', 'background-image' : "url('http://i.imgur.com/N4xZT.gif')"});
		}
		if($(this).html() == ".ŃōıɀɛƦɇƀȇʟ`") { 
			$(this).css({'color' : '#baff00', 'background-image' : "url('http://i.imgur.com/N4xZT.gif')"}); 
		}
	});
}

function lpDjAdvanceEventFunction(obj) {
	if(obj.media) {
		var jsondata = { "avatar": obj.dj.avatarID, "username": encodeURIComponent(obj.dj.username), "song": encodeURIComponent(obj.media.author) + " - " + encodeURIComponent(obj.media.title), "duration": encodeURIComponent(obj.media.duration), "type": "DJ Advances" };
		var json = JSON.stringify(jsondata);
		fireLpDjAdvanceEvent(json);
	}
}

function lpDjUpdateEventFunction(djs) {
	var users = API.getDJs();
	if(users[4].username == API.getSelf().username || users[3].username == API.getSelf().username || users[2].username == API.getSelf().username || users[1].username == API.getSelf().username) {
		var jsondata = { "avatar": API.getSelf().avatarID, "song": encodeURIComponent($('#up-next').html()), "type": "Booth Notifications" };
		var json = JSON.stringify(jsondata);
		fireLpDjUpdateEvent(json);
	}
}

function lpUserFanEventFunction(user) {
	var jsondata = {"avatar": user.avatarID, "from": encodeURIComponent(user.username), "type": "Fans"}
	var json = JSON.stringify(jsondata);
	fireLpUserFanEvent(json);
}

function lpUserJoinEventFunction(user) {
	Models.room.userHash[user.id].timeIdle = 0;
}

function lpVoteUpdateEventFunction(object) {
	Models.room.userHash[object.user.id].timeIdle = 0;
}

function secondsToString(seconds) {
	var numdays = Math.floor(seconds / 86400);
	var numhours = Math.floor((seconds % 86400) / 3600);
	var numminutes = Math.floor(((seconds % 86400) % 3600) / 60);
	var numseconds = ((seconds % 86400) % 3600) % 60;
	if(numdays > 0) {
		return ">1 day"
	} else {
		if(numhours > 0) {
			return ">" + numhours + "h"
		} else {
			if(numseconds > 9) {
				return numminutes + ":" + numseconds;
			} else {
				return numminutes + ":0" + numseconds;
			}
		}
	}
}