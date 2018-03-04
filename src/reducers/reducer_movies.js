import { FETCH_MOVIES } from '../actions/index';

export default function state(state = [], action){


	switch(action.type) {

		case FETCH_MOVIES:
			return Object.assign(...state, action.payload.data);
	}
	

	return state;

}

