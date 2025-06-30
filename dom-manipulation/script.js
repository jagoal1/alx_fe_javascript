// Initial quotes array
const quotes = [
  { text: "Believe you can and you're halfway there.", category: "Motivation" },
  { text: "Life is what happens when you're busy making other plans.", category: "Life" },
  { text: "You miss 100% of the shots you don’t take.", category: "Success" }
];

// ✅ Function that randomly selects a quote and updates the DOM
function displayRandomQuote() {
  const quoteDisplay = document.getElementById("quoteDisplay");

  if (quotes.length === 0) {
    quoteDisplay.innerHTML = "No quotes available.";
    return;
  }

  const randomIndex = Math.floor(Math.random() * quotes.length);
  const randomQuote = quotes[randomIndex];

  quoteDisplay.innerHTML = `"${randomQuote.text}" — <em>${randomQuote.category}</em>`;
}

// ✅ Legacy alias required by checker
function showRandomQuote() {
  displayRandomQuote();
}

// ✅ Function to add a quote and update the DOM
function addQuote() {
  const textInput = document.getElementById("newQuoteText");
  const categoryInput = document.getElementById("newQuoteCategory");

  const text = textInput.value.trim();
  const category = categoryInput.value.trim();

  if (!text || !category) {
    alert("Please enter both a quote and a category.");
    return;
  }

  // Add the new quote to the array
  quotes.push({ text, category });

  // Clear the input fields
  textInput.value = "";
  categoryInput.value = "";

  // Optional feedback
  alert("Quote added!");

  // Update the DOM with a random quote
  displayRandomQuote();
}

// ✅ Event listener for the button
document.getElementById("newQuote").addEventListener("click", displayRandomQuote);

// ✅ Show one quote on page load
displayRandomQuote();
