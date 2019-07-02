const mongoose = require("mongoose")
const Schema = mongoose.Schema

// Create Schema
const OverallSchema = new Schema({
	_id:0,
	lat:{
		type:Number,
		required:true
	},
	lng:{
		type:Number,
		required:true
	},
	zoom:{
		type:Number,
	},
	basket:{
		type:Array,
	},
	space1:{
		type:Object,
	},
	space2:{
		type:Object,
	},
	space3:{
		type:Object,
	}
})

module.exports = Overall = mongoose.model("overall",OverallSchema)