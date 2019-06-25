const express = require("express")
const mongoose = require("mongoose")
const router = express.Router()
//Overall Model

const OverAll = require("../../models/Overall")

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
	.then(Overall.findById(0).then(info=>res.json(info)))
	.catch(err=>res.status(404).json({
		success: false,
		message:err
	}))
})
router.patch("/basket",(req,res)=>{
	Overall.updateOne({_id:0},{$push:{basket:req.body}})
	.exec()
	.then(Overall.findById(0).then(info=>res.json(info.basket)))
	.catch(err=>res.status(404).json({
		success: false,
		message:err
	}))
})

router.patch("/deleteItemBasket",(req,res)=>{
	Overall.findById(0)
		.then(info=>{
			var filteredBasket=[]
			info.basket.map((item)=>{
				if(item.Code!==req.body.Code){
					filteredBasket.push(item)
				}
				if(filteredBasket.length===info.basket.length-1){
					Overall.updateOne({_id:0},{$set:{basket:filteredBasket}})
					.exec()
					.then(Overall.findById(0).then(info=>{
						res.json(info.basket)}))
					.catch(err=>res.status(404).json({
						success: false,
						message:err
					}))
				}
			})
		})
})
router.patch("/deleteAll",(req,res)=>{
	console.log(req.body)
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