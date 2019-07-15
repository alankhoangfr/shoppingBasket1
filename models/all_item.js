const mongoose = require("mongoose")
const Schema = mongoose.Schema

// Create Schema
const all_itemsSchema = new Schema({
	Code:{
		type:String,
		required:true
	},
	product_name:{
		type:String,
		required:true
	},
	price:{
		type:Number,
		required:true
	},
	shopId:{
		type:Number,
		required:true
	},
	image:{
		type:String,
	}
})

module.exports = All_Item = mongoose.model("itemsofengland",all_itemsSchema)