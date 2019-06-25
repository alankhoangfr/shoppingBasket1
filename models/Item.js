const mongoose = require("mongoose")
const Schema = mongoose.Schema

// Create Schema
const ItemSchema = new Schema({
	Code:{
		type:String,
		required:true
	},
	title:{
		type:String,
		required:true
	},
	description:{
		type:String,
		required:true
	},
	image:{
		type:String,
	},
	reference:{
		type:String,
		required:true
	},
})

module.exports = Item = mongoose.model("itemoffaus",ItemSchema)