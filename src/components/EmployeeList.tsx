import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { deleteEmployee } from '../redux/slices/employeesSlice';
import { List, ListItem, ListItemText, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

interface EmployeeListProps {
    organizationId: string;
}

const EmployeeList: React.FC<EmployeeListProps> = ({ organizationId }) => {
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
                    <IconButton onClick={() => handleDelete(emp.id)}><DeleteIcon /></IconButton>
                </ListItem>
            ))}
        </List>
    );
};

export default EmployeeList;
