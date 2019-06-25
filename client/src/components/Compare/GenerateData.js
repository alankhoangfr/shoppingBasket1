import React from 'react';
import {Button } from 'reactstrap';
import {addItemToShop,getSuperMarkets} from "../../actions/SuperMarketActions"
import {connect} from "react-redux"
import PropTypes from "prop-types"
import moment from "moment"

const source = grocery_sampleJSON

export class GenerateData extends React.Component {
    constructor(props){
        super(props)
        this.state={
            visible:true,
             
         }
     }
    shouldComponentUpdate(nextProps,nextState){
        console.log(nextProps,this.props,this.state,moment().format(),moment().format("ddd Do MMM YY"))
        if(this.props.superMarket.markers1!==nextProps.superMarket.markers1){
            return true
        }else if(this.state!==nextState){
            return true
        }
        else{
            return false
        }
    }
    componentDidUpdate(prevProps){
        if(prevProps.superMarket.markers1!==this.props.superMarket.markers1){
            this.setState({visible:true})
        }
    }
    randomShuffle=(array)=>{
        for(var i = array.length-1;i>0;i--){
            var j = Math.floor((0.78+0.2*Math.random())*(i+1))
            var temp = array[i]
            array[i]=array[j]
            array[j]=temp
        }
        var numberOfItems = Math.floor(Math.random()*array.length)
        return array.slice(0,numberOfItems)

    }
	onClick=(event)=>{
        this.props.superMarket.markers1.map((mark)=>{
            let shoppingItems = {}
            var randomSource = this.randomShuffle(source)
            console.log(randomSource,"randomsource")
            randomSource.forEach((item)=>{
            let eachItem = {
                Code:item.Code,
                product_name:item["Product Name"],    
                price:(Math.random()*(20)+0.5).toFixed(2),
                timeStamp:moment().format(),
                superMarket_id:mark._id,
                date:moment().format("ddd Do MMM YY")
            }
            shoppingItems[item.Code]=eachItem
            this.props.addItemToShop(eachItem)    
            })
        })
        this.setState({visible:false})
	}
    render() {
    	
	return (
        <React.Fragment>
           {this.state.visible===true?<Button onClick = {this.onClick} >Generate random Item Data for all shops</Button>:null}
         </React.Fragment>
		);
	}
}

GenerateData.propTypes = {
	addItemToShop:PropTypes.func.isRequired,
	getSuperMarkets:PropTypes.func.isRequired,
	superMarket:PropTypes.object.isRequired
}

const mapStateToProps = (state)=>({
	superMarket:state.superMarket,
    item:state.item

})

export default connect(mapStateToProps,{getSuperMarkets,addItemToShop})(GenerateData)