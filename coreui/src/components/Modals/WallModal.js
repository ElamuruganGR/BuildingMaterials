import React, { useState, useRef, useEffect } from 'react';
import '../../css/modals/common_modal.css'
import '../../css/modals/wall_modal.css';
function WallModal(props) {
    const {wallProperties, handleOnChange, closeModal, setModalUpdated} = props;
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
            setModalUpdated('Wall', true);
            closeModal('Wall');
        } else {
            setError(true);
        }
    }
    const handleClose = () => {
        let valid = validate();
        setModalUpdated('Wall', valid);
        closeModal('Wall');
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
            <div className="modal_content w_modal_content">
                <div id="w_modal_heading" className="w_modal_heading align_center">Wall dimensions</div>
                {error && <div className="error align_center">Please enter a value greater than 0</div>}
                <div id="w_modal_body" className="wm_grid_container">
                    <div className="wm_grid_element wm_split_vertically">
                        <label htmlFor="wallProperties.length" className="wm_label">Length</label>
                        <label htmlFor="wallProperties.length" className="wm_unit">(in feet)</label>
                    </div>
                    <div className="wm_grid_element">:</div>
                    <input type="number" className="wm_grid_element" name="wallProperties.length" value={wallProperties.length}
                     onChange={handleOnChange} onKeyPress={submitOnEnter} ref={inputRefs.current[0]} />
                    
                    <div className="wm_grid_element wm_split_vertically">
                        <label htmlFor="wallProperties.width" className="wm_label">Width</label>
                        <label htmlFor="wallProperties.width" className="wm_unit">(in feet)</label>
                    </div>
                    <div className="wm_grid_element">:</div>
                    <input type="number" className="wm_grid_element" name="wallProperties.width" value={wallProperties.width}
                     onChange={handleOnChange} onKeyPress={submitOnEnter} ref={inputRefs.current[1]} />
                    
                    <div className="wm_grid_element wm_split_vertically">
                        <label htmlFor="wallProperties.height" className="wm_label">Height</label>
                        <label htmlFor="wallProperties.height" className="wm_unit">(in feet)</label>
                    </div>
                    <div className="wm_grid_element">:</div>
                    <input type="number" className="wm_grid_element" name="wallProperties.height" value={wallProperties.height}
                     onChange={handleOnChange} onKeyPress={submitOnEnter} ref={inputRefs.current[2]} />
                    
                    <button type="button" className="wm_grid_element secondary_button" onClick={handleClose} >Close</button>
                    <button type="submit" className="wm_grid_element primary_button" style={{gridColumn:'3/4'}}
                     onClick={validateAndClose} >Submit</button>
                </div>
            </div>
        </div>
    );
}
export default WallModal;