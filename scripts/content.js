let deleteEmailsJs = (ec, sw) => {
  var count = 0;
  var maxEmailDeleteCount = ec || 100;
  var deleteEmails = function () {
    console.log("Started the deletion of emails");
    var unreadEmailList = document.querySelectorAll('.zA.zE');
    console.log("Found the unread email batch; count:", unreadEmailList.length);
    unreadEmailList.forEach(function (emailItem) {
      var isItemImportantTag = emailItem.querySelector('[data-is-important="true"]')
      if (!isItemImportantTag) {
        if (count < maxEmailDeleteCount) {
          emailItem.querySelector('[data-tooltip="Delete"]').click();
          count++;
        } else {
          console.log("Total email deletion limit reached");
          clearInterval(interval);
          return; // Exit the loop
        }
      }
    });

    processedData = "Email deleted count is " + count;
    console.log(processedData);
    chrome.runtime.sendMessage({ action: 'processedData', processedData: processedData });
  }
  // running the same code on setInterval of 10 seconds
  var interval = setInterval(deleteEmails, 10000);

}


// Listen for messages from popup
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.action === 'deleteUnreadEmails') {
    // Perform action to delete unread emails
    console.log('Deleting unread emails...');
    deleteEmailsJs(message.ec, message.sw);
  }
});
