import React from 'react';
import {useSelector} from "react-redux";

const Profile = () => {
    const {loading, error, authUser} = useSelector((state) => state.auth);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error fetching user data: {error}</div>;

    if (!authUser) return <div>No user data available</div>;
    return (
        <div>
            <h1>Welcome, {authUser.firstName} {authUser.lastName}</h1>
            <p>Email: {authUser.email}</p>
        </div>
    );
};

export default Profile;