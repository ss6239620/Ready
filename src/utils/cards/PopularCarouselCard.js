import React from 'react'
import logo from '../../asset/img/logo.png'; // Correctly import the image
import { truncateText } from '../../utils/CommonFunction';
import { FILE_URL } from '../../constant';
import { useNavigate } from 'react-router-dom';

export default function PopularCarouselCard({ data }) {
    const navigate=useNavigate();

    function handlePostNavigate() {
        navigate(`/comment/${data?.posted_tribe_id?._id}/${data?._id}`);
    }
    function handleTribeNavigate() {
        navigate(`/tribe/${data?.posted_tribe_id?._id}/${data?._id}`);
    }
    return (
        <div
            onClick={handlePostNavigate}
            className='popular-carousel-card'
            style={{
                backgroundImage: `url(${FILE_URL}/${data?.content_path.replace(/\\/g, '/')})`, // Use the imported image
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center', // Ensure scaling is centered
                transition: 'background-size 0.3s ease-in-out, background-position 0.3s ease-in-out', // Smooth transition
                width: 280,
                height: 210,
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)',
                position: 'relative',
                borderRadius: 20,
            }}
        >
            {/* Add an overlay */}
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black overlay
                    zIndex: 1,
                    borderRadius: 20,
                }}
            ></div>
            <div style={{ zIndex: 10, position: 'absolute', bottom: 0, padding: 10 }}>
                <h4
                    style={{
                        marginInline: 3,
                        marginBlock: 0,
                        fontSize: 17,
                        fontWeight: 'bold',
                        color:'white'
                    }}
                >
                    {truncateText(data?.content_title, 20)}
                </h4>
                <a style={{ marginInline: 3, fontSize: 13,color:'white' }}>
                    {truncateText(
                        data?.content_title, 35)}
                </a>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div
                        style={{
                            width: '35px',
                            height: '35px',
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <img
                            src={`${FILE_URL}/${data?.posted_tribe_id.tribeProfileImage}`}
                            alt=""
                            style={{
                                width: '90%',
                                height: '90%',
                                objectFit: 'cover',
                                borderRadius: '50%', // Optional: makes the image circular
                                display: 'block', // Removes extra space under image
                            }}
                        />
                    </div>
                        <h5 style={{ marginInline: 3, marginBlock: 0, cursor: 'pointer',color:'white' }}>
                        t/{data?.posted_tribe_id?.tribeName}
                    </h5>
                    <a style={{ marginInline: 3, fontSize: 13,color:'white' }}>and more</a>
                </div>
            </div>
        </div>
    )
}
