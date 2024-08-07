import * as Yup from 'yup';

export const organizationValidationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
});
