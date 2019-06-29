import _ from 'lodash'
import React, { Component } from 'react'
import { Search, Grid, Header, Segment,Image } from 'semantic-ui-react'
import {getSuperMarkets} from "../../actions/SuperMarketActions"
import {connect} from "react-redux"
import PropTypes from "prop-types"

const initialState = { isLoading: false, results: [], value: '',emptySearchBox:false }

export class SearchBoxCompare extends Component {
	state = initialState

    shouldComponentUpdate(nextProps,nextState){
	    if(this.props.supermarket_selected!==nextProps.supermarket_selected	){
			return true
		}
		else if(nextProps.emptySearchBox===true||this.props.emptySearchBox==false){
			return true
		}
		else{return false}
	    }
    componentDidUpdate(prevProps){
    	if(prevProps.supermarket_selected!==this.props.supermarket_selected	){
    		this.setState({value:""})
    	}if(this.props.emptySearchBox!==prevProps.emptySearchBox){
    		this.setState({
    			value:"",
    			emptySearchBox:false})
    	}
    }
  handleResultSelect = (e, { result }) => {
  	this.setState({ value: result.description, emptySearchBox:false })
  	this.props.result(result )
  }
  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value })
    setTimeout(() => {
      if (this.state.value.length < 1) return this.setState(initialState)

      const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
      const isMatch = result => re.test(result.description)

      this.setState({
        isLoading: false,
        results: _.filter(this.props.item.totalItems, isMatch),
      })
    }, 300)
  }
  render() {
    const resultRenderer = ({ description,image }) => 

    <Grid>
       <Grid.Row>
        <Grid.Column width={10}>
          {description}
        </Grid.Column>
        <Grid.Column width={6}>
          <Image src={image} size='small' wrapped />
        </Grid.Column>

       </Grid.Row>
      
    </Grid>

     const { isLoading, value, results } = this.state

    return (
      <Grid>
        <Grid.Column width={6}>
          <Search
            loading={isLoading}
            onResultSelect={this.handleResultSelect}
            onSearchChange={_.debounce(this.handleSearchChange, 500, {
              leading: true,
            })}
            results={results}
            resultRenderer={resultRenderer}
            value={value}

          />
        </Grid.Column>
      </Grid>
    )
  }
}

SearchBoxCompare.propTypes = {
    getSuperMarkets:PropTypes.func.isRequired,
    superMarket:PropTypes.object.isRequired,
    overAll:PropTypes.object.isRequired
}
const mapStateToProps = (state)=>({
    superMarket:state.superMarket,
    overAll:state.overAll,
    item:state.item
})

export default connect(mapStateToProps,{getSuperMarkets}) (SearchBoxCompare)
