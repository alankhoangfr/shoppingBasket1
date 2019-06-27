import {GET_ITEMS,FILTER_ITEMS,ITEMS_LOADING} from '../actions/types';

const initialState ={
	totalItems: [],
	itemsComparsion:[],
	loading: false,

}

export default function (state=initialState, action) {
	switch(action.type){
		case GET_ITEMS:
			return {
				...state,
				totalItems:[...action.payload],
				loading:false,
			}


		case FILTER_ITEMS:
			return {
				...state,
				itemsComparsion:[...action.payload],
				loading:false,
			}
		case ITEMS_LOADING:
			return {
				...state,
				loading:true
			}

		default:
		 	return state	
	}


}