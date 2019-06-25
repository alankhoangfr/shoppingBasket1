import React from 'react';
import { Card, CardImg, CardText, CardBody, CardLink,
  CardTitle, CardSubtitle,Form, FormGroup, Label, Input,Col,Button } from 'reactstrap';
import SearchBox from "./SearchBox"
import {addItemToShop,getSuperMarkets} from "../../actions/SuperMarketActions"
import {connect} from "react-redux"
import PropTypes from "prop-types"
import moment from "moment"
import Cleave from 'cleave.js/react';	
import { Alert } from 'reactstrap';

export class FormItem extends React.Component {
    constructor(props){
        super(props)
        this.state={
             result:"",
             price:"",
             visible:false,
             emptySearchBox:false,
             alertInfo:{},
         }
     }
    shouldComponentUpdate(nextProps,nextState){
         if(this.state.result!==nextState.result){
             return true
         }
         else if(this.props.superMarket.markerSelected!==nextProps.superMarket.markerSelected){
			return true
		 }
		 else {return false}
    }
    componentDidUpdate(prevProps){
    	if(prevProps.superMarket.markerSelected!==this.props.superMarket.markerSelected){
    		this.setState({result:""})
    	}
    }
    visible=()=>{
		this.setState({visible:true})
	}
	onDismiss=()=> {
    	this.setState({ visible: false });
    }
	result = (result)=>{
    	this.setState({result:result})
	}
	onSubmit=(event)=>{
		event.preventDefault()
		const {result,price}=this.state
        console.log(result)
		const newItem = {
			Code:result.Code,
			product_name:result["Product Name"],    
			price:price,
			timeStamp:moment().format(),
			superMarket_id:this.props.superMarket.markerSelected._id,
			date:moment().format("ddd Do MMM YY"),
      title:result["title"],
      description:result["description"],
      image:result["image"],
      reference:result["reference"]
		}
		this.setState({
			price:"",
			visible:true,
            result:"",
            emptySearchBox:true,
            alertInfo:{product_name:newItem.product_name,price:newItem.price}})
		this.props.addItemToShop(newItem)		
	}
	onChange=(event)=>{
		this.setState({
			price:event.target.value,
            emptySearchBox:true,
		})
	}
	onClick=(event)=>{
        const source = this.props.item.totalItems
		let shoppingItems = {}
		source.forEach((item)=>{
			let eachItem = {
				Code:item.Code,
				brand_name:item["Product Name"],	
				price:(Math.random()*(20)+0.5).toFixed(2),
				timeStamp:moment().format(),
				superMarket_id:this.props.superMarket.markerSelected._id,
				date:moment().format("ddd Do MMM YY"),
                title:item["title"],
                description:item["description"],
                image:item["image"],
                reference:item["reference"]
			}
			shoppingItems[item.Code]=eachItem
			this.props.addItemToShop(eachItem)	
		})
	}
    render() {
    	const {result,price}=this.state
    	var oldPrice = "Be the first to register a price!"
		if(this.props.superMarket[this.props.superMarket.markerSelected._id].item!==undefined	){
			if(this.props.superMarket[this.props.superMarket.markerSelected._id].item[result.Code]){
				const prevPrice = this.props.superMarket[this.props.superMarket.markerSelected._id].item[result.Code].price
				const prevDate = this.props.superMarket[this.props.superMarket.markerSelected._id].item[result.Code].date
				oldPrice = `This was last registered at $${prevPrice} on ${prevDate}`
    		}
		}
    	let cardImage = <CardImg top width="100%" src={this.state.result.image} alt="Card image cap"
             		style={{maxWidth:"150px",maxHeight:"150px",margin:"auto"}}/>
        if(this.state.result.image===null){
        	cardImage=
        	    <CardBody className="text-center"> 
        	    	<CardText>Be the first to upload a photo</CardText>
        			<Input type="file" name="file" id="exampleFile"  style={{width:"60%",margin:"auto"}}/>
        		</CardBody>
        }		
        let card =
            <Card style={{marginTop:"20px"}} >
            <CardBody className="text-center">
                <CardTitle>{this.state.result["Product Name"]}</CardTitle>
                <CardSubtitle>{this.state.result.description}</CardSubtitle>
                
            </CardBody>
           	{cardImage}
            <CardBody>
                <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                 <CardText>{oldPrice}</CardText>
                <Form onSubmit={this.onSubmit}>
                    <FormGroup row className="text-center">
                        <Col sm={10}>
                       		$<Cleave placeholder="Enter the Price"
                       			options={{numeral: true}}
                				numeralThousandsGroupStyle = 'thousand'
                				onChange={this.onChange}
                				value={price} />
                        </Col>
                    </FormGroup>
    				<FormGroup check row>
    					<Col sm={{ size: 10, offset: 2 }}>
    						<Button>Submit</Button>
     					</Col>
    				</FormGroup>
    			</Form>
    		</CardBody>
    		</Card>
			if (this.state.result===""){
   				card=null
			}
	return (
    	<div>
    		<h1 style={{marginTop:"20px"}}>Search an item</h1>
        	<SearchBox
            	result = {this.result}
            	supermarket_selected={this.props.superMarket.markerSelected}
                emptySearchBox={this.state.emptySearchBox}/>
              <Alert color="success" isOpen={this.state.visible} toggle={this.onDismiss} style={{}}>
        		{this.state.alertInfo.product_name} has been registered at $ {this.state.alertInfo.price}
      		</Alert>
        	{card}
        	{this.props.superMarket[this.props.superMarket.markerSelected._id].item===undefined?
        		<Button onClick = {this.onClick} >Generate Item Data for shop</Button>:null}
    	</div>
   
		);
	}
}

FormItem.propTypes = {
	addItemToShop:PropTypes.func.isRequired,
	getSuperMarkets:PropTypes.func.isRequired,
	superMarket:PropTypes.object.isRequired
}

const mapStateToProps = (state)=>({
	superMarket:state.superMarket,
    item:state.item

})

export default connect(mapStateToProps,{getSuperMarkets,addItemToShop})(FormItem)