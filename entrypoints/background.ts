export default defineBackground(() => {
  chrome.commands.onCommand.addListener((command) => {
    if (command === "change-github-link-to-gitingest-link") {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const tab = tabs[0];
        if (tab?.url && tab?.id) {
          chrome.tabs.update(tab.id, { url: tab.url.replace("github.com", "gitingest.com") });
        }
      });
    }
  });

  // Listen for messages from the popup
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log("message", message);
    if (message.type === "get-current-tab-url") {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const tab = tabs[0];
        if (tab?.url) {
          console.log("tab", tab);

          sendResponse({
            url: tab.url,
            tabId: tab.id,
          });
        } else {
          sendResponse({ error: "No URL found for the current tab" });
        }
      });
      // Keep the message channel open for async response
      return true;
    }
  });
});
