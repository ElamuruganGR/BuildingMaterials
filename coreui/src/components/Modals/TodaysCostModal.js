import React, {useState, useEffect} from 'react';
import Axios from 'axios';
import '../../css/modals/common_modal.css';
import '../../css/modals/todaysCost_modal.css';

export default function TodaysCostModal(props){
    const {changeTodaysCostUpdated, closeModal, setLoader} = props;
    const defaultValue = '';
    const [todaysCostInput, setTodaysCostInput] = useState({
        brick: defaultValue,
        cement: defaultValue,
        sand: defaultValue,
        crushedStones: defaultValue
    });
    const [error, setError] = useState(false);
    const focusRef = React.createRef();
    const handleOnChange = event => {
        setTodaysCostInput({...todaysCostInput, [event.target.name]: event.target.value});
    }
    const testProps = (value) => {
        return {
            testKey: 'testValue'+value
        }
    }
    const validateAndSubmit = (event) => {
        console.log("Props: ", props);
        let valid = validate();
        event.preventDefault();
        console.log("Valid:", valid);
        if(valid){
            console.log("Input is valid")
            setError(false);
            submit(event);
        } else{
            console.log("Input is not valid");
            setError(true);
        }
    }
    const submit = (event) => {
        console.log("Submit:",JSON.stringify(todaysCostInput));
        console.log("Todays cost input:",todaysCostInput);
        Axios.post("http://localhost:8080/todaysCost",todaysCostInput)
             .then(res => {
                     console.log(res.data);
                     changeTodaysCostUpdated('success');
                })
             .catch(res => {
                    console.log(res.catch);
                    changeTodaysCostUpdated('failure');
                }
             );
        setLoader();
        closeModal();
    }
    const validate = () => {
        console.log(todaysCostInput.brick);
        if(todaysCostInput.brick === '0' || todaysCostInput.brick === '') {
            return false;
        } else if(todaysCostInput.cement === '0' || todaysCostInput.cement === '') {
            return false; 
        } else if(todaysCostInput.sand === '0' || todaysCostInput.sand === ''){
            return false;
        } else if(todaysCostInput.crushedStones === '0' || todaysCostInput.crushedStones === ''){
            return false;
        }
        return true;
    }
    useEffect(() => {
        focusRef.current.focus();
    },[])
    return(
        <div className="modal_overlay">
            <div className="modal_content">
                <div id="tc_modal_heading" className="tc_modal_heading align_center">Today's cost of construction materials</div>
                {error && <div className="error align_center">Please enter a value greater than 0</div>}
                <form id="tc_modal_body" className="tcm_grid_container"  onSubmit={validateAndSubmit} >
                    <div className="tcm_grid_element split_vertically">
                        <label htmlFor="brickCost" className="label">Brick</label>
                        <label htmlFor="brickCost" className="unit">(per brick)</label>
                    </div>
                    <div  className="tcm_grid_element colon">:</div>
                    <div className="tcm_grid_element">
                        <input type="number" name="brick" className="cost_input" placeholder="in rupees" autoComplete="off" value={todaysCostInput.brick} 
                        onChange={handleOnChange} ref={focusRef} />
                    </div>

                    <div className="tcm_grid_element split_vertically">
                        <label htmlFor="cementCost" className="label">Cement</label>
                        <label htmlFor="cementCost" className="unit">(per 50kg bag)</label>
                    </div>
                    <div className="tcm_grid_element colon">:</div>
                    <div className="tcm_grid_element">
                        <input type="number" name="cement" className="cost_input" placeholder="in rupees" autoComplete="off" value={todaysCostInput.cement} 
                        onChange={handleOnChange} />
                    </div>

                    <div className="tcm_grid_element split_vertically">
                        <label htmlFor="sandCost" className="label">Sand</label>
                        <label htmlFor="sandCost" className="unit">(per unit)</label>
                    </div>
                    <div className="tcm_grid_element colon">:</div>
                    <div className="tcm_grid_element">
                        <input type="number" name="sand" className="cost_input" placeholder="in rupees" autoComplete="off" value={todaysCostInput.sand} 
                        onChange={handleOnChange} />
                    </div>

                    <div className="tcm_grid_element split_vertically">
                        <label htmlFor="crushedStonesCost" className="label" style={{lineHeight:'125%'}}>Crushed stones</label>
                        <label htmlFor="crushedStonesCost" className="unit" style={{lineHeight:'280%'}}>(per unit)</label>
                    </div>
                    <div className="tcm_grid_element colon">:</div>
                    <div className="tcm_grid_element ">
                        <input type="number" name="crushedStones" className="cost_input" placeholder="in rupees" autoComplete="off" value={todaysCostInput.crushedStones} 
                        onChange={handleOnChange} />
                    </div>
                    <button type="button" className="secondary_button" onClick={closeModal}>Close</button>
                    <button type="submit" className="primary_button" style={{gridColumnStart:'3'}}>Submit</button>
                </form>
            </div>
        </div>
              
    );
}