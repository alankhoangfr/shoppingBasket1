import React, { Component } from 'react';
import { withGoogleMap, GoogleMap, withScriptjs, Marker,InfoWindow  } from "react-google-maps";
import Geocode from "react-geocode"
import Autocomplete from 'react-google-autocomplete';
import uuid from "uuid"
import {connect} from "react-redux"
import {getSuperMarkets,getSuperMarketsMarkers,changeMarkerSelected} from "../../actions/SuperMarketActions"
import {getInfo,updateInfo} from "../../actions/OverAllActions"
import MarkerShop from "../SearchShop/MarkerShop"
import PropTypes from "prop-types"

Geocode.setApiKey('AIzaSyBiffp6dvrIk_EWQHzXk05VzFKb5tioZeI');
Geocode.enableDebug();


export class MapAddShop extends Component {
	constructor(props){
		super(props)
		this.state = {
			completeAddress :"",
            address: '',
            city: '',
            postcode: '',
            state: '',
			bound:null,
			input:"",
			mapPosition:{
				lat: this.props.center.lat,
				lng: this.props.center.lng
			},
			markerPosition:{
				lat:this.props.center.lat,
				lng:this.props.center.lng
			},
			movePosition:{
				lat:this.props.center.lat,
				lng:this.props.center.lng		
			},
			map:null,
			zoom:15,
			moving:false,
			maploading:false,
		}
	}
	componentDidMount(){
		this.props.getSuperMarketsMarkers()
	}
	shouldComponentUpdate( nextProps, nextState ){	
		console.log("should Componeent update", nextState, this.state,nextProps,this.props)
		if(this.props.overAll.lat===null && nextProps.overAll.lat!==null){
			console.log("load new lat and long")
			return true
		}
		else if(this.props.centerMarker!==nextProps.centerMarker){
			return true
		}
		else if(nextState.input===true){
			console.log("change position")
			return true
		}
		else if (this.check_markers1(nextProps.superMarket.markers1,this.props.superMarket.markers1)===false){
			console.log("new shops")
			return true
		}
		else if(this.props.superMarket.markers1!==undefined && nextProps.superMarket.markers1!==undefined
			&&this.check_markers1(this.props.superMarket.markers1,nextProps.superMarket.markers1)===false){
			console.log("change")
			return true
		}else if (this.props.superMarket.markers1!==undefined && nextProps.superMarket.markers1!==undefined&&
			this.check_markers1(this.props.superMarket.markers1,nextProps.superMarket.markers1)===true){
			console.log("no change")
			return false
		}else if(nextProps.loading===true||this.props.loading===true){
			return false
		}	

	}
	componentDidUpdate(prevProps, prevState, snapshot){
		if(this.props.centerMarker!==prevProps.centerMarker){
			this.setState({
				markerPosition:this.state.movePosition	
			})
		}
		else{
			this.props.getSuperMarketsMarkers()
			this.setState({
				input:false
			})
		}

	}
	getStreetNumber = ( addressArray ) => {
        let StreetNumber = '';
        for( let i = 0; i < addressArray.length; i++ ) {
            if ( addressArray[ i ].types[0] && 'street_number' === addressArray[ i ].types[0] ) {
                StreetNumber = addressArray[ i ].long_name;
                return StreetNumber;
            }
        }
    }

    getStreet = ( addressArray ) => {
        let Street = '';
        for( let i = 0; i < addressArray.length; i++ ) {
            if ( addressArray[ i ].types[0] && 'route' === addressArray[ i ].types[0] ) {
                Street = addressArray[ i ].long_name;
                return Street;
            }
        }
    }

    getPostcode = ( addressArray ) => {
        let postcode = '';
        for( let i = 0; i < addressArray.length; i++ ) {
            if ( addressArray[ i ].types[0] && 'postal_code' === addressArray[ i ].types[0] ) {
                postcode = addressArray[ i ].long_name;
                return postcode;
            }
        }
    };

    getCity = ( addressArray ) => {
        let city = '';
        for( let i = 0; i < addressArray.length; i++ ) {
            if ( addressArray[ i ].types[0]  ) {
            for ( let j = 0; j < addressArray[ i ].types.length; j++ ) {
                if ( 'sublocality_level_1' === addressArray[ i ].types[j] || 'locality' === addressArray[ i ].types[j] ) {
                    city = addressArray[ i ].long_name;
                    return city;
                }
            }
        }
        }
    };

