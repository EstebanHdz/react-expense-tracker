
import PropTypes from 'prop-types';

const TransactionElement = ({transaction, removeTransaction}) => {
    return (

        <div className={"history-element " + (transaction.type === "Expense" ? " history-element-expense" : " history-element-income")}>
            <h3 className="history-element-name">{transaction.concept}</h3>
            <p className="history-element-amount">${transaction.amount.toFixed(2).toLocaleString()}</p>
            <button className='delete-button' onClick={() => removeTransaction(transaction.id)}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M3 6l3 18h12l3-18h-18zm19-4v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.316c0 .901.73 2 1.631 2h5.711z"/></svg></button>
        </div>
    )
}

TransactionElement.propTypes = {
    transaction: PropTypes.object.isRequired,
    removeTransaction: PropTypes.func.isRequired
}

export default TransactionElement
