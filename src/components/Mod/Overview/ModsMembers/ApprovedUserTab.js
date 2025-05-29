import React, { useEffect, useState } from 'react'
import BigButton from '../../../../utils/buttons/BigButton'
import { GoPlus } from 'react-icons/go'
import { AiOutlineDelete } from "react-icons/ai";
import SearchInput from '../../../../utils/input/SearchInput';
import ApprovedUserModal from './ApprovedUserModal';
import { useGetAllApprovedMembers } from '../../../../hooks/modHook';
import InfiniteScroll from '../../../../utils/InfiniteScroll';
import { FILE_URL } from '../../../../constant';
import { formatDate } from '../../../../utils/CommonFunction';
import IconButton from '../../../../utils/buttons/IconButton';
import CircularLoader from '../../../../utils/CircularLoader';
import Underline from '../../../../utils/Underline';
import RemoveMembers from './RemoveMembers'

export default function ApprovedUserTab() {
    const [approvedUserModal, setApprovedUserModal] = useState(false);
    const [approvedUserSearch, setApprovedUserSearch] = useState('');
    const [userSearched, setUserSearched] = useState(false);
    const [removeApprovedUserId, setRemoveApprovedUserId] = useState('');
    const [removeMemberModal, setRemoveMemberModal] = useState(false);
    const [approvedUserHoverd, setapprovedUserHoverd] = useState(false)

    const {
        data: approvedUserData,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading: isModeratorsLoading
    } = useGetAllApprovedMembers();

    const allModerators = approvedUserData?.pages?.flatMap(page => page?.data?.data) || [];

    function handleApprovedUserSearch(e) {
        e.preventDefault();
        if (approvedUserSearch.trim() !== '') {
            setUserSearched(true);
        } else {
            setUserSearched(false);
        }
    }

    function handleMouseLeave() {
        setapprovedUserHoverd(null);
    }

    function handleMouseEnter(id) {
        setapprovedUserHoverd(id);
    }

    function handleApprovedUserRemove(id) {
        setRemoveApprovedUserId(id)
        setRemoveMemberModal(true);
    }

    useEffect(() => {
        if (approvedUserSearch.trim() === '') {
            setUserSearched(false);
        }
    }, [approvedUserSearch]);

    return (
        <div>
            {approvedUserModal && <ApprovedUserModal isOpen={approvedUserModal} setModal={setApprovedUserModal} />}
            {removeMemberModal && <RemoveMembers method={"approved user"} isOpen={removeMemberModal} setModal={setRemoveMemberModal} userBanId={removeApprovedUserId} />}
            <div className=' flex flex-col'>
                <p className='medium-text-normal-weight text-[var(--text-secondary)]'>Approved users are trusted members in your tribe. Depending on your tribe setup, approved users would not be filtered by certain restrictions in case you set them up.</p>
                <div className="flex self-end gap-4 mt-3">
                    <BigButton onClick={() => setApprovedUserModal(true)} className={'accent-bg border-radius-large px-3 text-[#fff]'} Icon={GoPlus} title={'Add Approved User'} />
                </div>
                <div className='div-center-justify mt-3'>
                    <SearchInput
                        className={"!w-[350px] "}
                        placeHolder={"Search users"}
                        setFormValues={setApprovedUserSearch}
                        value={approvedUserSearch}
                        onChange={handleApprovedUserSearch}
                    />
                </div>
                <Underline className={"mt-4"} />
                <table className='w-[100%] border-collapse'>
                    <thead>
                        <tr className='divider-bottom '>
                            <th className='medium-text-large-weight text-left p-[15px_8px] w-[80%]'>USERNAME</th>
                            <th className='medium-text-large-weight text-left p-[15px_8px] w-[20%]'>Date Added</th>
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
                                    <td className='small-text-normal-weight text-left p-[20px_8px]'>
                                        {
                                            approvedUserHoverd === key ?
                                                (
                                                    <div className='div-center'>
                                                        <IconButton onClick={() => handleApprovedUserRemove(item?._id)} className={'teritory-bg'} Icon={AiOutlineDelete} size={20} />
                                                    </div>
                                                ) :
                                                formatDate(item?.created_at)
                                        }
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
