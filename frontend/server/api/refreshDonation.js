// api/refreshData.js

let cachedData = null;
let lastFetchTime = 0;
const donationUrl = "https://donation-api.roulerpouraider.fr/donations";

export default defineEventHandler(async (event) => {
  const fifteenMinutes = 15 * 60000 * 1000;
  const currentTime = Date.now();

  // Check if the cached data is older than 15 minutes
  if (!cachedData || currentTime - lastFetchTime > fifteenMinutes) {
    // Fetch new data from your API
    const response = await fetch(donationUrl);
    cachedData = await response.json(); // Correctly await the parsing of JSON
    lastFetchTime = currentTime;
  }

  // Return the cached (or newly fetched) data
  return cachedData;
});
