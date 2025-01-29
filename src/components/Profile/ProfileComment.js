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
                sizeInPx={0.1}
                className={'mt-3'}
            />
            <div className={`${hoverEffect_style} div-start gap-1 p-2`}>
                    <img
                        src={`${FILE_URL}/${data?.post_id?.posted_tribe_id?.tribeProfileImage}`}
                        alt=""
                        className="img-small-style"
                    />
                <div>
                    <div className='div-baseline gap-1' >
                        <h4
                           className='small-text-normal-weight primary-text '
                        >
                            t/{data?.post_id?.posted_tribe_id?.tribeName}
                        </h4>
                        <div className='secondary-bg p-[2px] rounded-2xl ' />
                        <a className='small-text-normal-weight secondary-text '>{truncateText(data?.post_id?.content_title, 60)}</a>
                    </div>

                    <div  className='div-center gap-1 mt-1'>
                        <div className='div-center gap-1'>
                            <h4
                               className='small-text-normal-weight primary-text '
                            >
                                {user.user.username}
                            </h4>
                            <a className='small-text-normal-weight secondary-text '>{reply_or_commented ? 'replied to' : 'commented'}</a>
                            {reply_or_commented &&
                                <h4
                                   className='small-text-normal-weight secondary-text '
                                >
                                    {data.parent_comment_ids.created_by.username}
                                </h4>
                            }
                            <a className='small-text-normal-weight secondary-text '>{created_at} ago</a>
                        </div>
                    </div>
                    <div className='mt-4' >
                        <a className='small-text-normal-weight primary-text '> {truncateText(data?.comment_text, 150)}</a>
                    </div>
                    <div className='div-center mt-3 '>
                        <div className='secondary-bg div-center rounded-[30px] '>
                            <IconButton Icon={BiUpvote} size={17} />
                            <h5 className='medium-text-normal-weight'>{data?.total_comment_vote}</h5>
                            <IconButton Icon={BiUpvote} size={17} />
                        </div>
                        <div className='secondary-bg rounded-[20px] mx-4 ' >
                            <BigButton className={'medium-text-normal-weight my-[0px!important] mx-[0px!important]'} Icon={FaRegComment} iconSize={20} title={`1`} />
                        </div>
                        <div className='secondary-bg rounded-[30px]'>
                            <BigButton className={'medium-text-normal-weight my-[0px!important] mx-[0px!important] bg-[transparent] '} Icon={FaShare} iconSize={18} title={`share`} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
