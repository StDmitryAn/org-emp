import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { deleteOrganization } from '../redux/slices/organizationsSlice';
import { Button, List, ListItem, ListItemText, IconButton, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

interface OrganizationListProps {
    onEdit: (organization: { id: string; name: string }) => void;
}

const OrganizationList: React.FC<OrganizationListProps> = ({ onEdit }) => {
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
                    <Box display="flex" gap={2}>
                        <Button component={Link} to={`/employees/${org.id}`}>View Employees</Button>
                        <IconButton onClick={() => onEdit(org)}><EditIcon /></IconButton>
                        <IconButton onClick={() => handleDelete(org.id)}><DeleteIcon /></IconButton>
                    </Box>
                </ListItem>
            ))}
        </List>
    );
};

export default OrganizationList;
