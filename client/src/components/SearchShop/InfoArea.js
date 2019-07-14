import React, {Component} from "react"
import { ListGroup, ListGroupItem,ListGroupItemText,ListGroupItemHeading} from 'reactstrap';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, CardTitle, CardText, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import {connect} from "react-redux"
import {getSuperMarkets,changeMarkerSelected} from "../../actions/SuperMarketActions"
import PropTypes from "prop-types"
import { Spinner } from 'reactstrap';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { styled } from '@material-ui/styles'


const MyButton = styled(Fab)({
  	position: 'absolute ',
  	right:"10px",
  	bottom:"20px"
});
export class InfoArea extends Component {
	constructor(props){
		super(props)
		this.state={
			markerHighlighted:"",
			activeTab: '1',
		}
	}
	shouldComponentUpdate(nextProps,nextState){
		/*console.log(this.props,nextProps)*/
		const {space1,space2,space3} = this.props.overAll
		const spaces =[space1,space2,space3]
		const nspaces =[nextProps.overAll.space1,nextProps.overAll.space2,nextProps.overAll.space3]
		if (nextProps.superMarket.loading!==this.props.superMarket.loading){
			return true
		}else if (nextProps.overAll.zoom!==this.props.overAll.zoom){
			return true
		}
		else if(nspaces!==spaces){
			return true
		}
		else if(this.props.superMarket.markerSelected!==nextProps.superMarket.markerSelected&&nextProps.superMarket.markerSelected!==null){
			return true
		}else if(this.state.activeTab!==nextState.activeTab){
			return true
		}
			else{return false}
	}
	componentDidUpdate(prevProps){
		/*console.log("didupdate",prevProps,this.props)*/
		if(this.props.superMarket.markerSelected!==prevProps.superMarket.markerSelected&&this.props.superMarket.markerSelected!==null){
			this.toggle('2')
			this.setState({
				markerHighlighted:this.props.superMarket.markerSelected._id})
		}
	}
	toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  	}
	onclickMarker = (markerObject,event) =>{
		this.setState({markerHighlighted:markerObject._id})
	}
	onDoubleClick = (markerObject)=>{
		this.props.changeMarkerSelected(markerObject)
		this.toggle('2')

	}
	onClickAdd=(markerObject,event)=>{
		this.props.shopSelectedCompare(markerObject)
	}
	insideTheSpace = (markerObject)=>{
		const {space1,space2,space3}=this.props.overAll
		const space = [space1!==null?space1.StoreId:null,space2!==null?space2.StoreId:null,space3!==null?space3.StoreId:null]
		if(space.indexOf(markerObject.StoreId)===-1){
			return (
				<MyButton size="small" color="primary" aria-label="Add"  onClick={this.onClickAdd.bind(this,markerObject)} align="right">
        			<AddIcon />
      			</MyButton>)
		}else {
			return null
		}
	}
	markersInBound = (markers)=>{
		return markers.map((markerObject)=>{
			let active = ""
			if (markerObject._id===this.state.markerHighlighted){
				active = "success"
			}
			return(
				<ListGroupItem 
				onClick={this.onclickMarker.bind(this,markerObject)}  
				key={markerObject._id}  
				color={active}
				onDoubleClick = {this.onDoubleClick.bind(this,markerObject)}>
					<ListGroupItemHeading>
						{markerObject.name}
					</ListGroupItemHeading>
					<ListGroupItemText>
						{markerObject.Address}
						{this.props.compareBasket===true?
							this.insideTheSpace(markerObject)
							:null}
					</ListGroupItemText>
					<ListGroupItemText>
						{markerObject.score}
					</ListGroupItemText>
				</ListGroupItem>
				)
		})
	}

	focusOnMarker = (markerObject)=>{
		return(
			<ListGroupItem >
				<ListGroupItemHeading>
					{markerObject.name}
					{this.props.compareBasket===true&&this.props.superMarket.markerSelected!==null?
						this.insideTheSpace(markerObject):null}
				</ListGroupItemHeading>
				<ListGroupItemText>
					{markerObject.Address}			
				</ListGroupItemText>
			</ListGroupItem>

			)
	}
	render() {
	let infoall =  
				<div style={{border:"1px solid black", height:"400px", overflowY: "scroll"}}>
					<div >
						<h2> Stores in the area </h2>
					</div>
					<ListGroup>
						{this.markersInBound(this.props.superMarket.markers1)}
					</ListGroup>
				</div>
	let infoFocus =
				<div style={{border:"1px solid black", height:"400px", overflowY: "scroll"}}>
					{this.props.superMarket.markerSelected!==null?this.focusOnMarker(this.props.superMarket.markerSelected):null}
				</div>
	let noneFound =
				<div style={{border:"1px solid black", height:"400px", overflowY: "scroll"}}>
					No supermarkets found in this area
				</div>
	let spinnerTab = 
			<div style={{margin:"auto auto", position:"absolute", top:"50%", left:"50%"}}>
				<Spinner color="primary" />
			</div>

	let zoomIn = 
		<div style={{border:"1px solid black", height:"400px", overflowY: "scroll"}}>
			Zoom in to get a list of more stores
		</div>
	var infoFrame= () =>{
		if(this.props.overAll.zoom===12){
				console.log("zoom in")
				return zoomIn
		}else{
			if(this.props.superMarket.loading===false){		
				return this.props.superMarket.markers1.length===0?noneFound:infoall		
			}else{return spinnerTab}
		}
		
	} 
		
	return (
		<React.Fragment>
			<div style={{height: '62px'}}>
			</div>
			 <div>
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '1' })}
              onClick={() => { this.toggle('1'); }}
            >
              All the Shops in the Area
            </NavLink>
          </NavItem>
          {this.props.superMarket.markerSelected!==null?<NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '2' })}
              onClick={() => { this.toggle('2'); }}
            >
              Focus
            </NavLink>
          </NavItem>:null}
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
                {infoFrame()}
          </TabPane>
          <TabPane tabId="2">         
                  {infoFocus}
          </TabPane>
        </TabContent>
      </div>
		
		</React.Fragment>	
)
  }
}


InfoArea.propTypes = {
	getSuperMarkets:PropTypes.func.isRequired,
	superMarket:PropTypes.object.isRequired,
	changeMarkerSelected:PropTypes.func.isRequired,
}

const mapStateToProps = (state)=>({
	superMarket:state.superMarket,
	overAll:state.overAll,
})

export default connect(mapStateToProps,{getSuperMarkets,changeMarkerSelected})(InfoArea)