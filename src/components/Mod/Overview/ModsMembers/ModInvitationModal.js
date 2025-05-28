import React, { useState } from 'react'
import Basicinput from '../../../../utils/input/Basicinput';
import Checkbox from '../../../../utils/input/Checkbox';
import BigButton from '../../../../utils/buttons/BigButton';
import { validateEmptyString } from '../../../../utils/CommonFunction';
import { useSearchUsers } from '../../../../hooks/authHook';
import { FILE_URL } from '../../../../constant';
import { IoMdClose } from 'react-icons/io';
import IconButton from '../../../../utils/buttons/IconButton';
import { useInviteMember } from '../../../../hooks/modHook';

export default function ModInvitationModal({ isOpen, setModal }) {
    const [userSelected, setUserSelected] = useState(false);
    const [username, setUsername] = useState("");
    const [serachTerm, setSerachTerm] = useState("");
    const [formValues, setFormValues] = useState({
        invite_user_id: '',
        everything: false,
        users: false,
        channels: false,
        chat_config: false,
    });

    const { mutate, isPending, error, isError } = useInviteMember();

    const { data, isLoading, isFetching } = useSearchUsers({
        query: serachTerm,
        page: 1,
    });

    function handleChange(name, value) {
        setFormValues((prev) => ({
            ...prev, [name]: value,
        }));
    }

    function handleClick(params) {
        let selectedPermissions = [];

        if (formValues.everything) selectedPermissions.push("Everything");
        if (formValues.users) selectedPermissions.push("Posts_And_Comments");
        if (formValues.channels) selectedPermissions.push("Config");
        if (formValues.chat_config) selectedPermissions.push("Chat_Config");

        const payload = {
            user_id: formValues.invite_user_id,
            permissions: selectedPermissions
        }

        mutate(payload)
        setModal(false);
    }

    function clickUser(user) {
        toggleDisabledUser();
        setUsername(user?.username);
        handleChange("invite_user_id", user?._id)
    }

    function toggleDisabledUser() {
        setUserSelected((prev) => !prev);
    }
    return (
        <div className="modal-overlay div-center-justify-center">
            <div className="small-modal-content  flex  flex-col ">
                <div className='div-center-justify mb-3'>
                    <h2 className='large-text-large-weight'>Invite Mod</h2>
                </div>
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
                    {/* Show search results if available */}
                    {data?.length > 0 && !userSelected && (
                        <div className='absolute h-[210px] overflow-y-scroll bg-[var(--background)] w-full z-[1000] left-1/2 transform -translate-x-1/2'>
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
                            {(isLoading || isFetching) && <div>Loading...</div>}
                        </div>
                    )}
                </div>
                <div className='gap-2 flex-col mt-4'>
                    <CheckBoxTitle checked={formValues.everything} onChangeChecked={() => handleChange("everything", !formValues.everything)} title={"Everything"} desc={"Full access including the ability to manage moderator access and permissions."} />

                    <CheckBoxTitle checked={formValues.users} onChangeChecked={() => handleChange("users", !formValues.users)} title={"Users"} desc={"Access mod notes, ban and mute users, and approve submitters*."} />

                    <CheckBoxTitle checked={formValues.channels} onChangeChecked={() => handleChange("channels", !formValues.channels)} title={"Channels"} desc={"Create, edit, and delete channels."} />

                    <CheckBoxTitle checked={formValues.chat_config} onChangeChecked={() => handleChange("chat_config", !formValues.chat_config)} title={"Chat Config"} desc={"Create live chat posts in this community."} />

                </div>
                <div className='div-center gap-3 justify-end w-[95%]'>
                    <BigButton onClick={() => setModal(false)} className={'secondary-bg my-4 px-4 rounded-[20px!important] text-[#fff]'} title={'Cancel'} />
                    <BigButton loading={isPending} onClick={handleClick} className={'teritory-bg px-4 rounded-[20px!important] text-[#fff]'} title={'Send Invite'} />
                </div>
            </div>
        </div>
    )
}

function CheckBoxTitle({ title, desc, checked, onChangeChecked }) {
    return (
        <div className='div-center gap-2'>
            <Checkbox checked={checked} onChange={onChangeChecked} />
            <div>
                <h3 className='medium-text-normal-weight'>{title}</h3>
                <p className='small-text-small-weight text-[var(--text-secondary)]'>{desc}</p>
            </div>
        </div>
    )
}
