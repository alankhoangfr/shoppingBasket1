const express = require("express")
const mongoose = require("mongoose")
const router = express.Router()
//SuperMarket Model

const SuperMarket = require("../../models/SuperMarket")
const OverAll = require("../../models/Overall")
//@route Get api/SuperMarkets
//@desc Get all SuperMarkets
//@access Public

router.get("/",(req,res)=>{
	SuperMarket.find()
	.then(supermarkets=> res.json(supermarkets))

})
//@route Post api/SuperMarket
//@ create a SuperMarket
//@ access public

router.post("/",(req,res)=>{
	const newSuperMarket=new SuperMarket({
		_id: new mongoose.Types.ObjectId(),
		StoreId:req.body.StoreId,
		name: req.body.name,
		lat:req.body.lat,
		lng:req.body.lng,
		details	:req.body.details,
		Address	:req.body.address,
		score:req.body.score,
		city:req.body.city,
		state:req.body.state,
		postcode:req.body.postcode,
		completeAddress:req.body.completeAddress,
	})
	newSuperMarket
		.save()
		.then(superMarket=> {
			res.json(superMarket)
		})
		.catch(err => console.log(err))
})

//@route Delete api/SuperMarket : id
//@ delete a SuperMarket
//@ access public

router.delete("/:id",(req,res)=>{
	SuperMarket.findById(req.params.id)
	.then(superMarket=> superMarket.remove()
		.then(()=> res.json({success: true})))
	.catch(err => res.status(404).json({
		success:false,
		comment:"SuperMarket not found"}))
})

router.get("/latnlong",(req,res)=>{
	let coord
	if(req.query.bound===null||req.query.bound===undefined){
		 coord = {
				uplat:parseFloat(req.query.lat)+0.01*parseFloat(req.query.zoom)/15,
				downlat:parseFloat(req.query.lat)-0.01*parseFloat(req.query.zoom)/15,
				uplng:parseFloat(req.query.lng)+0.01*parseFloat(req.query.zoom)/15,
				downlng:parseFloat(req.query.lng)-0.01*parseFloat(req.query.zoom)/15,
			}

	}else {
		const bound =JSON.parse(req.query.bound)
		coord = {
                uplat:bound.north,
                downlat:bound.south,
                uplng:bound.east,
                downlng:bound.west,
            }
	}
	const markers = JSON.parse(req.query.markers)

    SuperMarket.find({lat:{$gt:coord.downlat,$lt:coord.uplat},lng:{$gt:coord.downlng,$lt:coord.uplng},_id:{$nin:markers}})
        .then(supermarkets=>res.json(supermarkets))
        .catch(err=>res.status(404).json({
            success:false,
            comment:coord
        }))

	})
router.patch("/addItemToShop/:id",(req,res)=>{
	SuperMarket.findById([req.params.id])
	.then(shop=>{
		if (shop.item===undefined){
			SuperMarket.updateOne({_id:req.params.id},{$set:{item:{[req.body.Code]:req.body}}},{returnNewDocument:true})
			.exec()
			.then(
				SuperMarket.findById(req.params.id)
				.then(supermarket=>{res.json(supermarket)})
			)	
			.catch(err=>res.status(404).json({
				success: false,
				message:err
			}))
		}else{ 
			SuperMarket.updateOne({_id:req.params.id},{$set:{[`item.${req.body.Code}`]:req.body}})
			.exec()
			.then(
				SuperMarket.findById(req.params.id)
				.then(supermarket=>{res.json(supermarket)})
			)			
			.catch(err=>res.status(404).json({
				success: false,
				message:err
			}))
			
			
		}
	})
	
})

module.exports = router

	