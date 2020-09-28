import React from 'react';
import '../css/navbar.css';
import {Link} from 'react-router-dom';
class NavigationBar extends React.Component{
    constructor(props){
        super(props);
    }
    
    render(){
        return(
            <div className="main">
                <input type="checkbox" id="menu_check" hidden/>
                <label htmlFor="menu_check" className="menu_icon">
                    <div className="menu_icon_content"></div>
                </label>
                <label htmlFor="menu_check" id="cancel_icon" className="cancel_icon">
                    <div className="cancel_icon_content"></div>
                </label>
                <div className="side_navbar">
                    <div className="side_navbar_title">Menu</div>
                    <ul>
                        <li><Link to="/">Home </Link></li>
                        <li><Link to="/qcWall">Wall Construction</Link></li>
                        <li><Link to="/qcPlastering">Plastering</Link></li>
                    </ul>
                </div>
                <section className="backgroundImage"/>
                <section className="backgroundImageOverlay" />
            </div> 
        );
    }
}
export default NavigationBar;