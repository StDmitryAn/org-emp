import React, { useCallback } from 'react';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { addOrganization, editOrganization } from '../redux/slices/organizationsSlice';
import { Modal, Box, TextField, Button } from '@mui/material';
import { Organization } from '../types/Organization';
import { organizationValidationSchema } from '../validation/organizationValidationSchema';
import { makeStyles } from 'tss-react/mui';

interface OrganizationFormProps {
    open: boolean;
    onClose: () => void;
    initialValues: Organization;
    isEditing: boolean;
}

const useStyles = makeStyles()(() => ({
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        padding: '32px',
        backgroundColor: 'white',
        maxWidth: '400px',
        margin: 'auto',
    },
}));

const OrganizationForm: React.FC<OrganizationFormProps> = ({ open, onClose, initialValues, isEditing }) => {
    const dispatch = useDispatch();
    const { classes } = useStyles();

    const handleSubmit = useCallback((values: Organization) => {
        if (isEditing) {
            dispatch(editOrganization(values));
        } else {
            dispatch(addOrganization({ ...values, id: Date.now().toString() }));
        }
        formik.resetForm(); // Сброс формы
        onClose();
    }, [dispatch, isEditing, onClose]);

    const formik = useFormik({
        initialValues,
        enableReinitialize: true, // Позволяет перезагружать начальные значения
        validationSchema: organizationValidationSchema,
        onSubmit: handleSubmit,
    });

    const handleModalClose = useCallback(() => {
        formik.resetForm();
        onClose();
    }, [formik, onClose]);

    return (
        <Modal open={open} onClose={handleModalClose}>
            <Box component="form" onSubmit={formik.handleSubmit} className={classes.form}>
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
