import React, { useEffect, useState } from 'react';
import '../css/common.css';
import '../css/plastering.css';
import '../css/blinkingRightArrow.css';
import '../css/loader.css'
import dimensions from '../images/dimensions.png';
import Axios from 'axios';
import { connect } from 'react-redux';
import store from '../redux/wall/Store';
import PlasteringOptions from './Plastering/PlasteringOptions';
import PlasteringInputLeaf from './Plastering/PlasteringInputLeaf';
import { createMarkup, pageText } from './pageText/Properties';
import QuantityAndCost from './Output/QuantityAndCost';
import Loader from './Animations/Loader';
import PlasteringIOC from './Plastering/PlasteringIOC';
import WallDimensionsModal from './Modals/Plastering/WallDimensionsModal';
import { calculateQCPlastering } from '../redux/plastering/Actions';
import DoorDimensionsModal from './Modals/Plastering/DoorDimensionsModal';
import WindowDimensionsModal from './Modals/Plastering/WindowDimensionsModal';
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
        quantityUnit: 'bag(s)',
        cost: 0
    },
    {
        id: 'Sand',
        quantityRequired: 0,
        quantityUnit: 'unit(s)',
        cost: 0
    }
]
const initialState = {
    loading: false,
    data: initialData,
    error: ''
}
// const CalculatePlasteringCost = (input) => {
//     return ((dispatch) => {
//             dispatch({type: 'REQUEST', payload: null})
//             Axios.post('http://localhost:8080/qcPlastering', input)
//                  .then(res => {console.log("Output===!!!===",res.data);dispatch({type: 'SUCCESS', payload: res.data})})
//                  .catch(err => {dispatch({type: 'FAILURE', payload: err})})
//         }
//     )
// }
const numbers = [0,1,2,3,4,5,6,7,8,9,10];
const Plastering = (props) => {
    const defaultValue = '';
    const [openWallDimensionsModal, setOpenWallDimensionsModal] = useState(false);
    const [openDoorDimensionsModal, setopenDoorDimensionsModal] = useState(false);
    const [openWindowDimensionsModal, setOpenWindowDimensionsModal] = useState(false);
    const [request, setRequest] = useState({
        numberOfWalls:1,
        wallsProperties: [
            {
                length: "",
                width: "",
                height: ""
            }
        ],
        numberOfDoors: 0,
        doorsProperties: [],
        numberOfWindows: 0,
        windowsProperties: [],
        plasteringSurfaces:{
            ceilingPlasterThickness: defaultValue,
            innerWallPlasterThickness: defaultValue,
            outerWallPlasterThickness: defaultValue
        
        },
        innerWallCSRatio:{
            numerator: "",
            denominator: ""
        },
        outerWallCSRatio:{
            numerator: "",
            denominator: ""
        },
        ceilingCSRatio:{
            numerator: "",
            denominator: ""
        }
    })
    const handleOnSubmit = (event) => {
        event.preventDefault();
        console.log("Submitting Plastering inputs");
        // props.dispatch(CalculatePlasteringCost(input));
        props.calculateQCPlastering(request);
    }
    const openModal = (structure) => {
        if(structure === "walls"){
            setOpenWallDimensionsModal(true);
        } else if (structure === "doors"){
            setopenDoorDimensionsModal(true);
        } else if (structure === "windows"){
            setOpenWindowDimensionsModal(true);
        }
    }
    const closeModal = (event, key) => {
        event.preventDefault();
        let name = '';
        if(key === 'apiStateError'){
            // this.props.RESET_ERROR();
            // this.props.resetError();
        } else if(key === "Door") {
            setopenDoorDimensionsModal(false);
        } else if(key === "Wall"){
            name = 'open'+key+'Modal';
            setOpenWallDimensionsModal(false);
        } else if(key === "Window"){
            setOpenWindowDimensionsModal(false);
        }
    }
    const setRequestFromChild = (event, object) => {

        let key = event.target.name;
        console.log("Name:", event.target.name);
        console.log("Value:", event.target.value);
        
        if(object === "plasteringSurfaces"){
            key = `${key}PlasterThickness`;
            console.log("Key", key);
            setRequest({
                ...request,
                [object]:{
                    ...request[object],
                    [key]: event.target.value
                }
            }, console.log("Request setted:", request))
        } else if (object.includes("CSRatio")) {
            console.log("Exists");
            // key = `${key}PlasterThickness`;
            console.log("Key", key);
            setRequest({
                ...request,
                [object]:{
                    ...request[object],
                    [key]: event.target.value
                }
            }, console.log("Request setted:", request))
        } else if (object === "wallsProperties") {
            let keyArray = key.split(".");
            console.log("KeyArray:",keyArray[0],"====",keyArray[1]);
            key = keyArray[0];
            let index = keyArray[1];
            let wp = request.wallsProperties;
            console.log("request.wallsProperties:",request.wallsProperties);
            console.log("wp before:", wp);
            // wp.filter((cube) => (cube.index === index));
            console.log("WP after filter:", wp);
            console.log("-a---wp--index--", wp[index]);
            wp[index][key] = event.target.value;
            console.log("-b---wp--index--", wp[index]);
            console.log("wp after:", wp);
            setRequest({
                ...request,
                wallsProperties: wp
            })
        } else if(object === "similarWalls") {
            let wp = [];
            let cube = {
                    // index: i,
                    length: "",
                    width: "",
                    height: ""
            }
            console.log("===SIMILAR Walls===", request.wallsProperties);
            for(let i=0; i<request.wallsProperties.length; i++){
                wp.push(cube);
            }
            setRequest({
                ...request,
                wallsProperties: wp
            })

        } else if(object === "oppositeWalls") {
            let wp = [];
            let cube1 = {
                    // index: i,
                    length: "",
                    width: "",
                    height: ""
            }
            let cube2 = {
                length: "", 
                width: "",
                height: ""
            }
            console.log("===SIMILAR Walls===", request.wallsProperties);
            for(let i=0; i<request.wallsProperties.length; i++){
                wp.push(cube1);
                i++;
                wp.push(cube2);
            }
            setRequest({
                ...request,
                wallsProperties: wp
            })

        } else if(object === "differentWalls") {
            let wp = [];
            console.log("===SIMILAR Walls===", request.wallsProperties);
            for(let i=0; i<request.wallsProperties.length; i++){
               let cube = {
                    // index: i,
                    length: "",
                    width: "",
                    height: ""
                }
                wp.push(cube);
            }
            setRequest({
                ...request,
                wallsProperties: wp
            })

        } else if(object.includes("doorsProperties")) {
            let dp = [];
            // if(object.includes("similar")){
            //     let cube = {
            //         // index: i,
            //         length: "",
            //         width: "",
            //         height: ""
            //     }
            //     console.log("===SIMILAR===", request.doorsProperties);
            //     for(let i=0; i<request.doorsProperties.length; i++){
            //         dp.push(cube);
            //     }
            // } else{
            //     dp = request.doorsProperties;
            // }
            dp = request.doorsProperties;
            let keyArray = key.split(".");
            console.log("KeyArray:",keyArray[0],"====",keyArray[1]);
            key = keyArray[0];
            let index = keyArray[1];
            console.log("request.doorsProperties:",request.doorsProperties);
            console.log("dp before:", dp);
            // wp.filter((cube) => (cube.index === index));
            console.log("WP after filter:", dp);
            console.log("-a---dp--index--", dp[index]);
            dp[index][key] = event.target.value;
            console.log("-b---dp--index--", dp[index]);
            console.log("dp after:", dp);
            setRequest({
                ...request,
                doorsProperties: dp
            })
        } else if(object === "similarDoors") {
            let dp = [];
            let cube = {
                    // index: i,
                    length: "",
                    width: "",
                    height: ""
            }
            console.log("===SIMILAR Doors===", request.doorsProperties);
            for(let i=0; i<request.doorsProperties.length; i++){
                dp.push(cube);
            }
            setRequest({
                ...request,
                doorsProperties: dp
            })

        } else if(object === "differentDoors") {
            let dp = [];
            console.log("===DIFF===", request.doorsProperties);
            for(let i=0; i<request.doorsProperties.length; i++){
                let cube = {
                        // index: i,
                        length: "",
                        width: "",
                        height: ""
                }
                dp.push(cube);
            }
            setRequest({
                ...request,
                doorsProperties: dp
            })
            
        } else if(object === "windowsProperties") {
            let keyArray = key.split(".");
            console.log("KeyArray:",keyArray[0],"====",keyArray[1]);
            key = keyArray[0];
            let index = keyArray[1];
            let windowProps = request.windowsProperties;
            console.log("request.doorsProperties:",request.windowsProperties);
            console.log("windowProps before:", windowProps);
            // wp.filter((cube) => (cube.index === index));
            console.log("windowProps after filter:", windowProps);
            console.log("-a---windowProps--index--", windowProps[index]);
            windowProps[index][key] = event.target.value;
            console.log("-b---windowProps--index--", windowProps[index]);
            console.log("windowProps after:", windowProps);
            setRequest({
                ...request,
                windowsProperties: windowProps
            })
        } else if(object === "similarWindows") {
            let windowProps = [];
            let cube = {
                    // index: i,
                    length: "",
                    width: "",
                    height: ""
            }
            console.log("===SIMILAR===", request.windowsProperties);
            for(let i=0; i<request.windowsProperties.length; i++){
                windowProps.push(cube);
            }
            setRequest({
                ...request,
                windowsProperties: windowProps
            })

        } else if(object === "differentWindows") {
            let windowProps = [];
           
            console.log("===SIMILAR===", request.windowsProperties);
            for(let i=0; i<request.windowsProperties.length; i++){
                let cube = {
                    // index: i,
                    length: "",
                    width: "",
                    height: ""
                }
                windowProps.push(cube);
            }
            setRequest({
                ...request,
                windowsProperties: windowProps
            })
        }
        
    }
    return(
        <div className="plastering_wrapper">
            <div  className="plastering_header align_center">
                <p dangerouslySetInnerHTML={createMarkup(pageText("plastering","plastering.heading"))}></p>
            </div>
            <PlasteringOptions outerWalls innerWalls ceilings />
            <div className="plastering_body">

                <PlasteringIOC numbers={numbers} handleOnSubmit={handleOnSubmit} openModal={openModal}
                //  setOpenWallDimensionsModal={setOpenWallDimensionsModal} 
                               request={request} setRequest={setRequest}/>
                
                <div className="output_container">
                    <p className="output_heading">Output</p>
                    {store.getState().plastering.data.map(qcm => (
                        <QuantityAndCost key={qcm.id} qcm={qcm}/>
                        )
                    )}
                            
                    <div className="qcm_element">
                        <label className="total">Total room cost:</label>
                        <input type="text" className="output_box outputColor" value={store.getState().plastering.data.reduce((accumulator, currentValue) => { return accumulator+currentValue.cost}, 0)+" rupees"} readOnly/>
                    </div>
                </div>
            </div>
            {console.log("Plastering request:", request)}
            {openWallDimensionsModal && <WallDimensionsModal request={request} setRequestFromChild={setRequestFromChild} closeModal={closeModal} />}
            {openDoorDimensionsModal && <DoorDimensionsModal request={request} setRequestFromChild={setRequestFromChild} closeModal={closeModal} />}
            {openWindowDimensionsModal && <WindowDimensionsModal request={request} setRequestFromChild={setRequestFromChild} closeModal={closeModal} />}
            {
                props.apiResponse.loading && <Loader />
            }
        </div>
    );

}
const mapStateToProps = (state) => {
    return{
        apiResponse: state.plastering
    }
}
const mapDispatchToProps = (dispatch) => {
    return{
        calculateQCPlastering : (request) => dispatch(calculateQCPlastering(request))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Plastering);
