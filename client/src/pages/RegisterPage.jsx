import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Register.scss';

const RegisterPage = () => {
    const [inputs, setInputs] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: ""
    });
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("http://localhost:3001/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(inputs),
            });
            const data = await res.json();
            if (data.error) {
                console.log("Error:", data.error);
                return;
            }
            navigate("/login");
        } catch (error) {
            console.error("Registration failed:", error);
        }
    };

    const [passwordMatch, setPasswordMatch] = useState(true);
    useEffect(() => {
        setPasswordMatch(
            inputs.password === inputs.confirmPassword ||
            inputs.confirmPassword === ""
        );
    }, [inputs.password, inputs.confirmPassword]);

    return (
        <div className='register'>
            <div className='register_content'>
                <form className='register_content_form' onSubmit={handleSignup}>
                    <input
                        type="text"
                        placeholder='First Name'
                        name='firstName'
                        value={inputs.firstName}
                        onChange={(e) => setInputs({ ...inputs, firstName: e.target.value })}
                        required
                    />
                    <input
                        type="text"
                        placeholder='Last Name'
                        name='lastName'
                        value={inputs.lastName}
                        onChange={(e) => setInputs({ ...inputs, lastName: e.target.value })}
                        required
                    />
                    <input
                        type="email"
                        placeholder='Email'
                        name='email'
                        value={inputs.email}
                        onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
                        required
                    />
                    <input
                        type="password"
                        placeholder='Password'
                        name='password'
                        value={inputs.password}
                        onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
                        required
                    />
                    <input
                        type="password"
                        placeholder='Confirm Password'
                        name='confirmPassword'
                        value={inputs.confirmPassword}
                        onChange={(e) => setInputs({ ...inputs, confirmPassword: e.target.value })}
                        required
                    />
                    {!passwordMatch && (
                        <p style={{ color: 'red' }}>Passwords do not match!</p>
                    )}
                    <button type="submit">Register</button>
                </form>
                <a href='/login'>Already have an account? Login Here!</a>
            </div>
        </div>
    );
}

export default RegisterPage;
