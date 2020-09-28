import React from 'react';
import '../../../css/modals/common_modal.css';
import '../../../css/modals/plastering/doorDimensionsModal.css';

class DoorDimensionsModal extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            similarDimensionDoors: "No Doors"
        } 
    }
    handleOnChange = (event) => {
        console.log("Handle On change:", event.target.value);
        let object = "differentDoors";
        if(event.target.value === "All doors"){
            object = "similarDoors";
        }
        this.setState({
            similarDimensionDoors: event.target.value
        }, console.log("Similar Dimensions:", event.target.value))
        this.props.setRequestFromChild(event, object)
    }
    indents = (count) => {
        let rows = [];
        console.log("No of doors: ", count);
        for(var i=0; i<count; i++){
            console.log("DoorsProperties", this.props.request.doorsProperties[i].length);
            let object = "doorsProperties";
            let l = `length.${i}`; console.log("l:",l);
            let w = `width.${i}`; console.log("w",w);
            let h = `height.${i}`; console.log("h",h);
            let lengthVal = this.props.request.doorsProperties[i].length; 
            let widthVal = this.props.request.doorsProperties[i].width;
            let heightVal = this.props.request.doorsProperties[i].height;
            rows.push( <tr key={i}>
                <td className="row_heading">Door {i+1}</td>
                <td><input type="number" name={l} value={lengthVal}
                           placeholder="in feet" onChange={(event) => this.props.setRequestFromChild(event,object)} /></td>
                <td><input type="number" name={w} value={widthVal}
                           placeholder="in feet" onChange={(event) => this.props.setRequestFromChild(event,object)} /></td>
                <td><input type="number" name={h} value={heightVal}
                           placeholder="in feet" onChange={(event) => this.props.setRequestFromChild(event,object)} /></td>
            </tr>)
        }
        if(count === 0){
           rows.push( <tr key="0">
                <td className="row_heading">Zero Doors chosen</td>
                <td> - </td>
                <td> - </td>
                <td> - </td>
            </tr>)
        }
        return rows;
    }
    
    render(){
        return(
            <div className="modal_overlay">
                {console.log("DoorProperties:", this.props.request)}
                <div className="modal_content plastering_ddm_container">
                    <div className="modal_heading align_center">Door Dimensions</div>
                    <div className="ddm_modal_body ddm_grid_container">
                    <div className="similarDimensionDoors">
                        <div className="similarDimensionLabel">
                            <label htmlFor="similarDimensionOptions">Choose similar</label>
                            <label htmlFor="similarDimensionOptions">dimension doors</label>
                        </div>
                        <div className="colon align_center">:</div>
                        <select id="similarDimensionOptions" onChange={this.handleOnChange} value={this.state.similarDimensionDoors}>
                                <option value="No Doors">No doors</option>
                                {/* {this.evenNumberOfWalls() && <option value="Opposite walls">Opposite walls</option>} */}
                                <option value="All doors">All doors</option>
                        </select>
                    </div>
                    <table className="doorsDimensionsTable">
                        <thead>
                            <tr>
                                <td>(in feet)</td>
                                <td>Length</td>
                                <td>Width</td>
                                <td>Height</td>
                            </tr>
                        </thead>
                        <tbody>
                            {this.indents(this.props.request.numberOfDoors)}
                        </tbody>
                    </table>
                    <div className="modal_close">
                        <button className="secondary_button ddm_close_button" onClick={(event) => this.props.closeModal(event,"Door")}>Close</button>
                    </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default DoorDimensionsModal;