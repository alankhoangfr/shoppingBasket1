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
	dispatch(setItemsLoading())
	var filteredSpace = space.filter((s)=>s!==null)
	if(space.every(each=>each===null)){
		filteredSpace = [null,null,null]
	}
	axios
		.get("api/all_item/filterItems",{
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
