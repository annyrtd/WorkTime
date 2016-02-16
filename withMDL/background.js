chrome.browserAction.onClicked.addListener
(
	function(tab) 
	{ 
		var newURL = "http://co-msk-app02/";
		chrome.tabs.create({ url: newURL });
	}
);