import React, { useEffect } from 'react';
import '../../css/plastering/plasteringOptions.css';
function PlasteringOptions (props) {
    const {
        outerWalls,
        innerWalls,
        ceilings
    } = props
    useEffect(() => {
        document.getElementById(`outerWallsCheck`).checked=outerWalls;
        document.getElementById(`innerWallsCheck`).checked=innerWalls;
        document.getElementById(`ceilingsCheck`).checked=ceilings;
    },[])
    return(
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
            <button className="primary_button conditional_button" >Show</button>
        </div>
    );
}
export default PlasteringOptions;