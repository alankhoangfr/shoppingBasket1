import React, {Component} from "react"
import {Switch, Route} from "react-router-dom"
import CompareBasket from "./CompareBasket"
import AddShop1 from "./AddShop1"
import AddItem from "./AddItem"
import {getSuperMarkets,getSuperMarketsMarkers} from "../actions/SuperMarketActions"
import {getInfo,updateInfo} from "../actions/OverAllActions"
import {getItems} from "../actions/ItemsAction"
import {connect} from "react-redux"
import PropTypes from "prop-types"

class PageContent extends Component {
		start = async()=>{
		var checkLatLong = (lat,long)=>{
			if(lat&&long!==null){
				return null
			}else {return this.props.updateInfo({"lat": 51.509865, "lng": -0.118092,"bound":[]})}
		}
		const resetSpace = await this.props.updateInfo({"space1": null, "space2": null,"space3":null,basket:[]})
		const getinfo = await this.props.getInfo()
		const updateinfo = await checkLatLong(this.props.overAll.lat,this.props.overAll.lng)
		this.props.getSuperMarketsMarkers({
			lat:this.props.overAll.lat===null?51.509865:this.props.overAll.lat,
			lng:this.props.overAll.lng===null?-0.118092:this.props.overAll.lng,
			zoom:this.props.overAll.zoom})
	}
	componentDidMount(){	
		this.start()
		
	}
	render(){
		return(
			<div>
				<Switch>
					<Route exact path="/" component={CompareBasket}/>
					
				</Switch>
			</div>
			);
	}
}

PageContent.propTypes = {
	updateInfo:PropTypes.func.isRequired,
	getInfo:PropTypes.func.isRequired,
	getItems:PropTypes.func.isRequired,
	getSuperMarketsMarkers:PropTypes.func.isRequired,
	getSuperMarkets:PropTypes.func.isRequired,
	superMarket:PropTypes.object.isRequired,
}
const mapStateToProps = (state)=>({
	superMarket:state.superMarket,
	overAll:state.overAll,
	item:state.item
})

export default connect(mapStateToProps,{getSuperMarkets,getSuperMarketsMarkers,getInfo,updateInfo,getItems}) (PageContent)

