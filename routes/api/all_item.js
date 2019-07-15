const express = require("express")
const mongoose = require("mongoose")
var _ = require('lodash')
const router = express.Router()
//Overall Model

const All_Item = require("../../models/all_item")
const Item = require("../../models/Item")
const SuperMarket = require("../../models/SuperMarket")
const OverAll = require("../../models/Overall")

router.get("/filterItems",(req,res)=>{
	const spaceId = req.query.space.map(each=>{
		if(each!='null'){
			return parseInt(each)
		}else if(each==='null'){
			return null
		}
	})
	if( req.query.space.every(each=>each==='null')){
		res.json([])
	}
	else{
		All_Item.find({shopId:{$in:spaceId}})
		.then(items=>{
			var action = async ()=>{
				var ItemCode= await items.map(item=>item.Code)
				var FilteredItemCode= await items.map(item=>{
					if(_.countBy(ItemCode)[item.Code]===req.query.space.length){
						return item	
					}else{
						return null
					}
				})
				var FilteredItemCode = await FilteredItemCode.filter(obj=>obj!==null)
				var result = await FilteredItemCode.map(itemObj=>{
					if(itemObj.shopId==req.query.space[0]){
						const importInfo = {
							title:itemObj.Code,
							description	:itemObj["product_name"],
							Code:itemObj.Code,
							image:itemObj.image,
						}
						return importInfo	
					}else{
						return null
					}
				})
				var result = await result.filter(obj=>obj!==null)
				res.json(result)
			}
			action()
		})
		.catch(err=>res.status(404).json({
			success:false,
			comment:err
		}))
	}
	
			
})

module.exports = router	