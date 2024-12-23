import React from 'react'
import BigButton from '../../utils/buttons/BigButton'
import IconButton from '../../utils/buttons/IconButton'
import { BiUpvote } from 'react-icons/bi';
import { FaPlus, FaRegComment, FaShare } from 'react-icons/fa';
import { darkColorTheme, FILE_URL } from '../../constant';
import '../../asset/css/util.css'
import Underline from '../../utils/Underline';
import { formatTimeDifference, truncateText } from '../../utils/CommonFunction';

export default function ProfileComment({ hoverEffect, data }) {
    const hoverEffect_style = hoverEffect ? "bright-border-button-hover" : '';
    const reply_or_commented = data.parent_comment_ids ? true : false;
    const created_at = formatTimeDifference(data?.created_at)
    const user = JSON.parse(localStorage.getItem("user"));
    return (
        <>
            <Underline
                color={darkColorTheme.divider}
                sizeInPx={0.3}
                style={{ marginTop: 10 }}
            />
            <div className={hoverEffect_style} style={{ display: 'flex', alignItems: 'flex-start', gap: 5, padding: 10 }}>
                <div
                    style={{
                        display: "flex",
                    }}
                >
                    <img
                        src={`${FILE_URL}/${data?.post_id?.posted_tribe_id?.tribeProfileImage}`}
                        alt=""
                        style={{
                            width: "35px",
                            height: "35px",
                            objectFit: "cover",
                            borderRadius: "50%", // Optional: makes the image circular
                            display: "block", // Removes extra space under image
                        }}
                    />
                </div>
                <div>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: 5 }}>
                        <h4
                            // className='text-underline'
                            style={{
                                fontSize: 14,
                                marginBlock: 0,
                                fontWeight: 500,
                                color: darkColorTheme.secondaryTextColor,
                            }}
                        >
                            t/{data?.post_id?.posted_tribe_id?.tribeName}
                        </h4>
                        <div style={{ background: darkColorTheme.secondaryTextColor, padding: 2, borderRadius: 20, }} />
                        <a style={{ color: darkColorTheme.secondaryTextColor, fontSize: 13, marginLeft: 5 }}>{truncateText(data?.post_id?.content_title, 60)}</a>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginTop: 5 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                            <h4
                                style={{
                                    fontSize: 14,
                                    marginBlock: 0,
                                    fontWeight: 500,
                                    color: darkColorTheme.secondaryTextColor,
                                }}
                            >
                                {user.user.username}
                            </h4>
                            <a style={{ color: darkColorTheme.secondaryTextColor, fontSize: 13, marginLeft: 5 }}>{reply_or_commented ? 'replied to' : 'commented'}</a>
                            {reply_or_commented &&
                                <h4
                                    style={{
                                        fontSize: 14,
                                        marginBlock: 0,
                                        fontWeight: 500,
                                        color: darkColorTheme.secondaryTextColor,
                                    }}
                                >
                                    {data.parent_comment_ids.created_by.username}
                                </h4>
                            }
                            <a style={{ color: darkColorTheme.secondaryTextColor, fontSize: 13, marginLeft: 5 }}>{created_at} ago</a>
                        </div>
                    </div>
                    <div style={{ marginTop: 15 }}>
                        <a style={{ color: darkColorTheme.primaryTextColor, fontSize: 14 }}> {truncateText(data?.comment_text, 150)}</a>
                    </div>
                    <div className='div-center' style={{ marginTop: 10 }}>
                        <div className='div-center' style={{ background: '#3c3c3cb0', borderRadius: 30 }}>
                            <IconButton Icon={BiUpvote} size={17} />
                            <h5 style={{ marginInline: 5, marginBlock: 0 }}>{data?.total_comment_vote}</h5>
                            <IconButton Icon={BiUpvote} size={17} />
                        </div>
                        <div style={{ background: '#3c3c3cb0', borderRadius: 30, marginInline: 15 }}>
                            <BigButton Icon={FaRegComment} iconSize={20} style={{ background: 'none' }} title={`1`} />
                        </div>
                        <div style={{ background: '#3c3c3cb0', borderRadius: 30 }}>
                            <BigButton Icon={FaShare} iconSize={20} style={{ background: 'none' }} title={`share`} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
