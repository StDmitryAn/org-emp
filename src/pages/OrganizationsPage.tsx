import React, {useCallback, useState} from 'react';
import OrganizationList from '../components/OrganizationList';
import OrganizationForm from '../components/OrganizationForm';
import {Button} from '@mui/material';
import {Organization} from '../types/Organization';

const OrganizationsPage: React.FC = () => {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingOrg, setEditingOrg] = useState<Organization | null>(null);

    const handleAddClick = useCallback(() => {
        setEditingOrg(null);
        setIsFormOpen(true);
    }, []);

    const handleEditClick = useCallback((organization: Organization) => {
        setEditingOrg(organization);
        setIsFormOpen(true);
    }, []);

    const handleCloseForm = useCallback(() => {
        setIsFormOpen(false);
    }, []);

    return (
        <div>
            <h1>Organizations</h1>
            <Button variant="contained" onClick={handleAddClick}>Add Organization</Button>
            <OrganizationList onEdit={handleEditClick}/>
            <OrganizationForm
                open={isFormOpen}
                onClose={handleCloseForm}
                initialValues={editingOrg || {id: '', name: ''}}
                isEditing={!!editingOrg}
            />
        </div>
    );
};

export default OrganizationsPage;
