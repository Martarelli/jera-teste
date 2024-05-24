import axios from "axios";
import { useEffect, useState } from "react";
import "../../assets/styles/dashboard/dashboard.css";

export function Dashboard() {
  const [movieList, setMovieList] = useState([]);
  const [page, setPage] = useState(1);

  async function getData() {
    try {
      const apiKey =
        "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYzFkZWYzOWYxMjUyNjI1Yjc3NjA1MjUzNTdkMmU2YiIsInN1YiI6IjY2NGZmOGU5ZmFiZmE2ZTQzYjA2ODVmYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.dCwqwYOPhgzo0zT8Nf7UzHW-7AsquSyYUssJ7C9nzug";
      const response = await axios
        .create({
          baseURL: "https://api.themoviedb.org",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
        })
        .get(`/3/movie/popular?language=pt-BR&page=${page}`);
      console.log(response);
      setMovieList(response.data.results);
    } catch (error) {
      alert(
        "Ocorreu um erro ao processar sua requisição...\nError fetching data: " +
          error.message
      );
      console.log("Error fetching data: " + error.message);
      console.log(error);
    }
  }

  useEffect(() => {
    getData();
  }, [page]);

  return (
    <div>
      <h1 className="titlePage">Filmes Populares</h1>
      <div className="movieCard">
        {movieList.map((movie, key) => (
          <div key={key} className="card" id="card">
            <h2 className="movieTitle">{movie.title}</h2>
            <span className="movieAverage">Nota {movie.vote_average.toFixed(2)}</span>
            <div className="movieImg">
              <img src={'https://image.tmdb.org/t/p/w342' + movie.poster_path} alt="" />
            </div>
          </div>
        ))}
      </div>
      <div className="buttons">
        <button onClick={() => {page > 1 ? setPage(page - 1): ''}}>Pag -</button>
        <button onClick={() => {setPage(page + 1)}}>Pag +</button>
      </div>
    </div>
  );
}
