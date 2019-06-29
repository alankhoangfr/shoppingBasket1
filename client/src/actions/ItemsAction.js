import{GET_ITEMS, FILTER_ITEMS, ITEMS_LOADINGITEMS} from "./types"
import axios from "axios"


export const getItems= () =>dispatch =>{
	dispatch(setItemsLoading())
	axios
		.get("api/items")
		.then(res=>dispatch({
			type:GET_ITEMS,
			payload: res.data
		}))
}
export const filterItems = (space) =>dispatch =>{
	const filteredSpace = space.filter((s)=>s!==null)
	dispatch(setItemsLoading())
	axios
		.get("api/items/filterItems",{
			params:{
				space:filteredSpace}})
		.then(res=>dispatch({
			type:FILTER_ITEMS,
			payload: res.data
		}))
}


export const setItemsLoading = ()=>{
	return{
		type:ITEMS_LOADINGITEMS
	}
}
