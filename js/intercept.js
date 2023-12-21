const intercept = (urlmatch, newurl) => {
  console.log("Enabling Interceptor");
  console.log("Source: ", urlmatch);
  console.log("Destination: ", newurl);
  const open = XMLHttpRequest.prototype.open;
  XMLHttpRequest.prototype.open = function (method, url, ...rest) {
    url = url.replace(urlmatch, newurl);
    return open.call(this, method, url, ...rest);
  };
};

(async () => {
  const enabled = (await chrome.storage.sync.get("enabled")).enabled;

  if (enabled) {
    const source = (await chrome.storage.sync.get("source")).source;
    const destination = (await chrome.storage.sync.get("destination"))
      .destination;

    let queryOptions = { active: true, currentWindow: true };

    let [tab] = await chrome.tabs.query(queryOptions);

    await chrome.scripting.executeScript({
      target: {
        tabId: tab.id,
        allFrames: true,
      },
      world: "MAIN",
      injectImmediately: true,
      args: [source, destination],
      func: intercept,
    });
  }
})();
