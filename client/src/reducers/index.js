    
import { combineReducers } from 'redux';
import SuperMarketReducers from './SuperMarketReducers';
import ItemReducers from "./itemReducers"
import OverAllReducers from "./OverAllReducers"

export default combineReducers({
  superMarket: SuperMarketReducers,
  item:ItemReducers,
  overAll:OverAllReducers,
});