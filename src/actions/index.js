import axios from 'axios';

const API_KEY = 'd34e86322c1168ed462a6ef93301e5eb';
const ROOT_URL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}`
const DETAIL_URL = `https://api.themoviedb.org/3/movie/`

export const FETCH_MOVIES = 'FETCH_MOVIES';
export const FETCH_MOVIE_DETAILS = 'FETCH_MOVIE_DETAILS'

export function fetchMovies(movie){

	const url = `${ROOT_URL}&query=${movie}`;
	const request = axios.get(url);
	
	return {
		type: FETCH_MOVIES,
		payload: request
	};
}

export function fetchMovieDetails(id){

	const url = `${DETAIL_URL}${id}?api_key=${API_KEY}`;
	const request = axios.get(url);
	
	
	return {
		type: FETCH_MOVIE_DETAILS,
		payload: request
	};
}