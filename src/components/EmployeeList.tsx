import React from 'react';
import { useTypedDispatch, useTypedSelector } from '../redux/store';
import { deleteEmployee } from '../redux/slices/employeesSlice';
import { List, ListItem, ListItemText, IconButton, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Employee } from '../types/Employee';
import { selectEmployeesByOrganization } from '../redux/selectors/employeesSelectors';

interface EmployeeListProps {
    organizationId: string;
    onEdit: (employee: Employee) => void;
}

const EmployeeList: React.FC<EmployeeListProps> = ({ organizationId, onEdit }) => {
    const employees = useTypedSelector(state => selectEmployeesByOrganization(state, organizationId));
    const dispatch = useTypedDispatch();

    const handleDelete = (id: string) => {
        dispatch(deleteEmployee(id));
    };

    return (
        <List>
            {employees.map(employee => (
                <ListItem key={employee.id}>
                    <ListItemText primary={employee.name} secondary={employee.position} />
                    <Box display="flex" gap={2}>
                        <IconButton onClick={() => onEdit(employee)}><EditIcon /></IconButton>
                        <IconButton onClick={() => handleDelete(employee.id)}><DeleteIcon /></IconButton>
                    </Box>
                </ListItem>
            ))}
        </List>
    );
};

export default EmployeeList;
