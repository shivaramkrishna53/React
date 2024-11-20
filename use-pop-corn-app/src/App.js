import { useEffect, useRef, useState } from "react";
import StarRating from "./StarRating";

const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];

const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

const KEY = "54508a77";

export default function App() {
  const [movies, setMovies] = useState([]);
  // const [watched, setWatched] = useState([]);
  const [watched, setWatched] = useState(function () {
    const datafromlocalstorage = localStorage.getItem("watched");
    return JSON.parse(datafromlocalstorage);
  });
  const [isloading, setIsloading] = useState(false);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [selectedmovieid, setSelectedMovieId] = useState("");

  // useEffect(function () {
  //   fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=${query}`)
  //     .then((res) => res.json())
  //     .then((data) => setMovies(data.Search));
  // }, []);

  function addSelectedMovieToWatchedList(movie) {
    setWatched((watched) => [...watched, movie]);
  }

  function handleSelectedMovieId(id) {
    console.log("the id u are getting is:::" + id);
    setSelectedMovieId((selectedidprev) => (selectedidprev === id ? null : id));
  }

  function onCloseBtn() {
    setSelectedMovieId(null);
  }

  function handleWatchedDelete(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }

  useEffect(
    function () {
      localStorage.setItem("watched", JSON.stringify(watched));
    },
    [watched]
  );

  useEffect(
    function () {
      const controller = new AbortController();

      async function fetchMovies() {
        try {
          setIsloading(true);
          setError("");
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
            { signal: controller.signal }
          );
          if (!res.ok) {
            console.log("inside if condition");
            throw new Error("You are offline,Please be Online");
          }

          const data = await res.json();

          if (data.Response === "False") {
            throw new Error(
              "Invalid Movie Name,Please Enter a Valid Movie Name"
            );
          }

          setMovies(data.Search);
          setIsloading(false);
          console.log(data.Search);
        } catch (error) {
          if (error.name !== "AbortError") {
            setError(error.message);
            setIsloading(false);
            setMovies([]);
            console.log(error.message);
          }
        }
      }
      if (query.length < 3) {
        setMovies([]);
        return;
      }
      onCloseBtn();
      fetchMovies();

      //the below is the code cleanup or http request canceller which exceutes onUnmount or onredering()
      return function () {
        controller.abort();
      };
    },
    [query]
  );

  // useEffect(function () {
  //   console.log("for every render parameter is empty");
  // });

  // useEffect(function () {
  //   console.log("only for the first render or first Mount");
  // }, []);

  // useEffect(
  //   function () {
  //     console.log("Executes whenever query is updated");
  //   },
  //   [query]
  // );

  // console.log("For Every Render");

  return (
    <>
      <NavBar>
        <Logo setError={setError} />
        <Search query={query} setQuery={setQuery} />
        <MovieCount movies={movies} />
      </NavBar>

      <main className="main">
        <Box>
          {isloading && <Loader />}
          {error && <DisplayError errormsg={error} />}
          {!isloading && !error && (
            <ListOfDisplayMovies
              movies={movies}
              handleSelectedMovieId={handleSelectedMovieId}
            />
          )}
        </Box>

        <Box>
          {selectedmovieid ? (
            <DisplaySelectedMovie
              selectedmovieid={selectedmovieid}
              addSelectedMovieToWatchedList={addSelectedMovieToWatchedList}
              watchedMovies={watched}
              onCloseBtn={onCloseBtn}
            />
          ) : (
            <>
              {" "}
              <MoviesSummary watched={watched} />
              <WatchedMoviesList
                watched={watched}
                handleWatchedDelete={handleWatchedDelete}
              />
            </>
          )}
        </Box>
      </main>
    </>
  );
}

function NavBar({ children }) {
  return <nav className="nav-bar">{children}</nav>;
}

function Logo({ setError }) {
  return (
    <div className="logo">
      <span role="img">🍿</span>
      <h1>usePopcorn</h1>
      <span>
        <button onClick={(e) => setError("")}>❌</button>
      </span>
    </div>
  );
}

function Search({ query, setQuery }) {
  const inputele = useRef(null);

  useEffect(function () {
    inputele.current.focus();
  }, []);

  // useEffect(function () {
  //   let inputele = document.querySelector(".search");
  //   inputele.focus();
  // }, []);

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={inputele}
    />
  );
}

function MovieCount({ movies }) {
  return (
    <p className="num-results">
      Found <strong>{movies.length}</strong> results
    </p>
  );
}

function Box({ children }) {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="box">
      <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? "–" : "+"}
      </button>
      {isOpen && children}
    </div>
  );
}

function Loader() {
  return <p className="loader">Loading...</p>;
}

function DisplayError({ errormsg }) {
  return (
    <p className="error">
      <span>❌</span>
      {errormsg}
    </p>
  );
}

function ListOfDisplayMovies({ movies, handleSelectedMovieId }) {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <DisplayMovie
          key={movie.imdbID}
          movie={movie}
          handleSelectedMovieId={handleSelectedMovieId}
        />
      ))}
    </ul>
  );
}

