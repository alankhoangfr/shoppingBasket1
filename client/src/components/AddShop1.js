import React, {Component,Suspense	} from 'react';
import { Container, Row,Col,Alert  } from 'reactstrap';
import InfoShop from "./AddShop/InfoShop"
import InfoAreaAddShop from "./AddShop/InfoAreaAddShop"
import {connect} from "react-redux"
import {getSuperMarkets,getSuperMarketsMarkers} from "../actions/SuperMarketActions"
import {getInfo,updateInfo} from "../actions/OverAllActions"
import PropTypes from "prop-types"
import { Spinner } from 'reactstrap';
const MapAddShop = React.lazy(()=> import("./AddShop/MapAddShop"))

class AddShop1 extends Component {
    state ={
        markerInfo:"",
        centerMarker:false,
    }
    componentDidMount(){
        this.props.getSuperMarkets()
        this.props.updateInfo({"lat": 51.509865, "lng": -0.118092,"bound":[],"markers":[]})    
    }
    markerInfoMap  = (newMarkerObject)=>{
        this.setState({
            markerInfo:newMarkerObject,
    })
    }
    markerInfoFromAddress = (newMarkerObject)=>{
        this.setState({
            markerInfo:newMarkerObject,
            shopSelected:newMarkerObject,
        })
        this.props.changeMarkerSelected(newMarkerObject)
    }
    centerMarker=()=>{
       this.setState({centerMarker:!this.state.centerMarker})
    }

    render(){
    	let loading =  
			<div style={{margin:"auto auto", position:"absolute", top:"50%", left:"50%"}}>
				<Spinner color="primary" />
			</div>
          return (
            <Container>
                <div className="title">
                    <h1>
                        Search for the Supermarkets near you
                    </h1>
                        
                </div>
                <Row>
                    <Col sm={6}>
                    	<Suspense fallback = {loading} >
	                          <MapAddShop
	                        center={{lat: 51.509865, lng: -0.118092}}
	                        height='500px'
	                        markerInfo = {this.state.markerInfo}
	                        markerInfoMap={this.markerInfoMap}
	                        centerMarker={this.state.centerMarker}
	                        />
                        </Suspense> 
                    </Col>
                    <Col sm={6}>
                        <InfoAreaAddShop
                            centerMarker = {this.centerMarker}
                        />
                    </Col>
                </Row>
                <Row>
                    <div className="title" style={{marginTop:"30px"}}>
                        <h1>
                            Enter the Details or move the Marker
                        </h1>  
                    </div>
                    <Col sm={12}>
                        <InfoShop
                            markerPosition={this.markerPosition}
                            markerInfo = {this.state.markerInfo}
                            markerInfoFromAddress = {this.markerInfoFromAddress}  
                            />
                    </Col>
                </Row>
            </Container>



    );
    }

    }

AddShop1.propTypes = {
    updateInfo:PropTypes.func.isRequired,
    getInfo:PropTypes.func.isRequired,
    getSuperMarketsMarkers:PropTypes.func.isRequired,
    getSuperMarkets:PropTypes.func.isRequired,
    superMarket:PropTypes.object.isRequired,
}
const mapStateToProps = (state)=>({
    superMarket:state.superMarket
})

export default connect(mapStateToProps,{getSuperMarkets,getSuperMarketsMarkers,getInfo,updateInfo}) (AddShop1)

