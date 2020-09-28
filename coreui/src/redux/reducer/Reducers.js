import { combineReducers } from 'redux';
import WallReducer from '../wall/WallReducer';
import PlasteringReducer from '../plastering/PlasteringReducer';
const Reducers = combineReducers(
    {
        wall : WallReducer,
        plastering : PlasteringReducer
    }
)
export default Reducers;