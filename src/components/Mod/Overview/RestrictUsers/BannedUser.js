import React, { useEffect, useState } from 'react'
import BigButton from '../../../../utils/buttons/BigButton'
import SearchInput from '../../../../utils/input/SearchInput';
import { useGetBanUsers, useRemoveUserBan, useSearchBannedUser } from '../../../../hooks/modHook';
import { IoMdArrowBack, IoMdArrowForward, IoMdClose } from 'react-icons/io';
import IconButton from '../../../../utils/buttons/IconButton';
import Underline from '../../../../utils/Underline';
import { FILE_URL } from '../../../../constant';
import { formatDate, getTimeLeft, truncateText } from '../../../../utils/CommonFunction';
import { PiHammer } from 'react-icons/pi';
import { GoPencil } from 'react-icons/go';
import CircularLoader from '../../../../utils/CircularLoader';
import BanUserModal from './BanUserModal';
import EditBannedUser from './EditBannedUser';

export default function BannedUser() {
    const [banUserModal, setBanUserModal] = useState(false);
    const [bannedUserSearch, setBannedUserSearch] = useState("");
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(5);
    const [isUserSearched, setIsUserSearched] = useState(false);
    const [ruleHovered, setRuleHovered] = useState(null);
    const [banUserId, setBanUserId] = useState(null);
    const [removeUserBanModal, setRemoveUserBanModal] = useState(false);
    const [showEditPanel, setShowEditPanel] = useState(false);
    const [editedData, setEditedData] = useState({})


    const { data, isLoading: isBannedLoading, } = useGetBanUsers(page, limit);

    const { data: searchedBannedUserData, isLoading: isSearchBannedLoading, refetch: serachUserRefetch } = useSearchBannedUser({
        query: bannedUserSearch,
        restrict_type: "Banned"
    });

    const totalCount = data?.totalCount || 0;

    const bannedUserData = data?.data || [];

    const from = (page - 1) * limit + 1;
    const to = Math.min(page * limit, totalCount);
    const totalPages = Math.ceil(totalCount / limit);

    const bannedUserList = isUserSearched
        ? searchedBannedUserData
            ? [searchedBannedUserData]
            : []
        : bannedUserData;


    function handleSearchBannedUser(e) {
        e.preventDefault();
        if (bannedUserSearch.trim() !== '') {
            setIsUserSearched(true);
            serachUserRefetch();
        } else {
            setIsUserSearched(false);
        }
    }

    function handleBanRemove(id) {
        setBanUserId(id)
        setRemoveUserBanModal(true);
    }

    function handleMouseLeave() {
        setRuleHovered(null);
    }

    function handleMouseEnter(id) {
        setRuleHovered(id);
    }

    function handleEdit(item) {
        setEditedData(item)
        setShowEditPanel(true);
    }

    useEffect(() => {
        if (bannedUserSearch.trim() === '') {
            setIsUserSearched(false);
        }
    }, [bannedUserSearch])

    return (
        <>
            {banUserModal && <BanUserModal isOpen={banUserModal} setModal={setBanUserModal} />}
            {removeUserBanModal && <RemoveBan isOpen={removeUserBanModal} setModal={setRemoveUserBanModal} userBanId={banUserId} />}
            <div className='div-center-justify relative'>
                <div className={`flex flex-col`}>
                    <div className="flex self-end">
                        <BigButton onClick={() => setBanUserModal(true)} className={'accent-bg border-radius-large text-[#fff]'} title={'Ban User'} />
                    </div>
                    <div className='div-center-justify'>
                        <div>
                            <p className='small-text-normal-weight  '>Ban evasion filter</p>
                            <p className='small-text-normal-weight'>Automatically filter content from suspected ban evaders. <span className='accent-text hover:underline cursor-pointer'>Learn more about ban evasion.</span></p>
                        </div>
                    </div>
                    <div className='div-center-justify mt-3'>
                        <SearchInput
                            placeHolder={"Search Banned User"}
                            setFormValues={setBannedUserSearch}
                            value={bannedUserSearch}
                            onChange={handleSearchBannedUser}
                        />
                        <div className='div-center gap-2'>
                            <div>
                                <BigButton className={'rounded-[10px!important] px-5 icon-button-hover '} title={`${from} - ${to}`} />
                            </div>
                            <div className='div-center gap-2'>
                                <IconButton disabled={page === 1} onClick={() => setPage(prev => Math.max(prev - 1, 1))} Icon={IoMdArrowBack} size={20} />
                                <IconButton disabled={page >= totalPages} onClick={() => setPage(prev => prev + 1)} Icon={IoMdArrowForward} size={20} />
                            </div>
                        </div>
                    </div>
                    <Underline className={"mt-4"} />
                    {!isBannedLoading ?
                        <table className='w-[100%] border-collapse'>
                            <thead>
                                <tr className='divider-bottom '>
                                    <th className='medium-text-large-weight text-left p-[20px_13px]'>USERNAME</th>
                                    <th className='medium-text-large-weight text-left p-[20px_13px]'>DURATION</th>
                                    <th className='medium-text-large-weight text-left p-[20px_13px]'>DATE</th>
                                    <th className='medium-text-large-weight text-left p-[20px_13px]'>NOTE</th>
                                    <th className='medium-text-large-weight text-left p-[20px_13px]'>REASON</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {bannedUserList.map((item, key) => (
                                    <tr className='divider-bottom ' key={key} onMouseLeave={() => handleMouseLeave()} onMouseEnter={() => handleMouseEnter(key)}>
                                        <td className='div-center gap-2 small-text-small-weight text-left p-[20px_13px]'>
                                            <img
                                                // src={`${FILE_URL}/${data?.chat_room_picture}`}
                                                src={`${FILE_URL}/${item?.user?.profile_avtar}`}
                                                alt=""
                                                className='img-small-style'
                                            />
                                            {item?.user?.username}
                                        </td>
                                        <td className='small-text-small-weight text-left p-[20px_13px]'>{item?.ban_duration === null ? "Permanent" : getTimeLeft(item?.ban_duration)}</td>
                                        <td className='small-text-small-weight text-left p-[20px_13px]'>{formatDate(item?.created_at)}</td>
                                        <td className='small-text-small-weight text-left p-[20px_13px]'>{truncateText(item?.mod_note, 10)}</td>
                                        <td className='small-text-small-weight text-left p-[20px_13px]'>{truncateText(item?.ban_reason, 30)}</td>
                                        <td className={`div-center gap-3 p-[20px_13px] transition-opacity duration-200 ${ruleHovered === key ? 'opacity-100' : 'opacity-0'}`}>
                                            <IconButton onClick={() => handleBanRemove(item?._id)} className={'teritory-bg'} Icon={PiHammer} size={20} />
                                            <IconButton onClick={() => handleEdit(item)} Icon={GoPencil} size={20} />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        : (isBannedLoading || isSearchBannedLoading) ? <CircularLoader /> : null}
                </div>
                <EditBannedUser data={editedData} showEditPanel={showEditPanel} setShowEditPanel={setShowEditPanel} />
            </div>
        </>
    )
}

function RemoveBan({
    isOpen,
    setModal,
    userBanId }) {

    const { mutate, isPending } = useRemoveUserBan();

    function handleRemove() {
        mutate({ ban_id: userBanId });
        setModal(false)
    }
    return (
        <div className="modal-overlay div-center-justify-center">
            <div className="small-modal-content  flex  flex-col ">
                <div className='div-center-justify mb-3'>
                    <p className='large-text-normal-weight'>Are You Sure?</p>
                    <IconButton Icon={IoMdClose} onClick={() => setModal(false)} />
                </div>
                <p className='small-text-normal-weight '>They'll be able to participate in your tribe again.</p>
                <div className='div-center-justify gap-3 mt-7'>
                    <BigButton onClick={() => setModal(false)} className={'secondary-bg my-4 w-full rounded-[20px!important] text-[#fff]'} title={'Cancel'} />
                    <BigButton loading={isPending} onClick={handleRemove} className={'teritory-bg px-4 rounded-[20px!important] w-full text-[#fff]'} title={'Yes, Remove'} />
                </div>
            </div>
        </div>
    )
}