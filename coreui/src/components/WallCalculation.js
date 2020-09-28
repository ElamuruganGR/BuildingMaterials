import React from 'react';
import '../css/wall.css';
import '../css/hereIcon.css';
import '../css/blinkingDownArrow.css';
import '../css/green_tick.css';
import '../css/loader.css'
import dimensions from '../images/dimensions.png';
import BrickModal from './Modals/BrickModal';
import WallModal from './Modals/WallModal';
import WallMiscModal from './Modals/WallMiscModal';
import ErrorModal from './Modals/ErrorModal'
import {CalculateQCWall, RESET_ERROR_action} from '../redux/wall/Actions';
import {connect} from 'react-redux';
import store from '../redux/wall/Store';

class WallCalculation extends React.Component{
    constructor(props){
        super(props);
        // this.ref = React.createRef();
        this.state = {
            openBrickModal: false,
            updatedBrickModal: false,
            openWallModal: false,
            updatedWallModal: false,
            openWallMiscModal: false,
            updatedWallMiscModal: false,
            openApiErrorModal: false,
            apiStateError: this.props.apiResponse.error,
            error: false,
            recentSubmit: false,
            input:{
                brickProperties: {
                    length: '',
                    width: '',
                    height: ''
                },
                wallProperties:{
                  length: '',
                  width: '',
                  height: ''
                },
                
                wallMisc:{
                  mortarThickness: '',
                  bricksWastagePercent: '',
                  cementInCSM: '',
                  sandInCSM: ''
                }
            }
        }
    }
    handleOnChange = (event) => {
        
        let arrayNames = event.target.name.split('.');
        console.log("Event", event);
        console.log("Event traget", event.target);
        console.log("Arrays: ", arrayNames);
        console.log("Value: ", event.target.value);
        this.setState({
            input:{
                ...this.state.input,
                [arrayNames[0]]:{
                    ...this.state.input[arrayNames[0]],
                    [arrayNames[1]]: event.target.value
                }
            }
        });
        console.log("State after change:", this.state);
    }
    handleSubmit = async(event) =>{
        event.preventDefault();
        console.log('Submitted form: ', this.state);
        await this.props.dispatch(CalculateQCWall(this.state));
    }
    validateAndSubmit = async(event) => {
        event.preventDefault();
        let valid = this.validate();
        let Test = '';
        console.log("Test.toString()",Test.toString());
        if(valid){
            this.setState({error: false, recentSubmit:true});
           await this.props.CalculateQCWall(this.state.input);
        // await this.props.dispatch(CalculateQCWall(this.state.input));
        } else{
            this.setState({error: true});
        }
    }
    closeModal = (key) => {
        let name = '';
        if(key === 'apiStateError'){
            // this.props.RESET_ERROR();
            this.props.resetError();
        } else{
            name = 'open'+key+'Modal';
            this.setState({[name]: false});
            console.log("Props apiError:", this.props.apiResponse.error)
        }
    }
    setModalUpdated = (key, value) => {
        let name = 'updated'+key+'Modal'; 
        console.log(name, value);

        this.setState({[name]: value}, () => {
                console.log("this.state.error", this.state.error)
                if(this.state.error){
                    this.setState({error: !this.validate()});
                }
            }
        );   
    }
  
