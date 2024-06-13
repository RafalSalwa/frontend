import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import { useNavigate } from "react-router-dom";
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {registerUser} from '../services/api';
import {StatusCodes} from 'http-status-codes'

const schema = yup.object().shape({
    firstName: yup.string().min(2).max(25).required('First Name is required'),
    lastName: yup.string().min(2).max(25).required('Last Name is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().min(6).max(50).matches(/\d/, 'Password must contain at least one number').required('Password is required'),
});

function RegisterPage() {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        setError,
        formState: {errors},
        setValue,
        watch
    } = useForm({
        resolver: yupResolver(schema),
    });

    const [selectedFiles, setSelectedFiles] = useState([]);

    const handleFileChange = (e) => {
        const files = e.target.files;
        const filesWithMeta = Array.from(files).map(file => ({
            name: file.name,
            size: file.size,
            type: file.type,
            file: file,
        }));
        setValue('photos', filesWithMeta);
    };

    const handleClearFiles = () => {
        setValue('photos', []);
    };
    const onSubmit = async data => {
        try {
            const response = await registerUser(data);
            if (response.status === StatusCodes.CREATED) {
                console.log("redirect true")
                // navigate('/login');
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="container">
            <h2>Register</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                    <label htmlFor="firstName" className="form-label">First Name</label>
                    <input id="firstName" {...register('firstName')} className="form-control"/>
                    {errors.firstName && <span className="text-danger">{errors.firstName.message}</span>}
                </div>
                <div className="mb-3">
                    <label htmlFor="lastName" className="form-label">Last Name</label>
                    <input id="lastName" {...register('lastName')} className="form-control"/>
                    {errors.lastName && <span className="text-danger">{errors.lastName.message}</span>}
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input id="email" {...register('email')} className="form-control"/>
                    {errors.email && <span className="text-danger">{errors.email.message}</span>}
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" id="password" {...register('password')} className="form-control"/>
                    {errors.password && <span className="text-danger">{errors.password.message}</span>}
                </div>
                <div className="mb-3">
                    <label htmlFor="photos" className="form-label">Photos</label>
                    <input
                        type="file"
                        id="photos"
                        {...register('photos')}
                        onChange={handleFileChange}
                        multiple
                        className="form-control"
                    />
                    {watch('photos') && watch('photos').length > 0 && (
                        <div>
                            <h4>Selected Files</h4>
                            <ul>
                                {watch('photos').map((file, index) => (
                                    <li key={index}>{file.name} - {file.size} bytes</li>
                                ))}
                            </ul>
                            <button type="button" onClick={handleClearFiles}>Clear Files</button>
                        </div>
                    )}
                    {errors.photos && <span className="text-danger">{errors.photos.message}</span>}
                    <ul>
                        {selectedFiles.map(file => (
                            <li key={file.name}>{file.name}</li>
                        ))}
                    </ul>
                    {selectedFiles.length > 0 && (
                        <button type="button" onClick={handleClearFiles}>Clear Files</button>
                    )}
                </div>
                <button type="submit" className="btn btn-primary">Register</button>
            </form>
        </div>
    );
}

export default RegisterPage;