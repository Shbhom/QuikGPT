function showNotification(message, isSuccess) {
  const notification = document.getElementById("notification");
  const progressBar = document.createElement("div");

  progressBar.classList.add("notification-progress-bar");

  notification.textContent = message;
  notification.classList.add("show");

  if (isSuccess) {
    notification.style.backgroundColor = "#007bff";
  } else {
    notification.style.backgroundColor = "#dc3545";
  }

  notification.appendChild(progressBar);

  let progress = 0;
  const interval = setInterval(function () {
    progress += 1;
    progressBar.style.width = progress + "%";

    if (progress >= 100) {
      clearInterval(interval);
      notification.classList.remove("show");
      notification.innerHTML = ""; // Clear the notification content
    }
  }, 50); // Adjust the interval duration to control the progress speed
}

document.getElementById("saveButton").addEventListener("click", function () {
  const apiKeyInput = document.getElementById("apiKeyInput");
  const maxTokensInput = document.getElementById("maxTokensInput");

  const apiKey = apiKeyInput.value.trim();
  const maxTokens = maxTokensInput.value.trim();
  console.log("API key:", apiKey);
  console.log("max tokens :", maxTokens);

  if (apiKey === "") {
    showNotification("Please enter an API key", false);
    return;
  }

  if (isNaN(maxTokens) || maxTokens <= 0) {
    showNotification("Please enter a valid maximum number of tokens", false);
    return;
  }

  // Save the API key and max tokens to storage
  chrome.storage.sync.set({ apiKey, maxTokens }, function () {
    showNotification("Settings saved successfully", true);
  });
});
