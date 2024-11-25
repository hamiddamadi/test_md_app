// Following code has been commented with appropriate comments for your reference.
import React, { useState } from 'react';
import './Sign_Up.css'
import { Link, useNavigate } from 'react-router-dom';
import { API_URL } from '../../config';

// Function component for Sign Up form
const Sign_Up = () => {
    // State variables using useState hook
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [showerr, setShowerr] = useState({}); // State to show error messages
    const navigate = useNavigate(); // Navigation hook from react-router

    // Function to handle form submission
    const register = async (e) => {
        e.preventDefault(); // Prevent default form submission

        // API Call to register user
        const response = await fetch(`${API_URL}/api/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: name,
                email: email,
                password: password,
                phone: phone,
            }),
        });

        const json = await response.json(); // Parse the response JSON

        if (json.authtoken) {
            // Store user data in session storage
            sessionStorage.setItem("auth-token", json.authtoken);
            sessionStorage.setItem("name", name);
            sessionStorage.setItem("phone", phone);
            sessionStorage.setItem("email", email);

            // Redirect user to home page
            navigate("/");
            window.location.reload(); // Refresh the page
        } else {
            console.log(json)
            if (json.errors) {
                for (const error of json.errors) {
                    setShowerr(error.msg); // Show error messages
                }
            } else {
                if (json.error[0].param === 'phone') {
                    setShowerr({ param: 'phone', msg: json.error[0].msg });
                }
            }
        }
    };

    // JSX to render the Sign Up form
    return (
        <div className="container" style={{ marginTop: '5%' }}>
            <div className="signup-grid">
                <div className="signup-form">
                    <form method="POST" onSubmit={register}>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" name="email" id="email" className="form-control" placeholder="Enter your email" aria-describedby="helpId" />
                            {showerr && showerr.param === 'email' && <div className="err" style={{ color: 'red' }}>{showerr.msg}</div>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="text">Name</label>
                            <input value={name} onChange={(e) => setName(e.target.value)} type="text" name="name" id="name" className="form-control" placeholder="Enter your name" aria-describedby="helpId" />
                            {showerr && showerr.param === 'name' && <div className="err" style={{ color: 'red' }}>{showerr.msg}</div>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="number">Phone</label>
                            <input value={phone} onChange={(e) => setPhone(e.target.value)} type="phone" name="phone" id="phone" className="form-control" placeholder="Enter your phone" aria-describedby="helpId" />
                            {showerr && showerr.param === 'phone' && <div className="err" style={{ color: 'red' }}>{showerr.msg}</div>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" name="password" id="password" className="form-control" placeholder="Enter your password" aria-describedby="helpId" />
                            {showerr && showerr.param === 'password' && <div className="err" style={{ color: 'red' }}>{showerr.msg}</div>}
                        </div>
                        <div className="btn-group">
                            {/* Login button */}
                            <button type="submit" className="btn btn-primary mb-2 mr-1 waves-effect waves-light">
                                Register
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Sign_Up; // Export the Sign_Up component for use in other components