    getState = ( addressArray ) => {
    let state = '';
        for( let i = 0; i < addressArray.length; i++ ) {
            for( let i = 0; i < addressArray.length; i++ ) {
                if ( addressArray[ i ].types[0] && 'administrative_area_level_1' === addressArray[ i ].types[0] ) {
                    state = addressArray[ i ].short_name;
                    return state;
                }
            }
        }
    };
    onMarkerDragEnd = ( event ) => {
        let newLat = event.latLng.lat(),
        newLng = event.latLng.lng(),
        addressArray = [];
        Geocode.fromLatLng( newLat , newLng ).then(
        response => {
            const completeAddress = response.results[0].formatted_address,
            addressArray =  response.results[0].address_components,
            street_number =this.getStreetNumber(addressArray),
            street =this.getStreet(addressArray),
            city = this.getCity( addressArray ),
            postcode = this.getPostcode( addressArray ),
            state = this.getState( addressArray ),
            address = street_number +" "+street
            this.props.markerInfoMap({
                completeAddress: ( completeAddress ) ? completeAddress : '',
                address: ( address ) ? address : '',
                postcode: ( postcode ) ? postcode : '',
                city: ( city ) ? city : '',
                state: ( state ) ? state : '',
                markerPosition: {
                lat: newLat,
                lng: newLng
                },
                mapPosition: {
                lat: newLat,
                lng: newLng
                },
                } )
            this.setState({
                markerPosition: {
                lat: newLat,
                lng: newLng
                },
            })
        },

        error => {
            console.error(error);
        }
    );
    };
	check_markers1=(array1,array2) => {
		var arr1 = []
		var arr2 = []
		array1.map((elem)=>{
			arr1.push(elem._id	)
		})
		array2.map((elem)=>{
			arr2.push(elem._id	)
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
    			    			this.props.updateInfo({"lat":lat,"lng":lng,"bound":[]})
    			this.props.getSuperMarketsMarkers()
    			this.setState({
					mapPosition: {
						lat: lat,
						lng: lng
					},
					markerPosition: {
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
    		})
		}
		else{
			const name = place.formatted_name,
			latValue = place.geometry.location.lat(),
			lngValue = place.geometry.location.lng();
			this.props.updateInfo({"lat":latValue,"lng":lngValue,"bound":[]})
			this.props.getSuperMarketsMarkers()
			// Set these values in the state.
			this.setState({
				mapPosition: {
					lat: latValue,
					lng: lngValue
				},
				markerPosition: {
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
		}
	this.props.changeMarkerSelected(null)
	return
	};
	mapmoved=()=>{
		this.setState({
			bound:JSON.stringify(this.state.map.getBounds()),
			movePosition: {
				lat: this.state.map.getCenter().lat(),
				lng: this.state.map.getCenter().lng()
			},
			mapPosition: {
				lat: this.state.map.getCenter().lat(),
				lng: this.state.map.getCenter().lng()
			},
			moving:true	
		})
		this.props.updateInfo({
			"lat":this.state.map.getCenter().lat(),"lng":this.state.map.getCenter().lng(),"bound":JSON.stringify(this.state.map.getBounds())})
		this.props.getSuperMarketsMarkers()
	}
	maploaded=(mapRef)=>{
		if(!mapRef){
			return
		}
		this.setState({
			map:mapRef,
			maploading:true})	
	}
	onZoom = ()=>{
		this.setState({
			bound:JSON.stringify(this.state.map.getBounds()),
			movePosition: {
				lat: this.state.map.getCenter().lat(),
				lng: this.state.map.getCenter().lng()
			},
			mapPosition: {
				lat: this.state.map.getCenter().lat(),
				lng: this.state.map.getCenter().lng()
			},
			zoom:this.state.map.getZoom(),
			moving:true	
		})
		this.props.updateInfo({
			"lat":this.state.map.getCenter().lat(),"lng":this.state.map.getCenter().lng(),"bound":JSON.stringify(this.state.map.getBounds())})
		this.props.getSuperMarketsMarkers()
	}
	render() {	
	const AsyncMap = withScriptjs(
		withGoogleMap(
			props => (
				<GoogleMap 
				ref = {this.maploaded}
				zoom={this.state.zoom}
				defaultCenter={{ lat: this.props.center.lat, lng: this.props.center.lng}}
				center={{ lat: this.state.mapPosition.lat, lng: this.state.mapPosition.lng }}
				onDragEnd={this.mapmoved}
				onZoomChanged = {this.onZoom}
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
					<Marker 
						draggable={true}
						onDragEnd = {this.onMarkerDragEnd}
						position={{ lat: this.state.markerPosition.lat, lng: this.state.markerPosition.lng }}
					/>
					<MarkerShop
						markers1={this.props.superMarket.markers1}/>
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


MapAddShop.propTypes = {
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

export default connect(mapStateToProps,{getSuperMarkets,changeMarkerSelected,getSuperMarketsMarkers,updateInfo,getInfo})(MapAddShop)