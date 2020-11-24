//www.omdbapi.com/?apikey=[5daa4084]&
let inputbox = document.getElementById("title");
let btn = document.getElementById("send");
let info = document.getElementById("info");

function movieData(x) {
  fetch("http://www.omdbapi.com/?s=" + x + "&apikey=5daa4084")
    .then((response) => response.json())
    .then((result) => {
      let searchResult = result.Search;
      for (let i = 0; i < searchResult.length; i++) {
        new Movie(searchResult[i]);
      }
    });
}

function removeList() {
  let list = document.querySelectorAll("li");
  list.forEach((element) => {
    element.remove();
  });
}

btn.addEventListener("click", function (e) {
  removeList();
  movieData(inputbox.value);
});

class Movie {
  constructor(movieInfo) {
    let item = document.createElement("li");
    info.appendChild(item);
    item.innerHTML = movieInfo.Title;
    this.knapp = document.createElement("button");
    this.knapp.innerHTML = "Handling";
    item.appendChild(this.knapp);

    let imdb = movieInfo.imdbID;

    fetch("http://www.omdbapi.com/?i=" + imdb + "&apikey=5daa4084")
      .then((response) => response.json())
      .then((result) => {
        let moviePage = result;
        let container = document.createElement("div");
        let plot = document.createElement("p");
        let image = new Image();
        image.src = moviePage.Poster;

        item.appendChild(container);
        container.appendChild(plot);
        container.appendChild(image);
        //console.log(moviePage);

        if (moviePage.Plot === "N/A") {
          plot.innerHTML = "Ingen handning tillgänglig";
        } else {
          plot.innerHTML = moviePage.Plot;
        }
        //image.innerHTML = moviePage.Poster;

        container.classList.add("hide");
        this.knapp.addEventListener("click", function (e) {
          container.classList.toggle("hide");
        });
      });
  }
}
