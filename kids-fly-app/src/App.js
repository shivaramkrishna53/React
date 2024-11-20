import "./Styles.css";
import { useState } from "react";
function App() {
  let MoviesList = [
    {
      name: "bahubali2",
      director: "rajmouli",
      rating: 9.5,
      year: 2018,
      votes: 100,
    },
    {
      name: "dangal",
      director: "rajkumar hirani",
      rating: 9.4,
      year: 2015,
      votes: 90,
    },
    {
      name: "kgf2",
      director: "Prasanth Neel",
      rating: 9.2,
      year: 2022,
      votes: 150,
    },
    {
      name: "rrr",
      director: "Rajmouli",
      rating: 9.0,
      year: 2023,
      votes: 250,
    },
    {
      name: "jawan",
      director: "athley",
      rating: 8.0,
      year: 2024,
      votes: 50,
    },
    {
      name: "animal",
      director: "sandeep vanga",
      rating: 6.2,
      year: 2024,
      votes: 110,
    },
  ];
  let [movies, setMovies] = useState(MoviesList);
  return (
    <div>
      <ImdbMovies movies={movies} setMovies={setMovies} />
    </div>
  );
}

function ImdbMovies({ movies, setMovies }) {
  let [shoulddisplaymovies, setShouldDisplayMovies] = useState(false);
  let [shouldeditmovie, setShouldEditMovie] = useState(false);
  let [addnewmovieflag, setAddNewMovieFlag] = useState(false);
  let [deletemovieflag, setDeleteMovieFlag] = useState(false);
  return (
    <div>
      <center>
        <h1>Welcome to IMDb</h1>
        <button
          onClick={() => {
            setShouldDisplayMovies((x) => !x);
          }}
        >
          {shoulddisplaymovies
            ? "Hide IMDB Movies🎥 List ⬆️"
            : "Show IMDB Movies🎥 List⬇️"}
        </button>
        {shoulddisplaymovies && <RenderMovies movies={movies} />}
        <br></br>
        <button onClick={() => setShouldEditMovie((x) => !x)}>
          {shouldeditmovie ? "Close Edit❌" : "Edit🖊️ details of a Movie🎥"}
        </button>
        <br></br>
        <button onClick={() => setAddNewMovieFlag((x) => !x)}>
          Add New Movie🎥 to IMDB
        </button>
        <button onClick={() => setDeleteMovieFlag((x) => !x)}>
          Add Delete ❌ a Movie🎥 From List
        </button>
        {shouldeditmovie && (
          <EditMovie
            movies={movies}
            setMovies={setMovies}
            setShouldEditMovie={setShouldEditMovie}
          />
        )}
        {addnewmovieflag && (
          <AddNewMovie
            setMovies={setMovies}
            setAddNewMovieFlag={setAddNewMovieFlag}
          />
        )}
        {deletemovieflag && (
          <DeleteMovie
            setMovies={setMovies}
            movies={movies}
            setDeleteMovieFlag={setDeleteMovieFlag}
          />
        )}
      </center>
    </div>
  );
}

function RenderMovies({ movies }) {
  let [sortmovies, SetSortMovies] = useState("name");
  let sortedlist = [];

  if (sortmovies === "name") {
    sortedlist = movies.slice().sort((a, b) => a.name.localeCompare(b.name));
  }
  if (sortmovies === "rating") {
    sortedlist = movies.slice().sort((a, b) => a.rating - b.rating);
  }
  if (sortmovies === "year") {
    sortedlist = movies.slice().sort((a, b) => a.year - b.year);
  }
  if (sortmovies === "votes") {
    sortedlist = movies.slice().sort((a, b) => a.votes - b.votes);
  }

  return (
    <div>
      <br></br>
      <label>How do you want to sort🔃 the order: </label>
      <select
        value={sortmovies}
        onChange={(e) => SetSortMovies(e.target.value)}
      >
        <option value="name">name</option>
        <option value="rating">rating</option>
        <option value="year">year</option>
        <option value="votes">votes</option>
      </select>
      <br></br>
      {sortedlist.map((movie) => (
        <DisplayMovie movie={movie} />
      ))}
    </div>
  );
}

function DisplayMovie({ movie }) {
  return (
    <div>
      <h3>Name of Movie:: {movie.name}</h3>
      <h3>Name of director:: {movie.director}</h3>
      <h3>Year of Movie Release:: {movie.year}</h3>
      <h3>Movie Rating:: {movie.rating}</h3>
      <h3>Movie Votes:: {movie.votes}</h3>

      <br></br>
      <h3>========================</h3>
    </div>
  );
}

