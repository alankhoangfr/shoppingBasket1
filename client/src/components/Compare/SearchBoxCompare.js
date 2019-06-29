import _ from 'lodash'
import React, { Component } from 'react'
import { Search, Grid, Header, Segment,Label,Image } from 'semantic-ui-react'
import {getSuperMarkets} from "../../actions/SuperMarketActions"
import {filterItems} from "../../actions/ItemsAction"
import {connect} from "react-redux"
import PropTypes from "prop-types"
const initialState = { isLoading: false, results: [], value: '',emptySearchBox:false }

export class SearchBoxCompare extends Component {
	state = initialState
	
    shouldComponentUpdate(nextProps,nextState){
	    const {space1,space2,space3} = this.props.overAll
	    const spaces =[space1,space2,space3]
	    const nspaces =[nextProps.overAll.space1,nextProps.overAll.space2,nextProps.overAll.space3]
	    if(this.props.supermarket_selected!==nextProps.supermarket_selected	){
			return true
		}else if(nextProps.emptySearchBox===true||this.props.emptySearchBox==false){
			return true
		}else if(spaces!=nspaces){
	        return true
	    }else{return false}
	    }
    componentDidUpdate(prevProps){
    const pspaces =[prevProps.overAll.space1,prevProps.overAll.space2,prevProps.overAll.space3]
    const {space1,space2,space3} = this.props.overAll
    const spaces =[space1,space2,space3]
    	if(prevProps.supermarket_selected!==this.props.supermarket_selected	){
    		this.setState({value:""})
    	}if(this.props.emptySearchBox!==prevProps.emptySearchBox){
    		this.setState({
    			value:"",
    			emptySearchBox:false})
    		this.props.notEmptySearchBox()
    	}
    }
  handleResultSelect = (e, { result }) => {
  	this.setState({ value: result.product_name, emptySearchBox:false })
  	this.props.result(result )
  }
  handleSearchChange = (e, { value }) => {
  	const {space1,space2,space3} = this.props.overAll
	const spaces =[space1,space2,space3]
    this.setState({ isLoading: true, value })
    setTimeout(() => {
      if (this.state.value.length < 1) return this.setState(initialState)

      const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
      const isMatch = result => re.test(result.product_name)

      this.setState({
        isLoading: false,
        results: _.filter(this.props.item.itemsComparsion, isMatch),
      })
    }, 300)
  }
  render() {
    const resultRenderer = ({ product_name,reference }) => 

	  <Grid>
	     <Grid.Row>
	      <Grid.Column width={16}>
	        {reference}
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
    filterItems:PropTypes.func.isRequired,
    superMarket:PropTypes.object.isRequired,
    overAll:PropTypes.object.isRequired
}
const mapStateToProps = (state)=>({
    superMarket:state.superMarket,
    overAll:state.overAll,
    item:state.item
})

export default connect(mapStateToProps,{getSuperMarkets,filterItems}) (SearchBoxCompare)
