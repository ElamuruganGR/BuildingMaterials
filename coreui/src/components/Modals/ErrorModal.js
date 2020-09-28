import React from 'react';
import '../../css/modals/error_modal.css';
import '../../css/modals/common_modal.css';

const ErrorModal = (props) => {
    const {closeModal} = props 
    return(
        <div className="error_modal_overlay">
            <div className="error_modal_content">
                <p>Sorry for the inconvenience. We are facing some technical difficulties.
                Kindly contact us in +91-9788306825 or elamurugan96@gmail.com</p>
                <button className="secondary_button" onClick={() => closeModal('apiStateError')}>Close</button>
            </div>
        </div>
    );
}
export default ErrorModal;