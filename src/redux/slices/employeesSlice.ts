import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Employee } from '../../types/Employee';
import { loadFromLocalStorage, saveToLocalStorage } from '../../utils/localStorageUtils';

export interface EmployeesState {
    employees: Employee[];
}

const initialState: EmployeesState = {
    employees: loadFromLocalStorage('employees') || [],
};

const employeesSlice = createSlice({
    name: 'employees',
    initialState,
    reducers: {
        addEmployee(state, action: PayloadAction<Employee>) {
            state.employees.push(action.payload);
            saveToLocalStorage('employees', state.employees);
        },
        editEmployee(state, action: PayloadAction<Employee>) {
            const index = state.employees.findIndex(emp => emp.id === action.payload.id);
            if (index !== -1) {
                state.employees[index] = action.payload;
                saveToLocalStorage('employees', state.employees);
            }
        },
        deleteEmployee(state, action: PayloadAction<string>) {
            state.employees = state.employees.filter(emp => emp.id !== action.payload);
            saveToLocalStorage('employees', state.employees);
        },
    },
});

export const { addEmployee, editEmployee, deleteEmployee } = employeesSlice.actions;
export default employeesSlice.reducer;
