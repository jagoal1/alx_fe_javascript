// Step 1: Quotes Array
const quotes = [
  { text: "Believe you can and you're halfway there.", category: "Motivation" },
  { text: "Life is what happens when you're busy making other plans.", category: "Life" },
  { text: "You miss 100% of the shots you don’t take.", category: "Success" }
];

// Step 2: Show Random Quote
function showRandomQuote() {
  const quoteDisplay = document.getElementById("quoteDisplay");
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const randomQuote = quotes[randomIndex];
  quoteDisplay.textContent = `"${randomQuote.text}" — ${randomQuote.category}`;
}
function addQuote() {
  // Get user input
  const quoteText = document.getElementById("newQuoteText").value.trim();
  const quoteCategory = document.getElementById("newQuoteCategory").value.trim();

  // Validate input
  if (!quoteText || !quoteCategory) {
    alert("Please enter both a quote and a category.");
    return;
  }

  // Add the new quote to the array
  quotes.push({ text: quoteText, category: quoteCategory });

  // Optionally show confirmation
  alert("New quote added!");

  // Clear input fields
  document.getElementById("newQuoteText").value = "";
  document.getElementById("newQuoteCategory").value = "";

  // Optionally show the new quote
  showRandomQuote();
}


// Step 3: Create Add Quote Form
function createAddQuoteForm() {
  const formContainer = document.createElement("div");

  const quoteInput = document.createElement("input");
  quoteInput.type = "text";
  quoteInput.placeholder = "Enter quote text";
  quoteInput.id = "quoteText";

  const categoryInput = document.createElement("input");
  categoryInput.type = "text";
  categoryInput.placeholder = "Enter category";
  categoryInput.id = "quoteCategory";

  const addButton = document.createElement("button");
  addButton.textContent = "Add Quote";

  addButton.addEventListener("click", () => {
    const text = quoteInput.value.trim();
    const category = categoryInput.value.trim();

    if (text && category) {
      quotes.push({ text, category });
      quoteInput.value = "";
      categoryInput.value = "";
      alert("Quote added!");
    } else {
      alert("Please enter both quote and category.");
    }
  });

  formContainer.appendChild(document.createElement("hr"));
  formContainer.appendChild(quoteInput);
  formContainer.appendChild(document.createElement("br"));
  formContainer.appendChild(categoryInput);
  formContainer.appendChild(document.createElement("br"));
  formContainer.appendChild(addButton);

  document.body.appendChild(formContainer);
}

// Step 4: Set up Events
document.getElementById("newQuote").addEventListener("click", showRandomQuote);

// Initial Load
showRandomQuote();
createAddQuoteForm();
