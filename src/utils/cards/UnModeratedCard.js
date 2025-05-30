import React from 'react'
import BigButton from '../buttons/BigButton'
import Checkbox from '../input/Checkbox'
import { copyToClipBoard, truncateText } from '../CommonFunction'
import { FILE_URL } from '../../constant'
import { PiWarningCircleBold } from "react-icons/pi";
import { FaLock } from 'react-icons/fa'
import { BsFillPinAngleFill } from 'react-icons/bs';
import { IoShieldOutline } from "react-icons/io5";
import IconDropDown from '../dropdown/IconDropDown'
import { UnModerated_Post_DropDownData } from '../../asset/data/dropDownData'
import IconButton from '../buttons/IconButton'
import { useToastStore } from '../../store/toastStore'
import { useUpdateUnModeartedPostStatus } from '../../hooks/modHook'
import { MOD_QUEUE_POST_STATUS } from '../../asset/data/modData'

export default function UnModeratedCard({ data }) {

    const { mutate, isPending, } = useUpdateUnModeartedPostStatus();

    const showToast = useToastStore((state) => state.showToast);

    async function handleCopyLink() {
        const baseUrl = new URL(window.location.href).origin;
        const text = `${baseUrl}/comment/${data?.posted_tribe_id}/${data?._id}`;
        await copyToClipBoard(text);
        showToast(`Link copied`, 'success');
    }

    function handleClick(action) {
        if (action === MOD_QUEUE_POST_STATUS.APPROVED) {
            return mutate({ post_id: data?._id, post_action: MOD_QUEUE_POST_STATUS.APPROVED });
        } else if (action === MOD_QUEUE_POST_STATUS.REMOVED) {
            return mutate({ post_id: data?._id, post_action: MOD_QUEUE_POST_STATUS.REMOVED });
        } else if (action === MOD_QUEUE_POST_STATUS.SPAMMED) {
            return mutate({ post_id: data?._id, post_action: MOD_QUEUE_POST_STATUS.SPAMMED });
        } else if (action === MOD_QUEUE_POST_STATUS.LOCK) {
            return mutate({ post_id: data?._id, post_action: MOD_QUEUE_POST_STATUS.LOCK });
        } else if (action === MOD_QUEUE_POST_STATUS.ADD_TO_HIGHLIGHT) {
            return mutate({ post_id: data?._id, post_action: MOD_QUEUE_POST_STATUS.ADD_TO_HIGHLIGHT });
        }
    }

    return (
        <div className='divider-top divider-bottom py-4 cursor-pointer'>
            <div className='flex gap-2 w-[80%]'>
                <div className='mt-1 hover:opacity-100 opacity-0'>
                    <Checkbox checked />
                </div>
                <div className='flex-1'>
                    <div className='div-center gap-1'>
                        <img
                            src={`${FILE_URL}/${data?.created_by?.profile_avtar}`}
                            alt=""
                            className="img-small-style !w-6 !h-6"
                        />
                        <a className='small-text-large-weight hover:text-[#9580FF] cursor-pointer'>{data?.created_by?.username}</a>
                        <div className='bg-[var(--text-secondary)] p-[2px] rounded-2xl ' />
                        <a className='small-text-small-weight text-[var(--text-secondary)] cursor-pointer'>1m ago</a>
                        <div className='bg-[var(--text-secondary)] p-[2px] rounded-2xl ' />
                        <a className='small-text-small-weight text-[var(--text-secondary)]'>{data?.total_vote} upvote</a>
                        <div className='bg-[var(--text-secondary)] p-[2px] rounded-2xl ' />
                        <a className='small-text-small-weight text-[var(--text-secondary)]'>{data?.total_comments} comments</a>
                        {data?.post_locked && <>
                            <div className='bg-[var(--text-secondary)] p-[2px] rounded-2xl ' />
                            <FaLock size={12} color='#fcea23' />
                        </>}
                        {data?.added_to_highlight &&
                            <BsFillPinAngleFill size={12} color='#01A816' />
                        }
                    </div>
                    <div className='mt-2'>
                        <h1 className='large-text-large-weight '>{data?.content_title}</h1>
                        {data?.content_type === 'TEXT' && <p className='medium-text-normal-weight text-[var(--text-secondary)]'>{truncateText(data?.content_body, 100)}</p>}
                        <div className='div-center-justify w-full'>
                            {!data?.is_nsfw && <a></a>}
                            {data?.is_nsfw && <div className='div-center'>
                                <PiWarningCircleBold size={20} color='#DE019F' />
                                <h1 className='medium-text-large-weight text-[#DE019F]'>NSFW</h1>
                            </div>}
                            {data?.content_type === 'IMAGE' && (
                                <div className='relative w-[100px] h-[50px]'>
                                    <img
                                        src={`${FILE_URL}/${data?.content_path}`}
                                        alt=""
                                        className="w-full h-full object-cover blur-sm"
                                    />
                                    <div className='absolute inset-0 z-1 flex items-center justify-center'>
                                        <PiWarningCircleBold size={25} />
                                    </div>
                                </div>
                            )}
                        </div>

                    </div>
                    <div className='div-center gap-2 mt-4'>
                        <BigButton
                            title={'Approve'}
                            className={'bg-[var(--secondary)] !rounded-full px-4 '}
                            labelClassName={'!text-xs'}
                            onClick={() => handleClick(MOD_QUEUE_POST_STATUS.APPROVED)}
                        />
                        <BigButton
                            title={'Remove'}
                            className={'bg-[var(--secondary)] !rounded-full px-4 '}
                            labelClassName={'!text-xs'}
                            onClick={() => handleClick(MOD_QUEUE_POST_STATUS.REMOVED)}
                        />
                        <BigButton
                            title={'Spam'}
                            className={'hover:bg-[var(--secondary)] !rounded-full px-4 '}
                            labelClassName={'!text-xs'}
                            onClick={() => handleClick(MOD_QUEUE_POST_STATUS.SPAMMED)}
                        />
                        <BigButton
                            title={'Flair'}
                            className={'hover:bg-[var(--secondary)] !rounded-full px-4 '}
                            labelClassName={'!text-xs'}
                        />
                        <BigButton
                            title={'Lock'}
                            className={'hover:bg-[var(--secondary)] !rounded-full px-4 '}
                            labelClassName={'!text-xs'}
                            onClick={() => handleClick(MOD_QUEUE_POST_STATUS.LOCK)}
                        />
                        <BigButton
                            title={'Copy Link'}
                            className={'hover:bg-[var(--secondary)] !rounded-full px-4 '}
                            labelClassName={'!text-xs'}
                            onClick={handleCopyLink}
                        />
                        <BigButton
                            title={'Add to highlights'}
                            className={'hover:bg-[var(--secondary)] !rounded-full px-4 '}
                            labelClassName={'!text-xs'}
                            onClick={() => handleClick(MOD_QUEUE_POST_STATUS.ADD_TO_HIGHLIGHT)}
                        />
                        <IconDropDown iconSize={20} Icon={IoShieldOutline} childClassName={'w-[200px] right-0 top-[30px] py-[15px] px-3 '} >
                            {(closeDropDown =>
                                UnModerated_Post_DropDownData.map((item, key) => (
                                    <div key={key} className='div-center gap-2'>
                                        <IconButton Icon={item.icon} size={25} />
                                        <p className='medium-text-normal-weight'>{item.title}</p>
                                    </div>
                                )))}
                        </IconDropDown>
                    </div>
                </div>
            </div>
        </div>
    )
}
