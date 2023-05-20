chrome.runtime.onInstalled.addListener(function () {
  chrome.tabs.create({ url: "config.html" });
});

chrome.contextMenus.create({
  id: "searchWithGPT",
  title: "Search with QuikGPT",
  contexts: ["selection"],
});

chrome.contextMenus.onClicked.addListener(function (info) {
  if (info.menuItemId === "searchWithGPT") {
    const query = info.selectionText;
    chrome.tabs.create({
      url:
        chrome.extension.getURL("QuikGPT.html") +
        "?query=" +
        encodeURIComponent(query),
    });
  }
});
