document.addEventListener('DOMContentLoaded', function () {
  // Add event listener to delete button
  document.getElementById('deleteButton').addEventListener('click', function () {
    // Send a message to content script to delete unread emails
    var emailCount = document.getElementById('emailCount').value;
    var skipWord = document.getElementById('skipWord').value;
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { action: 'deleteUnreadEmails', ec: emailCount, sw: skipWord });
    });
  });

  chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.action === 'processedData') {
      var processedData = message.processedData;
      document.getElementById('processedData').style.display = 'block';
      document.getElementById('processedData').textContent = processedData;
    }
  });

});
