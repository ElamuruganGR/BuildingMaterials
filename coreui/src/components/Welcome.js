import React, { useState, useEffect } from 'react';
import TodaysCostModal from './Modals/TodaysCostModal';
import '../css/common.css';
import '../css/welcome.css';
import '../css/hereIcon.css';
import '../css/tickIcon.css';
import '../css/smileyIcon.css'
import '../css/loader.css'
import Coins from '../images/coins.png'
import Construction from '../images/Construction.jpeg';
import Wall from '../images/Wall.jpeg';
import MortaringOne from '../images/Mortaring(1).jpeg';
import Sand from '../images/Sand.jpg';
import Loader from './Loader'

const Welcome = () => {
    const [openModal, setOpenModal] = useState(false);
    const [todaysCostUpdated, setTodaysCostUpdated] = useState('noHit');
    // const [todaysCostUpdated, setTodaysCostUpdated] = useState('loading');
    const changeTodaysCostUpdated = (value) => {setTodaysCostUpdated(value)}
    const closeModal = () => {setOpenModal(false)}
    const setLoader = () => {setTodaysCostUpdated('loading')}
    useEffect( () => {
        console.log("Today's cost update:", todaysCostUpdated);
    }, [todaysCostUpdated])
    return(
        <div className="wrapper">
            <div className="heading align_center">
                    <p>Welcome to Construction Cost Predictor</p>
            </div>
            <div className="body">
                <section className="welcome_overlay">
                    <p>Here you can calculate your home construction cost by providing some inputs.</p>
                </section>
                <div className="images">
                    <img src={Construction}></img>
                    <img src={Wall}></img>
                    <img src={MortaringOne}></img>
                    <img src={Sand}></img>
                </div>
                {
                     todaysCostUpdated === 'success'
                     ?
                     <div className="todaysCost align_center">
                         <p className="success">Thanks for updating today's cost of construction materials.
                          You can proceed with your calculations by navigating through menu button.</p>
                         <div className="tickIcon">
                            <div className="tickIcon_content">
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        </div>
                         <a href="#" onClick={()=>{setOpenModal(true)}} ><img src={Coins} className="coins"></img></a>
                     </div>
                    :
                    todaysCostUpdated === 'failure' 
                    ?
                    <div className="todaysCost align_center">
                        <p className="failure">Sorry for the inconvenience. We are facing some technical difficulties. Kindly contact us
                             in +91-9788306825 or elamurugan96@gmail.com </p>
                            <div className="smileyIcon">
                                <div className="smileyIcon_content align_center">
                                    <span>: (</span>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>
                            </div>
                        <a href="#" onClick={()=>{setOpenModal(true)}} ><img src={Coins} className="coins"></img></a>
                    </div>
                    :
                    <div className="todaysCost align_center">
                        <p className="noHit">Help us with Today's cost of Construction materials.</p>
                        <div className="hereIcon">
                            <div className="hereIcon_content">
                                <span></span>
                                <span></span>
                            </div>
                        </div>
                        <a href="#" onClick={()=>{setOpenModal(true)}} ><img src={Coins} className="coins"></img></a>
                    </div>
                }
            </div>
            {
                todaysCostUpdated==='loading' && <Loader />
            }
            {
                // openModal && <Modal changeTodaysCostUpdated={changeTodaysCostUpdated} closeModal={closeModal} setLoader={setLoader} />
                openModal && <TodaysCostModal changeTodaysCostUpdated={changeTodaysCostUpdated} closeModal={closeModal} setLoader={setLoader} />
            }
        </div>
    );
}
export default Welcome;