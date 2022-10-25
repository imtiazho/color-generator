import React, { useEffect, useState } from 'react';
import { useSignInWithEmailAndPassword, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import auth from '../../Firebase.init';
import './Login.css'
import toast from 'react-hot-toast';

const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const [signInWithGoogle, userFromGoogle, loadingFromGoogle, errorFromGoogle] = useSignInWithGoogle(auth);

    const [
        signInWithEmailAndPassword,
        user,
        loading,
        hookError,
    ] = useSignInWithEmailAndPassword(auth);

    const [userInfo, steUserInfo] = useState({
        email: "",
        password: "",
    });

    const [errors, setErrors] = useState({
        emailError: "",
        passwordError: "",
        generalError: "",
    })

    const emailOnBlur = e => {
        const emailRegEx = /\S+@\S+\.\S+/;
        const validEmail = emailRegEx.test(e.target.value)
        if (validEmail) {
            steUserInfo({ ...userInfo, email: e.target.value });
            setErrors({ ...errors, emailError: "" });
        }
        else {
            setErrors({ ...errors, emailError: "Invalid Email" });
            steUserInfo({ ...userInfo, email: "" });
        }
    }

    const passwordOnBlur = e => {
        const passwordRegex = /^[a-zA-Z0-9!@#$%^&*]{6,16}$/;
        const validPassword = passwordRegex.test(e.target.value);
        if (validPassword) {
            steUserInfo({ ...userInfo, password: e.target.value });
            setErrors({ ...errors, passwordError: "" });
        }
        else {
            setErrors({ ...errors, passwordError: "Wrong Password" });
            steUserInfo({ ...userInfo, password: "" });
        }
    }

    const handleLogin = (e) => {
        e.preventDefault()
        signInWithEmailAndPassword(userInfo.email, userInfo.password)
    }

    useEffect(() => {
        if (user || userFromGoogle) {
            toast.success('Successfully login!');
            navigate(from, { replace: true });
        }
    }, [user, userFromGoogle])

    useEffect(() => {
        const dbError = hookError || errorFromGoogle;
        if (dbError) {
            switch (dbError?.message) {
                case "auth/invalid-email":
                    toast.error("Invalid Email.");
                    break;
                case "auth/invalid-password":
                    toast.error("Wrong password.")
                    break;
                default:
                    toast.error("Something wrong. Try again.")
            }
        }
    }, [hookError, errorFromGoogle])
    return (
        <div className="login-container">
            <div className="login-title">LOGIN</div>
            <form className="login-form" onSubmit={handleLogin}>
                <input onBlur={emailOnBlur} type="text" placeholder="Your Email" />
                {errors.emailError && <p className='error-message'>{errors.emailError}</p>}

                <input onBlur={passwordOnBlur} type="password" placeholder="password" />
                {errors.passwordError && <p className='error-message'>{errors.passwordError}</p>}

                <button type='submit'>Login</button>



                <p>Don't have an account? <Link to="/signup">Sign up</Link> </p>
            </form>

            <button onClick={() => signInWithGoogle()}>Google</button>
        </div>
    );
};

export default Login;