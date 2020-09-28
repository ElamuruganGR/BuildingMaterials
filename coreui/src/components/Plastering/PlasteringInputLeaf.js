import React, { useState } from 'react';
import '../../css/plastering/plasteringInputLeaf.css';
import '../../css/blinkingRightArrow.css';
import dimensions from '../../images/dimensions.png';
import {createMarkup, pageText} from '../pageText/Properties';
function PlasteringInputLeaf (props) {
    const {
        numbers,
        structure,
        openModal,
        // setOpenWallDimensionsModal,
        request,
        setRequest
    } = props;
    // const openModal = () => {
    //     if(structure === "walls"){
    //         setOpenWallDimensionsModal(true);
    //     } else if (structure === "doors"){

    //     } else if (structure === "windows"){

    //     }
    // }
    const handleSelectOnChange = (event) => {
        if (structure === "walls"){
            let wallProps = [];
           
            for(var i=1; i<=event.target.value; i++){
                let cube = {
                    // index: i,
                    length: "",
                    width: "",
                    height: ""
                }
                wallProps.push(cube);
                console.log("Cube added to wall properties:", cube)
            }
            console.log("wp::::", wallProps.length);
            console.log("wp::::", wallProps);
            console.log("Request", request);
            setRequest({
                ...request,
                 numberOfWalls: event.target.value,
                 wallsProperties: wallProps
            }, console.log("Req wp:::", request));
        } else if (structure === "doors") {
            let doorProps = [];
            for(var i=1; i<=event.target.value; i++){
                let cube = {
                    // index: i,
                    length: "",
                    width: "",
                    height: ""
                }
                doorProps.push(cube);
                console.log("Cube added to door properties:", cube);
            }
            console.log("dp::::", doorProps.length);
            console.log("dp::::", doorProps);
            console.log("Request", request)
            setRequest({
                ...request,
                 numberOfDoors: event.target.value,
                 doorsProperties: doorProps
            }, console.log("Req wp:::", request));
        } else if (structure === "windows") {
            let windowProps = [];
            for(var i=1; i<=event.target.value; i++){
                let cube = {
                    // index: i,
                    length: "",
                    width: "",
                    height: ""
                }
                windowProps.push(cube);
                console.log("Cube added to door properties:", cube);
            }
            console.log("dp::::", windowProps.length);
            console.log("dp::::", windowProps);
            console.log("Request", request)
            setRequest({
                ...request,
                 numberOfWindows: event.target.value,
                 windowsProperties: windowProps
            }, console.log("Req wp:::", request));
        }
    }
    const handleSettingSelectValue = (event) => {
        if (structure === "walls"){
            return request.numberOfWalls;
        } else if (structure === "doors") {
            return request.numberOfDoors;
        } else if (structure === "windows") {
            return request.numberOfWindows;
        } else {
            return "";
        }
    }
    return(
        <div className="inc_r_exc_plastering_area">
            <div className="number_input">
                <p dangerouslySetInnerHTML={createMarkup(pageText("plastering", `number.${structure}`))}></p>
                <select name={`noOf${structure}`} value={handleSettingSelectValue()} onChange={handleSelectOnChange}>
                    {numbers.map(number => <option key={number} value={number}>{number}</option>)}
                </select>
            </div>
            <div className="modal_input">
                <p dangerouslySetInnerHTML={createMarkup(pageText("plastering", `specify.dimensions.${structure}`))}></p>
                <div className="blinkingRightArrow">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <a href="#" onClick={() => openModal(structure)}><img src={dimensions}/></a>
            </div>
        </div>
    );
}
export default PlasteringInputLeaf;