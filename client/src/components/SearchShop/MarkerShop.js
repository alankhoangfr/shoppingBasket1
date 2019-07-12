import React, { Component } from 'react';
import basket from "../../image/basket.png"
import basketSelected from "../../image/basketSelected.png"
import { Marker,InfoWindow  } from "react-google-maps";
import {connect} from "react-redux"
import {changeMarkerSelected,updateInfoArea} from "../../actions/SuperMarketActions"
import PropTypes from "prop-types"
import {MarkerClusterer} from "react-google-maps/lib/components/addons/MarkerClusterer"

export class MarkerShop extends Component {
	constructor(props){
		super(props)
		this.state={
			iconMarkers:[]
		}
	}
	shouldComponentUpdate(nextProps, nextState){
		if(this.props.superMarket.markerSelected!==nextProps.superMarket.markerSelected){
			return true	
		}else if(this.props.superMarket.markers1!==nextProps.superMarket.markers1){
			return true
		}else{
			return false	
		}
	}
	onDblClick = (marker,event)=>{	
		var markerObject = this.props.superMarket.markers1.filter((mark)=>{
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
	onMarkerClustererClick = (markerClusterer) => {
		var action =async()=>{
			var loopingClickedMarkers =(clickedMarkers)=>{
				var result = []
				clickedMarkers.map(mark=>{
					if(mark.animation===null){
						result.push(mark.title)
					}
				})
				return result
      		}
			const clickedMarkers = await markerClusterer.getMarkers()	
			const looping = await loopingClickedMarkers(clickedMarkers)
			const update = this.props.updateInfoArea(looping)
			this.setState({iconMarkers:[...looping]})
		}	
      	action()

      
    }
	render(){
		return(
			<MarkerClusterer
		      onClusteringEnd={this.onMarkerClustererClick}
		      averageCenter
		      enableRetinaIcons
		      gridSize={60}
		    >
				{this.props.superMarket.markers1.map(marker => (		
					<Marker
							title={marker._id}
							key={marker._id}
							position={{ lat: marker.lat, lng: marker.lng }}
							icon ={this.iconBasket(marker)}
							onDblClick = {this.onDblClick.bind(this,marker._id)}
							animation={window.google.maps.Animation.DROP}
					>				
					</Marker>
									
				))}
			</MarkerClusterer>
    	)

	}

	}



MarkerShop.propTypes = {
	superMarket:PropTypes.object.isRequired,
	changeMarkerSelected:PropTypes.func.isRequired,
	updateInfoArea:PropTypes.func.isRequired,
}

const mapStateToProps = (state)=>({
	superMarket:state.superMarket
})

export default connect(mapStateToProps,{changeMarkerSelected,updateInfoArea})(MarkerShop)