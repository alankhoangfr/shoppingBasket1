
import React, {Component} from "react"
import {CardText,Table,CardTitle,CardSubtitle,Card,Container, Row,Col,CardImg,CardBody,Alert, Modal, ModalHeader, ModalBody, ModalFooter,Button } from 'reactstrap';
import {getSuperMarkets} from "../../actions/SuperMarketActions"
import {getInfo,deleteItemFromBasket,addItemToBasket,registerSpace,deleteAllBasket,checkSpace} from "../../actions/OverAllActions"
import {filterItems} from "../../actions/ItemsAction"
import {connect} from "react-redux"
import PropTypes from "prop-types"
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';	
import ClearIcon from '@material-ui/icons/Clear';	
import { styled } from '@material-ui/styles'


const MyIconDelete = styled(IconButton)({
  	position: 'relative ',
  	right:"10px",
});
const MyIconCancel = styled(IconButton)({
  	position: 'absolute ',
  	left:"0px",
  	top:"10px"
});
export class CardShops extends Component{
	constructor(props){
		super(props)
		this.state={
			modal: false,
			modalAdd:false,
		}
	}
	shouldComponenntUpdate(nextProps,nextState){
		/*console.log("cardshop",nextProps,this.props,nextState,this.state)*/
		const {space1,space2,space3} = this.props.overAll
		const spaces =[space1,space2,space3]
		const nspaces =[nextProps.overAll.space1,nextProps.overAll.space2,nextProps.overAll.space3]
		if(this.props.shopSelectedCompare!==nextProps.shopSelectedCompare){
			return true
		}else if(nspaces!==spaces){
			return true
		}else if(this.props.overAll.basket!==nextProps.superMarket.basket){
			return true
		}else if(this.props.overAll.addToSpace!==nextProps.overAll.addToSpace
			||this.props.overAll.itemsInShop!==nextProps.overAll.itemsInShop
			||this.props.overAll.notInShop!==nextProps.overAll.notInShop){
			return true
		}
	}
	componentDidUpdate(prevProps,prevState){
		const pspaces =[prevProps.overAll.space1,prevProps.overAll.space2,prevProps.overAll.space3]
		const {space1,space2,space3} = this.props.overAll
		const spaces =[space1,space2,space3]
		const numberOfNon = spaces.filter((s,index)=>
			s!==null
		)
		if(this.props.shopSelectedCompare===null){
			return null
		}
		if(pspaces!==spaces){
			if(numberOfNon.length===0){
				this.props.allSpace({nonVisible:true,space:numberOfNon})
			}else{
				this.props.allSpace({nonVisible:false,space:numberOfNon})
			}
		}if(this.props.shopSelectedCompare!==prevProps.shopSelectedCompare){
			this.shopSelectedCompare(this.props.shopSelectedCompare)
		}
	}

