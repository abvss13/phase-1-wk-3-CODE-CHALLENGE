/* JavaScript */

// Base URL for fetching movie data
const baseUrl = "http://localhost:3000/films";

// Fetch movies and populate the film list
function fetchMovies() {
  fetch(baseUrl)
    .then((response) => response.json())
    .then((data) => {
      data.forEach((films) => {
        let li = document.createElement("li");
        li.textContent = films.title;
        li.addEventListener("click", (e) => {
          let buttonContent = document.querySelector("button#buy-ticket");
          buttonContent.textContent = "Buy Tickets";
          let title = document.getElementById("movie-title");
          title.textContent = films.title;
          let img = document.getElementById("movie-poster");
          img.src = films.poster;
          let showTime = document.getElementById("showtime");
          showTime.textContent = films.showtime;
          let runTime = document.getElementById("runtime");
          runTime.textContent = `${films.runtime} Minutes`;
          let tickets = document.querySelector("div#ticket-counter");
          tickets.textContent = films.capacity - films.tickets_sold;
        });
        document.querySelector("ul#films").appendChild(li);
      });
    });
}

// Fetch movies on page load
fetchMovies();

// Set the initial movie as the base movie
function baseMovie() {
  fetch(baseUrl)
    .then((response) => response.json())
    .then((data) => {
      document.querySelector("h3#movie-title").textContent = data[0].title;
      document
        .querySelector("img#movie-poster")
        .setAttribute("src", `${data[0].poster}`);
      document.querySelector("div#showtime").textContent = data[0].showtime;
      document.querySelector("div#runtime").textContent = `${data[0].runtime} Minutes`;
      document.querySelector("ul#films").firstElementChild.remove();
      document.querySelector("div#ticket-counter").textContent =
        data[0].capacity - data[0].tickets_sold;
    });
}

// Set the base movie on page load
baseMovie();

// Function to handle ticket purchase
function buyTicket() {
  let button = document.querySelector("button#buy-ticket");
  button.addEventListener("click", function () {
    let currentLi = document.querySelector("div#ticket-counter");
    let number = parseInt(currentLi.textContent);
    if (number > 0) {
      currentLi.textContent = currentLi.textContent - 1;
    } else {
      button.textContent = "Sold Out";
      button.style.backgroundColor = "gray";
      button.style.cursor = "not-allowed";
    }
  });
}

// Call the buyTicket function
buyTicket();
