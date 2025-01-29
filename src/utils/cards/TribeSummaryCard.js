import React from 'react'
import { darkColorTheme, FILE_URL } from '../../constant'
import '../../asset/css/util.css'
import { useNavigate } from 'react-router-dom';
import { truncateText } from "../CommonFunction";

export default function TribeSummaryCard({ hoverEffect, style, data, no_of_charactor, not_require,className }) {

    const navigate = useNavigate()
    function handlTribeClick() {
        navigate(`/tribe/${data._id}`);
    }

    const hoverEffect_style = hoverEffect ? "bright-border-button-hover div-center" : 'div-center';
    return (
        <div onClick={handlTribeClick} className={`${hoverEffect_style} ${className} p-4`} style={{   ...style }}>
            <img
                src={`${FILE_URL}/${data.tribeProfileImage}`}
                alt="communities-logo"
                className='img-small-style  w-[60px!important] h-[60px!important] '
            />
            <div>
                <h4
                    className={`${not_require ? 'large-text-normal-weight' : 'medium-text-medium-weight'} cursor-pointer`}
                >
                    t/{data.tribeName}
                </h4>
                <div className={`flex ${not_require?'flex-col-reverse':'flex-col'}`}>
                    <div className="div-center mt-1 ">
                        <h5
                            className='primary-text small-text-small-weight'
                        >
                            1.1k <span className='secondary-text'>upvotes</span>
                        </h5>
                        <div
                             className="secondary-text p-[1px] rounded-2xl mx-1 "
                        />
                        <h5
                            className='primary-text small-text-small-weight'
                        >
                            225 <span className='secondary-text'>comments</span>
                        </h5>
                    </div>
                    <h5
                        className='primarty-text medium-text-small-weight'
                    >
                        {truncateText(data.tribeDescription, no_of_charactor ? no_of_charactor : 150)}
                    </h5>
                </div>
            </div>
        </div>
    )
}
