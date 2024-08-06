import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import EmployeeList from '../components/EmployeeList';
import EmployeeForm from '../components/EmployeeForm';
import { Button, Box } from '@mui/material';

const EmployeesPage: React.FC = () => {
    const { organizationId } = useParams<{ organizationId: string }>();
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingEmp, setEditingEmp] = useState(null);

    const handleAddClick = () => {
        setEditingEmp(null);
        setIsFormOpen(true);
    };

    const handleCloseForm = () => {
        setIsFormOpen(false);
    };

    return (
        <div>
            <h1>Employees</h1>
            <Box display="flex" gap={2} mb={2}>
                <Button variant="contained" onClick={handleAddClick}>Add Employee</Button>
                <Button variant="outlined" component={Link} to="/">Back to Organizations</Button>
            </Box>
            <EmployeeList organizationId={organizationId!} />
            <EmployeeForm
                open={isFormOpen}
                onClose={handleCloseForm}
                initialValues={{ id: '', name: '', position: '', organizationId: organizationId! }}
                isEditing={!!editingEmp}
            />
        </div>
    );
};

export default EmployeesPage;
