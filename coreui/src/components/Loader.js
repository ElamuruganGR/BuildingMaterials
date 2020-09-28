import React from 'react';
import '../css/loader.css';
class Loader extends React.Component{
    render(){
        return(
            <div className="loader_container">
                <div className="loader">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        );
    }
}
export default Loader;