function EditMovie({ movies, setMovies, setShouldEditMovie }) {
  let [movietobeedited, SetMovieToBeEdited] = useState("");
  let [editflag, setEditFlag] = useState(false);
  let [answerflag, setAnswerFlag] = useState(false);
  function handleEditMovie() {
    let moviefromlist = movies
      .slice()
      .filter((m) => m.name === movietobeedited);

    if (moviefromlist.length > 0) {
      setEditFlag(true);
      setAnswerFlag(false);
    } else setAnswerFlag(true);
  }
  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleEditMovie();
        }}
      >
        <label>Enter the Name of the Movie which You want to Edit:</label>
        <input
          type="text"
          value={movietobeedited}
          onChange={(e) => SetMovieToBeEdited(e.target.value)}
        />
        <button>Fetch Details</button>
        <br></br>
        <br></br>
        <br></br>
        {answerflag && (
          <h5 style={{ color: "red" }}>The movie name dosen't exist!</h5>
        )}
        {editflag && (
          <EditNow
            moviename={movietobeedited}
            movieslst={movies}
            setMovies={setMovies}
            setShouldEditMovie={setShouldEditMovie}
          />
        )}
      </form>
    </div>
  );
}

function EditNow({ moviename, movieslst, setMovies, setShouldEditMovie }) {
  let movieextractedfromlist = movieslst
    .slice()
    .filter((m) => m.name === moviename);
  console.log("Extractedmovie::", movieextractedfromlist);
  console.log("director::", movieextractedfromlist.director);
  let [director, setDirector] = useState(movieextractedfromlist[0]?.director);
  let [rating, setRating] = useState(movieextractedfromlist[0]?.rating);
  let [year, setYear] = useState(movieextractedfromlist[0]?.year);
  let [votes, setVotes] = useState(movieextractedfromlist[0]?.votes);
  return (
    <div>
      <label>Movie Name: </label>
      <input type="text" value={moviename} disabled></input>
      <br />
      <label>Director Name:</label>
      <input
        type="text"
        value={director}
        onChange={(e) => setDirector(e.target.value)}
      ></input>
      <br></br>
      <label>Rating:</label>
      <input
        type="text"
        value={rating}
        onChange={(e) => setRating(e.target.value)}
      ></input>
      <br></br>
      <label>Year:</label>
      <input
        type="text"
        value={year}
        onChange={(e) => setYear(e.target.value)}
      ></input>
      <br></br>
      <label>Votes:</label>
      <input
        type="text"
        value={votes}
        onChange={(e) => setVotes(e.target.value)}
      ></input>
      <br></br>
      <button onClick={updateMoviesLst}>Update Now!</button>
    </div>
  );
  function updateMoviesLst() {
    let updatedMovieDetails = {
      name: moviename,
      director,
      rating,
      year,
      votes,
    };
    setMovies((lst) =>
      lst.map((m) => (m.name === moviename ? updatedMovieDetails : m))
    );
    setShouldEditMovie(false);
  }
}

function AddNewMovie({ setMovies, setAddNewMovieFlag }) {
  let [name, setName] = useState("");
  let [director, setDirector] = useState("");
  let [rating, setRating] = useState("");
  let [year, setYear] = useState("");
  let [votes, setVotes] = useState("");

  return (
    <div>
      <label>Movie Name: </label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      ></input>
      <br />
      <label>Director Name:</label>
      <input
        type="text"
        value={director}
        onChange={(e) => setDirector(e.target.value)}
      ></input>
      <br></br>
      <label>Rating:</label>
      <input
        type="text"
        value={rating}
        onChange={(e) => setRating(e.target.value)}
      ></input>
      <br></br>
      <label>Year:</label>
      <input
        type="text"
        value={year}
        onChange={(e) => setYear(e.target.value)}
      ></input>
      <br></br>
      <label>Votes:</label>
      <input
        type="text"
        value={votes}
        onChange={(e) => setVotes(e.target.value)}
      ></input>
      <br></br>
      <button onClick={(e) => handleAddingMovie(e)}>Add Now!</button>
    </div>
  );
  function handleAddingMovie(e) {
    e.preventDefault();
    let newMovie = {
      name,
      director,
      rating,
      year,
      votes,
    };
    setMovies((movieslst) => [...movieslst, newMovie]);
    setAddNewMovieFlag(false);
  }
}

function DeleteMovie({ setMovies, movies, setDeleteMovieFlag }) {
  let [movietobedeleted, setMovieToBeDeleted] = useState("");
  let [moviedosentpresentinlist, setMovieDosentPresentInList] = useState(false);
  return (
    <div>
      <label>Enter the Movie to be Deleted From List:</label>
      <br></br>
      <input
        type="text"
        value={movietobedeleted}
        onChange={(e) => setMovieToBeDeleted(e.target.value)}
      />
      <br></br>
      <button onClick={(e) => handleDelete(e)}>Delete Now!</button>
      <br></br>
      {moviedosentpresentinlist ? (
        <h3 style={{ color: "red" }}>
          Movie is Not found in the List... in Order to delete it!
        </h3>
      ) : (
        ""
      )}
    </div>
  );
  function handleDelete(e) {
    e.preventDefault();
    let moviefiltered = movies
      .slice()
      .filter((m) => m.name === movietobedeleted);

    if (moviefiltered.length > 0) {
      setMovies((movies) => movies.filter((m) => m.name !== movietobedeleted));
      setMovieDosentPresentInList(false);
      setDeleteMovieFlag(false);
    } else setMovieDosentPresentInList(true);
  }
}

export default App;
