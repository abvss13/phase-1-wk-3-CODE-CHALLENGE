document.addEventListener("DOMContentLoaded", () => {
    fetch("https://al-hajjar.github.io/flatdangocodechallenge/db.json")
      .then((res) => res.json())
      .then((data) => {
        movieList(data.films);
      });