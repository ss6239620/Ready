import React, { useState } from 'react'
import { GoPencil, GoPlus } from 'react-icons/go'
import BigButton from '../../../../utils/buttons/BigButton'
import ModInvitationModal from './ModInvitationModal';
import Underline from '../../../../utils/Underline';
import { useGetAllInvite, useRemoveInvite } from '../../../../hooks/modHook';
import CircularLoader from '../../../../utils/CircularLoader';
import InfiniteScroll from '../../../../utils/InfiniteScroll';
import { FILE_URL } from '../../../../constant';
import { AiOutlineDelete } from 'react-icons/ai';
import { formatDate } from '../../../../utils/CommonFunction';
import IconButton from '../../../../utils/buttons/IconButton';
import RemoveMembers from './RemoveMembers'

export default function InviteTab() {
    const [inviteModal, setInviteModal] = useState(false);
    const [removeMemberModal, setRemoveMemberModal] = useState(false);
    const [inviteHovered, setinviteHovered] = useState(false);
    const [removeInviteId, setRemoveInviteId] = useState('');

    const {
        data: inviteData,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading: isModeratorsLoading
    } = useGetAllInvite();

    const allInvites = inviteData?.pages?.flatMap(page => page?.data?.data) || [];

    function handleMouseLeave() {
        setinviteHovered(null);
    }

    function handleMouseEnter(id) {
        setinviteHovered(id);
    }

    function handleModRemove(id) {
        setRemoveInviteId(id)
        setRemoveMemberModal(true);
    }

    return (
        <div>
            {inviteModal && <ModInvitationModal isOpen={inviteModal} setModal={setInviteModal} />}
            {removeMemberModal && <RemoveMembers isOpen={removeMemberModal} setModal={setRemoveMemberModal} userBanId={removeInviteId} />}
            <div className=' flex flex-col'>
                <div className="flex self-end gap-4">
                    <BigButton onClick={() => setInviteModal(true)} className={'accent-bg border-radius-large text-[#fff]'} Icon={GoPlus} title={'Invite Mod'} />
                </div>
                <Underline className={"mt-4"} />
                <table className='w-[100%] border-collapse'>
                    <thead>
                        <tr className='divider-bottom '>
                            <th className='medium-text-large-weight text-left p-[15px_8px] w-[60%]'>USERNAME</th>
                            <th className='medium-text-large-weight text-left p-[15px_15px] w-[20%]'>PERMISSIONS</th>
                            <th className='medium-text-large-weight text-left p-[15px_8px] w-[20%]'>INVITED</th>
                        </tr>
                    </thead>
                    <tbody>
                        <InfiniteScroll fetchData={fetchNextPage} hasMoreData={hasNextPage}>
                            {allInvites.map((item, key) => (
                                <tr className='divider-bottom ' key={key} onMouseLeave={() => handleMouseLeave()} onMouseEnter={() => handleMouseEnter(key)}>
                                    <td className='div-center gap-2 medium-text-normal-weight text-left p-[20px_8px]'>
                                        <img
                                            // src={`${FILE_URL}/${data?.chat_room_picture}`}
                                            src={`${FILE_URL}/${item?.member?.profile_avtar}`}
                                            alt=""
                                            className='img-small-style'
                                        />
                                        u/{item?.member?.username}
                                    </td>
                                    <td className='small-text-normal-weight text-left p-[20px_15px]'>{item?.permissions.map(val => (`${val} , `))}</td>
                                    {
                                        inviteHovered === key ?
                                            (
                                                <div className='div-center'>
                                                    <IconButton onClick={() => handleModRemove(item?._id)} className={'teritory-bg'} Icon={AiOutlineDelete} size={20} />
                                                </div>
                                            ) :
                                            formatDate(item?.created_at)
                                    }
                                </tr>
                            ))}
                        </InfiniteScroll>
                        {isFetchingNextPage && <CircularLoader />}
                        {isModeratorsLoading && <tr>
                            <td colSpan={4} className="">
                                <CircularLoader />
                            </td>
                        </tr>}
                    </tbody>
                </table>
            </div>
        </div>
    )
}