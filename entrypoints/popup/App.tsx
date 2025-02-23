import { useState, useEffect, useCallback } from "react";
import "./App.css";

function isUrlGitHub(url: string) {
  return url.includes("github.com");
}

function App() {
  const [currentTab, setCurrentTab] = useState<chrome.tabs.Tab | null>(null);
  const [currentUrl, setCurrentUrl] = useState<string | null>(null);
  const [isGitHub, setIsGitHub] = useState<boolean>(false);
  const [tabId, setTabId] = useState<number | null>(null);
  
  useEffect(() => {
    // Send a message to the background script to get the current tab info
    chrome.runtime.sendMessage({ type: "get-current-tab-url" }, (response) => {
      if (response.error) {
        console.error(response.error);
      } else {
        console.log("response", response);
        setCurrentUrl(response.url);
        setTabId(response.tabId);
        setIsGitHub(isUrlGitHub(response.url)); // Process isGitHub here
      }
    });
  }, []);

  const handleChangeGitHubLinkToGitingestLink = useCallback(() => {
    if (currentUrl) {      
      const newUrl = currentUrl.replace("github.com", "gitingest.com");

      if (tabId) {        
        chrome.tabs.update(tabId, { url: newUrl });
      }
    }
  }, [currentUrl, currentTab, tabId]);

  return (
    <>
      <div>
        {isGitHub ? (
          <button onClick={() => handleChangeGitHubLinkToGitingestLink()}>
            Change to Gitingest
          </button>
        ) : (
          <p>Not a GitHub link</p>
        )}
      </div>
    </>
  );
}

export default App;
