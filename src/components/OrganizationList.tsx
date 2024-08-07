import React from 'react';
import { useTypedDispatch, useTypedSelector } from '../redux/store';
import { deleteOrganization } from '../redux/slices/organizationsSlice';
import { Button, List, ListItem, ListItemText, IconButton, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Organization } from '../types/Organization';
import { selectAllOrganizations } from '../redux/selectors/organizationsSelectors';

interface OrganizationListProps {
    onEdit: (organization: Organization) => void;
}

const OrganizationList: React.FC<OrganizationListProps> = ({ onEdit }) => {
    const organizations = useTypedSelector(selectAllOrganizations);
    const dispatch = useTypedDispatch();

    const handleDelete = (id: string) => {
        dispatch(deleteOrganization(id));
    };

    return (
        <List>
            {organizations.map(organization => (
                <ListItem key={organization.id}>
                    <ListItemText primary={organization.name} />
                    <Box display="flex" gap={2}>
                        <Button component={Link} to={`/employees/${organization.id}`}>View Employees</Button>
                        <IconButton onClick={() => onEdit(organization)}><EditIcon /></IconButton>
                        <IconButton onClick={() => handleDelete(organization.id)}><DeleteIcon /></IconButton>
                    </Box>
                </ListItem>
            ))}
        </List>
    );
};

export default OrganizationList;
