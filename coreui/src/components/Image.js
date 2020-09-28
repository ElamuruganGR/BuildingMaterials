import React, { useContext } from 'react'
// import BgImage from '../images/Background.jpeg'
import WindowPropertiesContext from './WindowPropertiesContext'

function image(){
    const {window} = useContext(WindowPropertiesContext);
    return(
        <div style={{height:window.windowHeight, width:windowWidth}}>
            {/* backgroundImage:BgImage, */}

        </div>
    )
}