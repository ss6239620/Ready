import React, { useState } from 'react'
import BigButton from '../../../../utils/buttons/BigButton';
import Biginput from '../../../../utils/input/Biginput';
import { PiCheckLight } from 'react-icons/pi';
import BasicInputDropDown from '../../../../utils/dropdown/BasicInputDropDown';
import Basicinput from '../../../../utils/input/Basicinput';
import { IoMdClose } from 'react-icons/io';
import IconButton from '../../../../utils/buttons/IconButton';
import { useSearchUsers } from '../../../../hooks/authHook';
import { useBanUser } from '../../../../hooks/modHook';
import { FILE_URL } from '../../../../constant';
import { validateEmptyString } from '../../../../utils/CommonFunction';

export default function BanUserModal({
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

    const { mutate, isPending,  } = useBanUser();

    const { data, isLoading, isFetching } = useSearchUsers({
        query: serachTerm,
        page: 1,
    });

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
        setModal(false);
    }

    return (
        <div className="modal-overlay div-center-justify-center">
            <div className="modal-content flex  flex-col px-[30px!important] ">
                <div className='div-center-justify'>
                    <h2 className='large-text-large-weight'>Ban User</h2>
                    <IconButton onClick={() => setModal(false)} size={25} Icon={IoMdClose} />
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
