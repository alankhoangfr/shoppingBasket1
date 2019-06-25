import{GET_ITEMS, FILTER_ITEMS, ITEMS_LOADING} from "./types"
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
export const filterItems = () =>dispatch =>{
	dispatch(setItemsLoading())
	axios
		.get("api/items/filterItems")
		.then(res=>dispatch({
			type:FILTER_ITEMS,
			payload: res.data
		}))
}


export const setItemsLoading = ()=>{
	return{
		type:ITEMS_LOADING
	}
}
