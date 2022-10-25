import React, { useEffect, useState } from 'react';
import { useCreateUserWithEmailAndPassword, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { Link, useNavigate } from 'react-router-dom';
import auth from '../../Firebase.init';
import toast from 'react-hot-toast';

const Register = () => {
    const navigate = useNavigate();
    const [showPass, setShowPass] = useState(false);
    const [signInWithGoogle, userFromGoogle, loadingFromGoogle, errorFromGoogle] = useSignInWithGoogle(auth);

    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        hookError,
    ] = useCreateUserWithEmailAndPassword(auth);

    const [userInfo, steUserInfo] = useState({
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [errors, setErrors] = useState({
        emailError: "",
        passwordError: "",
        confirmPasswordError: "",
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
        const passwordRegex = /.{6,}/;
        const validPassword = passwordRegex.test(e.target.value);
        if (validPassword) {
            steUserInfo({ ...userInfo, password: e.target.value });
            setErrors({ ...errors, passwordError: "" });
        }
        else {
            setErrors({ ...errors, passwordError: "Password ust be in 6 character." });
            steUserInfo({ ...userInfo, password: "" });
        }
    }

    const confirmPasswordOnBlur = e => {
        if (e.target.value === userInfo.password) {
            steUserInfo({ ...userInfo, confirmPassword: e.target.value });
            setErrors({ ...errors, confirmPasswordError: "" });
        }

        else {
            setErrors({ ...errors, confirmPasswordError: "Password Mismatch" });
            steUserInfo({ ...userInfo, confirmPasswordError: "" });
        }
    }

    const handleRegister = (e) => {
        e.preventDefault()
        createUserWithEmailAndPassword(userInfo.email, userInfo.password);
    }

    useEffect(() => {
        if (user || userFromGoogle) {
            toast.success('Successfully Signup!');
            navigate('/')
        }
    }, [user, userFromGoogle]);

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
            <div className="login-title">Sign up</div>
            <form className="login-form" onSubmit={handleRegister}>
                <input onBlur={emailOnBlur} type="text" placeholder="Your Email" />
                {errors.emailError && <p className='error-message'>{errors.emailError}</p>}

                <div className="relative">
                    <input onBlur={passwordOnBlur} type={showPass ? "text" : "password"} placeholder="password" />
                    <p className="absolute top-3 right-5" onClick={() => setShowPass(!showPass)}>🔥</p>
                </div>
                {errors.passwordError && <p className='error-message'>{errors.passwordError}</p>}

                <input onBlur={confirmPasswordOnBlur} type="password" placeholder="confirm password" />
                {errors.confirmPasswordError && <p className='error-message'>{errors.confirmPasswordError}</p>}

                <button type='submit'>Sign up</button>

                <p>Already have an account? <Link to="/login">Sign up</Link> </p>
            </form>
            <button onClick={() => signInWithGoogle()}>Google</button>
        </div>
    );
};

export default Register;