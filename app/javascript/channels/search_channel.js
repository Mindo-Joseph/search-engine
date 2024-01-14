console.log("Hello from app/javascript/channels/search_channel.js");

import consumer from "channels/consumer";

const MINIMUM_QUERY_LENGTH = 3;
const BUFFERING_DELAY_MS = 300; // Adjust as needed

let bufferTimer;
const searchChannel = consumer.subscriptions.create("SearchChannel", {
    connected() { // Called when the subscription is ready for use on the server
    },

    disconnected() { // Called when the subscription has been terminated by the server
    },

    received(data) { // Called when there's incoming data on the WebSocket for this channel
        console.log("Received search query:", data.query);
        // You might want to call a function to handle the search data here
        handleSearchData(data.query);
    }
});

document.getElementById('search-input').addEventListener('input', function () {
  console.log("Search input changed:", this.value);
    const query = this.value.trim();

    clearTimeout(bufferTimer);

    if (query.length >= MINIMUM_QUERY_LENGTH) {
      bufferTimer = setTimeout(() => {
        searchChannel.send({command: 'search', query: query});
        }, BUFFERING_DELAY_MS);
    }
});

// Add a function to handle the search data
function handleSearchData(query) { // Implement your logic to handle the search data here
    console.log("Handling search data:", query);
    // For example, update the UI with search results
}

