import { configureStore } from '@reduxjs/toolkit';
import organizationsReducer from './slices/organizationsSlice';
import employeesReducer from './slices/employeesSlice';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';

export const store = configureStore({
    reducer: {
        organizations: organizationsReducer,
        employees: employeesReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useTypedDispatch = () => useDispatch<AppDispatch>();
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