	shopSelectedCompare=(markerObject)=>{
		const {space1,space2,space3} = this.props.overAll
		const basket = this.props.overAll.basket
		this.props.checkSpace(markerObject.StoreId)
		if (space1===null&&space2===null&&space3===null){
			//first space taken
			var action =async()=>{
				const register = await this.props.registerSpace(
					{"storeId":{space1:markerObject.StoreId},"storeObject":{space1:markerObject}})
				const filter = await this.props.filterItems([markerObject.StoreId,null,null])
			}
			action()
			
		}else if(space2===null&&space3===null){
			if(space1._id!==markerObject._id){
				if(basket.length===0){
					var action =async()=>{
						const register = await this.props.registerSpace(
							{"storeId":{space2:markerObject.StoreId},"storeObject":{space2:markerObject}})
						const filter = await this.props.filterItems([this.props.overAll.space1.StoreId,markerObject.StoreId,null])
					}
					action()
				}else{
					var makeSure = (condition)=>{
						if(condition===false){
							 setTimeout(makeSure, 2000)
						}
						else{
							if(this.props.overAll.addToSpace===false){
								this.setState({modalAdd:true,})
								this.props.cancelCardSpace()
							}else if(this.props.overAll.addToSpace===true){
								var action =async()=>{
								const register = await this.props.registerSpace(
									{"storeId":{space2:markerObject.StoreId},"storeObject":{space2:markerObject}})
								const filter = await this.props.filterItems([this.props.overAll.space1.StoreId,markerObject.StoreId,null])
								}
								action()
							}
						}
						
					}
					makeSure(this.props.overAll.loadingCheck)

				}
			}
		}else if(space3===null){
			const insideTheSpace = [space1._id,space2._id]
			if (insideTheSpace.indexOf(markerObject._id)===-1){
				if(basket.length===0){
						var action =async()=>{
							const register = await this.props.registerSpace(
								{"storeId":{space3:markerObject.StoreId},"storeObject":{space3:markerObject}})
							const filter = await this.props.filterItems([this.props.overAll.space1.StoreId,this.props.overAll.space2.StoreId,markerObject.StoreId])
						}
						action()
				}else{
					
					var makeSure = (condition)=>{
						if(condition===false){
							 setTimeout(makeSure, 2000)
						}
						else{
							if(this.props.overAll.addToSpace===false){
								this.setState({modalAdd:true})		
								this.props.cancelCardSpace()
							}else if(this.props.overAll.addToSpace===true){
								var action =async()=>{
								const register = await this.props.registerSpace(
									{"storeId":{space3:markerObject.StoreId},"storeObject":{space3:markerObject}})
								const filter = await this.props.filterItems([this.props.overAll.space1.StoreId,this.props.overAll.space2.StoreId,markerObject.StoreId])
							}
							action()
							}
						}	
					}
					makeSure(this.props.overAll.loadingCheck)
				}
			}		
		}else{
			this.setState({modal:true})
			this.props.cancelCardSpace()
		}

	}
	cancel=(event)=>{
		const {space1,space2,space3} = this.props.overAll
		const spaces =[space1,space2,space3]
		const spacesId =[space1===null?null:space1.StoreId,space2===null?null:space2.StoreId,space3===null?null:space2.StoreId]
		const spaces_text = ["space1","space2","space3"]
		const numberOfNon = spaces.filter((s,index)=>
			spaces_text[index]!==event.target.id && s!==null
		)
		const numberOfNonID=spacesId.filter((s,index)=>
			spaces_text[index]!==event.target.id && s!==null
		)
		var reformedSpace = {}
		spaces_text.map((s,index)=>{
			var result = numberOfNon[index]
			if(numberOfNon[index]===undefined){result=null}
			reformedSpace[s]=result
		})
		const reformedSpaceId = {
			space1:reformedSpace["space1"]===null?null:reformedSpace["space1"].StoreId,
			space2:reformedSpace["space2"]===null?null:reformedSpace["space2"].StoreId,
			space3:reformedSpace["space3"]===null?null:reformedSpace["space3"].StoreId
		}
		
		/*console.log(reformedSpace,reformedSpaceId)*/
		var i = 0
		while(true){
			if(i>spaces.length-1){
				break
			}else{
				if(spaces_text[i]===event.target.id){
					break
				}
				else if(spaces[i]!==null){
					i++ 
				}else{
					break
				}
			}
		}
		if(numberOfNon.length!==i){
			for(var i=0; i<numberOfNon.length;i++){
				this.setState({[spaces_text[i]]:numberOfNon[i]})
			}for(var i=numberOfNon.length; i<spaces.length;i++){
				var action =async()=>{
					this.props.registerSpace({"storeId":reformedSpaceId,"storeObject":reformedSpace})
				}
				action()
			}
		}else{
			var action =async()=>{
				this.props.registerSpace({"storeId":reformedSpaceId,"storeObject":reformedSpace})
			}
			action()
		}
		if(numberOfNon.length===0){
			this.props.allSpace({nonVisible:true,space:numberOfNon})
			this.props.filterItems([null,null,null])
			this.props.deleteAllBasket()
		}else{
			this.props.allSpace({nonVisible:false,space:numberOfNon})
			this.props.filterItems(numberOfNonID)
		}
		this.props.cancelCardSpace()
	}
	totalBasket = (basket,space)=>{
		var total = []
		basket.map((eachItem)=>{
			const priceOfItem = space.item.filter(itemId =>itemId.Code===eachItem.Code)[0].price
			const totalPrice = (parseFloat(eachItem.quantity)*parseFloat(priceOfItem)).toFixed(2)	
			total.push(totalPrice)
		})
		const finalResult = total.reduce((a,b)=>parseFloat(a)+parseFloat(b),0)
		return parseFloat(finalResult).toFixed(2)
	}
	toggle=()=> {
    this.setState({ modal: false });
 	}
 	toggleAdd=()=> {
    this.setState({ modalAdd: false });
 	}
 	cancelItem=(eachItem)=>{
 		this.props.deleteItemFromBasket(eachItem)
 		this.props.cancelCardSpace()
 	}
	render(){
		var cardComparsion=(space,id) => ( 	
			<Card body className="text-center" >
				<CardTitle>
					{space.name} 
					<MyIconCancel aria-label="Clear" onClick={this.cancel} id={id}>
        				<ClearIcon />
     				</MyIconCancel>
				</CardTitle>
				<CardSubtitle>{space.completeAddress}</CardSubtitle>
				<Table borderless hover responsive>
			        <thead>
			          <tr>
			            <th style={{fontSize:"x-small", width:"8px"}}></th>
			          	<th style={{fontSize:"x-small"}}>Quantity</th>
			            <th style={{fontSize:"x-small"}}>Product</th>
			            <th style={{fontSize:"x-small"}}>Unit</th>
			            <th style={{fontSize:"x-small"}}>Total</th>
			          </tr>
			        </thead>
			        <tbody>
			        	{this.props.overAll.basket.map((eachItem)=>{
			        		console.log(space,eachItem)
			        		const priceOfItem = space.item.filter(itemId=>itemId.Code===eachItem.Code)[0].price
			        		const total = (parseFloat(eachItem.quantity)*parseFloat(priceOfItem)).toFixed(2)
			        		return(
			        			<tr>
			        				<MyIconDelete aria-label="Delete" onClick={this.cancelItem.bind(this,eachItem)}  id={id}>
        								<DeleteIcon />
     				 				</MyIconDelete>
			        				
			        				<td style={{fontSize:"x-small", padding:"4px"}}>{eachItem.quantity}</td>
			        				<td style={{fontSize:"x-small", padding:"4px"}}>{eachItem["description"]}</td>
			        				<td style={{fontSize:"x-small", padding:"3px"}}>$ {priceOfItem}</td>
			        				<td style={{fontSize:"x-small", padding:"3px"}}>$ {total}</td>
			        			</tr>
			        			)
			        	})}
			        	<tr>
			        		<td style={{width:"8px"}}></td>
			        		<td>Total</td>
			        		<td></td>
			        		<td colSpan={2} style={{padding:"10.5px 0px"}}>$ {this.totalBasket(this.props.overAll.basket,space)}</td>
			        	</tr>
			        </tbody>
			    </Table>
			</Card>
			)
		const cardNoShop =
			<Card body className="text-center">
				<h1>Add a shop to Compare</h1>
			</Card>
		return(
			<React.Fragment>
				<Modal isOpen={this.state.modalAdd} toggle={this.toggleAdd} className={this.props.className}>
          			<ModalHeader toggle={this.toggleAdd}>You must remove the following items</ModalHeader>
          			<ModalBody>
            				<Table borderless hover responsive>
				          		<tbody>
				          			{this.props.overAll.notInShop.map((item)=>{
				          				return(
					          				<tr>
				        						<td>{this.props.overAll.basket.filter(itemInBasket=>itemInBasket.Code==item)[0]["description"]}</td>
				        					</tr>
			        					)
				          			})}
				          		</tbody>	
            				</Table>
         	 		</ModalBody>
        		</Modal>
        		<Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          			<ModalBody>
            			You can only select 3 shops to compare
         	 		</ModalBody>
          			<ModalFooter>
            			<Button color="secondary" onClick={this.toggle}>Cancel</Button>
          			</ModalFooter>
        		</Modal>
				<Col sm={3}>
					{this.props.overAll.space1!==null?cardComparsion(this.props.overAll.space1,"space1"):cardNoShop}
				</Col>
				<Col sm={3}>
					{this.props.overAll.space2!==null?cardComparsion(this.props.overAll.space2,"space2"):cardNoShop}
				</Col>
				<Col sm={3}>
					{this.props.overAll.space3!==null?cardComparsion(this.props.overAll.space3,"space3"):cardNoShop}
				</Col>
			</React.Fragment>	
			)
	}
}

CardShops.propTypes = {
	getSuperMarkets:PropTypes.func.isRequired,
	superMarket:PropTypes.object.isRequired,
	deleteItemFromBasket:PropTypes.func.isRequired,
	addItemToBasket:PropTypes.func.isRequired,
	registerSpace:PropTypes.func.isRequired,
	getInfo:PropTypes.func.isRequired,
	filterItems:PropTypes.func.isRequired,
	deleteAllBasket:PropTypes.func.isRequired,
	checkSpace:PropTypes.func.isRequired,
}
const mapStateToProps = (state)=>({
	superMarket:state.superMarket,
	overAll:state.overAll,
	item:state.item
})

export default connect(mapStateToProps,{getInfo,getSuperMarkets,deleteItemFromBasket,addItemToBasket,registerSpace,filterItems,deleteAllBasket,checkSpace}) (CardShops)

