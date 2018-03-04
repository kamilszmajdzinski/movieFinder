import { combineReducers } from 'redux';
import MoviesReducer from './reducer_movies';
import DetailsReducer from './reducer_movie_details';

const rootReducer = combineReducers({
  movies: MoviesReducer,
  details: DetailsReducer

});

export default rootReducer;
