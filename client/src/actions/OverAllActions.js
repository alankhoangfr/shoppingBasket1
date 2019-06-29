import{GET_OVERALL,UPDATE_INFO,ITEMS_LOADINGOVERALL,ADD_ITEMTOBASKET,DELETE_ALLFROMBASKET,REGISTER_SPACE,DELETE_ITEMFROMBASKET} from "./types"
import axios from "axios"


export const getInfo = () =>dispatch =>{
	dispatch(setItemsLoading())
	axios
		.get("api/overall")
		.then(res=>dispatch({
			type:GET_OVERALL,
			payload: res.data
		}))
}
export const updateInfo = (latnlong) =>dispatch =>{
	axios
		.patch("api/overall/0",latnlong)
		.then(res=>dispatch({
			type:UPDATE_INFO,
			payload: res.data
		}))
}
export const registerSpace = (space) =>dispatch =>{
	const newSpace = space
	axios
		.patch("api/overall/space",space)
		.then(res=>dispatch({
			type:REGISTER_SPACE,
			payload:space
		}))
}
export const addItemToBasket = (item) =>dispatch =>{
	axios
		.patch("api/overall/basket",item)
		.then(res=>dispatch({
			type:ADD_ITEMTOBASKET,
			payload:item
		}))
}
export const deleteItemFromBasket = (item) =>dispatch =>{
	axios
		.patch("api/overall/deleteItemBasket",item)
		.then((res)=>dispatch({
			type:DELETE_ITEMFROMBASKET,
			payload: item
		}))
	}
export const deleteAllBasket = () =>dispatch =>{
	axios
		.patch("api/overall/deleteAll")
		.then((res)=>dispatch({
			type:DELETE_ALLFROMBASKET,
		}))
	}

export const setItemsLoading = ()=>{
	return{
		type:ITEMS_LOADINGOVERALL
	}
}
