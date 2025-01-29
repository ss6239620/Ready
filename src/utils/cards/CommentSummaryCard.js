import React from 'react'
import { darkColorTheme, FILE_URL } from '../../constant'
import { formatTimeDifference, truncateText } from "../CommonFunction";
import Underline from '../Underline';
import '../../asset/css/util.css'

export default function CommentSummaryCard({ style, postData, commentData, commentedUserData, hoverEffect }) {

    const post_created_time = formatTimeDifference(postData.created_at);
    const comment_created_time = formatTimeDifference(commentData.created_at);

    const hoverEffect_style = hoverEffect ? "bright-border-button-hover" : '';

    return (
        <div className={`${hoverEffect_style} w-[67%] p-4 `} style={{ ...style }}>
            <div className='div-center' >
                <img
                    src={`${FILE_URL}/${postData.posted_tribe_id.tribeProfileImage}`}
                    alt=""
                    className='img-small-style'
                />
                <h4
                    className='medium-text-normal-weight primary-text'
                >
                    t/{postData.posted_tribe_id.tribeName}
                </h4>
                <div
                    className="secondary-bg p-[2px] rounded-2xl mx-1"
                />
                <a className='small-text-small-weight secondary-text mx-1 '>{post_created_time} ago</a>
            </div>
            <div>
                <h3 className='medium-text-normal-weight primary-text'>
                    {truncateText(postData.content_title, 90)}
                </h3>
            </div>
            <div className='fixed-bg p-5 rounded-2xl my-3 ' >
                <div className='div-center' >
                    <img
                        src={require('../../asset/img/logo.png')}
                        alt=""
                        className='img-small-style'
                    />
                    <h5 className='small-text-normal-weight primary-text cursor-pointer' >u/{commentedUserData.username}</h5>
                    <div
                        className="secondary-bg p-[3px] rounded-2xl mx-1"
                    />
                    <a className='small-text-normal-weight secondary-text'>{comment_created_time} ago</a>
                </div>
                <div className='my-4' >
                    <h5
                        className='small-text-normal-weight primary-text'
                    >
                        {commentData.comment_text}
                    </h5>
                    <p className='small-text-normal-weight secondary-text'>{commentData.total_comment_vote} votes</p>
                </div>
            </div>
            <a className='medium-text-normal-weight accent-text'>Go To Thread</a>
            <div className="div-center mt-[2px] ">
                <h5
                    className='medium-text-small-weight secondary-text'
                >
                    1.1k <span>upvotes</span>
                </h5>
                <div
                    className="secondary-bg p-[3px] rounded-2xl mx-1"
                />
                <h5
                    className='medium-text-small-weight secondary-text'
                >
                    225 <span>comments</span>
                </h5>
            </div>
            <Underline
                color={darkColorTheme.divider}
                sizeInPx={0.3}
                className={'mt-5'}
            />
        </div>

    )
}
