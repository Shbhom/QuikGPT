chrome.runtime.onInstalled.addListener(function (details) {
  chrome.storage.local.get("installed", function (result) {
    if (!result.installed) {
      chrome.storage.local.set({ installed: true });
      chrome.tabs.create({ url: "config.html" });
    }
  });
});

chrome.contextMenus.create({
  id: "searchWithGPT",
  title: "Search with QuikGPT",
  contexts: ["selection"],
});

chrome.contextMenus.onClicked.addListener(function (info, tab) {
  if (info.menuItemId === "searchWithGPT") {
    const query = info.selectionText;
    const quikGPTUrl =
      chrome.extension.getURL("index.html") +
      "?query=" +
      encodeURIComponent(query);

    if (tab.url && tab.url.includes("QuikGPT.html")) {
      // Current tab is the QuikGPT response page
      chrome.tabs.update(tab.id, { url: quikGPTUrl });
    } else {
      // Open a new tab with the QuikGPT response page
      chrome.tabs.create({ url: quikGPTUrl });
    }
  }
});
