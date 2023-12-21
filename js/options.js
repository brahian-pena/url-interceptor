// Saves options to chrome.storage
const saveOptions = () => {
  const source = document.getElementById("source").value;
  const destination = document.getElementById("destination").value;
  const enabled = document.getElementById("enabled").checked;
  chrome.storage.sync.set({ source, destination, enabled });
  window.close();
};

const restoreOptions = async () => {
  const syncItems = await chrome.storage.sync.get([
    "source",
    "destination",
    "enabled",
  ]);
  console.log("Syncing items: ", syncItems);
  document.getElementById("source").value = syncItems.source;
  document.getElementById("destination").value = syncItems.destination;
  document.getElementById("enabled").checked = syncItems.enabled;
};

document.addEventListener("DOMContentLoaded", restoreOptions);
document.getElementById("save").addEventListener("click", saveOptions);
