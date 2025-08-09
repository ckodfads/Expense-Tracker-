import React from 'react';
import { LuPlus } from 'react-icons/lu';
import CustomBarChart from '../Charts/CustomBarChart';
import { prepareIncomeBarChartData } from '../../utils/helper';
import { useState, useEffect } from 'react';

const IncomeOverview = ({ transactions, onAddIncome }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const result = prepareIncomeBarChartData(transactions);
    console.log('Prepared Income Chart Data:', result); // Debug dữ liệu
    setChartData(result);
    return () => {};
  }, [transactions]);

  return (
    <div className='card'>
      <div className='flex items-center justify-between mb-4'>
        <div>
          <h5 className='text-lg'>Income Overview</h5>
          <p className='text-xs text-gray-400 mt-1'>
            Track your earnings over time and analyze your income sources.
          </p>
        </div>
        <button
          className='add-btn bg-purple-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-purple-600'
          onClick={onAddIncome}
        >
          <LuPlus className='text-lg' />
          Add Income
        </button>
      </div>
      <div className='mt-6'>
        <CustomBarChart data={chartData} xAxisKey="month" />
      </div>
    </div>
  );
};

export default IncomeOverview;