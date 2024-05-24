import axios from "axios";
import { useEffect, useState } from "react";
import "../../assets/styles/dashboard/dashboard.css";
import Buttons from "../../components/buttons/Buttons";
import Loading from "../../components/loading/Loading";
import Header from "../../components/header/Header";

export default function Dashboard() {
  const [movieList, setMovieList] = useState([]);
  const [isOpenLoading, setIsOpenLoading] = useState(true);
  const [page, setPage] = useState(1);

  async function getData(actualPage) {
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
        .get(`/3/movie/popular?language=pt-BR&page=${actualPage}`);
      console.log(response);
      setMovieList(response.data.results);
      setTimeout(() => {
        setIsOpenLoading(false);
      }, 750);
    } catch (error) {
      alert(
        "Ocorreu um erro ao processar sua requisição...\nError fetching data: " +
          error.message
      );
      console.log("Error fetching data: " + error.message);
      console.log(error);
    }
  }

  const nextPage = () => {
    setPage((prevPage) => prevPage + 1);
    setIsOpenLoading(true);
  };

  const previowsPage = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
      setIsOpenLoading(true);
    }
  };

  useEffect(() => {
    getData(page);
  }, [page]);

  return (
    <div>
      <Loading isOpen={isOpenLoading} />
      <Header />
      <div className="title__container">
        <h1 className="titlePage">Filmes Populares</h1>
      </div>
      <div className="movieCard">
        {movieList.map((movie, key) => (
          <div key={key} className="card" id="card">
            <h2 className="movieTitle">{movie.title}</h2>
            <span className="movieAverage">
              Nota {movie.vote_average.toFixed(2)}
            </span>
            <div className="movieImg">
              <img
                src={"https://image.tmdb.org/t/p/w342" + movie.poster_path}
                alt=""
              />
            </div>
          </div>
        ))}
      </div>
      <Buttons
        nextPage={nextPage}
        previowsPage={previowsPage}
        actualPage={page}
      />
    </div>
  );
}
