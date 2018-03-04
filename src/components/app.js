import React, { Component } from 'react';
import SearchBar from '../containers/search_bar';
import MovieList from '../containers/movie_list';

export default class App extends Component {
  render() {
    return (
      <div>
      	<SearchBar />
      	<MovieList />
      </div>
    );
  }
}
