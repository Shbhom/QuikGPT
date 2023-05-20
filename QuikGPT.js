// Retrieve the query from the URL
const urlParams = new URLSearchParams(window.location.search);
const query = urlParams.get("query");

// Retrieve the API key from the extension's storage
chrome.storage.sync.get(["apiKey", "maxTokens"], async function (data) {
  const apiKey = data.apiKey;
  const maxToken = data.maxTokens;
  console.log("API key:", apiKey);
  console.log("Max Token", maxToken);

  try {
    // Send the query to the OpenAI API
    const response = await fetch(
      "https://api.openai.com/v1/engines/davinci-codex/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + apiKey,
        },
        body: JSON.stringify({
          prompt: query,
          max_tokens: maxToken, // Use the retrieved maxToken value
        }),
      }
    );

    if (!response.ok) {
      throw new Error(
        "Error occurred while fetching the response. Status: " + response.status
      );
    }

    const reader = response.body.getReader();
    let result = "";
    let done = false;

    while (!done) {
      const { done: readerDone, value } = await reader.read();
      done = readerDone;
      const text = new TextDecoder().decode(value);
      result += text;

      // Update the response element with the partial response
      document.getElementById("response").textContent = result;
    }

    // Update the response element with the final response
    document.getElementById("response").textContent = result;
  } catch (error) {
    // Display the error message in the response element
    document.getElementById("response").textContent =
      "An error occurred: " + error.message;
  }
});
