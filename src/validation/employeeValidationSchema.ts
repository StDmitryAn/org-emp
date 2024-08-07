import * as Yup from 'yup';

export const employeeValidationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    position: Yup.string().required('Position is required'),
});
