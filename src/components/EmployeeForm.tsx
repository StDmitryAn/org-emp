import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { addEmployee, editEmployee } from '../redux/slices/employeesSlice';
import { Modal, Box, TextField, Button } from '@mui/material';

interface EmployeeFormProps {
    open: boolean;
    onClose: () => void;
    initialValues: { id: string; name: string; position: string; organizationId: string };
    isEditing: boolean;
}

const EmployeeForm: React.FC<EmployeeFormProps> = ({ open, onClose, initialValues, isEditing }) => {
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues,
        enableReinitialize: true,
        validationSchema: Yup.object({
            name: Yup.string().required('Name is required'),
            position: Yup.string().required('Position is required'),
        }),
        onSubmit: (values) => {
            if (isEditing) {
                dispatch(editEmployee(values));
            } else {
                dispatch(addEmployee({ ...values, id: Date.now().toString() }));
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
                    label="Employee Name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
                />
                <TextField
                    fullWidth
                    id="position"
                    name="position"
                    label="Position"
                    value={formik.values.position}
                    onChange={formik.handleChange}
                    error={formik.touched.position && Boolean(formik.errors.position)}
                    helperText={formik.touched.position && formik.errors.position}
                />
                <Button color="primary" variant="contained" fullWidth type="submit">
                    {isEditing ? 'Edit Employee' : 'Add Employee'}
                </Button>
            </Box>
        </Modal>
    );
};

export default EmployeeForm;
