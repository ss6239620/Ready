import React from 'react'
import logo from '../../asset/img/logo.png'; // Correctly import the image
import { truncateText } from '../../utils/CommonFunction';
import { FILE_URL } from '../../constant';
import { useNavigate } from 'react-router-dom';

export default function PopularCarouselCard({ data }) {
    const navigate = useNavigate();

    function handlePostNavigate() {
        navigate(`/comment/${data?.posted_tribe_id?._id}/${data?._id}`);
    }
    function handleTribeNavigate() {
        navigate(`/tribe/${data?.posted_tribe_id?._id}/${data?._id}`);
    }
    return (
        <div
            onClick={handlePostNavigate}
            className={`popular-carousel-card`}
            style={{
                backgroundImage: `url(${FILE_URL}/${data?.content_path.replace(/\\/g, '/')})`, // Use the imported image
            }}
        >
            {/* Add an overlay */}
            <div
            className='absolute top-0 left-0 w-[100%] h-[100%] bg-black/[.5] z-[1] rounded-2xl '
            ></div>
            <div className='z-10 absolute bottom-0 p-3' >
                <h4
                    className='large-text-large-weight text-[#fff]'
                >
                    {truncateText(data?.content_title, 20)}
                </h4>
                <a className='small-text-normal-weight text-[#fff]'>
                    {truncateText(
                        data?.content_title, 35)}
                </a>
                <div className='div-center gap-1' >
                    <img
                        src={`${FILE_URL}/${data?.posted_tribe_id.tribeProfileImage}`}
                        alt=""
                        className='img-small-style'
                    />
                    <h5 className='medium-text-normal-weight text-[#fff]'>
                        t/{data?.posted_tribe_id?.tribeName}
                    </h5>
                    <a  className='small-text-normal-weight text-[#fff]'>and more</a>
                </div>
            </div>
        </div>
    )
}
