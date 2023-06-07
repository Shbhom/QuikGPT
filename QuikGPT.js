// Retrieve the query from the URL
const urlParams = new URLSearchParams(window.location.search);
const query = urlParams.get("query");

const nice = (seconds) => new Promise((resolve) => setTimeout(resolve, seconds * 1000));

// Retrieve the API key from the extension's storage
chrome.storage.sync.get(["apiKey", "maxTokens"], async function (data) {
  const apiKey = data.apiKey;
  const maxToken = data.maxTokens;
  console.log("API key:", apiKey);
  console.log("Max Token", maxToken);

  try {
    // const response = await fetch("https://api.openai.com/v1/chat/completions", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: "Bearer " + apiKey,
    //   },
    //   body: JSON.stringify({
    //     model: "gpt-3.5-turbo",
    //     messages: [{ role: "user", content: query }],
    //     temperature: 0.7,
    //   }),
    // });

    // if (!response.ok) {
    //   console.log(await response.text());
    //   throw new Error(
    //     "Error occurred while fetching the response. Status: " + response.status
    //   );
    // }
    await nice(1);
    const formattedResponse = `
    hello, how are you?
    I'm under the water, Please save me
    You're a monster 
    `
    // const data = await response.json();
    // console.log(data);


    // Format the response by replacing line breaks with <br> tags
    // const formattedResponse = data.choices[0].message.content.replace(
    //   /(?:\r\n|\r|\n)/g,
    //   "<br>"
    // );

    // Update the response element with the formatted content of the chat completion
    // document.getElementById("response").innerHTML = formattedResponse;

    const p = document.createElement("p");
    p.innerHTML = formattedResponse;

    document.getElementById("response").appendChild(p);
  } catch (error) {
    // Display the error message in the response element
    document.getElementById("response").textContent =
      "An error occurred: " + error.message;
  }
});
