import React, { useState } from 'react';
import Input from '../Inputs/Input';
import EmojiPickerPopup from '../EmojiPickerPopup';

const AddIncomeForm = ({ onAddIncome }) => {
    const [income, setIncome] = useState({
        source: '',
        amount: '',
        date: '',
        icon: '',
    });

    const handleChange = (key, value) => {
        setIncome({
            ...income,
            [key]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Validate required fields
        if (!income.source.trim() || !income.amount || !income.date) {
            alert('Please fill in all required fields');
            return;
        }

        // Call the parent's onAddIncome with the income data
        onAddIncome({
            ...income,
            amount: Number(income.amount), // Convert amount to number
            date: new Date(income.date).toISOString() // Format date properly
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <EmojiPickerPopup
                icon={income.icon}
                onSelect={(selectedIcon) => handleChange('icon', selectedIcon)}
            />

            <Input
                value={income.source}
                onChange={(e) => handleChange('source', e.target.value)}
                placeholder='Freelance, Salary, etc.'
                label='Income Source'
                type='text'
                required
            />

            <Input
                value={income.amount}
                onChange={(e) => handleChange('amount', e.target.value)}
                placeholder=''
                label='Amount'
                type='number'
                min="0.01"
                step="0.01"
                required
            />

            <Input
                value={income.date}
                onChange={(e) => handleChange('date', e.target.value)}
                placeholder=''
                label='Date'
                type='date'
                required
            />

            <div className='flex justify-end mt-6'>
                <button
                    type='submit'
                    className='add-btn add-btn-fill'
                >
                    Add Income
                </button>
            </div>
        </form>
    );
};

export default AddIncomeForm;