import { useState } from 'react';

function RegistrationForm() {
    //Form state to keep what user types
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    
    //Error handling state
    const [errors, setErrors] = useState({});

    //Form submission handler which runs when user clicks submit button
    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = {}; //Temporary object to stop page from refreshing

        //Validation checks
        if (!username) {
            newErrors.username = 'Username is required';    
        }
        if (!email) {
            newErrors.email = 'Email is required';
        }
        if (!password) {
            newErrors.password = 'Password is required';
        }
        if (!confirmPassword) {
            newErrors.confirmPassword = 'Confirm Password is required';
        }
        if (password && confirmPassword && password !== confirmPassword) {
            newErrors.confirmPassword = 'Passwords must match';
        }

        //Incase there are any errors, show them to user and stop submission
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        //If no errors, clear previous errors and proceed with form submission logic
        setErrors({});
        console.log('Form submitted successfully:', { username, email, password, confirmPassword });
        alert('User registered successfully!');

        //Reset form fields
        setUsername('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
    };

    return (
        <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px', border: '1px solid #ccc', borderRadius: '5px' }}>
            <h2 style={{ textAlign: 'center' }}>Registration Form</h2>
            <form onSubmit={handleSubmit}>

                {/* Username Field */}
                <div style={{ marginBottom: '15px' }}>
                    <label htmlFor="username" style={{ display: 'block', marginBottom: '5px' }}>
                        Username:
                    </label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
                    />
                    {errors.username && <span style={{ color: 'red', fontSize: '12px' }}>{errors.username}</span>}
                </div>

                {/* Email Field */}
                <div style={{ marginBottom: '15px' }}>
                    <label htmlFor="email" style={{ display: 'block', marginBottom: '5px' }}>
                        Email:
                    </label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
                    />
                    {errors.email && <span style={{ color: 'red', fontSize: '12px' }}>{errors.email}</span>}
                </div>

                {/* Password Field */}
                <div style={{ marginBottom: '15px' }}>
                    <label htmlFor="password" style={{ display: 'block', marginBottom: '5px' }}>
                        Password:
                    </label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
                    />
                    {errors.password && <span style={{ color: 'red', fontSize: '12px' }}>{errors.password}</span>}
                </div>

                {/* Confirm Password Field */}
                <div style={{ marginBottom: '15px' }}>
                    <label htmlFor="confirmPassword" style={{ display: 'block', marginBottom: '5px' }}>
                        Confirm Password:
                    </label>
                    <input
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
                    />
                    {errors.confirmPassword && <span style={{ color: 'red', fontSize: '12px' }}>{errors.confirmPassword}</span>}
                </div>

                {/* Submit Button - UPDATED TO MATCH VERSION 2 */}
                <button 
                    type="submit" 
                    style={{ 
                        width: '100%',
                        padding: '10px',
                        backgroundColor: '#28a745',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '16px'
                    }}
                >
                    Register
                </button>
            </form>
        </div>
    );
}

export default RegistrationForm;