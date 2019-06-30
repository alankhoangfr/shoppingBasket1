const express = require("express")
const mongoose = require("mongoose")
const router = express.Router()
//Item Model

const Item = require("../../models/Item")
const SuperMarket = require("../../models/SuperMarket")
const OverAll = require("../../models/Overall")

router.get("/",(req,res)=>{
	Item.find()
	.then(items=> res.json(items))
	.catch(err=>res.status(404).json({
		success:false,
		comment:"whats happening"
	}))

})
router.get("/filterItems",(req,res)=>{
	OverAll.findById(0).
		then(info=>{
			let result
			var shops = {}
			var space = [info.space1,info.space2,info.space3]
			if (space.every(s=>s===null)){
				res.json([])
			}
			space = space.filter(s=>s!==null)
			space.map((s)=>{
				SuperMarket.findById(s)
					.then(infoSupermarket =>{
						var tempArray = []
						var temp = Object.values(infoSupermarket.item)
						temp.map(item => tempArray.push(item.Code))
						shops[s]=tempArray
						if(Object.keys(shops).length===space.length){
							if (space.length===1){
								result = shops[info.space1]
								var resultItems = []
								result.map((itemid)=>{
									resultItems.push(infoSupermarket.item.filter(item => item.Code===itemid)[0])
								})
								res.json(resultItems)
							}else if(space.length===2){
								result = shops[info.space1].filter(x => shops[info.space2].includes(x))
								var resultItems = []
								result.map((itemid)=>{
									resultItems.push(infoSupermarket.item.filter(item => item.Code===itemid)[0])
								})
								res.json(resultItems)
							}else if(space.length ===3){
								var first = shops[info.space1].filter(x => shops[info.space2].includes(x))
								result = first.filter(x => shops[info.space3].includes(x))
								var resultItems = []
								result.map((itemid)=>{
									resultItems.push(infoSupermarket.item.filter(item => item.Code===itemid)[0])
								})
								res.json(resultItems)
							}
							
						}
					})
			})
			
		})
		.catch(err=>res.status(404).json({
			success:false,
			comment:err
		}))
})
module.exports = router