import React, { Component } from 'react';
import { connect } from 'react-redux';
import MovieListItem from './movie_list_item';
import { Button } from 'reactstrap';


class MovieList extends Component {
	constructor(props){
		super(props);
		this.state = {listSorted: false};
	}
	

	renderMovie(movieData){
		return(
				<MovieListItem 
					title = {movieData.title}
					releaseDate = {movieData.release_date}
					poster = {movieData.poster_path}
					popularity = {movieData.popularity}
					voteCount = {movieData.vote_count}
					voteAverage = {movieData.vote_average}
					id = {movieData.id}
					key = {movieData.id}
				/>
			)
	}

	sortMovies(movies){
		this.setState({listSorted: true});
		movies.sort(dynamicSort("title"));
		movies.map(this.renderMovie);
	}	



	render(){
		const movies = this.props.movies.results;
		return (
			<div>
			{this.props.movies.results ? (
				<div>
					<div>
						{this.props.movies.results.length !== 0 && <Button type="button" className="btn btn-link" onClick = {() => this.sortMovies(movies)}>Sortuj</Button>}
					</div>
					<div>
					<table className = "table">
					<thead className = "thead-dark"> 
					</thead>
					<tbody> 
						{this.props.movies.results.length === 0 ?
							(<div className = "info">Brak wyników</div>
								):(
								this.state.listSorted ? 
								(this.props.movies.results.map(this.renderMovie)
									):(
								this.props.movies && this.props.movies.results && this.props.movies.results.map(this.renderMovie)
								)
							)}
							
						
					</tbody>
					</table>
				</div>
				</div>
				):(
					<div>
						<p className = "info">Wpisz tytuł interesującego Cię filmu...  </p>
						<p id = "bottom" className = "info">Kliknij na wynik wyszukiwania aby uzyskać szczegółowe informacje o filmie...  </p>
					</div>
				)}
			</div>
		)
	}


}

		function dynamicSort(property) {
    var sortOrder = 1;
    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a,b) {
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
}

function mapStateToProps({ movies }){
	
	return { movies };
}

export default connect(mapStateToProps)(MovieList);

