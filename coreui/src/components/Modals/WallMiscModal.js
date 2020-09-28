import React, { useState, useRef, useEffect } from 'react';
import '../../css/modals/common_modal.css'
import '../../css/modals/wall_misc_modal.css';
function WallMiscModal(props) {
    const {wallMisc, handleOnChange, closeModal, setModalUpdated} = props;
    const [error, setError] = useState(false);
    const inputRefs = useRef([React.createRef(), React.createRef(), React.createRef(), React.createRef()]);
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
            setModalUpdated('WallMisc', true);
            closeModal('WallMisc');
        } else {
            setError(true);
        }
    }
    const handleClose = () => {
        let valid = validate();
        setModalUpdated('WallMisc', valid);
        closeModal('WallMisc');
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
            <div className="modal_content wm_modal_content">
                <div id="wm_modal_heading" className="wm_modal_heading align_center">Miscelleneous details</div>
                {error && <div className="error align_center">Please enter a value greater than 0</div>}
                <div id="wm_modal_body" className="wmm_grid_container">
                    <div className="wmm_grid_element">
                        <div className="wmm_space_between">
                            <label htmlFor="wallMisc.mortarThickness" className="wmm_label">Mortar thickness</label>
                            <label htmlFor="wallMisc.mortarThickness" className="wmm_unit"> (in inches)</label>
                        </div>
                        <input type="number" className="wmm_input" name="wallMisc.mortarThickness" value={wallMisc.mortarThickness}
                        onChange={handleOnChange} onKeyPress={submitOnEnter} ref={inputRefs.current[0]} />
                    </div>
                    
                    <div className="wmm_grid_element">
                        <div className="wmm_space_between">
                            <label htmlFor="wallMisc.bricksWastagePercent" className="wmm_label">Wastage of bricks</label>
                            <label htmlFor="wallMisc.bricksWastagePercent" className="wmm_unit">(in percentage %)</label>
                        </div>
                        <input type="number" className="wmm_input" name="wallMisc.bricksWastagePercent" value={wallMisc.bricksWastagePercent}
                        onChange={handleOnChange} onKeyPress={submitOnEnter} ref={inputRefs.current[1]} />
                     </div>
                    
                    <div className="wmm_grid_element">
                        <label className="wmm_label">Cement Sand ratio</label>
                        <div className="wmm_CSRatio">
                            <input type="number" className="wmm_input wmm_csr_input wmm_CSRatio_element" name="wallMisc.cementInCSM" value={wallMisc.cementInCSM}
                            onChange={handleOnChange} onKeyPress={submitOnEnter} ref={inputRefs.current[2]} />
                            <div className=" wmm_CSRatio_element"><p>:</p></div>
                            <input type="number" className="wmm_input wmm_csr_input wmm_CSRatio_element" name="wallMisc.sandInCSM" value={wallMisc.sandInCSM}
                            onChange={handleOnChange} onKeyPress={submitOnEnter} ref={inputRefs.current[3]} />
                        </div>
                    </div>

                    <div className="wmm_buttons">
                        <button type="button" className="secondary_button" onClick={handleClose} >Close</button>
                        <button type="submit" className="primary_button"
                        onClick={validateAndClose} >Submit</button>
                     </div>
                </div>
            </div>
        </div>
    );
}
export default WallMiscModal;