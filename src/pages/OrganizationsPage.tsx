import React, { useState } from 'react';
import OrganizationList from '../components/OrganizationList';
import OrganizationForm from '../components/OrganizationForm';
import { Button } from '@mui/material';

const OrganizationsPage: React.FC = () => {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingOrg, setEditingOrg] = useState(null);

    const handleAddClick = () => {
        setEditingOrg(null);
        setIsFormOpen(true);
    };

    const handleCloseForm = () => {
        setIsFormOpen(false);
    };

    return (
        <div>
            <h1>Organizations</h1>
            <Button variant="contained" onClick={handleAddClick}>Add Organization</Button>
            <OrganizationList />
            <OrganizationForm
                open={isFormOpen}
                onClose={handleCloseForm}
                initialValues={{ id: '', name: '' }}
                isEditing={!!editingOrg}
            />
        </div>
    );
};

export default OrganizationsPage;
