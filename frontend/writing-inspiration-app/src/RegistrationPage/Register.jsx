import { useState } from 'react'
import reactLogo from '../assets/react.svg'
import viteLogo from '/vite.svg'
//import './App.css'
import './Register.jsx'
import './Register.css'
import '../LoginPage/LoginPage.jsx'
// import '../../vite.config.js'
import supabase from '../config/supabaseClient.js';import { registerUser } from '../services/api';

import { authService } from '../auth/authService.js';

function Register() {
    //All fields here are required to be entered.
    /*

        -   The React frontend sends a POST request to the backend API route /api/users-appone/register to create a new user.
        -   The backend processes this request, interacts with the database, and returns a response.
        -   The frontend handles the response accordingly
    
    */
    
    // Testing
    // console.log(supabase);
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

    const registerUser = async ({email, password, username, firstName, lastName}) => {
        
        try {
            // Access the database server

            const {data: authData, error: authError} = await supabase.auth.signUp({
                email, 
                password, 
            });

            if (authError) throw authError;

            const userId = authData.user.id; // supabase-generated UUID 
            
            const {error: registerError} = await supabase.from('users').insert([
                {
                    id: userId,
                    username,
                    first_name: firstName,
                    last_name: lastName,
                    email,
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString(),
                },
            ]);

            if (registerError) {
                throw registerError;
            }
        
            console.log('User registered successfully', data);
            return {success: true, userId}
        } catch (error) {
            //unsuccessful registration
            console.error('Registration Failed:', error);
            return {success: false, error};
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

        // let error = '';

        // // value is the information user inputs
        // // value is passed into each function for validation check.
        // // if value does not pass requirements, an error message is shown.

        // switch (name) {
        //     case 'firstName':
        //         if (!validateFirstName(value)) error = 'Please enter your first name.';
        //         break;
        //     case 'lastName':
        //         if (!validateLastName(value)) error = 'Please enter your last name.';
        //         break;
        //     case 'username':
        //         if (!validateUsername(value)) {
        //             error = 'Username must be at least 3 characters long and contain letters.';
        //         }
        //         break;
        //     case 'email':
        //         if (!validateEmail(value)) error = 'Please enter a valid email address.';
        //         break;
        //     case 'password':
        //         if (!validatePassword(value)) {
        //             error = 'Password must be at least 8 characters long and include uppercase, lowercase, number, and symbol.';
        //         }
        //         break;
        //     default:
        //         break;
        // }
        // setErrors((prevErrors) => ({ ...prevErrors, [name]: error}));
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
            newErrors.firstName = 'Required.';
        }

        if (!validateLastName(formData.lastName)) {
            newErrors.lastName = 'Required.';
        }

        if (!validateUsername(formData.username)) {
            newErrors.username = 'Minimum At Least 3 characters.';
        }

        if (!validatePassword(formData.password)) {
            newErrors.password = 'Password must be at least 8 characters long and include uppercase, lowercase, number, and symbol.';
        }

        if (!validateEmail(formData.email)) {
            newErrors.email = 'Invalid Email.';
        }
           
        setErrors(newErrors);
        setTouched({
            firstName: true,
            lastName: true,
            username: true,
            password: true,
            email: true,
        })
        
        if (Object.keys(newErrors).length === 0) {
            
            const result = await registerUser(formData);

            if (result.success) {
                alert('Account created! Please Login.');
                window.location.href = '/login';
            } else {
                console.error('Registration failed: ', result.error);
                alert('ERROR: Registration failed!')
            }

            // //reset form data
            // setFormData({
            //     firstName: '',
            //     lastName: '',
            //     username: '',
            //     password: '',
            //     email: '',
            // });

            // //reset whether it was touched by the mouse.
            // setTouched({
            //     firstName: false,
            //     lastName: false,
            //     username: false,
            //     password: false,
            //     email: false,
            // });

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