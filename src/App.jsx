import { useEffect, useState, useRef } from 'react'
import TransactionElement from './components/TransactionElement'
import Modal from './components/Modal'
import { v4 as uuidv4 } from 'uuid';


function App() {

    const [transactions, setTransactions] = useState([])

    const [totalBalance, setTotalBalance] = useState(0.00)
    const [totalExpense, setTotalExpense] = useState(0.00)
    const [totalIncome, setTotalIncome] = useState(0.00)



    const openModal = () => {
        document.getElementById("myModal").style.display="block"
    }

    const addTransaction = (concept, amount) => {
        let newTransaction = {
            concept: concept,
            amount: amount,
            type: "Income",
            id: uuidv4()
        }

        /*
        if(amount[0] === "-"){
            newTransaction.type = "Expense"
            amount = amount.substring(1)
        }
        */

        let am = Number(Number(amount).toFixed(2))

        if(am < 0){
            newTransaction.type = "Expense"
            setTotalExpense((totalExpense) => totalExpense + Math.abs(am))
            setTotalBalance((totalBalance) => totalBalance + am)
        }else{
            setTotalIncome((totalIncome) => totalIncome + am)
            setTotalBalance((totalBalance) => totalBalance + am)
        }

        newTransaction.amount = Math.abs(am)
        setTransactions((transactions) => {return [newTransaction, ...transactions ]})

        localStorage.setItem("transactions", JSON.stringify([newTransaction, ...transactions ]))
    }

    const removeTransaction = (id) => {
        const newTransactions = transactions.filter((transaction) => transaction.id !== id)
        const trans = transactions.find((t) => t.id == id)
        if(trans.type === "Expense"){
            setTotalExpense((totalExpense) => totalExpense - trans.amount)
            setTotalBalance((totalBalance) => totalBalance + trans.amount)
        }else{
            setTotalIncome((totalIncome) => totalIncome - trans.amount)
            setTotalBalance((totalBalance) => totalBalance - trans.amount)
        }
        setTransactions(newTransactions)
        localStorage.setItem("transactions", JSON.stringify(newTransactions))
    }

    useEffect(() => {
        //WHEN LOADED, LOAD DATA FROM LOCAL STORAGE

        const localTransactions = localStorage.getItem("transactions")

        if(localTransactions){
            console.log(localTransactions);
            let trans = JSON.parse(localTransactions)

            let balance = 0
            let income = 0
            let expense = 0

            for(let transaction of trans){
                console.log( transaction);
                if(transaction.type === "Expense"){
                    balance -= transaction.amount
                    expense += transaction.amount
                }else{
                    balance += transaction.amount
                    income += transaction.amount
                }
            }

            setTotalBalance(balance)
            setTotalExpense(expense)
            setTotalIncome(income)

            setTransactions(trans)
        }
    }, [])

    useEffect(() => {
        //const balance = transactions.reduce((total, current) => { return current.amount + total }, 0)
        
    }, [transactions])

    return (
        <div className='main'>
            <div className='column'>
                <h1>Expense Tracking</h1>

                <section className="segment">
                    <div className='balance-segment'>
                        <div className="balance-number">
                            <h2 className="balance-segment-title">
                                Balance
                            </h2>
                            <p className='number-title'><span>$</span>{totalBalance.toFixed(2).toLocaleString()}</p>
                        </div>

                        <div className="balance-number-container">
                            <div className="balance-number-block">
                                <h3 className="balance-segment-title">
                                    Income
                                </h3>
                                <p className='number number-income'><span>$</span>{totalIncome.toFixed(2).toLocaleString()}</p>
                            </div>

                            <div className="balance-number-block">
                                <h3 className="balance-segment-title">
                                    Expense
                                </h3>
                                <p className='number number-expense'><span>$</span>{totalExpense.toFixed(2).toLocaleString()}</p>
                            </div>
                        </div>
                    </div>
                    <button className="action-button" onClick={openModal}>Add New Transaction</button>
                </section>

                <Modal addTransaction={addTransaction}/>

                <section className="segment">
                    <h2 className="balance-segment-title">
                        History
                    </h2>
                    <div className="history-segment">


                        {
                            transactions.length <= 0 ? <p className='empty'>Empty... add some transactions!</p> : 
                            transactions.map(((transaction, index) => <TransactionElement transaction={transaction} key={index} removeTransaction={removeTransaction}/>))
                        }
                        
                        
                    </div>
                </section>
            </div>

        </div>
            
  )
}

export default App
