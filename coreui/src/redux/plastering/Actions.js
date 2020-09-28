import { REQUEST, SUCCESS, FAILURE } from "./ActionTypes"
// import {RESET_ERROR} from './ActionTypes'
import Axios from 'axios';

export const PLASTERING_REQUEST = () => {
    return{
        type: REQUEST
    }
}
export const PLASTERING_SUCCESS = (data) => {
    return{
        type: SUCCESS,
        payload: data
    }
}
export const PLASTERING_FAILURE = (error) => {
    return{
        type: FAILURE,
        payload: error
    }
}
// export const RESET_ERROR_action = () => {
//     return{
//         type: RESET_ERROR,
//         payload: ''
//     }
// }

export const calculateQCPlastering = (input) => {
    return ((dispatch) => {
            dispatch(PLASTERING_REQUEST())
            console.log("Input request:", input);
            Axios.post('http://localhost:8080/qcPlastering', input)
                 .then(res => {console.log("Output===!!!===",res.data);dispatch({type: 'SUCCESS', payload: res.data})})
                 .catch(err => {dispatch({type: 'FAILURE', payload: err})})
        }
    )
}