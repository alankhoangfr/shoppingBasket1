import{GET_OVERALL,UPDATE_INFO,ITEMS_LOADINGOVERALL,ADD_ITEMTOBASKET,
	DELETE_ALLFROMBASKET,REGISTER_SPACE,DELETE_ITEMFROMBASKET,CHECK_SHOP,ITEMS_LOADINGOVERALLCHECK} from "./types"
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
	if (latnlong.zoom>=12){
		axios
		.patch("api/overall/0",latnlong)
		.then(res=>dispatch({
			type:UPDATE_INFO,
			payload: latnlong
		}))
	}else {
		return {
			type:UPDATE_INFO,
			payload: []
		}
	}
}
export const registerSpace = (space) =>dispatch =>{
	axios
		.patch("api/overall/space",space.storeId)
		.then(res=>dispatch({
			type:REGISTER_SPACE,
			payload:{"spaceInfo":space.storeObject,"itemsInShop":res.data}
		}))
}
export const checkSpace = (info) =>dispatch =>{
	dispatch(setItemsLoadingChecking())
	axios
		.get("api/overall/check",{
				params:{
					shopId:info}})
		.then(res=>dispatch({
			type:CHECK_SHOP,
			payload:res.data
		}))
}
export const addItemToBasket = (item) =>dispatch =>{
	axios
		.patch("api/overall/basket",item)
		.then(res=>dispatch({
			type:ADD_ITEMTOBASKET,
			payload:{"infoLoad":res.data,"infoItem":item}
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

export const setItemsLoadingChecking = ()=>{
	return{
		type:ITEMS_LOADINGOVERALLCHECK
	}
}