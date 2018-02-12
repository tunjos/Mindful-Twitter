var HIDE_NOTIFICATIONS_CHECKED = 'hideNotificationsChecked';
var HIDE_MESSAGES_CHECKED = 'hideMessagesChecked';

doHideNotification('TYPE_NOTIFICATIONS', getHiddenStatus(HIDE_NOTIFICATIONS_CHECKED));
doHideNotification('TYPE_MESSAGES', getHiddenStatus(HIDE_MESSAGES_CHECKED));

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
	if (message.type === 'GET_STATUS') {
		sendResponse({notificationsHidden: getHiddenStatus(HIDE_NOTIFICATIONS_CHECKED),
                      messagesHidden: getHiddenStatus(HIDE_MESSAGES_CHECKED)});
	} else if (message.type === 'TYPE_NOTIFICATIONS') {
		var hide = message.hidden;
		localStorage.setItem(HIDE_NOTIFICATIONS_CHECKED, hide);
		doHideNotification(message.type, hide);
	} else if (message.type === 'TYPE_MESSAGES') {
		var hide = message.hidden;
		localStorage.setItem(HIDE_MESSAGES_CHECKED, hide);
		doHideNotification(message.type, hide);
	}
});

function getHiddenStatus(type) {
    if (type === HIDE_NOTIFICATIONS_CHECKED ) {
        return localStorage.getItem(HIDE_NOTIFICATIONS_CHECKED) === 'true';
    } else if (type === HIDE_MESSAGES_CHECKED) {
        return localStorage.getItem(HIDE_MESSAGES_CHECKED) === 'true';
    } else {
	 throw "type parameter invalid";
    }
}

function doHideNotification(type, hide) {
    if (type === 'TYPE_NOTIFICATIONS') {
    // #global-actions > li.people.notifications > a > span.count
        if (hide) {
            $('.people.notifications .count').hide();
        } else {
            $('.people.notifications .count').show();
        }
    } else if (type === 'TYPE_MESSAGES') {
    // #global-actions > li.dm-nav > a > span.text
        if (hide) {
            $('.dm-nav .dm-new').hide();            
        } else {
            $('.dm-nav .dm-new').show();
        }
    }
}
