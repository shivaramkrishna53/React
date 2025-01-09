import { useEffect, useRef, useState } from 'react';
import StarRating from './StarRating';
import { useMovies } from './useMovies';
import { useLocalStorageState } from './useLocalStorageState';
import { useKey } from './useKey';

const tempMovieData = [
  {
    imdbID: 'tt1375666',
    Title: 'Inception',
    Year: '2010',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg',
  },
  {
    imdbID: 'tt0133093',
    Title: 'The Matrix',
    Year: '1999',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg',
  },
  {
    imdbID: 'tt6751668',
    Title: 'Parasite',
    Year: '2019',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg',
  },
];

const tempWatchedData = [
  {
    imdbID: 'tt1375666',
    Title: 'Inception',
    Year: '2010',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg',
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: 'tt0088763',
    Title: 'Back to the Future',
    Year: '1985',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg',
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

const KEY = '54508a77';

export default function App() {
  // const [watched, setWatched] = useState([]);
  const [watched, setWatched] = useLocalStorageState([], 'watched');
  const [selectedmovieid, setSelectedMovieId] = useState('');
  const [query, setQuery] = useState('');

  // useEffect(function () {
  //   fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=${query}`)
  //     .then((res) => res.json())
  //     .then((data) => setMovies(data.Search));
  // }, []);

  const { movies, isloading, error } = useMovies(query);

  function addSelectedMovieToWatchedList(movie) {
    setWatched((watched) => [...watched, movie]);
    console.log(watched);
  }

  function handleSelectedMovieId(id) {
    console.log('the id u are getting is:::' + id);
    setSelectedMovieId((selectedidprev) => (selectedidprev === id ? null : id));
  }

  function onCloseBtn() {
    setSelectedMovieId(null);
  }

  function handleWatchedDelete(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbid !== id));
  }

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
        <Logo />
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
              {' '}
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

function Logo() {
  return (
    <div className="logo">
      <span role="img">🍿</span>
      <h1>usePopcorn</h1>
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
        {isOpen ? '–' : '+'}
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
          key={movie.imdbid}
          movie={movie}
          handleSelectedMovieId={handleSelectedMovieId}
        />
      ))}
    </ul>
  );
}

function DisplayMovie({ movie, handleSelectedMovieId }) {
  return (
    <li onClick={() => handleSelectedMovieId(movie.imdbid)}>
      <img src={movie.poster} alt={`${movie.title} poster`} />
      <h3>{movie.title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.year}</span>
        </p>
      </div>
    </li>
  );
}

function MoviesSummary({ watched }) {
  const avgImdbRating = average(watched.map((movie) => movie.imdbrating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));
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
          <span>{avgRuntime.toFixed(2)} min</span>
        </p>
      </div>
    </div>
  );
}

function WatchedMoviesList({ watched, handleWatchedDelete }) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <li key={movie.imdbid}>
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
      <img src={movie.poster} alt={`${movie.title} poster`} />
      <h3>{movie.title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbrating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>
        <button
          className="btn-delete"
          onClick={() => handleWatchedDelete(movie.imdbid)}
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
  const [userRating, SetUserRating] = useState('');
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
          `http://localhost:8082/imdb/getmoviedetailedinfo?imdbid=${selectedmovieid}`
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
        document.title = 'usePopcorn';
        console.log(`Clean up effect for the movie ${title}`);
      };
    },
    [title]
  );

  useKey('Escape', onCloseBtn);

  useKey('Enter', function () {
    console.log('Pressed Enter key succesfully');
  });

  // useEffect(
  //   function () {
  //     const EscapeHandler = (e) => {
  //       if (e.code === "Escape") {
  //         onCloseBtn();
  //         console.log("Pressed Escape key Closing");
  //       }
  //     };

  //     document.addEventListener("keydown", EscapeHandler);

  //     // the below function gets executed on Unmount and on rerender
  //     return function () {
  //       document.removeEventListener("keydown", EscapeHandler);
  //     };
  //   },
  //   [onCloseBtn]
  // );

  let moviepresent = watchedMovies.find(
    (movie) => movie.movieid === selectedmovieid
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
              src={movie.poster}
              alt={`the Poster of  ${movie.title} movie`}
            />

            <div className="details-overview">
              <h2>{movie.title}</h2>
              <p>
                {movie.released} &bull; {movie.runtime} mins
              </p>
              <p>{movie.genre}</p>
              <p>
                <span>⭐</span>
                {movie.imdbrating} IMDb Rating
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
                          imdbid: movie.movie.imdbid,
                          userRating,
                          Runtime: Number(movie.runtime),
                          countstarchangetimes: countstarchange.current,
                          countnormalvar: count,
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
                  You have already rated the Movie with{' '}
                  {moviepresent?.userRating} <span>⭐</span>
                </p>
              )}
            </div>
            <p>
              <em>{movie.plot}</em>
            </p>
            <p>Starring {movie.actors}</p>
            <p>Directed by {movie.director}</p>
          </section>
        </>
      )}
    </div>
  );
}
