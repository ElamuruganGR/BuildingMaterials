import React from 'react';
import '../../css/output/quantityAndCost.css';
function QuantityAndCost (props) {
    const {qcm} = props;
    return(
        <div className="qcm_element" key={qcm.id}>
            <div className="img_group">
                <div className="qcm_heading">{qcm.id} {qcm.quantityUnit}:</div>
                <img src={require(`../../images/${qcm.id}_svg.png`)}></img>
            </div>
            <div className="qcm_data">
                <div className="qcm_quantity">
                    <label >Required count:</label>
                    <input type="text" className={`output_box ${qcm.quantityRequired>0 ? 'outputColor' : 'defaultColor'}`} name={`${qcm.id}Quantity`} value={`${qcm.quantityRequired}   ${qcm.quantityUnit}`} readOnly/>
                </div>
                <div className="qcm_cost">
                    <label >Total cost:</label>
                    <input type="text" className={`output_box ${qcm.quantityRequired>0 ? 'outputColor' : 'defaultColor'}`} name={`${qcm.id}Cost`} value={`${qcm.cost} rupees`} readOnly/>
                </div>
            </div>
        </div>
    );
}
export default QuantityAndCost;