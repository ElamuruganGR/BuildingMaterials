import React, { useState, useRef, useEffect } from 'react';
import '../../css/modals/common_modal.css'
import '../../css/modals/brick_modal.css';
function BrickModal(props) {
    const {brickProperties, handleOnChange, closeModal, setModalUpdated} = props;
    const [error, setError] = useState(false);
    const inputRefs = useRef([React.createRef(), React.createRef(), React.createRef()]);
    const submitOnEnter = (event) => {
        console.log('event.key', event.key);
        console.log('event.which', event.which);
        if(event.key === 'Enter'){
            validateAndClose();
        }
    }
    const validateAndClose = () => {
        let valid = validate();
        console.log("Validated:", valid);
        if(valid){
            setError(false);
            setModalUpdated('Brick', true);
            closeModal('Brick');
        } else {
            setError(true);
        }
    }
    const handleClose = () => {
        let valid = validate();
        setModalUpdated('Brick', valid);
        closeModal('Brick');
    }
    const validate = () => {
        console.log(inputRefs);
        console.log(inputRefs.current.length);
        console.log("Value:",inputRefs.current[0].current.value);
        console.log("Value as number:",inputRefs.current[0].current.valueAsNumber);
        console.log("Checking:",inputRefs.current[0].current.value>0);
        let valid = true;
        for(let i=0; i<inputRefs.current.length; i++){
            if((inputRefs.current[i].current.value === '0') || (inputRefs.current[i].current.value === '')
                || inputRefs.current[i].current.value < 0){
                // || (('/((d+)((\.\d{1,2})?))$').test(inputRefs.current[i].current.value)))
                valid = false;
                break;
            } 
        }
        return valid;
    }
    useEffect(() => {
        inputRefs.current[0].current.focus();
    }, [])
    return(
        <div className="modal_overlay">
            <div className="modal_content b_modal_content">
                <div id="b_modal_heading" className="b_modal_heading align_center">Brick dimensions</div>
                {error && <div className="error align_center">Please enter a value greater than 0</div>}
                <div id="b_modal_body" className="bm_grid_container">
                    <div className="bm_grid_element bm_split_vertically">
                        <label htmlFor="brickProperties.length" className="bm_label">Length</label>
                        <label htmlFor="brickProperties.length" className="bm_unit">(in inches)</label>
                    </div>
                    <div className="bm_grid_element">:</div>
                    <input type="number" className="bm_grid_element" name="brickProperties.length" value={brickProperties.length}
                     onChange={handleOnChange} onKeyPress={submitOnEnter} ref={inputRefs.current[0]} />
                    
                    <div className="bm_grid_element bm_split_vertically">
                        <label htmlFor="brickProperties.width" className="bm_label">Width</label>
                        <label htmlFor="brickProperties.width" className="bm_unit">(in inches)</label>
                    </div>
                    <div className="bm_grid_element">:</div>
                    <input type="number" className="bm_grid_element" name="brickProperties.width" value={brickProperties.width}
                     onChange={handleOnChange} onKeyPress={submitOnEnter} ref={inputRefs.current[1]} />
                    
                    <div className="bm_grid_element bm_split_vertically">
                        <label htmlFor="brickProperties.height" className="bm_label">Height</label>
                        <label htmlFor="brickProperties.height" className="bm_unit">(in inches)</label>
                    </div>
                    <div className="bm_grid_element">:</div>
                    <input type="number" className="bm_grid_element" name="brickProperties.height" value={brickProperties.height}
                     onChange={handleOnChange} onKeyPress={submitOnEnter} ref={inputRefs.current[2]} />
                    
                    <button type="button" className="bm_grid_element secondary_button" onClick={handleClose} >Close</button>
                    <button type="submit" className="bm_grid_element primary_button" style={{gridColumn:'3/4'}}
                     onClick={validateAndClose} >Submit</button>
                </div>
            </div>
        </div>
    );
}
export default BrickModal;