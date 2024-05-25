import axios from "axios";
import { useEffect, useState } from "react";
import Buttons from "../../components/buttons/Buttons";
import Loading from "../../components/loading/Loading";
import Header from "../../components/header/Header";

import "../../assets/styles/movieListCards/movieListCards.css";

export default function Search() {
  const [query, setQuery] = useState("");
  const [movieList, setMovieList] = useState([]);
  const [isOpenLoading, setIsOpenLoading] = useState(true);
  const [page, setPage] = useState(1);

  async function getData(actualPage, query) {
    try {
      const apiKey = import.meta.env.VITE_FIREBASE_TMDB_API_KEY;
      const response = await axios
        .create({
          baseURL: "https://api.themoviedb.org",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
        })
        .get(`/3/search/movie?language=pt-BR&page=${actualPage}&query=${query}`);
      console.log(response);
      setMovieList(response.data.results);
      if(response.data.results == 0){
        setPage(1);
      }
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
    if (movieList.length > 0) {
      setPage((prevPage) => prevPage + 1);
      setIsOpenLoading(true);
    }
  };

  const previowsPage = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
      setIsOpenLoading(true);
    }
  };

  useEffect(() => {
    getData(page, query);
  }, [page, query]);

  return (
    <div>
      <Loading isOpen={isOpenLoading} />
      <Header />
      <div className="title__container">
        <h1 className="titlePage">Search Movie</h1>
        <div className="inputContainer">
            <input
              type="text"
              name="query"
              id="query"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="O que deseja buscar?..."
            />
          </div>
      </div>
      {movieList.length == 0 ? <div className="movieListEmpty"><p >NENHUM FILME ENCONTRADO...</p></div> :        
      <div className="movieCard">
        {movieList.map((movie, key) => (
          <div key={key} className="card" id="card">
            <div className="movieImg">
              <img
                src={"https://image.tmdb.org/t/p/w342" + movie.poster_path}
                alt=""
              />
            </div>
            <div className="movieInformation">
              <h1 className="movieTitle">Titulo: {movie.title}</h1>
              <h3 className="movieOriginalTitle">
                Titulo Original: {movie.original_title}
              </h3>
              <span className="movieDescription">{movie.overview}</span>
            </div>
            <span className="movieAverage">
              Nota {movie.vote_average.toFixed(2)}
            </span>
          </div>
        ))}
      </div>
      }
      <Buttons
        nextPage={nextPage}
        previowsPage={previowsPage}
        actualPage={page}
      />
    </div>
  );
}
