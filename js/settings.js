var defaultNotificationTimeout = 5000;
var defaultChatMessages = false;
var defaultDjAdvances = true;
var defaultDjUpdates = true;
var defaultFans = true;
var defaultMentions = true;
var defaultUpdates = true;

var defaultAutoWoot = false;

function loadSettings() {
	var notificationTimeout = window.localStorage["notificationTimeout"];
	var enableChatMessages = window.localStorage["enable_chatmessages"];
	var enableDjAdvances = window.localStorage["enable_djadvances"];
	var enableDjUpdates = window.localStorage["enable_djupdates"];
	var enableFans	= window.localStorage["enable_fans"];
	var enableMentions = window.localStorage["enable_mentions"];
	var enableUpdates = window.localStorage["enable_updates"];
	var enableAutoWoot = window.localStorage["enable_autowoot"];
	
	var loadagain = false;
	
	if((notificationTimeout == undefined) || (enableChatMessages == undefined) || (enableAutoWoot == undefined)) {
		loadagain = true;
	}
	
	if(notificationTimeout == undefined) {
		notificationTimeout = defaultNotificationTimeout;
		window.localStorage["notificationTimeout"] = defaultNotificationTimeout;
	}
	if(enableChatMessages == undefined) {
		enableChatMessages = defaultChatMessages;
		window.localStorage["enable_chatmessages"] = defaultChatMessages;
	}
	if(enableDjAdvances == undefined) {
		enableDjAdvances = defaultDjAdvances;
		window.localStorage["enable_djadvances"] = defaultDjAdvances;
	}
	if(enableDjUpdates == undefined) {
		enableDjUpdates = defaultDjUpdates;
		window.localStorage["enable_djupdates"] = defaultDjUpdates;
	}
	if(enableFans == undefined) {
		enableFans = defaultFans;
		window.localStorage["enable_fans"] = defaultFans;
	}
	if(enableMentions == undefined) {
		enableMentions = defaultMentions;
		window.localStorage["enable_mentions"] = defaultMentions;
	}
	if(enableUpdates == undefined) {
		enableUpdates = defaultUpdates;
		window.localStorage["enable_updates"] = defaultUpdates;
	}
	if(enableAutoWoot == undefined) {
		enableAutoWoot = defaultAutoWoot;
		window.localStorage["enable_autowoot"] = defaultAutoWoot;
	}
	
	if(loadagain) {
		loadSettings();
	}
	
	if(enableChatMessages == "true") {
		$('#enable_chatmessages').click()
	}
	if(enableDjAdvances == "true") {
		$('#enable_djadvances').click()
	}
	if(enableDjUpdates == "true") {
		$('#enable_djupdates').click()
	}
	if(enableFans == "true") {
		$('#enable_fans').click()
	}
	if(enableMentions == "true") {
		$('#enable_mentions').click()
	}
	if(enableUpdates == "true") {
		$('#enable_updates').click()
	}
	if(enableAutoWoot == "true") {
		$('#enable_autowoot').click()
	}
	
	$('#notificationTimeout').val(notificationTimeout / 1000);
}
function saveSettings() {
	window.localStorage["notificationTimeout"] = $('#notificationTimeout').val() * 1000;
	
	if($('#enable_chatmessages:checked').val() !== undefined) {
		window.localStorage["enable_chatmessages"] = true;
	} else {
		window.localStorage["enable_chatmessages"] = false;
	}
	if($('#enable_djadvances:checked').val() !== undefined) {
		window.localStorage["enable_djadvances"] = true;
	} else {
		window.localStorage["enable_djadvances"] = false;
	}
	if($('#enable_djupdates:checked').val() !== undefined) {
		window.localStorage["enable_djupdates"] = true;
	} else {
		window.localStorage["enable_djupdates"] = false;
	}
	if($('#enable_fans:checked').val() !== undefined) {
		window.localStorage["enable_fans"] = true;
	} else {
		window.localStorage["enable_fans"] = false;
	}
	if($('#enable_mentions:checked').val() !== undefined) {
		window.localStorage["enable_mentions"] = true;
	} else {
		window.localStorage["enable_mentions"] = false;
	}
	if($('#enable_updates:checked').val() !== undefined) {
		window.localStorage["enable_updates"] = true;
	} else {
		window.localStorage["enable_updates"] = false;
	}
	if($('#enable_autowoot:checked').val() !== undefined) {
		window.localStorage["enable_autowoot"] = true;
	} else {
		window.localStorage["enable_autowoot"] = false;
	}
	
	$('#session').html('Saved!')
}
function eraseSettings() {
	window.localStorage.removeItem("notificationTimeout");
	window.localStorage.removeItem("enable_chatmessages");
	window.localStorage.removeItem("enable_djadvances");
	window.localStorage.removeItem("enable_djupdates");
	window.localStorage.removeItem("enable_fans");
	window.localStorage.removeItem("enable_mentions");
	window.localStorage.removeItem("enable_updates");
	window.localStorage.removeItem("enable_autowoot");
	
	window.location.reload();
}

$(function() {
	loadSettings();
	$('#saveSettings').click(function() {
		saveSettings();
	});
	$('#eraseSettings').click(function() {
		eraseSettings();
	});
});