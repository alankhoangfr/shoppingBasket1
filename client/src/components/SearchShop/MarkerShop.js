import React, { Component } from 'react';
import basket from "../../image/basket.png"
import basketSelected from "../../image/basketSelected.png"
import { Marker,InfoWindow  } from "react-google-maps";
import {connect} from "react-redux"
import {changeMarkerSelected} from "../../actions/SuperMarketActions"
import PropTypes from "prop-types"

export class MarkerShop extends Component {
	constructor(props){
		super(props)
	}
	shouldComponentUpdate(nextProps, nextState){
		if(this.props.superMarket.markerSelected!==nextProps.superMarket.markerSelected){
			return true	
		}else{
			return false	
		}
	}
	onDblClick = (marker,event)=>{	
		var markerObject = this.props.markers1.filter((mark)=>{
			return mark._id=== marker
		})
		markerObject = markerObject[0]
		this.props.changeMarkerSelected(markerObject)
	} 
	iconBasket = (marker)=>{
		let icon = basket
		if(this.props.superMarket.markerSelected!==null){
			if (this.props.superMarket.markerSelected._id===marker._id){
				icon = basketSelected
			}
		}
		
		return icon	
	}	  		
	render(){
		return(
			this.props.markers1.map((marker) => {				
			return( 
				<Marker
						key={marker._id}
						position={{ lat: marker.lat, lng: marker.lng }}
						icon ={this.iconBasket(marker)}
						onDblClick = {this.onDblClick.bind(this,marker._id)}
						animation={window.google.maps.Animation.DROP}
				>

				</Marker>
			)
				
		})

    	)

	}

	}



MarkerShop.propTypes = {
	superMarket:PropTypes.object.isRequired,
	changeMarkerSelected:PropTypes.func.isRequired,
}

const mapStateToProps = (state)=>({
	superMarket:state.superMarket
})

export default connect(mapStateToProps,{changeMarkerSelected})(MarkerShop)