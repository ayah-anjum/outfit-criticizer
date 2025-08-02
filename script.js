async function sendToAI() {
  const input = document.getElementById("input").value;
  const output = document.getElementById("output");
  output.innerText = "Thinking...";

  const response = await fetch("/api/review", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ input })
  });

  const data = await response.json();
  output.innerText = data.result || "Something went wrong.";
}
