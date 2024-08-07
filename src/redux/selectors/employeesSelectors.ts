import {RootState} from '../store';
import {Employee} from '../../types/Employee';

export const selectEmployeesByOrganization = (state: RootState, organizationId: string): Employee[] =>
    state.employees.employees.filter(emp => emp.organizationId === organizationId);
