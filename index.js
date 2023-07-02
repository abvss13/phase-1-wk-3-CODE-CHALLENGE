document.addEventListener("DOMContentLoaded", () => {
    fetch("https://al-hajjar.github.io/flatdangocodechallenge/db.json")
      .then((res) => res.json())
      .then((data) => {
        movieList(data.films);
      });

      function movieList(data) {
        const moviesList = document.getElementById("moviesList");

        data.forEach((movie) => {
            const listItem = document.createElement("li");
            listItem.classList.add("movie");
            listItem.innerText = movie.title;
            moviesList.appendChild(listItem);

            listItem.addEventListener("click", () => {
                displayMovie(movie);
              });
            });
          }     

          function displayMovie(movie) {
            const movieName = document.getElementById("name");
            const movieImage = document.getElementById("poster");
            const description = document.getElementById("description");
            const runTime = document.getElementById("runtime");
            const showTime = document.getElementById("showtime");
            const capacity = document.getElementById("capacity");
            const sold = document.getElementById("sold");
            const available = document.getElementById("available");

            const availableTickets = movie.capacity - movie.tickets_sold;

    movieName.textContent = movie.title;
    movieImage.src = movie.poster;
    description.textContent = movie.description;
    runTime.textContent = movie.runtime + " min";
    showTime.textContent = movie.showtime;
    capacity.textContent = movie.capacity + " seats";
    sold.textContent = movie.tickets_sold + " tickets";
    available.textContent = availableTickets + " tickets";

    displayTicketPurchaseInfo(availableTickets);
  }