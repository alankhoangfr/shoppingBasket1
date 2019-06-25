import {GET_ITEMS,FILTER_ITEMS} from '../actions/types';

const initialState ={
	totalItems: [],
	itemsComparsion:[],

}

export default function (state=initialState, action) {
	switch(action.type){
		case GET_ITEMS:
			return {
				...state,
				totalItems:[...action.payload]
			}


		case FILTER_ITEMS:
			return {
				...state,
				itemsComparsion:[...action.payload]
			}

		default:
		 	return state	
	}

}