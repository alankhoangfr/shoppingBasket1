import uuid from "uuid"
import {GET_SUPERMARKETS,GET_SUPERMARKETSMARKERS,ADD_SUPERMARKET,DELETE_SUPERMARKET,ADD_ITEMTOSHOP,
	CHANGE_MARKERSELECTED,ITEMS_LOADINGSUPERMARKET,UPDATE_ICONMARKER} from '../actions/types';

const initialState ={
	loading: false,
	markerSelected:null,
	markers1:[],
	iconMarkers:[]
}

export default function (state=initialState, action) {
	switch(action.type){
		case GET_SUPERMARKETS:
			return {
				...state,
				loading:false,
			}
		case GET_SUPERMARKETSMARKERS:
			return {
				...state,
				markers1:[...action.payload],
				loading:false,
			}
		case ADD_SUPERMARKET:
			return {
				...state,
				markers1:[action.payload,...state.markers1],
				[action.payload._id]:action.payload,
				markerSelected:action.payload,
			}
		case DELETE_SUPERMARKET:
			delete state[action.payload._id]
			return {
				...state,
				markers1:state.markers1.filter((shop)=>shop._id!==action.payload._id)
			}	
		case ADD_ITEMTOSHOP:
			return {
				...state,
				[action.payload._id]:action.payload
				}
			
		case CHANGE_MARKERSELECTED:
			return {
				...state,
				markerSelected:action.payload
			}
		case ITEMS_LOADINGSUPERMARKET:
			return {
				...state,
				loading:true
			}
		case UPDATE_ICONMARKER:
			console.log(action.payload)
			var iconMark = state.markers1.filter(mark=>
				action.payload.includes(mark._id)
			)
			console.log(iconMark)
			return{
				...state,
				iconMarkers:iconMark
			}
		default:
		 return state

	}
}