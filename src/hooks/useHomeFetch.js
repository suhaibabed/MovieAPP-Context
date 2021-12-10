import React, { useState, useEffect } from "react";

//API
import API from "../API";

const initalState = {
  pages: 0, 
  results: [],
  total_pages: 0,
  total_results: 0,
};

export const useHomeFetch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [state, setState] = useState(initalState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
 const [isLoadingMore, setIsLoadingMore] = useState(false);


  const fetchMovies = async (page, searchTerm = "") => {
    try {
      setError(false);
      setLoading(true);

      const movies = await API.fetchMovies(searchTerm, page);
      // console
      setState((prev) => ({
        ...movies,
        result:
          page > 1 ? [...prev.results, ...movies.results] : [...movies.results],
      }));
    } catch (error) {
      setError(true);
    }
    setLoading(false);
  };
  //search
  useEffect(()=>{
    setState(initalState);
    fetchMovies(1, searchTerm);
  },[searchTerm]);

  //Load More
  useEffect(()=>{
    if(!isLoadingMore) return;
    fetchMovies(state.page +1, searchTerm);
    setIsLoadingMore(false);
  },[isLoadingMore, searchTerm, state.page])

  return { state, loading, error, setSearchTerm, searchTerm, setIsLoadingMore};

  //if you want to disappear the hero image when search  just call searchTerm
};
