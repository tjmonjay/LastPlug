var defaultNotificationTimeout = 5000;
var defaultChatMessages = false;
var defaultDjAdvances = true;
var defaultFans = true;
var defaultMentions = true;

function loadSettings() {
	var notificationTimeout = window.localStorage["notificationTimeout"];
	var enableChatMessages = window.localStorage["enable_chatmessages"];
	var enableDjAdvances = window.localStorage["enable_djadvances"];
	var enableFans	= window.localStorage["enable_fans"];
	var enableMentions = window.localStorage["enable_mentions"];
	
	if(notificationTimeout == undefined) {
		notificationTimeout = defaultNotificationTimeout;
	}
	if(enableChatMessages == undefined) {
		enableChatMessages = defaultChatMessages;
	}
	if(enableDjAdvances == undefined) {
		enableDjAdvances = defaultDjAdvances;
	}
	if(enableFans == undefined) {
		enableFans = defaultFans;
	}
	if(enableMentions == undefined) {
		enableMentions = defaultMentions;
	}
	
	if(enableChatMessages == "true") {
		$('#enable_chatmessages').click()
	}
	if(enableDjAdvances == "true") {
		$('#enable_djadvances').click()
	}
	if(enableFans == "true") {
		$('#enable_fans').click()
	}
	if(enableMentions == "true") {
		$('#enable_mentions').click()
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
	
	$('#session').html('Saved!')
}
function eraseSettings() {
	window.localStorage.removeItem("notificationTimeout");
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