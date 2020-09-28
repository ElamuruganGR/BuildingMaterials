import {CalculateQCWall_REQUEST, RESET_ERROR} from './ActionTypes';
import {CalculateQCWall_SUCCESS} from './ActionTypes';
import {CalculateQCWall_FAILURE} from './ActionTypes';

// This file is the Reducers file and it is the 2nd file created while implementing Redux with React
const initialData = [
    {
        id: 'Bricks',
        quantityRequired: 0,
        quantityUnit: 'bricks',
        cost: 0
    },
    {
        id: 'Cement',
        quantityRequired: 0,
        quantityUnit: 'bags',
        cost: 0
    },
    {
        id: 'Sand',
        quantityRequired: 0,
        quantityUnit: 'units',
        cost: 0
    }
]

const initialState = {
    loading: false,
    data: initialData,
    error: ''
}

const WallReducer = (state=initialState, action) => {
    console.log("Inside Reducer:", action);
    switch(action.type){
        case CalculateQCWall_REQUEST:
            return{
                ...state,
                loading: true,
                error: ''
            }
        case CalculateQCWall_SUCCESS:
            return{
                loading: false,
                data: action.payload,
                error: ''
            }
        case CalculateQCWall_FAILURE:
            return{
                loading: false,
                data: initialData,
                error: action.payload
            }
        case RESET_ERROR:
            console.log("RESET_ERROR:",action.payload);
            return{
                ...state,
                error: ''
            }
        default: return state;
    }
}
export default  WallReducer;