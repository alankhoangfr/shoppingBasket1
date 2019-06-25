import React, {Component} from "react"
import SearchShop from "./SearchShop"
import FormItem from "./AddItem/FormItem"
import { Container, Row,Col } from 'reactstrap';
import {getItems} from "../actions/ItemsAction"
import {connect} from "react-redux"
import PropTypes from "prop-types"

export class AddItem extends Component{
	componentDidMount(){	
		this.props.getItems()
		
	}
	render(){
		let shopSelected = 
			<Container style={{marginTop:"50px"}}>
				<Row>
					<Col sm={4}>
						<FormItem
					compareCard = {false}
						/>
					</Col>
					<Col sm={7}>
						{this.props.superMarket.markerSelected===null?null:<h1>Characteristic of {this.props.superMarket.markerSelected.name}</h1>}
					</Col>
				</Row>
			</Container>
		if(this.props.superMarket.markerSelected===null){shopSelected=null}
		return (
			<React.Fragment>
				<SearchShop
					compareBasket={false}
					/>
				{shopSelected}
			</React.Fragment>
			)
	}
}

AddItem.propTypes = {
	getItems:PropTypes.func.isRequired,

}
const mapStateToProps = (state)=>({
	item:state.item,
	superMarket:state.superMarket
})

export default connect(mapStateToProps,{getItems}) (AddItem)

