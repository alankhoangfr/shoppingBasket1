const express = require("express")
const mongoose = require("mongoose")
const router = express.Router()
//Overall Model

const OverAll = require("../../models/Overall")
const SuperMarket = require("../../models/SuperMarket")
const All_Item = require("../../models/all_item")

router.get("/",(req,res)=>{
	OverAll.findById(0)
	.then(overall=> res.json(overall))
	.catch(err=>res.status(404).json({
		success:false,
		comment:"whats happening"
	}))

})
router.post("/",(req,res)=>{
	const newOverAll=new OverAll({
		_id: 0,
		lat:req.body.lat,
		lng:req.body.lng,
	})
	newOverAll
		.save()
		.then(overall=> {
			res.json(overall)
		})
		.catch(err => console.log(err))
})
router.patch("/0",(req,res)=>{
	const updateOps = {}
	const update = []
	Object.keys(req.body).forEach((key)=>{
		var object = {"propName":key,"value":req.body[key]}
		update.push(object)
	})
	for (const ops of update){
		updateOps[ops.propName]=ops.value
	}
	OverAll.updateOne({_id:0},{$set:updateOps})
	.exec()
	.then(
		OverAll.findById(0)
			.then(overall=>{res.json(overall)})
		)	
	.catch(err=>res.status(404).json({
		success: false,
		message:err
	}))
})
router.patch("/space",(req,res)=>{
	const updateOps = {}
	const update = []
	Object.keys(req.body).forEach((key)=>{
		var object = {"propName":key,"value":req.body[key]}
		update.push(object)
	})
	for (const ops of update){
		updateOps[ops.propName]=ops.value
	}
	Overall.updateOne({_id:0},{$set:updateOps})
	.exec()
	.then(Overall.findById(0).then(info=>{
		if(info.basket.length===0){
			res.json([])
		}else{
			All_Item.find({shopId:Object.values(req.body)[0],Code:{$in:info.basket}}).then(itemInfo=>{
				res.json(itemInfo)
			})
		}
	}))
	.catch(err=>res.status(404).json({
		success: false,
		message:err
	}))
		
})

router.get("/check",(req,res)=>{
	var sendResult = (check,info,itemsInShop,notInShop)=>{
			if(check.length===info.basket.length){
				if(check.every(each=>each===true)){
					res.json({"result":true,"info":itemsInShop})
				}else{
					res.json({"result":false,"info":notInShop})
				}
			}
		}
	OverAll.findById(0).
	then(info=>{
		var check=[]
		var notInShop = []
		var itemsInShop =[]
			if(info.basket.length===0){
				res.json({"result":true,"info":[]})
			}else{
				info.basket.map(Code=>{
				All_Item.find({shopId:req.query.shopId,Code:Code}).then(itemInfo=>{
					if (itemInfo.length===1){
						itemsInShop.push(Code)
						check.push(true)
						sendResult(check,info,itemsInShop,notInShop)
					}else{
						notInShop.push(Code)
						check.push(false)
						sendResult(check,info,itemsInShop,notInShop)
						}
				})
				.catch(err=>res.status(404).json({
					success: false,
					message:err
				}))
			})
			}		
	})
	.catch(err=>res.status(404).json({
		success: false,
		message:err
	}))
})

router.patch("/basket",(req,res)=>{
	OverAll.findById(0).
		then(info=>{
			let result
			var shops = {}
			var space = [info.space1,info.space2,info.space3]
			space = space.filter(s=>s!==null)
			All_Item.find({shopId:{$in:space},Code:req.body.Code})
				.then(items=>{
					Overall.updateOne({_id:0},{$push:{basket:req.body.Code}}).exec()
					res.json(items)})
		})
		.catch(err=>res.status(404).json({
		success: false,
		message:err
		}))
})

router.patch("/deleteItemBasket",(req,res)=>{
	Overall.findById(0)
		.then(info=>{
			var action = async()=>{
				var filteredBasket = await info.basket.filter((item)=>{
					return item!==req.body.Code
				})
				Overall.updateOne({_id:0},{$set:{basket:filteredBasket}})
					.exec()
					.then(Overall.findById(0).then(info=>{
						res.json(info.basket)}))
					.catch(err=>res.status(404).json({
						success: false,
						message:err
					}))
			}
			action()
		})
})
router.patch("/deleteAll",(req,res)=>{
	Overall.findById(0)
		.then(info=>{
			Overall.updateOne({_id:0},{$set:{basket:[]}})
			.exec()
			.then(Overall.findById(0).then(info=>res.json(info.basket)))
		})
		.catch(err=>res.status(404).json({
			success: false,
			message:err
	}))
})
module.exports = router