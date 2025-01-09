import { useState, useEffect } from 'react';

// custom hook, A custom hook is nothing but similar to js function which needs to use atleast one or more hook (useState or useEffect or useRef) and will can return the needed one.

export function useMovies(query) {
  const KEY = '54508a77';
  const [movies, setMovies] = useState([]);
  const [isloading, setIsloading] = useState(false);
  const [error, setError] = useState('');

  useEffect(
    function () {
      const controller = new AbortController();

      async function fetchMovies() {
        try {
          setIsloading(true);
          setError('');
          const res = await fetch(
            `http://localhost:8082/imdb/getallmovies/matchingname?movie=${query}`
          );

          const data = await res.json();

          if (data.response === 'False') {
            throw new Error(
              'Invalid Movie Name,Please Enter a Valid Movie Name'
            );
          }

          setMovies(data.search);
          setIsloading(false);
          console.log(data.search);
        } catch (error) {
          if (error.name !== 'AbortError') {
            setError(error.message);
            setIsloading(false);
            setMovies([]);
            console.log(error.message);
          }
        }
      }
      if (query?.length < 3) {
        setMovies([]);
        return;
      }
      //   onCloseBtn();
      fetchMovies();

      //the below is the code cleanup or http request canceller which exceutes onUnmount or onredering()
      return function () {
        controller.abort();
      };
    },
    [query]
  );

  return { movies, isloading, error };
}
