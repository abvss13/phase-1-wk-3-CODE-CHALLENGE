function fetchFilms() {
  fetch('https://api.npoint.io/0b2aef194151f5771a43/films/')
    .then(res => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error('Unable to fetch film data');
      }
    })
    .then(data => renderFilms(data))
    .catch(error => {
      console.log(error);
      renderErrorMessage();
    });
}

function renderFilms(data) {
  const div = document.getElementById('card');
  const ul = document.getElementById('films');

  data.forEach(movie => {
    const li = document.createElement('li');
    li.classList.add('pointer', 'bold-italic-text');
    li.innerHTML = movie.title;

    const filmCard = document.createElement("div");
    filmCard.classList.add('film-card');
    filmCard.innerHTML = `
      <img src="${movie.poster}" height="500px" width="300px"/>
      <h2 class="bold-text">${movie.title}</h2>
      <p class="bold-text">${movie.description}</p>
      <p class="film-byline">Made by ABVSS1300</p>
      <p><span class="highlight bold-text">Runtime: ${movie.runtime}</span></p>
      <p><span class="highlight bold-text">Showtime: ${movie.showtime}</span></p>
      <p class="bold-italic-text">Available tickets: ${(movie.capacity) - (movie.tickets_sold)}</p>
      <button class="buy-button">Buy ticket</button>
    `;

    li.addEventListener('click', () => {
      div.innerHTML = "";
      div.appendChild(filmCard);
      if (!filmCard.classList.contains('active')) {
        filmCard.classList.add('active');
        div.appendChild(filmCard);
      }
    });

    ul.appendChild(li);
  });
}

function renderErrorMessage() {
  const div = document.getElementById('card');
  div.innerText = "Unable to fetch film data. Please try again later.";
}

fetchFilms();
