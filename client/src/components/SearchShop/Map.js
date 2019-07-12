import React, { Component } from 'react';
import { withGoogleMap, GoogleMap, withScriptjs, Marker,InfoWindow  } from "react-google-maps";
import Geocode from "react-geocode"
import Autocomplete from 'react-google-autocomplete';
import uuid from "uuid"
import {connect} from "react-redux"
import {getSuperMarkets,getSuperMarketsMarkers,changeMarkerSelected} from "../../actions/SuperMarketActions"
import {getInfo,updateInfo} from "../../actions/OverAllActions"
import MarkerShop from "./MarkerShop"
import PropTypes from "prop-types"


Geocode.setApiKey('AIzaSyBiffp6dvrIk_EWQHzXk05VzFKb5tioZeI');
Geocode.enableDebug();


export class Map extends Component {
	constructor(props){
		super(props)
		this.state = {
			input:"",
			mapPosition:{
				lat: this.props.overAll.lat===null?51.509865:this.props.overAll.lat,
				lng: this.props.overAll.lng===null?-0.118092:this.props.overAll.lng
			},
			movePosition:{
				lat: this.props.overAll.lat===null?51.509865:this.props.overAll.lat,
				lng: this.props.overAll.lng===null?-0.118092:this.props.overAll.lng
			},
			map:null,
			zoom:this.props.overAll.zoom,
			moving:false,
			maploading:false,
			bound:null,
		}
	}


	shouldComponentUpdate( nextProps, nextState ){	
		/*console.log("should Componeent update", nextState, this.state,nextProps,this.props)*/
		if(this.state.mapPosition.lat===null && nextState.mapPosition.lat!==null){
			/*console.log("load new lat and long")*/
			return true
		}
		else if(this.props.superMarket.markers1!==undefined && nextProps.superMarket.markers1!==undefined
			&&this.check_markers1(this.props.superMarket.markers1,nextProps.superMarket.markers1)===false){
			/*console.log("change")*/
			return true		
		}	
		else if(nextState.input===true){
			/*console.log("change position")*/
			return true
		}
		else if (this.props.superMarket.markers1!==undefined && nextProps.superMarket.markers1!==undefined&&
			this.check_markers1(this.props.superMarket.markers1,nextProps.superMarket.markers1)===true){
			/*console.log("no change")*/
			return false
		}	
		else if(nextProps.loading===true||this.props.loading===true){
			/*console.log("loading")*/
			return false
		}
	}
	componentDidUpdate(prevProps, prevState, snapshot){
		var action = async()=>{
			const input = await this.setState({
				input:false
			})
			

		}
		action()
	}
	check_markers1=(array1,array2) => {
		var arr1 = []
		var arr2 = []
		array1.map((elem)=>{
			arr1.push(elem._id)
		})
		array2.map((elem)=>{
			arr2.push(elem._id)
		})
		if (arr1.sort().toString()==arr2.sort().toString()){	
			return true
		}else 
			{return false}
		}
	onPlaceSelected = ( place,event ) => {
		if (place.name!==undefined){
			Geocode.fromAddress(place.name).then(
				response => {
    			const { lat, lng } = response.results[0].geometry.location
    			if (lat ===undefined){
    				return null
    			}
    			 action = async()=>{
    			 	const updateinfo = await this.props.getSuperMarketsMarkers({lat:lat,lng:lng,bound:null,zoom:15,markers:null})
    			 	const state = await this.setState({
						mapPosition: {
							lat: lat,
							lng: lng
						},
						movePosition: {
							lat: lat,
							lng: lng
					},
						zoom:15,
						input:true,
						moving:false,
					})	
	    			this.props.updateInfo({lat:lat,lng:lng})

    			}
    			action()
    		})
    		
		}
		else{
			const name = place.formatted_name,
			latValue = place.geometry.location.lat(),
			lngValue = place.geometry.location.lng();
			var action = async()=>{
				const updateinfo = await this.props.getSuperMarketsMarkers({lat:latValue,lng:lngValue,bound:null,zoom:15,markers:null})
				const state = await this.setState({
						mapPosition: {
							lat: latValue,
							lng: lngValue
						},
						movePosition: {
							lat: latValue,
							lng: lngValue
					},
						zoom:15,
						input:true,
						moving:false,
					})

    				
				this.props.updateInfo({"lat":latValue,"lng":lngValue})
    			}
    		action()
			
		}
	this.props.changeMarkerSelected(null)
	return
	};
	mapmovedZoom=()=>{
		var action = async()=>{
			const zoom = await this.state.map.getZoom()
			const bound =  await this.state.map.getBounds()
			const lat = await this.state.map.getCenter().lat()
			const lng = await this.state.map.getCenter().lng()
			const find = await this.markersInBound(this.props.superMarket.markers1,JSON.stringify(bound))
			const updatemarkers = await this.props.getSuperMarketsMarkers({lat:lat,lng:lng,
			 	bound:JSON.stringify(bound),zoom:zoom,markers:find.ids,markersComplete:find.result})
			const state = await this.setState({
				bound:JSON.stringify(this.state.map.getBounds()),
				movePosition: {
					lat: lat,
					lng: lng
				},
				mapPosition: {
					lat: lat,
					lng: lng
				},
				moving:true,	
				zoom:zoom,
			})
			/*console.log(this.props.overAll.zoom,zoom)*/
			if (this.props.overAll.zoom===12 && zoom ===12){}
			else {
				/*console.log("updating the lat lng zoom",zoom)*/
				this.props.updateInfo({
					lat:lat,lng:lng,zoom:zoom})}
			}
			
		action()

	}
	maploaded=(mapRef)=>{
		if(!mapRef){
			return
		}
		this.setState({
			map:mapRef,
			maploading:true})	
	}
	markersInBound = (shops,parseBound)=>{
		var result_id =[]
		var result = []
		parseBound = JSON.parse(parseBound)
		shops.map((shop)=>{
			if (shop.lat>parseBound.south && shop.lat<parseBound.north && shop.lng>parseBound.west && shop.lng<parseBound.east){
				result.push(shop)
				result_id.push(shop._id)}	
			})	
		return {ids:JSON.stringify(result_id),result:result}
	}

