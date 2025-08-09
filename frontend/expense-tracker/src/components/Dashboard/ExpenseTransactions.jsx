import React, { useEffect } from 'react'
import { LuArrowRight } from 'react-icons/lu'
import moment from 'moment'
import TransactionsInfoCard from '../Cards/TransactionsInfoCard'

const ExpenseTransactions = ({ transactions, onSeeMore }) => {
  // Log props when component mounts or updates
  useEffect(() => {
    console.log('ExpenseTransactions - Received transactions:', transactions);
    console.log('ExpenseTransactions - First transaction details:', transactions?.[0]);
  }, [transactions]);

  // Log when mapping through transactions
  if (transactions?.length > 0) {
    console.log('ExpenseTransactions - Mapping through transactions:', transactions);
  } else {
    console.log('ExpenseTransactions - No transactions data received or empty array');
  }

  return (
    <div className='card'>
        <div className='flex items-center justify-between'>
            <h5 className='text-lg'>Expanses</h5>
            <button className='card-btn' onClick={onSeeMore}>
                See All<LuArrowRight className='text-base'/>
            </button>
        </div>

        <div className='mt-6'>
            {transactions?.length > 0 ? (
                transactions.slice(0, 5).map((expense) => {
                    console.log('Rendering expense:', expense);
                    return (
                        <TransactionsInfoCard
                            key={expense._id}
                            title={expense.category}
                            icon={expense.icon}
                            date={moment(expense.date).format('DD/MM/YYYY')}
                            amount={expense.amount}
                            type="expense"
                            hideDeleteBtn
                        />
                    );
                })
            ) : (
                <div className="text-center py-4 text-gray-500">
                    No expense transactions available
                </div>
            )}
        </div>
    </div>
  );
};

export default ExpenseTransactions;