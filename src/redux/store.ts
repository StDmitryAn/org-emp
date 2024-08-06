import { configureStore } from '@reduxjs/toolkit';
import organizationsReducer, { OrganizationsState } from './slices/organizationsSlice';
import employeesReducer, { EmployeesState } from './slices/employeesSlice';

export const store = configureStore({
    reducer: {
        organizations: organizationsReducer,
        employees: employeesReducer,
    },
});

export type RootState = {
    organizations: OrganizationsState;
    employees: EmployeesState;
};

export type AppDispatch = typeof store.dispatch;
