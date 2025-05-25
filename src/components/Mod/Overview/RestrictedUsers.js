import React, { useState } from 'react'
import BigButton from '../../../utils/buttons/BigButton'
import Search from '../../../utils/Search';
import '../../../asset/css/util.css'
import IconButton from '../../../utils/buttons/IconButton';
import { IoMdArrowBack, IoMdArrowForward, IoMdClose } from "react-icons/io";
import Underline from '../../../utils/Underline';
import { GoPencil } from 'react-icons/go';
import { PiCheckLight, PiHammer } from 'react-icons/pi';
import { formatDate, getTimeLeft, truncateText, validateEmptyString } from '../../../utils/CommonFunction';
import Basicinput from '../../../utils/input/Basicinput';
import Biginput from '../../../utils/input/Biginput';
import BasicInputDropDown from '../../../utils/dropdown/BasicInputDropDown';
import { useSearchUsers } from '../../../hooks/authHook';
import { FILE_URL } from '../../../constant';
import { useBanUser, useGetBanUsers, useRemoveUserBan } from '../../../hooks/modHook';
import CircularLoader from '../../../utils/CircularLoader';

export default function RestrictedUsers() {
    const [selectedTab, setSelectedTab] = useState(0);
    const [ruleHovered, setRuleHovered] = useState(null);
    const [banUserModal, setBanUserModal] = useState(false);
    const [removeUserBanModal, setRemoveUserBanModal] = useState(false);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(5);
    const [banUserId, setBanUserId] = useState(null)

    const { data, isLoading: isBannedLoading } = useGetBanUsers(page, limit);

    const bannedUserData = data?.data || [];
    const totalCount = data?.totalCount || 0;

    const from = (page - 1) * limit + 1;
    const to = Math.min(page * limit, totalCount);
    const totalPages = Math.ceil(totalCount / limit);

    function handleMouseEnter(id) {
        setRuleHovered(id);
    }

    function handleMouseLeave() {
        setRuleHovered(null);
    }

    function handleTabSwitch(tabNum) {
        setSelectedTab(tabNum);
    }

    function handleBanRemove(id) {
        setBanUserId(id)
        setRemoveUserBanModal(true);
    }

    return (
        <div className='pr-7 mod-padding div-col  gap-2'>
            <BanUserModal isOpen={banUserModal} setModal={setBanUserModal} />
            <RemoveBan isOpen={removeUserBanModal} setModal={setRemoveUserBanModal} userBanId={banUserId} />
            <h1 className='large-title'>Restrict Users</h1>
            <div className='div-center-justify my-4' >
                <div className='flex gap-3' >
                    <BigButton
                        className={`${selectedTab === 0 ? 'secondary-bg' : ''} rounded-[50px!important] px-4`}
                        title={"Banned"}
                        onClick={() => handleTabSwitch(0)}
                    />
                    <BigButton
                        className={`${selectedTab === 1 ? 'secondary-bg' : ''} rounded-[50px!important] px-4`}
                        title={"Muted"}
                        onClick={() => handleTabSwitch(1)}
                    />
                </div>
            </div>
            <div className='w-[70%] flex flex-col'>
                <div className="flex self-end">
                    <BigButton onClick={() => setBanUserModal(true)} className={'accent-bg my-4 border-radius-large text-[#fff]'} title={'Ban User'} />
                </div>
                <div className='div-center-justify'>
                    <div>
                        <p className='small-text-normal-weight  '>Ban evasion filter</p>
                        <p className='small-text-normal-weight'>Automatically filter content from suspected ban evaders. <span className='accent-text hover:underline cursor-pointer'>Learn more about ban evasion.</span></p>
                    </div>
                </div>
                <div className='div-center-justify mt-3'>
                    <Search placeholder={"Search Users"} />
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
                                <th className='medium-text-large-weight text-left p-[20px_8px]'>USERNAME</th>
                                <th className='medium-text-large-weight text-left p-[20px_8px]'>DURATION</th>
                                <th className='medium-text-large-weight text-left p-[20px_8px]'>DATE</th>
                                <th className='medium-text-large-weight text-left p-[20px_8px]'>NOTE</th>
                                <th className='medium-text-large-weight text-left p-[20px_8px]'>REASON</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {bannedUserData.map((item, key) => (
                                <tr className='divider-bottom ' key={key} onMouseLeave={() => handleMouseLeave()} onMouseEnter={() => handleMouseEnter(key)}>
                                    <td className='div-center gap-2 medium-text-normal-weight text-left p-[20px_8px]'>
                                        <img
                                            // src={`${FILE_URL}/${data?.chat_room_picture}`}
                                            src={`${FILE_URL}/${item?.user?.profile_avtar}`}
                                            alt=""
                                            className='img-small-style'
                                        />
                                        {item?.user?.username}
                                    </td>
                                    <td className='small-text-normal-weight text-left p-[20px_8px]'>{item?.ban_duration === null ? "Permanent" : getTimeLeft(item?.ban_duration)}</td>
                                    <td className='small-text-normal-weight text-left p-[20px_8px]'>{formatDate(item?.created_at)}</td>
                                    <td className='small-text-normal-weight text-left p-[20px_8px]'>{truncateText(item?.mod_note, 10)}</td>
                                    <td className='small-text-normal-weight text-left p-[20px_8px]'>{truncateText(item?.ban_reason, ruleHovered === key ? 20 : 100)}</td>
                                    <td className={`div-center gap-3 p-[20px_8px] transition-opacity duration-200 ${ruleHovered === key ? 'opacity-100' : 'opacity-0'}`}>
                                        <IconButton onClick={() => handleBanRemove(item?._id)} className={'teritory-bg'} Icon={PiHammer} size={20} />
                                        <IconButton Icon={GoPencil} size={20} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    : <CircularLoader />}
            </div>
        </div>

    )


    function BanUserModal({
        isOpen,
        setModal,
    }) {
        const [ruleSelected, setRuleSelected] = useState(0);
        const [banSelected, setBanSelected] = useState(0);
        const [userSelected, setUserSelected] = useState(false);
        const [username, setUsername] = useState("")
        const [serachTerm, setSerachTerm] = useState("");

        const [formValues, setFormValues] = useState({
            ban_reason: "",
            ban_user_id: "",
            mod_note: "",
            msg_to_user: "",
            ban_duration: 1,
        })

        const { mutate, isPending, isError, error } = useBanUser();

        const { data, isLoading, isFetching } = useSearchUsers({
            query: serachTerm,
            page: 1,
        });

        if (!isOpen) return null;

        function changeChoosenRule(key, closeDropdown, rules) {
            setFormValues((prev) => ({
                ...prev, ban_reason: rules
            }));
            setRuleSelected(key);
            if (closeDropdown) closeDropdown();
        }

        function changeChoosenBan(key, closeDropdown, ban) {
            setFormValues((prev) => ({
                ...prev, ban_duration: ban === "Permanent" ? -1 : ban
            }));
            setBanSelected(key);
            if (closeDropdown) closeDropdown();
        }

        function toggleDisabledUser() {
            setUserSelected((prev) => !prev);
        }

        function clickUser(user) {
            toggleDisabledUser();
            setUsername(user?.username);
            setFormValues((prev) => ({
                ...prev, ban_user_id: user?._id
            }));
        }

        function handleClick(params) {
            mutate(formValues)
            setBanUserModal(false);
        }

        return (
            <div className="modal-overlay div-center-justify-center">
                <div className="modal-content flex  flex-col px-[30px!important] ">
                    <div className='div-center-justify'>
                        <h2 className='large-text-large-weight'>Ban User</h2>
                        <IconButton onClick={() => setBanUserModal(false)} size={25} Icon={IoMdClose} />
                    </div>
                    <div className='justify-between overflow-y-scroll my-4'>
                        <div className='w-[95%]'>
                            <div className='relative'>
                                <Basicinput
                                    placeHolder={userSelected ? `u/${username}` : "Search users"}
                                    className={'mt-4 secondary-bg'}
                                    style={{ padding: 10 }}
                                    validationFunc={validateEmptyString}
                                    setFormValues={setSerachTerm}
                                    value={serachTerm}
                                    name={"serach"}
                                    isSingleValueSetter
                                    disabled={userSelected}
                                    disableRemoveFunc={toggleDisabledUser}
                                />
                                <div className='absolute bg-[var(--background)] w-full z-[1000] left-1/2 transform -translate-x-1/2'>
                                    {/* Show search results if available */}
                                    {data?.length > 0 && !userSelected && (
                                        <div className="mt-2">
                                            {data.map((item, index) => (
                                                <div key={index}
                                                    onClick={() => clickUser(item)}
                                                    className="div-center-justify px-[15px] icon-button-hover cursor-pointer "
                                                >
                                                    <div className="div-center gap-2 my-4" >
                                                        <img
                                                            src={`${FILE_URL}/${item?.profile_avtar}`}
                                                            alt=""
                                                            className="img-small-style"
                                                        />
                                                        <a
                                                            className='medium-text-normal-weight'
                                                        >
                                                            u/{item?.username}
                                                        </a>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                    {(isLoading || isFetching) && <div>Loading...</div>}
                                </div>
                            </div>
                            <BasicInputDropDown title={"Rules"} choosenData={formValues.ban_reason} className={'mt-4'}  >
                                {(closeDropdown) => (
                                    <div className='w-[100%] px-5'>
                                        {["Spam", "Personal and confidential information", "Threatening, harassing, or inciting violence", "Other"].map((item, key) => (
                                            <div className={`icon-button-hover div-center-justify rounded-xl cursor-pointer ${ruleSelected === key ? "border-[1px] border-solid " : ""} p-2`} key={key} onClick={() => changeChoosenRule(key, closeDropdown, item)}>
                                                <p className={`small-text-normal-weight`}>Rule {key + 1}: <span >{item}</span></p>
                                                {ruleSelected === key && <PiCheckLight size={20} />}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </BasicInputDropDown>

                            <BasicInputDropDown title={"Ban Length"} choosenData={`${formValues.ban_duration} days`} className={'mt-4'}  >
                                {(closeDropdown) => (
                                    <div className='w-[100%] px-5'>
                                        {[1, 3, 7, 28, "Permanent"].map((item, key) => (
                                            <div className={`icon-button-hover div-center-justify rounded-xl cursor-pointer ${banSelected === key ? "border-[1px] border-solid " : ""} p-2`} key={key} onClick={() => changeChoosenBan(key, closeDropdown, item)}>
                                                <p className={`small-text-normal-weight `}>{typeof item === "number" ? `${item} day` : item}</p>
                                                {banSelected === key && <PiCheckLight size={20} />}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </BasicInputDropDown>

                            <Biginput
                                placeHolder={"Message"}
                                minHeight={30}
                                className={'mt-4'}
                                setFormValues={setFormValues}
                                value={formValues.msg_to_user}
                                name={"msg_to_user"}
                            />
                            <Biginput
                                placeHolder={"Mod note"}
                                minHeight={15}
                                className={'mt-4'}
                                setFormValues={setFormValues}
                                value={formValues.mod_note}
                                name={"mod_note"}
                            />
                        </div>
                        <div className='div-center gap-3 justify-end w-[95%]'>
                            <BigButton onClick={() => setModal(false)} className={'secondary-bg my-4 rounded-[20px!important] text-[#fff]'} title={'Cancel'} />
                            <BigButton onClick={handleClick} className={'teritory-bg px-4 rounded-[20px!important] text-[#fff]'} title={'Ban'} loading={isPending} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


function RemoveBan({
    isOpen,
    setModal,
    userBanId
}) {
    const { mutate, isPending } = useRemoveUserBan();

    function handleRemove() {
        mutate({ ban_id: userBanId });
        setModal(false)
    }

    if (!isOpen) return null;

    return (
        <div className="modal-overlay div-center-justify-center">
            <div className="small-modal-content  flex  flex-col ">
                <div className='div-center-justify mb-3'>
                    <p className='large-text-normal-weight'>Are You Sure?</p>
                    <IconButton Icon={IoMdClose} onClick={() => setModal(false)} />
                </div>
                <p className='small-text-normal-weight '>They'll be able to participate in your community again.</p>
                <div className='div-center-justify gap-3 mt-7'>
                    <BigButton onClick={() => setModal(false)} className={'secondary-bg my-4 w-full rounded-[20px!important] text-[#fff]'} title={'Cancel'} />
                    <BigButton loading={isPending} onClick={handleRemove} className={'teritory-bg px-4 rounded-[20px!important] w-full text-[#fff]'} title={'Yes, Remove'} />
                </div>
            </div>
        </div>
    )
}
