export const BASE_URL = "http://localhost:8000";

//utils/apiPaths.js
export const API_PATHS = {
    AUTH: {
        LOGIN: "/api/v1/auth/login",
        REGISTER: "/api/v1/auth/register",
        GET_USER_INFO: "/api/v1/auth/getUser",
    },
    INCOME: {
        GET_ALL_INCOME: "/api/v1/income/get",
        ADD_INCOME: "/api/v1/income/add",
        DELETE_INCOME: (id) => `/api/v1/income/delete/${id}`,
        DOWNLOAD_INCOME: "/api/v1/income/downloadexcel",
    },
    EXPENSE: {
        GET_EXPENSE: "/api/v1/expense/get",
        ADD_EXPENSE: "/api/v1/expense/add",
        DELETE_EXPENSE: (expenseId) => `/api/v1/expense/delete/${expenseId}`,
        DOWNLOAD_EXPENSE: "/api/v1/expense/downloadexcel",
    },
    DASHBOARD: {
        GET_DATA: "/api/v1/dashboard",
    },

    IMAGE: {
        UPLOAD_IMAGE: "/api/v1/auth/upload-image",
    },
};