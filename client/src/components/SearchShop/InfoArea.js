import React, {Component} from "react"
import { ListGroup, ListGroupItem,ListGroupItemText,ListGroupItemHeading} from 'reactstrap';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import add from "../../image/add.png"
import classnames from 'classnames';
import {connect} from "react-redux"
import {getSuperMarkets,changeMarkerSelected} from "../../actions/SuperMarketActions"
import PropTypes from "prop-types"


export class InfoArea extends Component {
	constructor(props){
		super(props)
		this.state={
			markerHighlighted:"",
			activeTab: '1',
		}
	}

	componentDidUpdate(prevProps){
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
		this.props.shopSelectedCompare(markerObject	)
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
						{this.props.compareBasket===true?<img src={add} onClick={this.onClickAdd.bind(this,markerObject)} align="right"/>:null}
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
					{this.props.compareBasket===true&&this.props.superMarket.markerSelected!==null?<img src={add} align="right" onClick={this.onClickAdd.bind(this,markerObject)}/>:null}
				</ListGroupItemHeading>
				<ListGroupItemText>
					{markerObject.Address}			
				</ListGroupItemText>
				<ListGroupItemText>
					{markerObject.score}
				</ListGroupItemText>
				<ListGroupItemText>
					{markerObject.details}
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
                {infoall}
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
	superMarket:state.superMarket
})

export default connect(mapStateToProps,{getSuperMarkets,changeMarkerSelected})(InfoArea)