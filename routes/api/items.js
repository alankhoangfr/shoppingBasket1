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

module.exports = router