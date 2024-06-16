import React, { useState } from 'react';
import { FormProvider } from "react-hook-form";
import { useForm } from 'react-hook-form';



const RegisterForm = ({
    onSubmit,
    data,
    form,
}) => {

    

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

    return (
        <FormProvider {...form}>
            <form method="post" encType='multipart/form-data'>
                <div className="mb-3">
                    <label htmlFor="firstName" className="form-label">First Name</label>
                    <input id="firstName" {...register('firstName')} className="form-control" />
                    {errors.firstName && <span className="text-danger">{errors.firstName.message}</span>}
                </div>
                <div className="mb-3">
                    <label htmlFor="lastName" className="form-label">Last Name</label>
                    <input id="lastName" {...register('lastName')} className="form-control" />
                    {errors.lastName && <span className="text-danger">{errors.lastName.message}</span>}
                </div>
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
                                    <li key={index}>{file.name}</li>
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
                        <button type="button" className="btn btn-primary" onClick={handleClearFiles}>Clear Files</button>
                    )}
                </div>
                <button type="submit" className="btn btn-primary">Register</button>
            </form>
        </FormProvider >
    )
}

export default RegisterForm;