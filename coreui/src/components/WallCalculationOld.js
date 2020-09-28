import React from 'react'
import axios from 'axios'
import WindowPropertiesContext from './WindowPropertiesContext'
import BgImage from '../images/Background.jpeg'

class WallCalculationOld extends React.Component{
    static contextType = WindowPropertiesContext
    constructor(props){
        super(props)
        const bricks = "Bricks", cementBags = "Cement", sandUnits = "Sand"
        this.state = {
            wallHeight: '', wallWidth: '',
            bricks: bricks, cementBags: cementBags, sandUnits: sandUnits,
            bLength: '', bWidth: '', bHeight: '',
            wLength: '', wWidth: '', wHeight: '',
            mortarThickness: '',
            validValue: '',
            outputBCS: [
                {
                    id: bricks,
                    quantityRequired: "",
                    cost: ""
                },
                {
                    id: cementBags,
                    quantityRequired: "",
                    cost: ""
                },
                {
                    id: sandUnits,
                    quantityRequired: "",
                    cost: ""
                }
            ]
        }
        
    }
    componentDidMount(){
       console.log("Wall Context:",this.context)
       this.setState({wallHeight : this.context.windowHeight*7/8, wallWidth : this.context.windowWidth})
    }
    handleOnChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
            validValue : event.target.value
        })

    }
    validate = async() => {
        let valid = true
        if(this.state.bLength==="" || this.state.bLength==="0"){
            await this.setState({ bLength: "0" })
            valid = false;
        }
        if(this.state.bWidth==="" || this.state.bWidth==="0"){
            console.log("Inside bWidth")
            await this.setState({ bWidth: "0" })
            valid = false;
        }
        if(this.state.bHeight==="" || this.state.bHeight==="0"){
            await this.setState({ bHeight: "0" })
            valid = false;
        }
        if(this.state.mortarThickness==="" || this.state.mortarThickness==="0"){
            await this.setState({mortarThickness: "0"})
            valid=false
        }
        if(this.state.wLength==="" || this.state.wLength==="0"){
            await this.setState({ wLength: "0" })
            valid = false;
        }
        if(this.state.wWidth==="" || this.state.wWidth==="0"){
            await this.setState({ wWidth: "0" })
            valid = false;
        }
        if(this.state.wHeight==="" || this.state.wHeight==="0"){
            await this.setState({ wHeight: "0" })
            valid = false;
        }
        return valid;
        
    }
    submit = async(event) => {
        event.preventDefault()
        const input = {
            brickProperties:{
                length: this.state.bLength,
                width: this.state.bWidth,
                height: this.state.bHeight
            },
            wallProperties:{
                length: this.state.wLength,
                width: this.state.wWidth,
                height: this.state.wHeight
            },
            mortarThickness: this.state.mortarThickness
        }
        console.log("input",input)
        let isValid = await this.validate()
        console.log("After validate:",isValid)
        if(isValid){
            axios.post("http://localhost:8080/qcWall", input)
                .then(response => this.setState({ outputBCS: response.data},
                    () => {console.log("Printing in COnsole: \n"+ this.state.outputBCS[0].quantityRequired)}))
        } 
    }
    render(){
        return(
            <form  onSubmit={this.submit} style={{display: "flex",color:"white", flexDirection:"row", marginBottom: 20, width: this.state.wallWidth, height: this.state.wallheight}}>
                <div id="inputContainer" style={{marginLeft:"3%",marginRight:"3%", backgroundColor:"#343a40",flex:"display", flexDirection:"column", width:"40%", height:this.state.wallHeight}}>
                    <div style={{width:"100%", height:"7.5%", textAlign:"center"}}>
                        <h2 className="text-center">Enter Input details</h2>
                    </div>
                    <div style={{width:"100%", height:"7.5%", textAlign:"center", color:"red"}}>
                       { this.state.validValue === "0" ? "Please enter a value greater than 0" : ""}
                    </div>
                    <div id="brickContainer" style={{width:"100%", height:"30%",paddingTop:"0%",paddingLeft:"15%",paddingRight:"15%",paddingBottom:"5%",display:"flex", flexDirection:"row"}}>
                        <div id="brick" style={{width:"50%", height:"100%",backgroundColor:"darkslategrey", paddingLeft:"3%", paddingRight:"3%", paddingTop:"3%", paddingBottom:"3%"}}>
                            <div className="containerHeading">Brick (inches) :</div>
                            <div id="formBrickLength" className="inputGroup">
                                <label className="inputLabel">Length</label>
                                <input type="number" className="inputTextBox" name="bLength" ref={this.refState}
                                    value={this.state.bLength} onChange={this.handleOnChange} required/>
                            </div>
                            <div id="formBrickWidth" className="inputGroup">
                                <label className="inputLabel">Width</label>
                                <input type="number" className="inputTextBox" name="bWidth"
                                    value={this.state.bWidth} onChange={this.handleOnChange} />
                            </div>
                            <div id="formBrickHeight" className="inputGroup">
                                <label className="inputLabel">Height</label>
                                <input type="number" className="inputTextBox" name="bHeight"
                                    value={this.state.bHeight} onChange={this.handleOnChange} />
                            </div>
                        </div>
                        <div id="brickImage" style={{width:"50%", height:"100%", backgroundColor:"darkslategrey"}}>
                            <div className="containerHeading"></div>
                            <div id="formBrickLengthError" className="error">
                                { this.state.bLength === "0" ? "please enter a valid length": ""}
                            </div>
                            <div id="formBrickWidthError" className="error">
                                { this.state.bLength === "0" ? "please enter a valid width": ""}
                            </div>
                            <div id="formBrickHeightError" className="error">
                                { this.state.bLength === "0" ? "please enter a valid Height": ""}
                            </div>
                        </div>
                    </div>
                    <div id="mortarContainer" style={{width:"100%", height:"10%", paddingLeft:"15%", paddingRight:"15%",display:"flex", flexDirection:"row"}}>
                        <div id="mortarThickness" style={{width:"50%", height:"100%", backgroundColor:"darkslategrey"}}>
                            <div id="formMortarThickness" className="inputGroup" style={{height:"100%", flexDirection:"column"}}>
                                <label className="containerHeading" style={{height:"50%", width:"100%"}}>Mortar Thickness: (inches)</label>
                                <input type="number" className="inputTextBox" name="mortarThickness" style={{height:"50%", marginTop:"0%"}}
                                value={this.state.mortarThickness} onChange={this.handleOnChange} />
                            </div>
                        </div>
                        <div id="formMortarThicknessError" className="error" style={{width:"50%", height:"100%", backgroundColor:"darkslategrey"}}>
                            {this.state.mortarThickness === "0" ? "please enter a valid Mortar thickness" : ""}
                        </div>
                    </div>
                    <div id="wallContainer" style={{width:"100%", height:"35%",paddingTop:"5%",paddingLeft:"15%",paddingRight:"15%",paddingBottom:"5%",display:"flex", flexDirection:"row"}}>
                        <div id="wall" style={{width:"50%", height:"100%",backgroundColor:"darkslategrey", paddingLeft:"3%", paddingRight:"3%", paddingTop:"3%", paddingBottom:"3%"}}>
                            <div className="containerHeading">Wall (feet) :</div>
                            <div id="formWallLength" className="inputGroup">
                                <label className="inputLabel">Length</label>
                                <input type="number" className="inputTextBox" name="wLength"
                                    value={this.state.wLength} onChange={this.handleOnChange} />
                            </div>
                            <div id="formWallWidth" className="inputGroup">
                                <label className="inputLabel">Width</label>
                                <input type="number" className="inputTextBox" name="wWidth"
                                    value={this.state.wWidth} onChange={this.handleOnChange} />
                            </div>
                            <div id="formWallHeight" className="inputGroup">
                                <label className="inputLabel">Height</label>
                                <input type="number" className="inputTextBox" name="wHeight"
                                    value={this.state.wHeight} onChange={this.handleOnChange} />
                            </div>
                        </div>                        
                        <div id="wallImage" style={{width:"50%", height:"100%", backgroundColor:"darkslategrey"}}>
                            <div className="containerHeading"></div>
                            <div id="formBrickLengthError" className="error">
                                { this.state.wLength === "0" ? "please enter a valid length": ""}
                            </div>
                            <div id="formBrickWidthError" className="error">
                                { this.state.wLength === "0" ? "please enter a valid width": ""}
                            </div>
                            <div id="formBrickHeightError" className="error">
                                { this.state.wLength === "0" ? "please enter a valid Height": ""}
                            </div>
                        </div>
                    </div>
                    <div style={{width:"100%", height:"10%", textAlign:"center"}}>
                        <button className="button" type="submit">Submit</button>
                    </div>
                </div>
                <div id="outputContainer" style={{backgroundColor:"#343a40",marginRight:"3%", width:"60%", height:this.state.wallHeight}}>
                    <div style={{width:"100%", height:"10%"}}>
                        <h2 className="text-center">Output details</h2>
                    </div>
                    <div style={{width:"100%", height:"90%",paddingTop:"5%",paddingBottom:"10%", display:"flex", flexDirection:"row",flexWrap:"wrap", justifyContent:"space-evenly"}}>

                    {this.state.outputBCS.map(countAndCost => (
                        <div style={{width:"40%",height:"50%",marginBottom:"2%",backgroundColor:"darkslategrey", paddingLeft:"3%", paddingRight:"3%", paddingTop:"3%", paddingBottom:"3%"}} key = {countAndCost.id}>
                                    <div className="containerHeading" style={{height:"20%", width:"100%"}}>{countAndCost.id}</div>
                                    <div className="outputGroup" style={{height:"40%", width:"100%"}}>
                                        <label className="outputLabel">Required number of {countAndCost.id}</label>
                                        <div style={{display: "flex"}}>
                                            <input type = "number" className="outputTextBox" name={countAndCost.id+"Count"} value={countAndCost.quantityRequired} readOnly />
                                            <div style={{color:"mediumaquamarine"}}>{countAndCost.id === "Cement" ? <> bags</> :
                                                ((countAndCost.id === "Sand") ? <> units</> : 
                                                    ((countAndCost.id === "Bricks") ? <> bricks </> : <></>))}</div>
                                        </div>
                                    </div>
                                    <div className="outputGroup" style={{height:"40%", width:"100%"}}>
                                        <label className="outputLabel">Total Cost </label>
                                        <div style={{display: "flex"}}>
                                            <input type = "number" className="outputTextBox" name={countAndCost.id+"Cost"} value={countAndCost.cost} readOnly />
                                            <div  style={{color:"mediumaquamarine"}}> rupees</div>
                                        </div>
                                    </div>
                        </div>
                    ))}

                    </div>
                </div>
            </form>
        )
    }
}
export default WallCalculationOld;