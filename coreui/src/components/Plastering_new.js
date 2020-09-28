import React from 'react';
import '../css/common.css';
import '../css/plastering.css';
import '../css/blinkingRightArrow.css';
import dimensions from '../images/dimensions.png';
import {createStore} from 'redux';
import Axios from 'axios';
import { connect } from 'react-redux';
const input = {
    
        numberOfWalls:4,
        wallsProperties:
            [
                {
                    length:8,
                    width:0.75,
                    height:11
                },
                {
                    length:8,
                    width:0.75,
                    height:11
                },
                {
                    length:8,
                    width:0.75,
                    height:11
                },
                {
                    length:8,
                    width:0.75,
                    height:11
                }
            ],
        numberOfDoors:2,
        doorsProperties:
            [
                {
                    length:3,
                    width:0,
                    height:8 
                },
                {
                    length:3,
                    width:0,
                    height:8 
                }
            ],
        numberOfWindows:2,
        windowsProperties:
            [
                {
                    length:3,
                    width:0,
                    height:4 
                },
                {
                    length:3,
                    width:0,
                    height:4    
                }
            ],
        plasteringSurfaces:{
            ceilingPlasterThickness:10,
            innerWallPlasterThickness:12,
            outerWallPlasterThickness:20
        
        },
        innerWallCSRatio:{
            numerator:1,
            denominator:5
        },
        outerWallCSRatio:{
            numerator:1,
            denominator:6
        },
        ceilingCSRatio:{
            numerator:1,
            denominator:4
        }
        
}
const initialData = [
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
const reducer = (state=initialState, action) => {
    switch (action.type){
        case 'REQUEST':
            return{
                ...state,
                loading: true
            }
        case 'SUCCESS':
            return{
                loading: false,
                data: action.payload,
                error: ''
            }
        case 'FAILURE':
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default: return state;
    }
}
const CalculatePlasteingCost = (input) => {
    return ((dispatch) => {
            Axios.post('http://localhost:8080/qcPlastering', input)
                 .then(res => {console.log("Output===!!!===",res.data);dispatch({type: 'SUCCESS', payload: res.data})})
                 .catch(err => {dispatch({type: 'FAILURE', payload: err})})
        }
    )
}
const store = createStore(reducer);
const numbers = [1,2,3,4,5,6,7,8,9,10];
const Plastering = (props) => {
    const handleOnClick = () => {
        console.log("Submitting Plastering inputs");
        props.dispatch(CalculatePlasteingCost(input));
    }
    return(
        <div className="plastering_wrapper">
            <div  className="plastering_header align_center">
                <p>Plastering for one room</p>
            </div>
            <div className="plastering_areas_options align_center">
                <div className="plastering_area align_center">
                    <input type="checkbox" id="innerWallsCheck" />
                    <label htmlFor="innerWallsCheck">Inner Walls</label>
                </div>
                <div className="plastering_area align_center">
                    <input type="checkbox" id="outerWallsCheck" />
                    <label htmlFor="outerWallsCheck">Outer Walls</label>
                </div>
                <div className="plastering_area align_center">
                    <input type="checkbox" id="ceilingsCheck" />
                    <label htmlFor="ceilingsCheck">Ceiling</label>
                </div>
                <button >Show</button>
            </div>
            <div className="plastering_body">
                {/* <form> */}
                <form className="input_container align_center">
                
                    <div className="input_heading"><p>Inner walls, Outer walls and Ceiling inputs</p></div>
                    <div className="inc_r_exc_plastering_area">
                        <div className="number_input">
                            <p>Number of walls : </p>
                            <select name="noOfWalls">
                                {numbers.map(number => <option key={number} value={number}>{number}</option>)}
                            </select>
                        </div>
                        <div className="modal_input">
                            <p>Specify all inner walls dimensions and plastering thickness</p>
                            <div className="blinkingRightArrow">
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                            <a href="#" ><img src={dimensions}/></a>
                        </div>
                    </div>
                    <div className="inc_r_exc_plastering_area">
                        <div className="number_input">
                            <p>Number of doors : </p>
                            <select name="noOfDoors">
                                {numbers.map(number => <option key={number} value={number}>{number}</option>)}
                            </select>
                        </div>
                        <div className="modal_input">
                            <p>Specify all doors dimensions</p>
                            <div className="blinkingRightArrow">
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                            <a href="#" ><img src={dimensions}/></a>
                        </div>
                    </div>
                    <div className="inc_r_exc_plastering_area">
                        <div className="number_input">
                            <p>Number of windows : </p>
                            <select name="noOfWindows">
                                {numbers.map(number => <option key={number} value={number}>{number}</option>)}
                            </select>
                        </div>
                        <div className="modal_input">
                        <p>Specify all windows dimensions</p>
                            <div className="blinkingRightArrow">
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                            <a href="#" ><img src={dimensions}/></a>
                        </div>
                    </div>
                    <div className="submit_button">
                        <button type="submit" onClick={handleOnClick} className="primary_button">Click me</button>
                    </div>
                </form>
                {/* </form> */}
                <div className="output_container">
                    <p className="output_heading">Output</p>
                    {store.getState().data.map(qcm => (
                            <div className="qcm_element" key={qcm.id}>
                            {/* <img src={require(`../images/Cement_svg.png`)}></img> */}
                            {console.log("========================",store.getState())}
                                <div className="qcm_data">
                                    <div className="qcm_heading">{qcm.id} {qcm.quantityUnit}:</div>
                                    <div className="qcm_quantity">
                                        <label >Required count:</label>
                                        <input type="text" id="" value={`${qcm.quantityRequired}   ${qcm.quantityUnit}`} readOnly/>
                                    </div>
                                    <div className="qcm_cost">
                                        <label >Total cost:</label>
                                        <input type="text" id="" value={`${qcm.cost} rupees`} readOnly/>
                                    </div>
                                </div>
                            </div>
                        )
                    )}
                            
                    <div>
                        <label>Total room cost:</label>
                        <input type="text" value={store.getState().data.reduce((accumulator, currentValue) => { return accumulator+currentValue.cost}, 0)} readOnly/>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default connect()(Plastering);
