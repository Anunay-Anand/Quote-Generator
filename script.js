// Selecting DOM elements
const quoteContainer = document.querySelector("#quote-container");
const quoteText = document.querySelector("#quote");
const authorText = document.querySelector("#author");
const twitterBtn = document.querySelector("#twitter");
const newQuoteBtn = document.querySelector("#new-quote");

// Global variable to store the fetched quotes
let apiQuotes = [];

function newQuote() {
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  quoteText.textContent = quote.text;

  // Check if author field is blank. Replace it with 'Unknown';
  if (!quote.author) {
    quote.author = "Unknown";
  }
  authorText.textContent = quote.author;

  // Check Quote length to determine it's styling
  if (quote.text.length > 120) {
    quoteText.classList.add("long-quote");
  } else {
    // If such a class was added in previous instances remove it.
    quoteText.classList.remove("long-quote");
  }
}

// Fetching data from API with axios
async function getQuotes() {
  const apiUrl = "https://type.fit/api/quotes";
  try {
    const res = await axios.get(apiUrl);
    // Stores the fetched Quotes Globally
    apiQuotes = res.data;
    // Randomly selecting new Quote
    newQuote();
  } catch (e) {
    console.log(e);
  }
}
getQuotes();
