import React from 'react'
import '../css/nav.css'
import {Link} from 'react-router-dom'
import {Navbar,Nav} from 'react-bootstrap'
import logo from '../images/buildingConstruction.jpg'
import BgImage from '../images/Background.jpeg'
import WindowPropertiesContext from './WindowPropertiesContext'

class NavigationBarOld extends React.Component{
    static contextType = WindowPropertiesContext
    constructor(props){
        super(props)
        this.state = {
            navHeight : '',
            navWidth : ''
        }
    }
    componentDidMount(){
        const context = this.context
        this.setState({navHeight: context.windowHeight/8, navWidth: context.windowWidth})
        console.log("Context:",context)
    }
    render(){
        return(
            <Navbar variant="dark" className = "text-white navbg" style={{height:this.state.navHeight}}>
                <Link to={"/home"} className="navbar-brand">
                <img src={BgImage} className="App-logo" alt="logo" style={{height:this.state.navHeight*9/10}}/>
                        Construction Cost
                </Link>
                {/* <Nav className="mr-auto">
                    <Link to={"/bcs"} className="nav-link">Brick,Cement,sand</Link>
                </Nav> */}
                <Nav className="mr-auto">
                    <Link to={"/test"} className="nav-link">Test</Link>
                </Nav>
                <Nav className="mr-auto">
                    <Link to={"/wallCalculation"} className="nav-link">Wall Calculation</Link>
                </Nav>
                <Nav className="mr-auto">
                    <Link to={"/image"} className="nav-link">Image</Link>
                </Nav>
            </Navbar>
        )
    }
}
export default NavigationBarOld;