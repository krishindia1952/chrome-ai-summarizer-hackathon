document.getElementById("summarizeBtn").addEventListener("click", async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: async () => {
      const selectedText = window.getSelection().toString();
      if (!selectedText) return "No text selected.";

      try {
        const summary = await chrome.ai.summarize({ text: selectedText });
        return summary;
      } catch (error) {
        return "Error: " + error.message;
      }
    }
  }, (results) => {
    const output = document.getElementById("output");
    if (results && results[0] && results[0].result) {
      output.innerText = results[0].result;
    } else {
      output.innerText = "No result returned or an error occurred.";
    }
  });
});
