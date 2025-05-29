import React, { useEffect, useState } from 'react';
import BigButton from '../../../../utils/buttons/BigButton';
import { GoPencil, GoPlus } from 'react-icons/go';
import { AiOutlineDelete } from "react-icons/ai";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import IconButton from '../../../../utils/buttons/IconButton';
import SearchInput from '../../../../utils/input/SearchInput';
import Underline from '../../../../utils/Underline';
import ModInvitationModal from './ModInvitationModal';
import { useGetAllModerators } from '../../../../hooks/modHook';
import { FILE_URL } from '../../../../constant';
import { formatDate } from '../../../../utils/CommonFunction';
import InfiniteScroll from '../../../../utils/InfiniteScroll';
import CircularLoader from '../../../../utils/CircularLoader';
import RemoveMembers from './RemoveMembers'

export default function ModeratorsTab() {
    const [moderatorSearch, setModeratorSearch] = useState("");
    const [userSearched, setUserSearched] = useState(false);
    const [inviteModal, setInviteModal] = useState(false);
    const [moderatorHovered, setModeratorHovered] = useState(null);
    const [removeMemberModal, setRemoveMemberModal] = useState(false);
    const [removedInviteId, setremovedInviteId] = useState('');

    const {
        data: moderatorData,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading: isModeratorsLoading
    } = useGetAllModerators();

    const allModerators = moderatorData?.pages?.flatMap(page => page?.data?.data) || [];


    function handleModeratorSearch(e) {
        e.preventDefault();
        if (moderatorSearch.trim() !== '') {
            setUserSearched(true);
        } else {
            setUserSearched(false);
        }
    }

    function handleMouseLeave() {
        setModeratorHovered(null);
    }

    function handleMouseEnter(id) {
        setModeratorHovered(id);
    }

    function handleModRemove(id) {
        setremovedInviteId(id)
        setRemoveMemberModal(true);
    }

    useEffect(() => {
        if (moderatorSearch.trim() === '') {
            setUserSearched(false);
        }
    }, [moderatorSearch]);

    return (
        <div>
            {inviteModal && <ModInvitationModal isOpen={inviteModal} setModal={setInviteModal} />}
            {removeMemberModal && <RemoveMembers isOpen={removeMemberModal} setModal={setRemoveMemberModal} userBanId={removedInviteId} />}
            <div className=' flex flex-col'>
                <div className="flex self-end gap-4">
                    <BigButton onClick={() => setInviteModal(true)} className={'accent-bg border-radius-large text-[#fff]'} Icon={GoPlus} title={'Invite Mod'} />
                    <IconButton Icon={HiOutlineDotsHorizontal} size={20} className={"bright-icon-color p-3"} />
                </div>
                <div className='div-center-justify mt-3'>
                    <SearchInput
                        className={"!w-[350px] "}
                        placeHolder={"Search mods"}
                        setFormValues={setModeratorSearch}
                        value={moderatorSearch}
                        onChange={handleModeratorSearch}
                    />
                </div>
                <Underline className={"mt-4"} />
                <table className='w-[100%] border-collapse'>
                    <thead>
                        <tr className='divider-bottom '>
                            <th className='medium-text-large-weight text-left p-[15px_8px] w-[40%]'>USERNAME</th>
                            <th className='medium-text-large-weight text-left p-[15px_8px] w-[20%]'>PERMISSIONS</th>
                            <th className='medium-text-large-weight text-left p-[15px_8px] w-[20%]'>You can edit</th>
                            <th className='medium-text-large-weight text-left p-[15px_8px] w-[20%]'>JOINED</th>
                        </tr>
                    </thead>
                    <tbody>
                        <InfiniteScroll fetchData={fetchNextPage} hasMoreData={hasNextPage}>
                            {allModerators.map((item, key) => (
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
                                    <td className='small-text-normal-weight text-left p-[20px_8px]'>{item?.permissions?.map(val => (`${val} , `))}</td>
                                    <td className='small-text-normal-weight text-left p-[20px_8px]'>{"Yes"}</td>
                                    <td className='small-text-normal-weight text-left p-[20px_8px]'>{formatDate(item?.created_at)}</td>
                                    <td className={`div-center gap-3 p-[20px_8px] transition-opacity duration-200 ${moderatorHovered === key ? 'opacity-100' : 'opacity-0'}`}>
                                        <IconButton onClick={() => handleModRemove(item?._id)} className={'teritory-bg'} Icon={AiOutlineDelete} size={20} />
                                        <IconButton Icon={GoPencil} size={20} />
                                    </td>
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
