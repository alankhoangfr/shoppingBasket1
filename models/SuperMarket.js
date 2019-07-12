const mongoose = require("mongoose")
const Schema = mongoose.Schema

// Create Schema
const SuperMarketSchema = new Schema({
	_id:Schema.Types.ObjectId,
	name:{
		type:String,
		required:true
	},
	lat:{
		type:Number,
		required:true
	},
	lng:{
		type:Number,
		required:true
	},
	details:{
		type:String,
	},
	Address:{
		type:String,
		required:true
	},
	city:{
		type:String,
		required:true
	},
	state:{
		type:String,
	},
	postcode:{
		type:String,
		required:true
	},
	score:{
		type:Number,
	},
	completeAddress:{
		type:String,
		required:true
	},
	StoreId:{
		type:String,
		required:true
	},	
	SuperMarketChain:{
		type:String
	},
	StoreName:{
		type:String
	},
	add2:{
		type:String
	},
	item:{
		type:Object,
	}
})

module.exports = SuperMarket = mongoose.model("supermarkets",SuperMarketSchema)