import {CalculateQCWall_REQUEST} from './ActionTypes';
import {CalculateQCWall_SUCCESS} from './ActionTypes';
import {CalculateQCWall_FAILURE} from './ActionTypes';
import {RESET_ERROR} from './ActionTypes'
import Axios from 'axios';

// This file is the action file and it is the 1st file created while implementing Redux with React

export const REQUEST_action = () => {
    return{
        type: CalculateQCWall_REQUEST
    }
}
export const SUCCESS_action = (data) => {
    return{
        type: CalculateQCWall_SUCCESS,
        payload: data
    }
}
export const FAILURE_action = (error) => {
    return{
        type: CalculateQCWall_FAILURE,
        payload: error
    }
}
export const RESET_ERROR_action = () => {
    return{
        type: RESET_ERROR,
        payload: ''
    }
}
export const CalculateQCWall = (inputCalculateQCWall) => {
    console.log("Action: ",inputCalculateQCWall);
    return (dispatch) => {
            dispatch(REQUEST_action());
            Axios.post("http://localhost:8080/qcWall", inputCalculateQCWall)
                 .then(response => {
                     const data = response.data;
                     console.log(data);
                     dispatch(SUCCESS_action(data));
                     }
                 )
                 .catch(error => {
                     const errorMsg = error.message;
                     console.log('-----------Error--------', error);
                     console.log('-----------Error--------', errorMsg);
                     dispatch(FAILURE_action("Sorry for the inconvenience. We are facing some technical difficulties. "+
                                             "Kindly contact us in +91-9788306825 or elamurugan96@gmail.com"));
                    }
                 )
        }
    
}
