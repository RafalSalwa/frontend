import React, {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {fetchUser} from "../services/api";

const Profile = () => {
    const navigate = useNavigate();
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('token');
                await fetchUser(token);
            } catch (error) {
                navigate('/login');
            }
        };
        fetchUserData();
    }, [navigate, fetchUser]);
    // if (!userData) {
    //     return <div>Loading...</div>;
    // }

    return (
        <div>
            {/*<h1>Welcome, {userData.firstName} {userData.lastName}</h1>*/}
            {/*<p>Email: {userData.email}</p>*/}
            {/*/!* Display other user information as needed *!/*/}
        </div>
    );
};

export default Profile;