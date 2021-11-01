// Selecting DOM elements
const quoteContainer = document.querySelector("#quote-container");
const quoteText = document.querySelector("#quote");
const authorText = document.querySelector("#author");
const twitterBtn = document.querySelector("#twitter");
const newQuoteBtn = document.querySelector("#new-quote");
const loader = document.querySelector("#loader");

// Show loading
function loading() {
  // We will use the hidden attribute pre defined on all DOM elements
  loader.hidden = false;
  quoteContainer.hidden = true;
}

// Hide Loading
function complete() {
  loader.hidden = true;
  quoteContainer.hidden = false;
}

// Global variable to store the fetched quotes
let apiQuotes = [];

function newQuote() {
  // Start loading
  loading();
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

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
  quoteText.textContent = quote.text;
  // Stop loading
  complete();
}

// Fetching data from API with axios
async function getQuotes() {
  // Start Loading
  loading();
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

// Tweet the Quote (Web Intent)
// Facebook, Instagram probably has similar lines of code for automated filling
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, "_blank");
}

// Event listeners
twitterBtn.addEventListener("click", tweetQuote);
newQuoteBtn.addEventListener("click", newQuote);

// On Load
getQuotes();
