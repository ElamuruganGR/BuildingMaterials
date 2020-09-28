import React from 'react'
import { Container } from 'react-bootstrap'
import axios from 'axios'
import '../css/RawMaterials.css'

class RawMaterials extends React.Component {
    constructor(props) {
        super(props)
        this.refState = React.createRef()
        const bricks = "Bricks", cementBags = "CementBags", sandUnits = "SandUnits"
        this.state = {
            bricks: bricks, cementBags: cementBags, sandUnits: sandUnits,
            bLength: '', bWidth: '', bHeight: '',
            wLength: '', wWidth: '', wHeight: '',
            tcBrick: '', tcCementBag: '', tcUnitSand: '',
            mortarThickness: '', bricksWastages: '',
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
    componentDidMount() {
        if (this.refState) {
            console.log(document.getElementById("formBrick").innerHeight+" "+document.getElementById("formBrick").innerWidth)
            this.refState.current.focus()
        }
    }
    handleOnChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    submit = (event) => {
        event.preventDefault()
        const input = {
            brick: {
                length: this.state.bLength,
                width: this.state.bWidth,
                height: this.state.bHeight
            },
            wall: {
                length: this.state.bLength,
                width: this.state.bWidth,
                height: this.state.bHeight
            },
            mortarThickness: this.state.mortarThickness,
        }
        axios.post("http://localhost:8080/numberOfBricks", input)
            .then(response => this.setState({ outputBCS: response.data},
                () => {console.log("Printing in COnsole: \n"+this.state.outputBCS)}))
    }
    render() {
        return (
            <div className="text-white">
                {console.log("Window Size : ",window.innerHeight +" "+window.innerWidth+" ")}
                <h2 className="text-center">Enter Input details {window.innerHeight +" "+window.innerWidth}</h2>
                <form id="bcsForm" onSubmit={this.submit}>
                     <Container name="inputContainer" xs={8} sm={8} md={8} lg={8} xl={8}>
                        <div style={{backgroundColor:"rgb(110, 173, 250)", display:"flex", flexDirection:"row", justifyContent:"space-around"}}>
                            <div id="formBrick" style={{backgroundColor:"rgb(171, 198, 231)"}}>
                                    <div className="heading">Brick (inches) :</div>
                                    <div id="formBrickLength" className="inputGroup">
                                        <label className="inputLabel">Length</label>
                                        <input type="number" className="inputTextBox" name="bLength" ref={this.refState}
                                            value={this.state.bLength} onChange={this.handleOnChange} />
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
                            <div>
                                <div id="formWall" style={{backgroundColor:"rgb(171, 198, 231)"}}>
                                    <div className="heading">Wall (feet) :</div>
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
                            </div>
                        </div>
                        <div style={{display:"flex", flexDirection:"row",justifyContent:"center"}}>                            
                            <div>
                                <button className="button" type="submit">Submit</button>
                            </div>
                        </div>
                    </Container>
                    
                    <h2 className="text-center">Output details</h2>
                    <Container name="outputContainer" xs={4} sm={4} md={4} lg={4} xl={4} style={{display:"flex", flexDirection:"row", justifyContent:"space-around"}}>
                        {this.state.outputBCS.map(countAndCost => (
                            <div style={{backgroundColor:"rgb(110, 173, 250)"}} key = {countAndCost.id}>
                                <div className="heading">{countAndCost.id}</div>
                                <div className="outputGroup">
                                    <label className="outputLabel">Required number of {countAndCost.id}</label>
                                    <input type = "number" className="outputTextBox" name={countAndCost.id+"Count"} value={countAndCost.countWithWastage} readOnly />
                                </div>
                                <div className="outputGroup">
                                    <label className="outputLabel">Total Cost </label>
                                    <input type = "number" className="outputTextBox" name={countAndCost.id+"Cost"} value={countAndCost.cost} readOnly />
                                </div>
                            </div>
                        ))}
                    </Container>
                </form>
            </div>
        )
    }
}
export default RawMaterials