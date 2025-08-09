import moment from 'moment';

export const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};

export const getInitials = (name) => {
    if (!name) return "";
    
    const words = name.split(" ");
    let initials = "";
    for (let i = 0; i < Math.min(words.length, 2); i++) {

        initials += words[i][0];
    }
    return initials.toUpperCase();
};


export const addThousandSeparator = (num) => {
    if (num == null || isNaN(num)) return "";

    const parts = num.toString().split(".");
    const integerPart = parts[0];
    const fractionalPart = parts[1];
    
    const formattedIntegerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return fractionalPart
        ? `${formattedIntegerPart}.${fractionalPart}`
        : formattedIntegerPart;
};

export const prepareExpenseBarChartData = (data = []) => {
    const chartData = data?.map((item) => ({
        category: item?.category,
        amount: item?.amount,
    }));
    return chartData;
};

export const prepareIncomeBarChartData = (data = []) => {
    const sortedData = [...data].sort((a, b) => new Date(a?.date) - new Date(b?.date));

    const chartData = sortedData.map((item) => ({
        month: moment(item?.date).format("Do MMM"),
        amount: item?.amount,
        source: item?.source,
    }));
    return chartData;
};

export const prepareExpenseLineChartData = (data = []) => {
    const sortedData = [...data].sort((a, b) => new Date(a.date) - new Date(b.date));

    const chartData = sortedData.map((item) => ({
        month: moment(item?.date).format("Do MMM"),
        amount: item?.amount,
        category: item?.category,
    }));
    return chartData;
};