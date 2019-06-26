import React, {Component,Suspense} from 'react';
import { Container, Row,Col } from 'reactstrap';
import { Spinner } from 'reactstrap';
const Map = React.lazy(()=> import("./SearchShop/Map"))
const InfoArea = React.lazy(()=> import("./SearchShop/InfoArea"))

class SearchShop extends Component {
  shopSelectedCompare=(markerObject,event)=>{
		this.props.shopSelectedCompare(markerObject	)
	} 
	render(){
		let loading =  
			<div style={{margin:"auto auto", position:"absolute", top:"50%", left:"50%"}}>
				<Spinner color="primary" />
			</div>
  		return (

		    <Container>
		    	<div className="title">
					<h1>
						Search for the Supermarkets near you
					</h1>
						
				</div>
		    	<Row>
		    		<Col sm={6}>
		    			<Suspense fallback = {loading} >
					      	<Map
						    height='500px'
							/>
						</Suspense> 
					</Col>
					<Col sm={6}>
						<Suspense fallback = {loading} >
						<InfoArea
							shopSelectedCompare={this.shopSelectedCompare}
							compareBasket={this.props.compareBasket}
						/>
						</Suspense> 
					</Col>
				</Row>
		    </Container>


	

  );
  }

}

export default SearchShop;


