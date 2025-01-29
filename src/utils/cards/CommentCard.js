import React from "react";
import { darkColorTheme, FILE_URL } from "../../constant";
import { CiCirclePlus } from "react-icons/ci";
import IconButton from "../buttons/IconButton";
import { FaRegComment, FaShare } from "react-icons/fa";
import {
    BiSolidUpvote,
    BiUpvote,
    BiDownvote,
    BiSolidDownvote,
} from "react-icons/bi";
import BigButton from "../buttons/BigButton";
import "../../asset/css/util.css";
import { formatTimeDifference } from "../CommonFunction";

export default function CommentCard({
    style,
    onReplyClick,
    commentText,
    creatorName,
    created_at,
    total_comment_vote,
    profile,
    depth,
    childCount,
}) {
    const created_time = formatTimeDifference(created_at);

    return (
        <div className="flex my-3" style={{ ...style }}>
            <div
                className="div-center-justify flex-col"
            >
                <div
                    className="relative z-10"
                >
                    {depth != 0 &&
                        <div
                            style={{
                                position: "absolute",
                                width: '100%',
                                border: "2px solid  #FFFFFF19", // Border color and thickness
                                borderBottomLeftRadius: 20,
                                height: 10,
                                left: -20,
                                borderTop: "none", // Remove the top border
                                borderRight: "none"
                            }}
                        ></div>
                    }
                    <img
                        src={`${FILE_URL}/${profile}`}
                        alt=""
                        className="img-small-style"
                    />
                </div>
                {depth != 3 && childCount !== 0 && (
                    <div
                        className={`comment-vertical-bar absolute top-[30px] left-[16px] z-0 `}
                        style={{
                            height: `${100 - depth * 10}%`,
                        }}
                    />
                )}
                <IconButton Icon={CiCirclePlus} size={15} className={'p-[0px!important]'} />
            </div>
            <div
            className="div-justify ml-3 flex-col"
            >
                <div className="div-center">
                    <div className="ml-[2px] mr-2" >
                        <h5 className="medium-text-normal-weight my-[0px!important] mx-[0px!important] ">{creatorName}</h5>
                    </div>
                    <div
                    className="secondary-bg p-[2px] rounded-2xl mx-1"
                    />
                    <p
                        className="medium-text-normal-weight secondary-text my-[0px!important] mx-[0px!important]"
                    >
                        {created_time} ago
                    </p>
                    <div
                    className="secondary-bg p-[2px] rounded-2xl mx-1"
                    />
                </div>
                <div>
                    <p className="medium-text-normal-weight my-[8px!important] mx-[0px!important]" >{commentText}</p>
                </div>
                <div className="flex" >
                    <div className="div-center" >
                        <IconButton Icon={BiUpvote} size={15} className={'p-[0px!important]'}  />
                        <h5 className="medium-text-normal-weight my-[0px!important] mx-[10px!important]" >
                            {total_comment_vote}
                        </h5>
                        <IconButton Icon={BiUpvote} size={17} className={'p-[0px!important]'} />
                    </div>
                    <div className="mx-7" >
                        <BigButton
                            onClick={onReplyClick}
                            Icon={FaRegComment}
                            iconSize={15}
                            className={'p-[0px!important] bg-[transparent!important] '}
                            title={`Reply`}
                        />
                    </div>
                    <div >
                        <BigButton
                            Icon={FaShare}
                            iconSize={15}
                            className={'p-[0px!important] bg-[transparent!important] '}
                            title={`Share`}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
