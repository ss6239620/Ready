import React from 'react'
import { darkColorTheme, FILE_URL } from '../../constant'
import { CiCirclePlus } from "react-icons/ci";
import IconButton from '../buttons/IconButton';
import { FaRegComment, FaShare } from "react-icons/fa"
import { BiSolidUpvote, BiUpvote, BiDownvote, BiSolidDownvote } from "react-icons/bi";
import BigButton from '../buttons/BigButton';
import '../../asset/css/util.css'
import { formatTimeDifference } from '../CommonFunction';

export default function CommentCard({ style, onReplyClick, commentText, creatorName, created_at, total_comment_vote,profile }) {
    const created_time = formatTimeDifference(created_at);
    console.log();
    
    return (
        <div style={{ display: 'flex', ...style }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'column', alignItems: 'center' }}>
                <div
                    style={{
                        width: "35px",
                        height: "35px",
                        display: "flex",
                        alignItems: "center",
                    }}
                >
                    <img
                        src={`${FILE_URL}/${profile}`}
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
                <div className='comment-vertical-bar' />
                <IconButton Icon={CiCirclePlus} size={15} style={{ padding: 0 }} />
            </div>
            <div style={{ marginLeft: 10, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div className='div-center' style={{}}>
                    <div style={{ marginLeft: 2, marginRight: 7 }}>
                        <h5 style={{ marginBlock: 0 }}>{creatorName}</h5>
                    </div>
                    <div style={{ background: darkColorTheme.secondaryTextColor, padding: 2, borderRadius: 20, marginInline: 3 }} />
                    <p style={{ fontSize: 14, color: darkColorTheme.secondaryTextColor, marginBlock: 0 }}>{created_time} ago</p>
                    <div style={{ background: darkColorTheme.secondaryTextColor, padding: 2, borderRadius: 20, marginInline: 3 }} />
                </div>
                <div>
                    <p style={{ marginBlock: 8 }}>{commentText}</p>
                </div>
                <div style={{ display: 'flex' }}>
                    <div className='div-center' style={{}}>
                        <IconButton Icon={BiUpvote} size={15} style={{ padding: 0 }} />
                        <h5 style={{ marginInline: 15, marginBlock: 0, fontSize: 14 }}>{total_comment_vote}</h5>
                        <IconButton Icon={BiUpvote} size={17} style={{ padding: 0 }} />
                    </div>
                    <div style={{ marginInline: 30 }}>
                        <BigButton onClick={onReplyClick} Icon={FaRegComment} iconSize={15} style={{ background: 'none', padding: 0 }} title={`Reply`} />
                    </div>
                    <div style={{}}>
                        <BigButton Icon={FaShare} iconSize={15} style={{ background: 'none', padding: 0, fontSize: 14 }} title={`Share`} />
                    </div>
                </div>
            </div>
        </div>
    )
}
