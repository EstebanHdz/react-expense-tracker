import {useState} from 'react'
import PropTypes from 'prop-types';

const Modal = ({addTransaction}) => {

    const [inputConceptValue, setInputConceptValue] = useState("")
    const [inputAmountValue, setInputAmountValue] = useState("")


    const handleConceptInput = (event) => {
        setInputConceptValue((event.target ).value);
    };

    const handleAmountInput = (event) => {
        const value = event.target.value;
        const validNumberPattern = /^-?\d*\.?\d{0,2}$/;

        if (validNumberPattern.test(value)) {
            setInputAmountValue(value);
        }
    };

    const createTransaction = () => {

        if(inputConceptValue === "" || inputAmountValue === "") 
            return null

        addTransaction(inputConceptValue, inputAmountValue)
        setInputAmountValue("")
        setInputConceptValue("")
        closeModal()
    }

    const closeModal = () => {
        document.getElementById("myModal").style.display="none"
    }

    return (
        <div id="myModal" className="modal">

            <div className="modal-content">
                <span className="close" onClick={closeModal}>&times;</span>
                
                <div className="modal-form">
                    <h2>Add Transaction</h2>
                    <div className="modal-form-item">
                        <p className='input-label'>Concept</p>
                        <input onChange={(event) => handleConceptInput(event)} className='input-field' type="text" placeholder='Enter Concept' value={inputConceptValue}/>
                    </div>
                    <div className="modal-form-item">
                        <p className='input-label'>Amount</p>
                        <input onChange={(event) => handleAmountInput(event)} className='input-field' type="text" placeholder='Enter Amount' value={inputAmountValue}/>
                    </div>

                    <button className="action-button confirm-button" onClick={createTransaction}>Add</button>
                </div>
            </div>

            </div>
    )
}
Modal.propTypes = {
    addTransaction: PropTypes.func.isRequired
}

export default Modal
