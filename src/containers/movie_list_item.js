import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchMovieDetails} from '../actions/index';
import Modal from 'react-responsive-modal';


class MovieListItem extends Component{
   
	constructor(props){
		super(props);
		this.state = {
			detailsClicked: false,
			title: props.title,
			releaseDate: props.releaseDate,
			poster: props.poster,
			popularity: props.popularity,
			voteCount: props.voteCount,
			voteAverage: props.voteAverage,
			id: props.id,
			popoverOpen: false,
			open: false
		}


		this.getDetails = this.getDetails.bind(this);
		
		
	}

	getDetails(event){
			this.props.fetchMovieDetails(this.state.id);
			if(this.props.details.overview){
			this.setState({
      			open: true
    		});
 		}
	}

	closeModal = () => {
		this.setState({ open: false });
	}

	
	renderGenres(genre){
		return(
				<li key = {genre.id} > {genre.name} </li>
			)
	}

	renderCountries(country){
		return(
				<li key = {country.iso_3166_1} > {country.name} </li>
			)
	}
	renderCompany(company){
		return(
				<li key = {company.id} > {company.name} </li>
				
			)
	}
	
	render(){
		
		
		const POSTER_URL = `https://image.tmdb.org/t/p/w500${this.state.poster}`;
		const { open } = this.state;
		const year = this.state.releaseDate.split("-", 1);
		const IMDB_URL = `http://www.imdb.com/search/title?title=${this.props.details.title}&release_date=${year}-01-01,${year}-12-31`;
			return(


				<tr onClick = {this.getDetails} > 
				
					<td> 
					 			{this.state.poster ? (
					 					<img src = {POSTER_URL} height="240" width="150" className = 'img-thumbnail'/>  
					 				):(
					 					<div id = "noPicList" >Brak obrazu</div>
					 				)}
					</td> 
					<td id = "title"> <strong>{this.state.title}</strong>  </td>
					<td id = "data"> <strong>Data publikacji: </strong><p>{this.state.releaseDate}</p>  </td>
					<td id = "data"> <strong>Popularność: </strong><p>{this.state.popularity} </p> </td>
					<td id = "data"> <strong>Liczba głosów:</strong> <p> {this.state.voteCount} </p> </td>
					<td id = "data"> <strong>Średnia ocena: </strong><p>{this.state.voteAverage}/10 </p></td>
					<td>
					 <Modal className = "modal" open={open} onClose={this.closeModal}  little>
					 	<div id = "modalDiv">
					 		<div className = "leftModalDiv">
					 			
					 			{this.state.poster ? (
					 					<img src = {POSTER_URL} height="480" width="300" className = 'img-thumbnail'/>  
					 				):(
					 					<div id = "noPicDetail" >Brak obrazu w OMDB API</div>
					 				)}
					 		</div>
					 		<div className = "rightModalDiv">
					 			<h1>{this.state.title} ({year})</h1>
					 			<h3><i className="fa fa-star" ></i>  {this.state.voteAverage}/10</h3>
					 			<h6>{this.state.voteCount} głosów</h6>
					 			<h5>{this.props.details.overview}</h5>
					 			<h6><strong>Kategoria: </strong> {this.props.details.genres && this.props.details.genres.map(this.renderGenres)} </h6>
					 			<h6><strong>Kraj produkcji: </strong> {this.props.details.production_countries && this.props.details.production_countries.map(this.renderCountries)} </h6>
					 			<h6><strong>Firmy produkcyjne: </strong> {this.props.details.production_companies && this.props.details.production_companies.map(this.renderCompany)} </h6>
					 			<a target="_blank" href={IMDB_URL}>Zobacz film w serwisie IMDB</a>
					 		</div>
					 	</div> 
       				 </Modal>
  					</td>
				</tr>
				
				);
		}
}

function mapStateToProps({ details }){
	return { details };
}

function mapDispatchToProps(dispatch){
	return bindActionCreators ({fetchMovieDetails}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MovieListItem);

