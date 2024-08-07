import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { deleteEmployee } from '../redux/slices/employeesSlice';
import { List, ListItem, ListItemText, IconButton, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

interface EmployeeListProps {
    organizationId: string;
    onEdit: (employee: { id: string; name: string; position: string; organizationId: string }) => void;
}

const EmployeeList: React.FC<EmployeeListProps> = ({ organizationId, onEdit }) => {
    const employees = useSelector((state: RootState) =>
        state.employees.employees.filter(emp => emp.organizationId === organizationId)
    );
    const dispatch = useDispatch();

    const handleDelete = (id: string) => {
        dispatch(deleteEmployee(id));
    };

    return (
        <List>
            {employees.map(emp => (
                <ListItem key={emp.id}>
                    <ListItemText primary={emp.name} secondary={emp.position} />
                    <Box display="flex" gap={2}>
                        <IconButton onClick={() => onEdit(emp)}><EditIcon /></IconButton>
                        <IconButton onClick={() => handleDelete(emp.id)}><DeleteIcon /></IconButton>
                    </Box>
                </ListItem>
            ))}
        </List>
    );
};

export default EmployeeList;
