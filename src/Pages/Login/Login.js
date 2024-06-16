import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from "react-router-dom";
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from "react-redux";
import * as yup from 'yup';
import { loginUser } from '../../services/api';
import { StatusCodes } from 'http-status-codes'
import { loginSuccess, fetchUserAction } from '../../features/authSlice';

const schema = yup.object().shape({
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().min(6).max(50).required('Password is required'),
});

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const authUser = useSelector((state) => state.auth.authUser);

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = async data => {
        try {
            const response = await loginUser(data);
            if (response.status === StatusCodes.OK) {
                dispatch(loginSuccess({}));
                dispatch(fetchUserAction());

                navigate('/');
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="login-form">
            <div className="login-form-container">
                <h2>Login</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input id="email" {...register('email')} className="form-control" />
                        {errors.email && <span className="text-danger">{errors.email.message}</span>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" id="password" {...register('password')} className="form-control" />
                        {errors.password && <span className="text-danger">{errors.password.message}</span>}
                    </div>
                    <button type="submit" className="btn btn-primary">Login</button>
                </form>
            </div>
        </div>
    );
}

export default Login;