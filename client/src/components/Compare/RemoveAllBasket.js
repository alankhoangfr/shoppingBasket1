import React from 'react';
import {getSuperMarkets} from "../../actions/SuperMarketActions"
import {deleteAllBasket} from "../../actions/OverAllActions"
import {connect} from "react-redux"
import PropTypes from "prop-types"
import { Card,CardBody,CardTitle } from 'reactstrap';
import bin from "../../image/bin.png"

export class RemoveAllBasket extends React.Component {
   
	onClick=(event)=>{
        this.props.deleteAllBasket()
	}
    render() {
    	
	return (
        this.props.overAll.basket.length>0? 
            <Card body className="text-center cardBasket" id="cardBasket" >
                <CardTitle className="cardBasket" >Remove All Items from the Basket</CardTitle>
                <CardBody className="cardBasket">
                    <img width="50%" src={bin} onClick = {this.onClick} alt="Card image cap" style={{margin:"auto"}} className="cardBasket" />
                </CardBody>
            </Card>:null
		)
	}
}

RemoveAllBasket.propTypes = {
	deleteAllBasket:PropTypes.func.isRequired,
	getSuperMarkets:PropTypes.func.isRequired,
	superMarket:PropTypes.object.isRequired
}

const mapStateToProps = (state)=>({
	superMarket:state.superMarket,
    overAll:state.overAll,
    item:state.item,

})

export default connect(mapStateToProps,{getSuperMarkets,deleteAllBasket})(RemoveAllBasket)