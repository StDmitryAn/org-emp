import React, { useCallback } from 'react';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { addEmployee, editEmployee } from '../redux/slices/employeesSlice';
import { Modal, Box, TextField, Button } from '@mui/material';
import { Employee } from '../types/Employee';
import { employeeValidationSchema } from '../validation/employeeValidationSchema';
import { makeStyles } from 'tss-react/mui';

interface EmployeeFormProps {
    open: boolean;
    onClose: () => void;
    initialValues: Employee;
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

const EmployeeForm: React.FC<EmployeeFormProps> = ({ open, onClose, initialValues, isEditing }) => {
    const dispatch = useDispatch();
    const { classes } = useStyles();

    const handleSubmit = useCallback((values: Employee) => {
        if (isEditing) {
            dispatch(editEmployee(values));
        } else {
            dispatch(addEmployee({ ...values, id: Date.now().toString() }));
        }
        formik.resetForm(); // Сброс формы
        onClose();
    }, [dispatch, isEditing, onClose]);

    const formik = useFormik({
        initialValues,
        enableReinitialize: true, // Позволяет перезагружать начальные значения
        validationSchema: employeeValidationSchema,
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
