import {RootState} from '../store';
import {Organization} from '../../types/Organization';

export const selectAllOrganizations = (state: RootState): Organization[] =>
    state.organizations.organizations;
