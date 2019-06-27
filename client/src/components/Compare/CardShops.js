
import React, {Component} from "react"
import {CardText,Table,CardTitle,CardSubtitle,Card,Container, Row,Col,CardImg,CardBody,Alert, Modal, ModalHeader, ModalBody, ModalFooter,Button } from 'reactstrap';
import {getSuperMarkets} from "../../actions/SuperMarketActions"
import {getInfo,deleteItemFromBasket,addItemToBasket,registerSpace} from "../../actions/OverAllActions"
import {filterItems} from "../../actions/ItemsAction"
import {connect} from "react-redux"
import PropTypes from "prop-types"
import cancel from "../../image/cancel.png"

export class CardShops extends Component{
	constructor(props){
		super(props)
		this.state={
			space1:null,
			space2:null,
			space3:null,
			modal: false,
			modalAdd:false,
			modalAddItem:false,
			notInShop:[],
		}
	}
	shouldComponenntUpdate(nextProps,nextState){
		console.log("cardshop",nextProps,this.props,nextState,this.state)
		const {space1,space2,space3} = this.props.overAll
		const spaces =[space1,space2,space3]
		const nspaces =[nextProps.overAll.space1,nextProps.overAll.space2,nextProps.overAll.space3]
		if(this.props.shopSelectedCompare!==nextProps.shopSelectedCompare){
			return true
		}else if(nspaces!==spaces){
			return true
		}else if(this.props.overAll.basket!==nextProps.superMarket.basket){
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
		//there are no items registered
		if(this.props.superMarket[markerObject._id].item===undefined){
			this.setState({modalAddItem:true})
			this.props.cancelCardSpace()
		}else{
			if (space1===null&&space2===null&&space3===null){
				//first space taken
				var action = async()=>{
					const register = await this.props.registerSpace({space1:markerObject._id})
					const filter = await this.props.filterItems([markerObject._id,null,null])
					this.setState({space1:this.props.superMarket[markerObject._id]})
				}
				action()
				
			}else if(space2===null&&space3===null){
				if(space1._id!==markerObject._id){
					if(basket.length===0){
						var action = async()=>{
							const register = await this.props.registerSpace({space2:markerObject._id})
							const filter = await this.props.filterItems([this.props.overAll.space1,markerObject._id,null])
							this.setState({space2:this.props.superMarket[markerObject._id]})
						}
						action()
					}else{
						var count = 0
						var notInShop=[]
						var itemInShop = Object.keys(this.props.superMarket[markerObject._id].item)
						for(var i =0;i<basket.length;i++){
							var itemInBasket = basket[i]
							console.log(itemInBasket)
							if(itemInShop.indexOf(itemInBasket.Code)>=0)
								{count++}
							else if(itemInShop.indexOf(itemInBasket.Code)===-1)
								{notInShop.push(itemInBasket.title)}
						}if(count!==basket.length){
							this.setState({
								modalAdd:true,
								notInShop:notInShop,
								})
							this.props.cancelCardSpace()
						}else{
							var action = async()=>{
								const register = await this.props.registerSpace({space2:markerObject._id})
								const filter = await this.props.filterItems([this.props.overAll.space1,markerObject._id,null])
								this.setState({space2:this.props.superMarket[markerObject._id]})
							}
							action()
						}
					}
				}
			}else if(space3===null){
				const insideTheSpace = [space1._id,space2._id]
				if (insideTheSpace.indexOf(markerObject._id)===-1){
					if(basket.length===0){
							var action = async()=>{
								const register = await this.props.registerSpace({space3:markerObject._id})
								const filter = await this.props.filterItems([this.props.overAll.space1,this.props.overAll.space2,markerObject._id])
								this.setState({space3:this.props.superMarket[markerObject._id]})
							}
							action()
					}else{
						var count = 0
						var notInShop=[]
						var itemInShop = Object.keys(this.props.superMarket[markerObject._id].item)
						for(var i =0;i<basket.length;i++){
							var itemInBasket = basket[i]
							console.log(itemInBasket)
							if(itemInShop.indexOf(itemInBasket.Code)>=0)
								{count++}
							else if(itemInShop.indexOf(itemInBasket.Code)===-1)
								{notInShop.push(itemInBasket.title)}
						}if(count!==basket.length){
							this.setState({
								modalAdd:true,
								notInShop:notInShop,
								})
							this.props.cancelCardSpace()
						}else{
							var action = async()=>{
								const register = await this.props.registerSpace({space3:markerObject._id})
								const filter = await this.props.filterItems([this.props.overAll.space1,this.props.overAll.space2,markerObject._id])
								this.setState({space3:this.props.superMarket[markerObject._id]})
							}
							action()
						}
					}
				}		
			}else{
				this.setState({modal:true})
				this.props.cancelCardSpace()
			}
		}

	}
	cancel=(event)=>{
		const {space1,space2,space3} = this.props.overAll
		const spaces =[space1,space2,space3]
		const spaces_text = ["space1","space2","space3"]
		const numberOfNon = spaces.filter((s,index)=>
			spaces_text[index]!==event.target.id && s!==null
		)
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
				var action = async()=>{
					this.props.registerSpace({[spaces_text[i]]:null})
					this.setState({[spaces_text[i]]:null})
				}
				action()
			}
		}else{
			var action = async()=>{
				this.props.registerSpace({[spaces_text[i]]:null})
				this.setState({[spaces_text[i]]:null})
			}
			action()
		}
		if(numberOfNon.length===0){
			this.props.allSpace({nonVisible:true,space:numberOfNon})
			this.props.filterItems([null,null,null])
		}else{
			this.props.allSpace({nonVisible:false,space:numberOfNon})
			this.props.filterItems([numberOfNon])
		}
		this.props.cancelCardSpace()
	}
	totalBasket = (basket,space)=>{
		var total = []
		basket.map((eachItem)=>{
			const priceOfItem = space.item[eachItem.Code].price
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
 	toggleAddItem=()=> {
    this.setState({ modalAddItem: false });
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
					<img src={cancel} align="right" width="16px" onClick={this.cancel} id={id}/>
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
			        		const priceOfItem = space.item[eachItem.Code].price
			        		const total = (parseFloat(eachItem.quantity)*parseFloat(priceOfItem)).toFixed(2)
			        		return(
			        			<tr>
			        				<img src={cancel} align="right" width="8px" onClick={this.cancelItem.bind(this,eachItem)} id={id}/>
			        				<td style={{fontSize:"x-small", padding:"4px"}}>{eachItem.quantity}</td>
			        				<td style={{fontSize:"x-small", padding:"4px"}}>{eachItem["product_name"]}</td>
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
				<Modal isOpen={this.state.modalAddItem} toggle={this.toggleAddItem} className={this.props.className}>
          			<ModalHeader toggle={this.toggleAddItem}>You must add/generate items to the shop</ModalHeader>
        		</Modal>
				<Modal isOpen={this.state.modalAdd} toggle={this.toggleAdd} className={this.props.className}>
          			<ModalHeader toggle={this.toggleAdd}>You must remove the following items</ModalHeader>
          			<ModalBody>
            				<Table borderless hover responsive>
				          		<tbody>
				          			{this.state.notInShop.map((item)=>{
				          				return(
					          				<tr>
				        						<td>{item}</td>
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
					{this.props.overAll.space1!==null?cardComparsion(this.props.superMarket[this.props.overAll.space1],"space1"):cardNoShop}
				</Col>
				<Col sm={3}>
					{this.props.overAll.space2!==null?cardComparsion(this.props.superMarket[this.props.overAll.space2],"space2"):cardNoShop}
				</Col>
				<Col sm={3}>
					{this.props.overAll.space3!==null?cardComparsion(this.props.superMarket[this.props.overAll.space3],"space3"):cardNoShop}
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
}
const mapStateToProps = (state)=>({
	superMarket:state.superMarket,
	overAll:state.overAll,
	item:state.item
})

export default connect(mapStateToProps,{getInfo,getSuperMarkets,deleteItemFromBasket,addItemToBasket,registerSpace,filterItems}) (CardShops)

