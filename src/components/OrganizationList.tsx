import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { deleteOrganization } from '../redux/slices/organizationsSlice';
import { Button, List, ListItem, ListItemText, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';

const OrganizationList: React.FC = () => {
    const organizations = useSelector((state: RootState) => state.organizations.organizations);
    const dispatch = useDispatch();

    const handleDelete = (id: string) => {
        dispatch(deleteOrganization(id));
    };

    return (
        <List>
            {organizations.map(org => (
                <ListItem key={org.id}>
                    <ListItemText primary={org.name} />
                    <Button component={Link} to={`/employees/${org.id}`}>View Employees</Button>
                    <IconButton onClick={() => handleDelete(org.id)}><DeleteIcon /></IconButton>
                </ListItem>
            ))}
        </List>
    );
};

export default OrganizationList;
