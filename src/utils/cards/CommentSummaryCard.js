import React from 'react'
import { darkColorTheme, FILE_URL } from '../../constant'
import { formatTimeDifference, truncateText } from "../CommonFunction";
import Underline from '../Underline';
import '../../asset/css/util.css'

export default function CommentSummaryCard({ style, postData, commentData, commentedUserData,hoverEffect }) {

    const post_created_time = formatTimeDifference(postData.created_at);
    const comment_created_time = formatTimeDifference(commentData.created_at);

    const hoverEffect_style = hoverEffect ? "bright-border-button-hover" : '';

    return (
        <div className={hoverEffect_style} style={{ width: '67%', padding: 15, ...style }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <div
                    style={{
                        width: "35px",
                        height: "35px",
                        display: "flex",
                        alignItems: "center",
                    }}
                >
                    <img
                        src={`${FILE_URL}/${postData.posted_tribe_id.tribeProfileImage}`}
                        alt=""
                        style={{
                            width: "90%",
                            height: "90%",
                            objectFit: "cover",
                            borderRadius: "50%", // Optional: makes the image circular
                            display: "block", // Removes extra space under image
                        }}
                    />
                </div>
                <h4
                    // className='text-underline'
                    style={{
                        marginInline: 3,
                        marginBlock: 5,
                        fontSize: 16,
                        fontWeight: 500,
                        color: darkColorTheme.secondaryTextColor,
                    }}
                >
                    t/{postData.posted_tribe_id.tribeName}
                </h4>
                <div style={{ background: darkColorTheme.secondaryTextColor, padding: 3, borderRadius: 20, marginInline: 3 }} />
                <a style={{ marginInline: 3, color: darkColorTheme.secondaryTextColor, fontSize: 13 }}>{post_created_time} ago</a>
            </div>
            <div>
                <h3 style={{
                    marginBlock: 2,
                    fontSize: 17,
                    color: darkColorTheme.secondaryTextColor,
                    fontWeight: 500,
                }}
                >
                    {truncateText(postData.content_title, 90)}
                </h3>
            </div>
            <div style={{ background: 'black', padding: 20, borderRadius: 15, marginBlock: 10 }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div
                        style={{
                            width: "35px",
                            height: "35px",
                            display: "flex",
                            alignItems: "center",
                        }}
                    >
                        <img
                            src={require('../../asset/img/logo.png')}
                            alt=""
                            style={{
                                width: "90%",
                                height: "90%",
                                objectFit: "cover",
                                borderRadius: "50%", // Optional: makes the image circular
                                display: "block", // Removes extra space under image
                            }}
                        />
                    </div>
                    <h5 style={{ marginInline: 3, marginBlock: 0, cursor: 'pointer' }}>u/{commentedUserData.username}</h5>
                    <div style={{ background: darkColorTheme.secondaryTextColor, padding: 3, borderRadius: 20, marginInline: 3 }} />
                    <a style={{ marginInline: 3, color: darkColorTheme.secondaryTextColor, fontSize: 13 }}>{comment_created_time} ago</a>
                </div>
                <div style={{ marginBlock: 15 }}>
                    <h5
                        style={{
                            marginInline: 3,
                            marginBlock: 2,
                            fontSize: 15,
                            fontWeight: 400,
                        }}
                    >
                        {commentData.comment_text}
                    </h5>
                    <p style={{ marginTop: 15, color: darkColorTheme.secondaryTextColor, fontSize: 14, }}>{commentData.total_comment_vote} votes</p>
                </div>
            </div>
            <a style={{ color: '#648EFC', cursor: 'pointer', fontSize: 13, fontWeight: 600 }}>Go To Thread</a>
            <div className="div-center" style={{ marginTop: 2 }}>
                <h5
                    style={{
                        marginBlock: 0,
                        fontSize: 14,
                        color: darkColorTheme.secondaryTextColor,
                        fontWeight: 400,
                    }}
                >
                    1.1k <span>upvotes</span>
                </h5>
                <div
                    style={{
                        background: darkColorTheme.secondaryTextColor,
                        padding: 1,
                        borderRadius: 20,
                        marginInline: 3,
                    }}
                />
                <h5
                    style={{
                        marginInline: 3,
                        marginBlock: 0,
                        fontSize: 14,
                        color: darkColorTheme.secondaryTextColor,
                        fontWeight: 400,
                    }}
                >
                    225 <span>comments</span>
                </h5>
            </div>
            <Underline
                color={darkColorTheme.divider}
                sizeInPx={0.3}
                style={{ marginTop: 20 }}
            />
        </div>

    )
}
