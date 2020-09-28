import React from 'react';
import '../../../css/modals/common_modal.css';
import '../../../css/modals/plastering/wallDimensionsModal.css';

class WallDimensionsModal extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            similarDimensionWalls : "No walls"
        }
    }
    indents = (count) => {
        let rows = [];
        console.log("No of walls: ", count);
        for(var i=0; i<count; i++){
            console.log("WallsProperties", this.props.request.wallsProperties[i].length);
            let l = `length.${i}`; console.log("l:",l);
            let w = `width.${i}`; console.log("w",w);
            let h = `height.${i}`; console.log("h",h);
            rows.push( <tr key={i}>
                <td className="row_heading">Wall {i+1}</td>
                <td><input type="number" name={l} value={this.props.request.wallsProperties[i].length}
                           placeholder="in feet" onChange={(event) => this.props.setRequestFromChild(event,"wallsProperties")} /></td>
                <td><input type="number" name={w} value={this.props.request.wallsProperties[i].width}
                           placeholder="in feet" onChange={(event) => this.props.setRequestFromChild(event,"wallsProperties")} /></td>
                <td><input type="number" name={h} value={this.props.request.wallsProperties[i].height}
                           placeholder="in feet" onChange={(event) => this.props.setRequestFromChild(event,"wallsProperties")} /></td>
            </tr>)
        }
        return rows;
    }
    
    evenNumberOfWalls = () => {
        if(this.props.request.numberOfWalls % 2 === 0){
            return true;
        }
        return false;
    }
    handleOnChange = (event) => {
        console.log("Handle On change:", event.target.value);
        let object = "differentWalls";
        if(event.target.value === "All walls"){
            object = "similarWalls";
        } else if(event.target.value === "Opposite walls") {
            object = "oppositeWalls"
        }
        this.setState({
            similarDimensionWalls: event.target.value
        }, console.log("Similar Dimensions:", event.target.value))
        this.props.setRequestFromChild(event, object)
    }
    
    render(){
        return(
            <div className="modal_overlay">
                {console.log("WallProperties:", this.props.request)}
                <div className="modal_content plastering_wdm_container">
                    <div className="modal_heading align_center">Wall Dimensions</div>
                    <div className="wdm_modal_body wdm_grid_container">
                    <div className="similarDimensionWalls">
                        <div className="similarDimensionLabel">
                            <label htmlFor="similarDimensionOptions">Choose similar</label>
                            <label htmlFor="similarDimensionOptions">dimension walls</label>
                        </div>
                        <div className="colon align_center">:</div>
                        <select id="similarDimensionOptions" onChange={this.handleOnChange} value={this.state.similarDimensionWalls} >
                                <option value="No walls">No walls</option>
                                {this.evenNumberOfWalls() && <option value="Opposite walls">Opposite walls</option>}
                                <option value="All walls">All walls</option>
                        </select>
                    </div>
                    
                    <table className="plasteringThicknessTable">
                        <thead>
                            <tr>
                                <td>(in mm)</td>
                                <td>Inner wall</td>
                                <td>Outer wall</td>
                                <td>Ceiling</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="row_heading">Plastering thickness</td>
                                {console.log(this.props.request.plasteringSurfaces.innerWallPlasterThickness)}
                                <td>
                                    <input type="number" name="innerWall" value={this.props.request.plasteringSurfaces.innerWallPlasterThickness}
                                           onChange={(event) => this.props.setRequestFromChild(event,"plasteringSurfaces")} placeholder="in mm" />
                                </td>
                                <td>
                                    <input type="number" name="outerWall" value={this.props.request.plasteringSurfaces.outerWallPlasterThickness} 
                                           onChange={(event) => this.props.setRequestFromChild(event,"plasteringSurfaces")}  placeholder="in mm" />
                                </td>
                                <td>
                                    <input type="number" name="ceiling" value={this.props.request.plasteringSurfaces.ceilingPlasterThickness} 
                                           onChange={(event) =>this.props.setRequestFromChild(event,"plasteringSurfaces")}  placeholder="in mm" />
                                </td>
                            </tr>
                            <tr>
                                <td className="row_heading">Cement Sand ratio</td>
                                <td>
                                    <div  className="cement_sand_ratio align_center">
                                        <input type="number" name="numerator" placeholder="C" value={this.props.request.innerWallCSRatio.numerator} 
                                               onChange={(event) => this.props.setRequestFromChild(event, "innerWallCSRatio")} />
                                        <div className="colon">:</div>
                                        <input type="number" name="denominator" placeholder="S" value={this.props.request.innerWallCSRatio.denominator}
                                               onChange={(event) => this.props.setRequestFromChild(event, "innerWallCSRatio")} />
                                    </div>
                                </td>
                                <td>
                                    <div  className="cement_sand_ratio align_center">
                                        <input type="number" name="numerator" placeholder="C"value={this.props.request.outerWallCSRatio.numerator}
                                               onChange={(event) => this.props.setRequestFromChild(event, "outerWallCSRatio")} />
                                        <div className="colon">:</div>
                                        <input type="number" name="denominator" placeholder="S" value={this.props.request.outerWallCSRatio.denominator}
                                               onChange={(event) => this.props.setRequestFromChild(event, "outerWallCSRatio")} />
                                    </div>
                                </td>
                                <td>
                                    <div  className="cement_sand_ratio align_center">
                                        <input type="number" name="numerator" placeholder="C" value={this.props.request.ceilingCSRatio.numerator}
                                               onChange={(event) => this.props.setRequestFromChild(event, "ceilingCSRatio")} />
                                        <div className="colon">:</div>
                                        <input type="number" name="denominator" placeholder="S" value={this.props.request.ceilingCSRatio.denominator}
                                               onChange={(event) => this.props.setRequestFromChild(event, "ceilingCSRatio")} />
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <table className="wallsDimensionsTable">
                        <thead>
                            <tr>
                                <td>(in feet)</td>
                                <td>Length</td>
                                <td>Width</td>
                                <td>Height</td>
                            </tr>
                        </thead>
                        <tbody>
                            {this.indents(this.props.request.numberOfWalls)}
                            {/* {this.props.request.wallsProperties.map(
                                wp => (
                                    <tr key={wp.index}>
                                        {console.log("INDEX:", wp.index)}
                                        <td className="row_heading">Wall {wp.index} </td>
                                        <td><input type="number" name={`length.${wp.index}`} value={wp.length}
                                                placeholder="in feet" onChange={(event) => this.props.setRequestFromChild(event,"wallsProperties")} /></td>
                                        <td><input type="number" name={`width.${wp.index}`} value={wp.width}
                                                placeholder="in feet" onChange={(event) => this.props.setRequestFromChild(event,"wallsProperties")} /></td>
                                        <td><input type="number" name={`height.${wp.index}`} value={wp.height}
                                                placeholder="in feet" onChange={(event) => this.props.setRequestFromChild(event,"wallsProperties")} /></td>
                                    </tr>
                                )
                            )} */}
                        </tbody>
                    </table>
                    <div className="modal_close">
                        <button className="secondary_button wdm_close_button" onClick={(event) => this.props.closeModal(event,"Wall")}>Close</button>
                    </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default WallDimensionsModal;