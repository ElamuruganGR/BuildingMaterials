import React from 'react';
import { createMarkup, pageText } from '../pageText/Properties';
import '../../css/plastering/plasteringIOC.css';
import PlasteringInputLeaf from './PlasteringInputLeaf';

function PlasteringIOC (props) {
    const {
        numbers, 
        handleOnSubmit, 
        openModal,
        // setOpenWallDimensionsModal, 
        request, 
        setRequest
    } = props;
    return(
        <form onSubmit={(event) => handleOnSubmit(event)} className="input_container align_center">
            <div className="input_heading">
                <p dangerouslySetInnerHTML={createMarkup(pageText("plastering", "ioc.heading"))}></p>
            </div>
            <PlasteringInputLeaf numbers={numbers.filter(number => (number !== 0))} structure="walls" openModal={openModal} request={request} setRequest={setRequest}/>
            <PlasteringInputLeaf numbers={numbers} structure="doors" openModal={openModal} request={request} setRequest={setRequest}/>
            <PlasteringInputLeaf numbers={numbers} structure="windows" openModal={openModal} request={request} setRequest={setRequest}/>
            <div className="submit_button">
                <button type="submit" className="primary_button">Submit</button>
            </div>
        </form>
    );
}
export default PlasteringIOC;