function DisplayMovie({ movie, handleSelectedMovieId }) {
  return (
    <li onClick={() => handleSelectedMovieId(movie.imdbID)}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}

function MoviesSummary({ watched }) {
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.Runtime));
  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating.toFixed(2)}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating.toFixed(2)}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime} min</span>
        </p>
      </div>
    </div>
  );
}

function WatchedMoviesList({ watched, handleWatchedDelete }) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <li key={movie.imdbID}>
          <DisplayEachWatchedMovie
            movie={movie}
            handleWatchedDelete={handleWatchedDelete}
          />
        </li>
      ))}
    </ul>
  );
}

function DisplayEachWatchedMovie({ movie, handleWatchedDelete }) {
  return (
    <>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.Runtime} min</span>
        </p>
        <button
          className="btn-delete"
          onClick={() => handleWatchedDelete(movie.imdbID)}
        >
          X
        </button>
      </div>
    </>
  );
}

function DisplaySelectedMovie({
  selectedmovieid,
  onCloseBtn,
  addSelectedMovieToWatchedList,
  watchedMovies,
}) {
  const [movie, SetMovie] = useState({});
  const [isloading, setIsloading] = useState(false);
  const [userRating, SetUserRating] = useState("");
  const { Title: title, imdbRating } = movie;

  // you should never place the hooks or return in conditional statements or loops, as it results in rendering more/less hooks than previous render.
  // /* eslint-disable */
  // if (movie?.imdbRating > 8) return <p>The movie has good review</p>;

  // /* eslint-disable */
  // if (movie?.imdbRating > 8) [istopimdb, setIstopimdb] = useState(true);

  // const [isagoodMovie, SetIsagoodmovie] = useState(imdbRating > 8);

  // useEffect(
  //   function () {
  //     SetIsagoodmovie(imdbRating > 8);
  //   },
  //   [imdbRating]
  // );

  // const isagoodMovie = imdbRating > 8;

  // console.log(isagoodMovie);

  // const [avgrating, SetAvgrating] = useState(0);

  // SetAvgrating((movie?.imdbRating + userRating) / 2);
  // const [avgratng, Setavgratng] = useState(0);

  let count = 0;
  const countstarchange = useRef(0);

  useEffect(
    function () {
      if (userRating) {
        countstarchange.current++;
        count++;
      }
    },
    [userRating, count]
  );

  useEffect(
    function () {
      async function getSelectedMovieFromImdb() {
        setIsloading(true);
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&i=${selectedmovieid}`
        );
        const movieobj = await res.json();
        console.log(movieobj);
        SetMovie(movieobj);
        setIsloading(false);
      }
      getSelectedMovieFromImdb();
    },
    [selectedmovieid]
  );

  useEffect(
    function () {
      document.title = `Movie | ${title}`;

      //inorder to execute the cleanup code you need to define a function here which
      //will be executed when the component gets unmounted.

      return function () {
        document.title = "usePopcorn";
        console.log(`Clean up effect for the movie ${title}`);
      };
    },
    [title]
  );

  useEffect(
    function () {
      const EscapeHandler = (e) => {
        if (e.code === "Escape") {
          onCloseBtn();
          console.log("Pressed Escape key Closing");
        }
      };

      document.addEventListener("keydown", EscapeHandler);

      // the below function gets executed on Unmount and on rerender
      return function () {
        document.removeEventListener("keydown", EscapeHandler);
      };
    },
    [onCloseBtn]
  );

  let moviepresent = watchedMovies.find(
    (movie) => movie.imdbID === selectedmovieid
  );

  return (
    <div className="details">
      {isloading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={() => onCloseBtn()}>
              &larr;
            </button>
            <img
              src={movie.Poster}
              alt={`the Poster of  ${movie.Title} movie`}
            />

            <div className="details-overview">
              <h2>{movie.Title}</h2>
              <p>
                {movie.Released} &bull; {movie.Runtime}
              </p>
              <p>{movie.Genre}</p>
              <p>
                <span>⭐</span>
                {movie.imdbRating} IMDb Rating
              </p>
              {/* <p>{avgratng}</p> */}
            </div>
          </header>

          <section>
            <div className="rating">
              {!moviepresent ? (
                <>
                  <StarRating
                    size={24}
                    maxrating={10}
                    color="yellow"
                    changeTestRating={SetUserRating}
                  />

                  {userRating && (
                    <button
                      className="btn-add"
                      onClick={() => {
                        addSelectedMovieToWatchedList({
                          ...movie,
                          userRating,
                          Runtime: Number(movie.Runtime.split(" ").at(0)),
                          countstarchange,
                          count,
                        });
                        // Setavgratng(Number(imdbRating));
                        // Setavgratng((x) => (x + userRating) / 2);
                        // alert(avgratng);
                        // console.log(avgratng);
                        onCloseBtn();
                      }}
                    >
                      + Add to List
                    </button>
                  )}
                </>
              ) : (
                <p>
                  You have already rated the Movie with{" "}
                  {moviepresent?.userRating} <span>⭐</span>
                </p>
              )}
            </div>
            <p>
              <em>{movie.Plot}</em>
            </p>
            <p>Starring {movie.Actors}</p>
            <p>Directed by {movie.Director}</p>
          </section>
        </>
      )}
    </div>
  );
}