	render() {	
	const AsyncMap = withScriptjs(
		withGoogleMap(
			props => (
				<GoogleMap 
				ref = {this.maploaded}
				zoom={this.state.zoom}
				center={{ lat: this.state.mapPosition.lat, lng: this.state.mapPosition.lng }}
				onDragEnd={this.mapmovedZoom}
				onZoomChanged = {this.mapmovedZoom}
				>
					<Autocomplete
						style={{
						width: '200%',
						height: '40px',
						paddingLeft: '16px',
						margin:"2px auto 20px auto",
						}}
						onPlaceSelected={ this.onPlaceSelected }
						types={['(regions)']}
						placeholder={"Enter and select location"}
					/>

						<MarkerShop	/>

				</GoogleMap>
			)
		)
	)
	let map
	map =  <div style={{width:"100%"}} >
			<AsyncMap
				googleMapURL= "https://maps.googleapis.com/maps/api/js?key=AIzaSyBiffp6dvrIk_EWQHzXk05VzFKb5tioZeI&libraries=places"
				loadingElement={
				 <div style={{ height: `100%` }} />
				}
				containerElement={
				 <div style={{ height: this.props.height,
  								display: "flex",
  								flexDirection: "column-reverse"}} />
				}
				mapElement={
				 <div style={{ height: `100%` }} />
				}

				/>
			</div>
	return (
		<React.Fragment>
			{map}
		</React.Fragment> 
	)
  }
}

Map.propTypes = {
	getInfo:PropTypes.func.isRequired,
	updateInfo:PropTypes.func.isRequired,
	getSuperMarketsMarkers:PropTypes.func.isRequired,
	getSuperMarkets:PropTypes.func.isRequired,
	superMarket:PropTypes.object.isRequired,
	changeMarkerSelected:PropTypes.func.isRequired	
}

const mapStateToProps = (state)=>({
	superMarket:state.superMarket,
	overAll:state.overAll,
})

export default connect(mapStateToProps,{getSuperMarkets,changeMarkerSelected,getSuperMarketsMarkers,updateInfo,getInfo})(Map)