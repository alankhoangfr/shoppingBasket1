import React, {Component} from "react"
import SearchShop from "./SearchShop"
import ItemDisplay from "./Compare/ItemDisplay"
import {Container, Row,Col} from 'reactstrap';
import CardShops from "./Compare/CardShops"
import Basket from "./Compare/Basket"
import RemoveAllBasket	 from "./Compare/RemoveAllBasket"
import {getSuperMarkets,getSuperMarketsMarkers} from "../actions/SuperMarketActions"
import {getInfo,updateInfo} from "../actions/OverAllActions"
import {connect} from "react-redux"
import PropTypes from "prop-types"
import LoadingOverlay from 'react-loading-overlay'

export class CompareBasket extends Component{
	constructor(props){
		super(props)
		this.state={
			itemOnDrag:"",
			shopSelectedCompare:null,	
			allSpace:true,
			space:[]
		}
	}

	itemOnDrag=(result)=>{
		this.setState({itemOnDrag:result})
	}
	shopSelectedCompare=(markerObject)=>{
		this.setState({shopSelectedCompare:markerObject})
	}

	allSpace=(allSpace)=>{
		this.setState({
			allSpace:allSpace.nonVisible,
			space:allSpace.space
		})
	}
	cancelCardSpace=()=>{
		this.setState({shopSelectedCompare:null})
	}

	render(){
		let shopSelected = 
			<div>
				<RemoveAllBasket/>
				<ItemDisplay
					supermarket_selected={this.state.supermarket_selected}
					itemOnDrag={this.itemOnDrag}
					space={this.state.space}
				/>
			</div>      
		if(this.state.allSpace===true){shopSelected=null}
		return (
			
			<React.Fragment>
				<LoadingOverlay
			  	active={this.props.item.loading}
				spinner
				text='Loading your content...'
				>		
					<SearchShop
						fromAddItem = {true}
						compareBasket={true}
						shopSelectedCompare={this.shopSelectedCompare}
						/>
					
					<Container style={{marginTop:"50px"}}>
						<Row>
							<Col sm={3}  style={{zIndex:"1"}}>
								{shopSelected}
							</Col>		
						<CardShops
							shopSelectedCompare={this.state.shopSelectedCompare}
							allSpace={this.allSpace}
							cancelCardSpace={this.cancelCardSpace}/>
						</Row>
					</Container>
				</LoadingOverlay>
			</React.Fragment>
			)
	}
}



CompareBasket.propTypes = {
	updateInfo:PropTypes.func.isRequired,
	getInfo:PropTypes.func.isRequired,
	getSuperMarketsMarkers:PropTypes.func.isRequired,
	getSuperMarkets:PropTypes.func.isRequired,
	superMarket:PropTypes.object.isRequired,
}
const mapStateToProps = (state)=>({
	superMarket:state.superMarket,
	overAll:state.overAll,
	item:state.item,
})

export default connect(mapStateToProps,{getSuperMarkets,getSuperMarketsMarkers,getInfo,updateInfo}) (CompareBasket)