    validate = () => {
        console.log("updatedBrickModal:", this.state.updatedBrickModal);
        console.log("updatedWallModal:", this.state.updatedWallModal);
        console.log("updatedWallMiscModal:", this.state.updatedWallMiscModal);
        return this.state.updatedBrickModal
               && this.state.updatedWallModal
               && this.state.updatedWallMiscModal;

    }
    render(){
        return(
            <div className="wallWrapper">
                <div className="wall_header align_center">
                    <p>Cost of One Wall</p>
                </div>
                <div className="wall_body">
                    <form className="inputContainer" onSubmit={this.validateAndSubmit}>
                        {
                            this.state.error
                            &&
                            <div className= "element error">
                                <p>Please specify all the details</p>
                            </div>
                        }
                        <div id="brick" className="element">
                            <p>Specify brick dimensions</p>
                            {
                                this.state.updatedBrickModal
                                ?
                                <div className="greenTick">
                                </div>
                                :
                                <div className="blinkingDownArrow">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>
                            }
                            <a href="#" onClick={() => {this.setState({openBrickModal: true})}}><img alt="Open Brick Modal" src={dimensions}/></a>
                        </div>
                        <div id="wall" className="element">
                            <p>Specify wall dimensions</p>
                            {
                                this.state.updatedWallModal
                                ?
                                <div className="greenTick">
                                </div>
                                :
                                <div className="blinkingDownArrow">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>
                            }
                            <a href="#" onClick={() => {this.setState({openWallModal: true})}}><img src={dimensions} alt="Open Wall Modal" /></a>
                        </div>
                        <div id ="misc" className="element">
                            <p>Specify miscelleneous details</p>
                            {
                                this.state.updatedWallMiscModal
                                ?
                                <div className="greenTick">
                                </div>
                                :
                                <div className="blinkingDownArrow">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>
                            }
                            <a href="#" onClick={() => {this.setState({openWallMiscModal: true})}}><img src={dimensions} alt="Open Wall Misc Modal" /></a>
                        </div>
                        <div className="element button">
                            <button type="submit" className="primary_button">Submit</button>
                            {console.log(store.getState())}
                        </div>
                    </form>
                    <div className="outputContainer">
                        {
                            this.props.apiResponse.data
                            &&
                            <div className="output">
                                {
                                        this.props.apiResponse.data.map(
                                        qcm => (
                                            
                                            <div id={qcm.id} key={qcm.id} className="qcm_element">
                                                <div className = "image" >
                                                    <p>{qcm.id}:</p>
                                                    <img src={require(`../images/${qcm.id}_svg.png`)} alt={`${qcm.id} Image`} />
                                                </div>
                                                <div className="details">
                                                    <div className="input_group">
                                                        <label htmlFor="quantity">Required Count:</label>
                                                        <input type="text" className={`output_box ${qcm.quantityRequired>0 ? 'outputColor' : 'defaultColor'}`} name="qcmQuantity" value={`${qcm.quantityRequired}   ${qcm.quantityUnit}`} readOnly />
                                                    </div>
                                                    <div className="input_group">
                                                        <label htmlFor="qcmCost">Total cost:</label>
                                                        <input type="text" className={`output_box ${qcm.quantityRequired>0 ? 'outputColor' : 'defaultColor'}`} name="qcmCost" value={`${qcm.cost}   rupees`} readOnly />
                                                        {console.log(store.getState())}
                                                    </div>
                                                </div>
                                            </div>
                                            
                                        )
                                    )
                                }
                            </div>
                        }
                    </div>                     
                    {this.state.openBrickModal && <BrickModal brickProperties= {this.state.input.brickProperties} 
                                                   handleOnChange= {this.handleOnChange} closeModal= {this.closeModal} 
                                                   setModalUpdated= {this.setModalUpdated}/>}
                    {this.state.openWallModal && <WallModal wallProperties= {this.state.input.wallProperties}
                                                  handleOnChange= {this.handleOnChange} closeModal= {this.closeModal}
                                                  setModalUpdated= {this.setModalUpdated} />}
                    {this.state.openWallMiscModal && <WallMiscModal wallMisc= {this.state.input.wallMisc}
                                                  handleOnChange= {this.handleOnChange} closeModal= {this.closeModal}
                                                  setModalUpdated= {this.setModalUpdated} />}
                    {
                        this.props.apiResponse.error && <ErrorModal closeModal={this.closeModal}/>
                    }
                </div>
                { 
                    this.props.apiResponse.loading 
                    &&   
                    <div className="loader_container">
                            <div className="loader">
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                    </div>  }
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return{        
        apiResponse: state.wall
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        CalculateQCWall : (request) => dispatch(CalculateQCWall((request))),
        resetError : () => dispatch(RESET_ERROR_action())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WallCalculation);