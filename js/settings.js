var defaultNotificationTimeout = 5000;

function loadSettings() {
	var notificationTimeout = window.localStorage["notificationTimeout"];
	
	if(notificationTimeout == undefined) {
		notificationTimeout = defaultNotificationTimeout;
	}
	$('#notificationTimeout').val(notificationTimeout / 1000);
}
function saveSettings() {
	window.localStorage["notificationTimeout"] = $('#notificationTimeout').val() * 1000;
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