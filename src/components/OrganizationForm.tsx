import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { addOrganization, editOrganization } from '../redux/slices/organizationsSlice';
import { Modal, Box, TextField, Button } from '@mui/material';

interface OrganizationFormProps {
    open: boolean;
    onClose: () => void;
    initialValues: { id: string; name: string; };
    isEditing: boolean;
}

const OrganizationForm: React.FC<OrganizationFormProps> = ({ open, onClose, initialValues, isEditing }) => {
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues,
        enableReinitialize: true,
        validationSchema: Yup.object({
            name: Yup.string().required('Name is required'),
        }),
        onSubmit: (values) => {
            if (isEditing) {
                dispatch(editOrganization(values));
            } else {
                dispatch(addOrganization({ ...values, id: Date.now().toString() }));
            }
            formik.resetForm();
            onClose();
        },
    });

    return (
        <Modal open={open} onClose={() => { formik.resetForm(); onClose(); }}>
            <Box component="form" onSubmit={formik.handleSubmit} sx={{ p: 4, bgcolor: 'background.paper', margin: 'auto', maxWidth: 400, display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField
                    fullWidth
                    id="name"
                    name="name"
                    label="Organization Name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
                />
                <Button color="primary" variant="contained" fullWidth type="submit">
                    {isEditing ? 'Edit Organization' : 'Add Organization'}
                </Button>
            </Box>
        </Modal>
    );
};

export default OrganizationForm;
