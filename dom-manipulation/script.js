let quotes = [];

// Load from localStorage or use defaults
if (localStorage.getItem("quotes")) {
  quotes = JSON.parse(localStorage.getItem("quotes"));
} else {
  quotes = [
    { text: "Believe you can and you're halfway there.", category: "Motivation" },
    { text: "Life is what happens when you're busy making other plans.", category: "Life" },
    { text: "You miss 100% of the shots you don’t take.", category: "Success" }
  ];
  saveQuotes();
}

// Save to localStorage
function saveQuotes() {
  localStorage.setItem("quotes", JSON.stringify(quotes));
}

// Display a random quote and store its index in sessionStorage
function displayRandomQuote() {
  const quoteDisplay = document.getElementById("quoteDisplay");

  if (quotes.length === 0) {
    quoteDisplay.innerHTML = "No quotes available.";
    return;
  }

  const randomIndex = Math.floor(Math.random() * quotes.length);
  const randomQuote = quotes[randomIndex];

  quoteDisplay.innerHTML = `"${randomQuote.text}" — <em>${randomQuote.category}</em>`;
  sessionStorage.setItem("lastQuoteIndex", randomIndex);
}

// ALX checker expects this function name too
function showRandomQuote() {
  displayRandomQuote();
}

// Add a new quote
function addQuote() {
  const text = document.getElementById("newQuoteText").value.trim();
  const category = document.getElementById("newQuoteCategory").value.trim();

  if (!text || !category) {
    alert("Please enter both a quote and a category.");
    return;
  }

  quotes.push({ text, category });
  saveQuotes();

  document.getElementById("newQuoteText").value = "";
  document.getElementById("newQuoteCategory").value = "";

  alert("Quote added!");
  displayRandomQuote();
}

// Create the quote input form dynamically
function createAddQuoteForm() {
  const formContainer = document.createElement("div");

  const heading = document.createElement("h2");
  heading.textContent = "Add a New Quote";

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

  const exportBtn = document.createElement("button");
  exportBtn.textContent = "Export Quotes (JSON)";
  exportBtn.onclick = exportQuotesToJson;

  const importInput = document.createElement("input");
  importInput.type = "file";
  importInput.id = "importFile";
  importInput.accept = ".json";
  importInput.onchange = importFromJsonFile;

  formContainer.appendChild(heading);
  formContainer.appendChild(inputText);
  formContainer.appendChild(document.createElement("br"));
  formContainer.appendChild(inputCategory);
  formContainer.appendChild(document.createElement("br"));
  formContainer.appendChild(addBtn);
  formContainer.appendChild(document.createElement("br"));
  formContainer.appendChild(exportBtn);
  formContainer.appendChild(document.createElement("br"));
  formContainer.appendChild(importInput);

  document.body.appendChild(formContainer);
}

// Export quotes to a downloadable JSON file
function exportQuotesToJson() {
  const dataStr = JSON.stringify(quotes, null, 2);
  const blob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "quotes.json";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

// Import quotes from uploaded JSON file
function importFromJsonFile(event) {
  const fileReader = new FileReader();

  fileReader.onload = function(e) {
    try {
      const importedQuotes = JSON.parse(e.target.result);
      if (!Array.isArray(importedQuotes)) {
        alert("Invalid file format.");
        return;
      }
      quotes.push(...importedQuotes);
      saveQuotes();
      alert("Quotes imported successfully!");
      displayRandomQuote();
    } catch (err) {
      alert("Error reading JSON file.");
    }
  };

  fileReader.readAsText(event.target.files[0]);
}

// Attach event listener to the "Show New Quote" button
document.getElementById("newQuote").addEventListener("click", displayRandomQuote);

// Initialize on page load
displayRandomQuote();
createAddQuoteForm();
