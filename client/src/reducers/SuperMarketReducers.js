import uuid from "uuid"
import {GET_SUPERMARKETS,GET_SUPERMARKETSMARKERS,ADD_SUPERMARKET,DELETE_SUPERMARKET,ADD_ITEMTOSHOP,CHANGE_MARKERSELECTED,ITEMS_LOADING} from '../actions/types';

const initialState ={
	loading: false,
	markerSelected:null,
	markers1:[],
}

export default function (state=initialState, action) {
	switch(action.type){
		case GET_SUPERMARKETS:
			var listOfShops = {}
			action.payload.map((shop)=>{
				listOfShops[shop._id]=shop
			})
			return {
				...state,
				...listOfShops,
				loading:false,
			}
		case GET_SUPERMARKETSMARKERS:
			var listOfShops = {}
			action.payload.map((shop)=>{
				listOfShops[shop._id]=shop
			})
			return {
				...state,
				...listOfShops,
				markers1:[...action.payload],
				loading:false,
			}
		case ADD_SUPERMARKET:
			return {
				...state,
				markers:[action.payload,...state.markers],
				[action.payload._id]:action.payload,
				markerSelected:action.payload,
			}
		case DELETE_SUPERMARKET:
			delete state[action.payload._id]
			return {
				...state,
				markers:state.markers.filter((shop)=>shop._id!==action.payload._id)
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
		case ITEMS_LOADING:
			return {
				...state,
				loading:true
			}
		default:
		 return state

	}
}