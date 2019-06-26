import{GET_SUPERMARKETS, GET_OVERALL,UPDATE_INFO,GET_SUPERMARKETSMARKERS, ADD_SUPERMARKET, DELETE_SUPERMARKET,ADD_ITEMTOSHOP,
	CHANGE_MARKERSELECTED,ITEMS_LOADING} from "./types"
import axios from "axios"

export const getSuperMarkets = () =>dispatch =>{
	dispatch(setItemsLoading())
	axios
		.get("api/superMarkets")
		.then(res=>dispatch({
			type:GET_SUPERMARKETS,
			payload: res.data
		}))
}
export const getSuperMarketsMarkers = (info) =>dispatch =>{
	dispatch(setItemsLoading())
	axios
		.get("api/superMarkets/latnlong",{
			params:{
				lat:info.lat,
				lng:info.lng,
				bound:info.bound,
				zoom:info.zoom}})
		.then(res=>dispatch({
			type:GET_SUPERMARKETSMARKERS,
			payload: res.data
		}))
}
export const addSuperMarket = (superMarket)=>dispatch =>{
		axios
		.post("api/superMarkets",superMarket)
		.then((res)=>dispatch({
			type:ADD_SUPERMARKET,
			payload: res.data
		}))
}
export const deleteSuperMarket = (superMarket) =>dispatch =>{
	axios
		.delete(`api/superMarkets/${superMarket._id}`)
		.then((res)=>dispatch({
			type:DELETE_SUPERMARKET,
			payload: superMarket
		}))
}
export const addItemToShop = (item) => dispatch=>{
	axios
		.patch(`api/superMarkets/addItemToShop/${item.superMarket_id}`,item)
		.then((res)=>dispatch({
			type:ADD_ITEMTOSHOP,
			payload: res.data
		}))
}

export const changeMarkerSelected = (supermarket)=>{
	return{
		type:CHANGE_MARKERSELECTED,
		payload:supermarket
	}
}
export const setItemsLoading = ()=>{
	return{
		type:ITEMS_LOADING
	}
}
