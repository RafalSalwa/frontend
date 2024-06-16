import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import Slider from 'react-slick';
import CdnUtils from '../../Utils/Cdn'

const Profile = () => {
    const { loading, error, authUser } = useSelector((state) => state.auth);
    const [nav1, setNav1] = useState(null);
    const [nav2, setNav2] = useState(null);
    const slider1 = useRef(null);
    const slider2 = useRef(null);

    useEffect(() => {
        setNav1(slider1.current);
        setNav2(slider2.current);
    }, []);

    const mainSettings = {
        asNavFor: nav2,
        ref: slider => (slider1.current = slider),
        arrows: false,
        fade: true,
    };

    const thumbSettings = {
        asNavFor: nav1,
        ref: slider => (slider2.current = slider),
        slidesToShow: 5,
        focusOnSelect: true,
        centerMode: true,
        infinite: true,
        speed: 500,
        slidesToScroll: 1,
        // autoplay: true,
        autoplaySpeed: 3000,
        pauseOnHover: true,
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error fetching authUser data: {error}</div>;

    if (!authUser) return <div>No authUser data available</div>;
    return (
        <div className="container mt-5">
            <div className="card">
                <div className="card-header">
                    <h2>{authUser.fullName || `${authUser.firstName} ${authUser.lastName}`}'s Profile</h2>
                </div>
                <div className="card-body">
                    <p><strong>Email:</strong> {authUser.email}</p>
                    <div className="mt-4 slider-container">
                    {authUser.photos && authUser.photos.length > 0 ? (
                            <>
                                <Slider {...mainSettings} className="main-slider">
                                    {authUser.photos.map((photo, index) => (
                                        <div key={index} className="text-center">
                                            <img
                                                className="d-block w-100 img-fluid"
                                                src={CdnUtils.getPhotoUrl(photo.url)}
                                                alt={`${index}`}
                                                style={{ maxHeight: '400px', objectFit: 'cover' }}
                                            />
                                        </div>
                                    ))}
                                </Slider>
                                <Slider {...thumbSettings} className="thumb-slider mt-3">
                                    {authUser.photos.map((photo, index) => (
                                        <div key={index} className="text-center">
                                            <img
                                                className="d-block img-fluid"
                                                src={CdnUtils.getPhotoUrl(photo.url)}
                                                alt={`Thumb ${index}`}
                                                style={{ maxHeight: '100px', cursor: 'pointer', objectFit: 'cover' }}
                                            />
                                        </div>
                                    ))}
                                </Slider>
                            </>
                        ) : (
                            <p>No photos available</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;