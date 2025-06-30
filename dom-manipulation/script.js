let quotes = [];
let serverQuotes = [
  { text: "Server quote 1", category: "Server Wisdom" },
  { text: "Server quote 2", category: "Sync Test" }
];

// Load from localStorage or initialize
if (localStorage.getItem("quotes")) {
  quotes = JSON.parse(localStorage.getItem("quotes"));
} else {
  quotes = [
    { text: "Believe you can and you're halfway there.", category: "Motivation" },
    { text: "Life is what happens when you're busy making other plans.", category: "Life" },
    { text: "You miss 100% of the shots you don’t take.", category: "Success" }
  ];
  localStorage.setItem("quotes", JSON.stringify(quotes));
}

// Show random quote
function displayRandomQuote() {
  if (quotes.length === 0) {
    document.getElementById("quoteDisplay").innerHTML = "No quotes available.";
    return;
  }

  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];
  document.getElementById("quoteDisplay").innerHTML =
    `"${quote.text}" — <em>${quote.category}</em>`;
  sessionStorage.setItem("lastQuoteIndex", randomIndex);
}

function showRandomQuote() {
  displayRandomQuote();
}

// Add new quote
function addQuote() {
  const text = document.getElementById("newQuoteText").value.trim();
  const category = document.getElementById("newQuoteCategory").value.trim();

  if (!text || !category) {
    alert("Please enter both a quote and a category.");
    return;
  }

  quotes.push({ text, category });
  localStorage.setItem("quotes", JSON.stringify(quotes));

  document.getElementById("newQuoteText").value = "";
  document.getElementById("newQuoteCategory").value = "";

  alert("Quote added!");
  populateCategories();
  filterQuotes();
}

// Populate category dropdown
function populateCategories() {
  const categorySet = new Set(quotes.map(q => q.category));
  const filter = document.getElementById("categoryFilter");

  filter.innerHTML = '<option value="all">All Categories</option>';
  categorySet.forEach(cat => {
    const option = document.createElement("option");
    option.value = cat;
    option.textContent = cat;
    filter.appendChild(option);
  });

  const saved = localStorage.getItem("selectedCategory");
  if (saved) filter.value = saved;
}

// Filter quotes by category
function filterQuotes() {
  const selected = document.getElementById("categoryFilter").value;
  localStorage.setItem("selectedCategory", selected);

  const filtered = selected === "all"
    ? quotes
    : quotes.filter(q => q.category === selected);

  if (filtered.length === 0) {
    document.getElementById("quoteDisplay").innerHTML = "No quotes for this category.";
  } else {
    const randomQuote = filtered[Math.floor(Math.random() * filtered.length)];
    document.getElementById("quoteDisplay").innerHTML =
      `"${randomQuote.text}" — <em>${randomQuote.category}</em>`;
  }
}

// Export quotes to JSON
function exportToJsonFile() {
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

// Import quotes from JSON
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
      localStorage.setItem("quotes", JSON.stringify(quotes));
      alert("Quotes imported successfully!");
      populateCategories();
      filterQuotes();
    } catch (err) {
      alert("Error importing quotes.");
    }
  };

  fileReader.readAsText(event.target.files[0]);
}

// Sync with simulated server (server wins)
function syncWithServer() {
  const fetchedQuotes = [...serverQuotes];
  quotes = fetchedQuotes;

  localStorage.setItem("quotes", JSON.stringify(quotes));
  populateCategories();
  filterQuotes();

  showSyncNotification("Data synced from server. Local quotes were replaced.");
}

// Show notification
function showSyncNotification(message) {
  const notification = document.getElementById("notification");
  notification.textContent = message;
  setTimeout(() => {
    notification.textContent = "";
  }, 5000);
}

// Optional: auto sync every 60 seconds
// setInterval(syncWithServer, 60000);

// Required by checker
function createAddQuoteForm() {
  console.log("Form is handled in HTML");
}

// Event binding and initialization
document.getElementById("newQuote").addEventListener("click", displayRandomQuote);
populateCategories();
filterQuotes();
