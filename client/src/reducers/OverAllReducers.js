import uuid from "uuid"
import {UPDATE_INFO, GET_OVERALL,ITEMS_LOADINGOVERALL,ADD_ITEMTOBASKET,DELETE_ITEMFROMBASKET,REGISTER_SPACE,
	DELETE_ALLFROMBASKET} from '../actions/types';

const initialState ={
	loading: false,
	lat:null,
	lng:null,
	zoom:15,
	basket:[],
	space1:null,
	space2:null,
	space3:null,
}

export default function (state=initialState, action) {
	switch(action.type){
		case GET_OVERALL:
			return {
				...state,
				lat:action.payload.lat,
				lng:action.payload.lng,
				zoom:action.payload.zoom,
				basket:action.payload.basket,
				space1:action.payload.space1,
				space2:action.payload.space2,
				space3:action.payload.space3,
				loading:false,

			}
		case UPDATE_INFO:
			console.log(action.payload)
			return {
				...state,
				lat:action.payload.lat===undefined?state.lat:action.payload.lat,
				lng:action.payload.lng===undefined?state.lng:action.payload.lng,
				zoom:action.payload.zoom===undefined?state.zoom:action.payload.zoom,
			}
		case REGISTER_SPACE:
		
			return {
				...state,
				space1:action.payload.space1===undefined?state.space1:action.payload.space1,
				space2:action.payload.space2===undefined?state.space2:action.payload.space2,
				space3:action.payload.space3===undefined?state.space3:action.payload.space3,
			}
		case ADD_ITEMTOBASKET:
			return {
				...state,
				basket:[action.payload,...state.basket]
			}
		case DELETE_ITEMFROMBASKET:
			return {
				...state,
				basket:state.basket.filter((item)=>item.Code!==action.payload.Code)
			}
		case DELETE_ALLFROMBASKET:
			return {
				...state,
				basket:[]
			}
		case ITEMS_LOADINGOVERALL:
			return {
				...state,
				loading:true
			}

		default:
		 return state

	}
}