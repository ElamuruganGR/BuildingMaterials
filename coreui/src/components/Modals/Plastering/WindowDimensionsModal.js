import React from 'react';
import '../../../css/modals/common_modal.css';
import '../../../css/modals/plastering/windowDimensionsModal.css';

class WindowDimensionsModal extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            similarDimensionWindows : "No windows"
        }
    }
    handleOnChange = (event) => {
        console.log("Handle on change:", event.target.value)
        let object = "differentWindows";
        if(event.target.value === "All windows"){
            object = "similarWindows";
        }
        this.setState({
            similarDimensionwindows: event.target.value
        }, console.log("Similar Dimensions:", event.target.value))
        this.props.setRequestFromChild(event, object)
    }
    indents = (count) => {
        let rows = [];
        console.log("No of windows: ", count);
        for(var i=0; i<count; i++){
            console.log("WindowsProperties", this.props.request.windowsProperties[i].length);
            let object = "windowsProperties";
            let l = `length.${i}`; console.log("l:",l);
            let w = `width.${i}`; console.log("w",w);
            let h = `height.${i}`; console.log("h",h);
            let lengthVal = this.props.request.windowsProperties[i].length; 
            let widthVal = this.props.request.windowsProperties[i].width;
            let heightVal = this.props.request.windowsProperties[i].height;
            rows.push( <tr key={i}>
                <td className="row_heading">Window {i+1}</td>
                <td><input type="number" name={l} value={lengthVal}
                           placeholder="in feet" onChange={(event) => this.props.setRequestFromChild(event, object)} /></td>
                <td><input type="number" name={w} value={widthVal}
                           placeholder="in feet" onChange={(event) => this.props.setRequestFromChild(event, object)} /></td>
                <td><input type="number" name={h} value={heightVal}
                           placeholder="in feet" onChange={(event) => this.props.setRequestFromChild(event, object)} /></td>
            </tr>)
        }
        if(count === 0){
            rows.push( <tr key="0">
                 <td className="row_heading">Zero Windows chosen</td>
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
                {console.log("WindowProperties:", this.props.request)}
                <div className="modal_content plastering_window_dm_container">
                    <div className="modal_heading align_center">Window Dimensions</div>
                    <div className="window_dm_modal_body window_dm_grid_container">
                    <div className="similarDimensionWindows">
                        <div className="similarDimensionLabel">
                            <label htmlFor="similarDimensionOptions">Choose similar</label>
                            <label htmlFor="similarDimensionOptions">dimension windows</label>
                        </div>
                        <div className="colon align_center">:</div>
                        <select id="similarDimensionOptionsWindows" onChange={this.handleOnChange} value={this.state.similarDimensionwindows} >
                                <option value="No windows">No windows</option>
                                {/* <option value="Opposite walls">Opposite walls</option> */}
                                <option value="All windows">All windows</option>
                        </select>
                    </div>
                    <table className="windowsDimensionsTable">
                        <thead>
                            <tr>
                                <td>(in feet)</td>
                                <td>Length</td>
                                <td>Width</td>
                                <td>Height</td>
                            </tr>
                        </thead>
                        <tbody>
                            {this.indents(this.props.request.numberOfWindows)}
                        </tbody>
                    </table>
                    <div className="modal_close">
                        <button className="secondary_button window_dm_close_button" onClick={(event) => this.props.closeModal(event,"Window")}>Close</button>
                    </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default WindowDimensionsModal;