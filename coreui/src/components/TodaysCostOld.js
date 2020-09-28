import React, { useState, useEffect } from 'react'
import axios from 'axios'
function TodaysCostOld({showComponent}) {
    const defaultValue = ""
    const [todaysCost, setTodaysCost] = useState({
        brick : defaultValue,
        cement : defaultValue, 
        sand : defaultValue,
        crushedStones : defaultValue,
        percentageOfWastageOfBricks : defaultValue,
        cementRatioInCementSandMixture : defaultValue,
        sandRatioInCementSandMixture : defaultValue,
        totalPartsOfCementSandMixture : defaultValue})
    const [output, setOutput] = useState("")

    const hanldeOnSubmit = (e) => {
        e.preventDefault()
        console.log("Form Submitted: ",todaysCost)
        axios.post("http://localhost:8080/todaysCost",todaysCost)
        .then( res => {
                        console.log(res.data);
                        showComponent('Y');
                        })
        .catch( showComponent('N'))
    }
    const focusRef = React.createRef()
    useEffect(() => {
        focusRef.current.focus()
    }, [])
    return (
        <div >
            {console.log("TodaysCost.return():"+todaysCost.brick)}
            <h3>Today's Cost (in Rupees)</h3>
            <form id="formTodaysCost"  onSubmit={e => hanldeOnSubmit(e)}>
                <div>
                    <div>
                        <div>
                            <div id="formTCBrick" className="formGroupInline">
                                <label className="inputLabel">Brick</label>
                                <input type="number" className="inputTextBox" placeholder="0" ref={focusRef} name="tcBrick"
                                    value={todaysCost.brick} onChange={event => { setTodaysCost({...todaysCost, brick : event.target.value}) }} />
                            </div>
                            <div id="formTCCement" className="formGroupInline">
                                <label className="inputLabel">Cement (50Kg)</label>
                                <input type="number" className="inputTextBox" placeholder="0" name="tcCementBag"
                                    value={todaysCost.cement} onChange={event => setTodaysCost({...todaysCost, cement : event.target.value})} />
                            </div>
                            <div id="formTCSand" className="formGroupInline">
                                <label className="inputLabel">Unit Sand</label>
                                <input type="number" className="inputTextBox" placeholder="0" name="tcUnitSand"
                                    value={todaysCost.sand} onChange={event => setTodaysCost({...todaysCost, sand : event.target.value})} />
                            </div>
                            <div id="formTCCrushedStones" className="formGroupInline">
                                <label className="inputLabel">Unit Crushed Stones</label>
                                <input type="number" className="inputTextBox" placeholder="0" name="tcCrushedStones"
                                    value={todaysCost.crushedStones} onChange={event => setTodaysCost({...todaysCost, crushedStones : event.target.value})} />
                            </div>
                        </div>
                    </div>
                    <div>
                        <div>
                            <div id="formTCPercentageOfWastageOfBricks" className="formGroupInline">
                                <label className="inputLabel">Percentage of wastage of Bricks : </label>
                                <input type="number" className="inputTextBox" placeholder="0" name="tcBrick"
                                    value={todaysCost.percentageOfWastageOfBricks} onChange={event => { setTodaysCost({...todaysCost, percentageOfWastageOfBricks : event.target.value}) }} />
                            </div>
                            <div id="formTCCementRatioInCementSandMixture" className="formGroupInline">
                                <label className="inputLabel">Cement ratio in cement sand mixture : </label>
                                <input type="number" className="inputTextBox" placeholder="0" name="tcCementBag"
                                    value={todaysCost.cementRatioInCementSandMixture} onChange={event => setTodaysCost({...todaysCost, cementRatioInCementSandMixture : event.target.value, totalPartsOfCementSandMixture : parseInt(event.target.value, 10) + parseInt((todaysCost.sandRatioInCementSandMixture !== "" ? todaysCost.sandRatioInCementSandMixture : 0), 10)})} />
                            </div>
                            <div id="formTCSandRatioInCementSandMixture" className="formGroupInline">
                                <label className="inputLabel">Sand ratio in cement sand mixture : </label>
                                <input type="number" className="inputTextBox" placeholder="0" name="tcUnitSand"
                                    value={todaysCost.sandRatioInCementSandMixture} onChange={event => setTodaysCost({...todaysCost, sandRatioInCementSandMixture : event.target.value,  totalPartsOfCementSandMixture : parseInt(event.target.value, 10) + parseInt((todaysCost.cementRatioInCementSandMixture !== "" ? todaysCost.cementRatioInCementSandMixture : 0), 10)})} />
                            </div>
                            <div id="formTCTotalPartsOfCementSandMixture" className="formGroupInline">
                                <label className="inputLabel">Total parts of cement sand mixture : </label>
                                <input type="number" className="inputTextBox" placeholder="0" name="tcCrushedStones"
                                    value={todaysCost.totalPartsOfCementSandMixture} readOnly />
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <button type="submit" className="button">Submit</button>
                </div>
            </form>
        </div>
    )
    }
export default TodaysCostOld;