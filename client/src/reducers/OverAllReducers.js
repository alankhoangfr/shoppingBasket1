import {UPDATE_INFO, GET_OVERALL,ITEMS_LOADINGOVERALL,ADD_ITEMTOBASKET,DELETE_ITEMFROMBASKET,REGISTER_SPACE,CHECK_SHOP,ITEMS_LOADINGOVERALLCHECK,
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
	notInShop:[],
	itemsInShop:[],
	addToSpace:null,
	loadingCheck:false,
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
				notInShop:[],
				addToSpace:null,

			}
		case UPDATE_INFO:
			return {
				...state,
				lat:action.payload.lat===undefined?state.lat:action.payload.lat,
				lng:action.payload.lng===undefined?state.lng:action.payload.lng,
				zoom:action.payload.zoom===undefined?state.zoom:action.payload.zoom,
				notInShop:[],
				addToSpace:null,
			}
		case REGISTER_SPACE:
			var updatedSpace = (spaceObject,spaceName)=>{
				if (spaceObject.itemsInShop.length===0){
					return spaceObject.spaceInfo[spaceName]
				}else if(spaceObject.spaceInfo[spaceName]===null){
					return null
				}
				else{
					var updatedSpaceObject = Object.assign({},spaceObject.spaceInfo[spaceName])
					updatedSpaceObject["item"]=spaceObject.itemsInShop
					return updatedSpaceObject
				}
			}
			return {
				...state,
				space1:action.payload.spaceInfo.space1===undefined?state.space1:updatedSpace(action.payload,"space1"),
				space2:action.payload.spaceInfo.space2===undefined?state.space2:updatedSpace(action.payload,"space2"),
				space3:action.payload.spaceInfo.space3===undefined?state.space3:updatedSpace(action.payload,"space3"),
				notInShop:[],
				addToSpace:null,
			}
		case CHECK_SHOP:
			if(action.payload.result===false){
				return {
					...state,
					notInShop:action.payload.info,
					itemsInShop:[],
					addToSpace:false,
					loadingCheck:false
				}
			}else if(action.payload.result===true){
				return {
					...state,
					notInShop:[],
					itemsInShop:action.payload.info,
					addToSpace:true,
					loadingCheck:false
				}
			}

		case ADD_ITEMTOBASKET:
			var basketInfo = {}
			action.payload.infoLoad.map(item=>{
				item["quantity"]=action.payload.infoItem.quantity
				basketInfo[item.shopId]=item
			})

			var addItemToSpace = (infoObject)=>{
				if (infoObject === null){
					return null
				}else{
					if (infoObject["item"]===undefined){
						infoObject["item"]=[basketInfo[infoObject["StoreId"]]]
						return infoObject
					}else if(infoObject["item"]!==undefined){
						infoObject["item"].push(basketInfo[infoObject["StoreId"]])
						return infoObject
					}
				}
			}
			return {
				...state,
				basket:[action.payload.infoItem,...state.basket],
				space1:addItemToSpace(state.space1),
				space2:addItemToSpace(state.space2),
				space3:addItemToSpace(state.space3),
				notInShop:[],
				addToSpace:null,
			}
		case DELETE_ITEMFROMBASKET:
			return {
				...state,
				basket:state.basket.filter((item)=>item.Code!==action.payload.Code),
				notInShop:[],
				addToSpace:null,
			}
		case DELETE_ALLFROMBASKET:
			return {
				...state,
				basket:[],
				notInShop:[],
				addToSpace:null,
			}
		case ITEMS_LOADINGOVERALL:
			return {
				...state,
				loading:true
			}
		case ITEMS_LOADINGOVERALLCHECK:
			return {
				...state,
				loadingCheck:true
			}

		default:
		 return state

	}
}