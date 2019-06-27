import React, {Component} from 'react';
import { Container, Row,Col } from 'reactstrap';
import InfoArea from "./SearchShop/InfoArea"
import Map from "./SearchShop/Map"


class SearchShop extends Component {
  shopSelectedCompare=(markerObject,event)=>{
		this.props.shopSelectedCompare(markerObject	)
	} 
	render(){
  		return (

		    <Container>
		    	<div className="title">
					<h1>
						Search for the Supermarkets near you
					</h1>
						
				</div>
		    	<Row>
		    		<Col sm={6}>
					     <Map
						    height='500px'
						/>
					</Col>
					<Col sm={6}>
						<InfoArea
							shopSelectedCompare={this.shopSelectedCompare}
							compareBasket={this.props.compareBasket}
						/>
					</Col>
				</Row>
		    </Container>


	

  );
  }

}

export default SearchShop;


