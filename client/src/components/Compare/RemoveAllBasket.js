import React from 'react';
import {getSuperMarkets} from "../../actions/SuperMarketActions"
import {deleteAllBasket} from "../../actions/OverAllActions"
import {connect} from "react-redux"
import PropTypes from "prop-types"
import { Card,CardBody,CardTitle } from 'reactstrap';
import bin from "../../image/bin.png"
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
export class RemoveAllBasket extends React.Component {
   
	onClick=(event)=>{
        this.props.deleteAllBasket()
	}
    render() {
    	
	return (
        this.props.overAll.basket.length>0? 
            <Button variant="contained" color="secondary"  onClick = {this.onClick} size="medium">
                Delete All Items
                <DeleteIcon  />
            </Button>:null
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