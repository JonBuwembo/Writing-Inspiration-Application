import { useState } from 'react'
import reactLogo from '../assets/react.svg'
import viteLogo from '/vite.svg'
//import './App.css'
import './Register.jsx'
import './Register.css'
import '../LoginPage/LoginPage.jsx'
// import '../../vite.config.js'

import { registerUser } from '../services/api';


function Register() {
    //All fields here are required to be entered.
    /*

        -   The React frontend sends a POST request to the backend API route /api/users-appone/register to create a new user.
        -   The backend processes this request, interacts with the database, and returns a response.
        -   The frontend handles the response accordingly
    
    */

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        username:'',
        password: '',
        email: '',
    });

    const [touched, setTouched] = useState({
        firstName: false,
        lastName: false,
        username: false,
        password: false,
        email: false,
    })

    // state for form errors
    const [errors, setErrors] = useState({});


    // const [firstName, setFirstName] = useState({ value: "", isTouched: false });
    // const [lastName, setLastName] = useState({ value: "", isTouched: false });
    // const [password, setPassword] = useState({ value: "", isTouched: false });
    // const [username, setUsername] = useState({ value: "", isTouched: false });
    // const [email, setEmail] = useState({ value: "", isTouched: false });

    // const [isValidEmail, setIsValidEmail] = useState(false);
    // const [isValidPassword, setIsValidPassword] = useState(false);
    // const [isValidUsername, setIsValidUsername] = useState(false);

 

    const validateFirstName = (name) => name.trim() !== '';
    const validateLastName = (name) => name.trim() !== '';

    const registerUser = async (userData) => {

        try {
            // Access the database server
            const response = await fetch('/api/users-appone/register', {
                //"Add" a user to the database after registration.
                // Send data payload to backend for processing
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            if (!response.ok) {
                throw new Error('Issue with connecting to backend');
            }

            // wait for data to be translated to json for processing
            const data = await response.json();
            console.log('User registered successfully', data);

        } catch (error) {
            //unsuccessful registration
            console.error('Registration Failed:', error);
        }
    };

    const validatePassword = (password) => {
        const minimumLength = 8;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumbers = /[0-9]/.test(password);
        const hasSymbols = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);

        // Check if all conditions are true
        const isValid = password.length >= minimumLength && hasUpperCase && hasLowerCase && hasNumbers && hasSymbols;
        return isValid;
    }

    const validateEmail = (email) => {

        const isValid =  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        // const isValid = String(email)
        //     .toLowerCase()
        //     .match(
        //         // check if email matches regular expression
        //         /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        //     )

        // updates the state variable for email validation
        return isValid;
    }

    const validateUsername = (username) => {
        // a username can contain number, symbols, and letters.
        // it just needs to have a minimum length of 3 characters and contain letters.
        const minimumLength = 3;
        const hasLetters = /[a-zA-Z]/.test(username);

        const isValid = username.length >= minimumLength && hasLetters;
        return isValid;
    }


    // const clearForm = () => {
    //     setFirstName({ value: "", isTouched: false });
    //     setLastName({ value: "", isTouched: false });
    //     setPassword({ value: "", isTouched: false });
    //     setUsername({ value: "", isTouched: false });
    //     setEmail({ value: "", isTouched: false });
    // };

    const handleChange = (event) => {
        const {name, value} = event.target;

        // Form data is dynamically updated here. This data will be stored in database.
        setFormData((prevData) => ({...prevData, [name]: value}));

        let error = '';

        // value is the information user inputs
        // value is passed into each function for validation check.
        // if value does not pass requirements, an error message is shown.

        switch (name) {
            case 'firstName':
                if (!validateFirstName(value)) error = 'Please enter your first name.';
                break;
            case 'lastName':
                if (!validateLastName(value)) error = 'Please enter your last name.';
                break;
            case 'username':
                if (!validateUsername(value)) {
                    error = 'Username must be at least 3 characters long and contain letters.';
                }
                break;
            case 'email':
                if (!validateEmail(value)) error = 'Please enter a valid email address.';
                break;
            case 'password':
                if (!validatePassword(value)) {
                    error = 'Password must be at least 8 characters long and include uppercase, lowercase, number, and symbol.';
                }
                break;
            default:
                break;
        }
        setErrors((prevErrors) => ({ ...prevErrors, [name]: error}));
    }

    // Handle Input Blur
    const handleBlur = (event) => {
        const { name } = event.target;
        setTouched((prevTouched) => ({ ...prevTouched, [name]: true}));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        //check for new errors upon submission
        const newErrors = {};

        // Key, Value Pairs: [field, error] are assigned if validation does not pass.
        // keys: firstName, lastName, username ...
        // values: Error messages.
        // Essentially, newErrors is an object containing a list of these pairs.

        if (!validateFirstName(formData.firstName)) {
            newErrors.firstName = 'Please enter your first name.';
        }

        if (!validateLastName(formData.lastName)) {
            newErrors.lastName = 'Please enter your last name.';
        }

        if (!validateUsername(formData.username)) {
            newErrors.username = 'Username must be at least 3 characters long and contain letters.';
        }

        if (!validatePassword(formData.password)) {
            newErrors.password = 'Password must be at least 8 characters long and include uppercase, lowercase, number, and symbol.';
        }

        if (!validateEmail(formData.email)) {
            newErrors.email = 'Please enter a valid email address.';
        }
           
        setErrors(newErrors);
        setTouched({
            firstName: true,
            lastName: true,
            username: true,
            password: true,
            email: true,
        })
        
        if(Object.keys(newErrors).length === 0){
            try {
                await registerUser(formData);

                alert('Account has been created');

                //reset form data
                setFormData({
                    firstName: '',
                    lastName: '',
                    username: '',
                    password: '',
                    email: '',
                });

                //reset whether it was touched by the mouse.
                setTouched({
                    firstName: false,
                    lastName: false,
                    username: false,
                    password: false,
                    email: false,
                });
            } catch (error) {
                console.error('Registration Failed:', error);
                alert('Registration failed. Please try again.');
            }
        } else {
            alert('Please complete all required fields correctly!');
        }
            
    
    };

    return (

        <div className='registration'>
            <form onSubmit={handleSubmit} noValidate>
                <fieldset>
                    <h1> IdeaFind </h1>
                    <h2> Sign up to see the latest uploads of what creators have been working on! </h2>

                    <div className="field" style={{ position: 'relative', height: '80px' }}>

                        <input id="firstName" maxLength={120} name="firstName" value={formData.firstName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="Firstname" />
                        {touched.firstName && errors.firstName && (<p className="error-style">{errors.firstName} </p>)}
                    </div>

                    <div className="field" maxLength={120} style={{ position: 'relative', height: '80px' }}>

                        <input id="lastName" name="lastName" value={formData.lastName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder='Lastname' />
                        {touched.lastName && errors.lastName && (<p className="error-style">{errors.lastName}</p>)}
                    </div>

                    <div className="field" maxLength={20} style={{ position: 'relative', height: '80px' }}>

                        <input id="username" name="username" value={formData.username}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder='Username' />
                        {touched.username && errors.username && (<p className="error-style"> {errors.username}</p>)}
                    </div>

                    <div className="field" style={{ position: 'relative', height: '80px' }}>

                        <input id="password" maxLength={255} name="password" value={formData.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder='Password' />

                        {touched.password && errors.password && (
                            <p className='error-style'>
                               {errors.password}
                            </p>
                        )}

                    </div>

                    <div className='field' style={{ position: 'relative', height: '80px' }}>

                        <input id="email" maxLength={350} name="email" value={formData.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder='Email' />
                        {touched.email && errors.email && (<p className='error-style'>{errors.email}</p>)}
                    </div>


                </fieldset>
                <button type="submit"> Register</button>

                <p className='sign-up-instead'>

                    Already have an account? <a className='sign-up-instead' href="/login"> Sign Up </a>

                </p>




            </form>


        </div>

    )
}

export default Register