import React, {useCallback, useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import EmployeeList from '../components/EmployeeList';
import EmployeeForm from '../components/EmployeeForm';
import {Box, Button} from '@mui/material';
import {Employee} from '../types/Employee';

const EmployeesPage: React.FC = () => {
    const {id} = useParams<{ id: string }>();
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingEmp, setEditingEmp] = useState<Employee | null>(null);

    const handleAddClick = useCallback(() => {
        setEditingEmp(null);
        setIsFormOpen(true);
    }, []);

    const handleEditClick = useCallback((employee: Employee) => {
        setEditingEmp(employee);
        setIsFormOpen(true);
    }, []);

    const handleCloseForm = useCallback(() => {
        setIsFormOpen(false);
    }, []);

    return (
        <div>
            <h1>Employees</h1>
            <Box display="flex" gap={2} mb={2}>
                <Button variant="contained" onClick={handleAddClick}>Add Employee</Button>
                <Button variant="outlined" component={Link} to="/">Back to Organizations</Button>
            </Box>
            <EmployeeList organizationId={id!} onEdit={handleEditClick}/>
            <EmployeeForm
                open={isFormOpen}
                onClose={handleCloseForm}
                initialValues={editingEmp || {id: '', name: '', position: '', organizationId: id!}}
                isEditing={!!editingEmp}
            />
        </div>
    );
};

export default EmployeesPage;
