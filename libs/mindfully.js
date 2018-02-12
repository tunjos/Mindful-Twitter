chrome.tabs.query({ url: "*://twitter.com/*"}, function (tabs) {
	if (tabs.length === 0)
        return;
	chrome.tabs.sendMessage(tabs[0].id, {type: "GET_STATUS"}, function(response) {
		if (response.notificationsHidden !== 'undefined') {
			$('#hide_notifications_notf').prop('checked', response.notificationsHidden).attr('disabled', false);
		}
		if (response.messagesHidden !== 'undefined') {
			$('#hide_messages_notf').prop('checked', response.messagesHidden).attr('disabled', false);
		}
	});
});

$(function() {
	$('#hide_notifications_notf').click(function(evt) {
		var newVal = $(this).prop('checked');
		hideNotification("TYPE_NOTIFICATIONS", newVal);
	});
    
    $('#hide_messages_notf').click(function(evt) {
		var newVal = $(this).prop('checked');
		hideNotification("TYPE_MESSAGES", newVal);
	});
	
	function hideNotification(type, hide) {
		chrome.tabs.query({ url: "*://twitter.com/*"}, function(tabs) {
			if (tabs.length === 0)
				return;
			tabs.forEach(function (tab) {
				chrome.tabs.sendMessage(tab.id, {type: type, hidden: hide});
			});
		});
	};
});
