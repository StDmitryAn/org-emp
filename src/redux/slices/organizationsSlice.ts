import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Organization } from '../../types/Organization';
import { loadFromLocalStorage, saveToLocalStorage } from '../../utils/localStorageUtils';

export interface OrganizationsState {
    organizations: Organization[];
}

const initialState: OrganizationsState = {
    organizations: loadFromLocalStorage('organizations') || [],
};

const organizationsSlice = createSlice({
    name: 'organizations',
    initialState,
    reducers: {
        addOrganization(state, action: PayloadAction<Organization>) {
            state.organizations.push(action.payload);
            saveToLocalStorage('organizations', state.organizations);
        },
        editOrganization(state, action: PayloadAction<Organization>) {
            const index = state.organizations.findIndex(org => org.id === action.payload.id);
            if (index !== -1) {
                state.organizations[index] = action.payload;
                saveToLocalStorage('organizations', state.organizations);
            }
        },
        deleteOrganization(state, action: PayloadAction<string>) {
            state.organizations = state.organizations.filter(org => org.id !== action.payload);
            saveToLocalStorage('organizations', state.organizations);
        },
    },
});

export const { addOrganization, editOrganization, deleteOrganization } = organizationsSlice.actions;
export default organizationsSlice.reducer;
