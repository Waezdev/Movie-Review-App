import React, { useState, useEffect } from "react";

import { getAllMovies, getTopRatedMovies } from "../../api/movie";
import { useNotification } from "../../hooks";
import GridContainer from "../GridContainer";
import MovieList from "./MovieList";
import Container from "../Container";
import AppSearchForm from "../form/AppSearchForm";
import {useNavigate } from "react-router-dom";

export default function AllMovies() {
  const [movies, setMovies] = useState([]);
  const { updateNotification } = useNotification();

   
  const navigate = useNavigate();

  const handleSearchSubmit = (query) => {
    navigate("/movie/searchuser?genre=" + query);
  };

  const fetchMovies = async (signal) => {
    const { error, movies } = await getAllMovies("TV Series", signal);
    if (error) return updateNotification("error", error);

    setMovies([...movies]);
  };

  useEffect(() => {
    const ac = new AbortController();

    fetchMovies(ac.signal);
    return () => {
      ac.abort();
    };
  }, []);

  
  return (
    <div className="dark:bg-primary bg-white min-h-screen py-8">
        <div className="flex justify-end mb-0 mr-20">
          <AppSearchForm
            placeholder="Search By Genre.."
            onSubmit={handleSearchSubmit}
          />
        </div>
    <Container className="px-2 xl:p-0">
     <MovieList movies={movies} title="Tv-series" />
  </Container>
  </div>
  );
}
