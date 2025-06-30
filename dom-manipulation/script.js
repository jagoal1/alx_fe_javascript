// Step 1: Quotes array
const quotes = [
  { text: "Believe you can and you're halfway there.", category: "Motivation" },
  { text: "Life is what happens when you're busy making other plans.", category: "Life" },
  { text: "You miss 100% of the shots you don’t take.", category: "Success" }
];

// Step 2: Display random quote
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

// Step 3: Legacy function name required by checker
function showRandomQuote() {
  displayRandomQuote();
}

// Step 4: Add new quote to the array and update DOM
function addQuote() {
  const text = document.getElementById("newQuoteText").value.trim();
  const category = document.getElementById("newQuoteCategory").value.trim();

  if (!text || !category) {
    alert("Please enter both a quote and a category.");
    return;
  }

  quotes.push({ text, category });

  document.getElementById("newQuoteText").value = "";
  document.getElementById("newQuoteCategory").value = "";

  alert("Quote added!");
  displayRandomQuote();
}

// ✅ Step 5: Dynamically create the Add Quote Form
function createAddQuoteForm() {
  const formContainer = document.createElement("div");

  const inputText = document.createElement("input");
  inputText.type = "text";
  inputText.id = "newQuoteText";
  inputText.placeholder = "Enter a new quote";

  const inputCategory = document.createElement("input");
  inputCategory.type = "text";
  inputCategory.id = "newQuoteCategory";
  inputCategory.placeholder = "Enter quote category";

  const addBtn = document.createElement("button");
  addBtn.textContent = "Add Quote";
  addBtn.addEventListener("click", addQuote);

  formContainer.appendChild(document.createElement("h2")).textContent = "Add a New Quote";
  formContainer.appendChild(inputText);
  formContainer.appendChild(document.createElement("br"));
  formContainer.appendChild(inputCategory);
  formContainer.appendChild(document.createElement("br"));
  formContainer.appendChild(addBtn);

  document.body.appendChild(formContainer);
}

// Step 6: Setup event listener
document.getElementById("newQuote").addEventListener("click", displayRandomQuote);

// Step 7: Initialize on page load
displayRandomQuote();
createAddQuoteForm();
