import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

function FormikForm() {
    // Initial values for the form fields
    const initialValues = {
        username: '',  
        email: '',
        password: '',
        confirmPassword: ''  // ← ADDED
    };

    // Validation schema using Yup
    const validationSchema = Yup.object({
        username: Yup.string()
            .min(3, 'Must be at least 3 characters')
            .max(20, 'Must be 20 characters or less')
            .required('Username is required'),

        email: Yup.string()
            .email('Invalid email address')
            .required('Email is required'),

        password: Yup.string()
            .min(8, 'Must be at least 8 characters')
            .required('Password is required'),

        confirmPassword: Yup.string()  // ← ADDED
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Confirm Password is required'),
    });

    // This runs when the form is submitted and everything is valid
    const onSubmit = (values, { setSubmitting, resetForm }) => {
        console.log('Form submitted successfully', values);
        alert('User registered successfully!');

        // Reset the form back to empty after submission
        resetForm();

        // Tell Formik that submission is done
        setSubmitting(false);
    };

    return (
        <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '5px' }}>
            <h2 style={{ textAlign: 'center' }}>User Registration</h2>

            {/* Formik wraps the entire form and handles all state and validation */}
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                {/* This function gets called by Formik and gives useful info like isSubmitting */}
                {({ isSubmitting, errors, touched }) => (
                    <Form>

                        {/* Username Field */}
                        <div style={{ marginBottom: '15px' }}>
                            <label htmlFor="username" style={{ display: 'block', marginBottom: '5px' }}>
                                Username
                            </label>
                            <Field
                                type="text"
                                name="username"
                                id="username"
                                style={{
                                    width: '100%',
                                    padding: '8px',
                                    boxSizing: 'border-box',  // ← FIXED: Added this
                                    border: errors.username && touched.username ? '1px solid red' : '1px solid #ccc',
                                    borderRadius: '4px'
                                }}
                            />

                            {/* ErrorMessage automatically shows error if there is one */}
                            <ErrorMessage 
                                name="username" 
                                component="div" 
                                style={{ color: 'red', marginTop: '5px', fontSize: '12px' }} 
                            />
                        </div>

                        {/* Email Field */}
                        <div style={{ marginBottom: '15px' }}>
                            <label htmlFor="email" style={{ display: 'block', marginBottom: '5px' }}>
                                Email
                            </label>
                            <Field
                                type="email"
                                name="email"
                                id="email"
                                style={{
                                    width: '100%',
                                    padding: '8px',
                                    boxSizing: 'border-box',  // ← FIXED: Added this
                                    border: errors.email && touched.email ? '1px solid red' : '1px solid #ccc',
                                    borderRadius: '4px'
                                }}
                            />
                            <ErrorMessage 
                                name="email" 
                                component="div" 
                                style={{ color: 'red', marginTop: '5px', fontSize: '12px' }} 
                            />
                        </div>

                        {/* Password Field */}
                        <div style={{ marginBottom: '15px' }}>
                            <label htmlFor="password" style={{ display: 'block', marginBottom: '5px' }}>
                                Password
                            </label>
                            <Field
                                type="password"
                                name="password"
                                id="password"
                                style={{
                                    width: '100%',
                                    padding: '8px',
                                    boxSizing: 'border-box',  // ← FIXED: Added this
                                    border: errors.password && touched.password ? '1px solid red' : '1px solid #ccc',
                                    borderRadius: '4px'
                                }}
                            />
                            <ErrorMessage 
                                name="password" 
                                component="div" 
                                style={{ color: 'red', marginTop: '5px', fontSize: '12px' }} 
                            />
                        </div>

                        {/* Confirm Password Field - ADDED */}
                        <div style={{ marginBottom: '15px' }}>
                            <label htmlFor="confirmPassword" style={{ display: 'block', marginBottom: '5px' }}>
                                Confirm Password
                            </label>
                            <Field
                                type="password"
                                name="confirmPassword"
                                id="confirmPassword"
                                style={{
                                    width: '100%',
                                    padding: '8px',
                                    boxSizing: 'border-box',
                                    border: errors.confirmPassword && touched.confirmPassword ? '1px solid red' : '1px solid #ccc',
                                    borderRadius: '4px'
                                }}
                            />
                            <ErrorMessage 
                                name="confirmPassword" 
                                component="div" 
                                style={{ color: 'red', marginTop: '5px', fontSize: '12px' }} 
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            style={{
                                width: '100%',
                                padding: '10px',
                                backgroundColor: '#28a745',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                                fontSize: '16px'
                            }}
                        >
                            {isSubmitting ? 'Registering...' : 'Register'}
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

export default FormikForm;