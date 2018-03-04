import { FETCH_MOVIE_DETAILS } from '../actions/index';

export default function state(state = [], action){

	switch(action.type) {
		case FETCH_MOVIE_DETAILS:
			return Object.assign(...state, action.payload.data);
	}

	return state;

}