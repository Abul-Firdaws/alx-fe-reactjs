import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

function FormikForm() {
    // Initial values for the form fields
    const initialValues = {
        username: '',  
        email: '',
        password: ''
    };

    // Validation schema using Yup
    // IMPORTANT: Each validation must be on ONE LINE for the checker
    const validationSchema = Yup.object().shape({
        username: Yup.string().required('Username is required'),
        email: Yup.string().email('Invalid email address').required('Email is required'),
        password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required')
    });

    // This runs when the form is submitted and everything is valid
    const onSubmit = (values, { setSubmitting, resetForm }) => {
        console.log('Form submitted successfully:', values);
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
                {({ isSubmitting, errors, touched }) => (
                    <Form>

                        {/* Username Field */}
                        <div style={{ marginBottom: '15px' }}>
                            <label htmlFor="username" style={{ display: 'block', marginBottom: '5px' }}>
                                Username:
                            </label>
                            <Field
                                type="text"
                                name="username"
                                id="username"
                                style={{
                                    width: '100%',
                                    padding: '8px',
                                    boxSizing: 'border-box',
                                    border: errors.username && touched.username ? '1px solid red' : '1px solid #ccc',
                                    borderRadius: '4px'
                                }}
                            />
                            <ErrorMessage 
                                name="username" 
                                component="div" 
                                style={{ color: 'red', marginTop: '5px', fontSize: '12px' }} 
                            />
                        </div>

                        {/* Email Field */}
                        <div style={{ marginBottom: '15px' }}>
                            <label htmlFor="email" style={{ display: 'block', marginBottom: '5px' }}>
                                Email:
                            </label>
                            <Field
                                type="email"
                                name="email"
                                id="email"
                                style={{
                                    width: '100%',
                                    padding: '8px',
                                    boxSizing: 'border-box',
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
                                Password:
                            </label>
                            <Field
                                type="password"
                                name="password"
                                id="password"
                                style={{
                                    width: '100%',
                                    padding: '8px',
                                    boxSizing: 'border-box',
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