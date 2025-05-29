import React, { useEffect, useState } from 'react';
import BigButton from '../../../../utils/buttons/BigButton';
import IconButton from '../../../../utils/buttons/IconButton';
import { IoMdClose } from 'react-icons/io';
import BasicInputDropDown from '../../../../utils/dropdown/BasicInputDropDown';
import { PiCheckLight } from 'react-icons/pi';
import Biginput from '../../../../utils/input/Biginput';
import Basicinput from '../../../../utils/input/Basicinput';
import { getBanDurationInDays } from '../../../../utils/CommonFunction';
import { FILE_URL } from '../../../../constant';
import { useUpdateUserBan } from '../../../../hooks/modHook';

export default function EditBannedUser({ showEditPanel, setShowEditPanel, data }) {
    const [formValues, setFormValues] = useState({
        ban_reason: "",
        mod_note: "",
        msg_to_user: "",
        ban_duration: 1,
        ban_id: ""
    });

    const { mutate, isPending, } = useUpdateUserBan();

    const [banSelected, setBanSelected] = useState(0);
    const [ruleSelected, setRuleSelected] = useState(0);

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

    function handleSave(params) {
        mutate(formValues);
        setShowEditPanel(false);
    }

    const rulesList = ["Spam", "Personal and confidential information", "Threatening, harassing, or inciting violence", "Other"];
    const banOptions = [1, 3, 7, 28, "Permanent"];

    useEffect(() => {
        if (showEditPanel && data) {
            setFormValues({
                ban_reason: data?.ban_reason || "",
                mod_note: data?.mod_note || "",
                ban_id: data?._id || "",
                msg_to_user: data?.msg_to_user || "",
                ban_duration: getBanDurationInDays(data?.ban_duration) || 1,
            });

            // Optional: Reset selections based on incoming data
            const ruleIndex = rulesList.findIndex(r => r === data?.ban_reason);
            setRuleSelected(ruleIndex !== -1 ? ruleIndex : 0);

            const banIndex = banOptions.findIndex(opt =>
                opt === (data?.ban_duration === -1 ? "Permanent" : getBanDurationInDays(data?.ban_duration))
            );
            setBanSelected(banIndex !== -1 ? banIndex : 0);
        }
    }, [showEditPanel, data]);


    return (
        <div
            className={`
                fixed top-0 right-0 h-screen w-[25%] p-3 z-50 divider-left  bg-[var(--background)]
                transition-transform duration-500 mod-padding div-col overflow-auto
                ${showEditPanel ? 'translate-x-0' : 'translate-x-full'}
            `}
        >
            <div className='div-center-justify'>
                <p className="extra-large-text-normal-weight">Edit Ban</p>
                <div className='div-center gap-3'>
                    <BigButton onClick={handleSave} title={"Save"} className={'bg-[var(--accent)] px-4 !rounded-3xl '} />
                    <IconButton Icon={IoMdClose} onClick={() => setShowEditPanel(false)} />
                </div>
            </div>
            <div className='mt-8 p-3'>
                <div className='div-center gap-1'>
                    <img
                        src={`${FILE_URL}/${data?.user?.profile_avtar}`}
                        alt=""
                        className="img-small-style"
                    />
                    <div>
                        <a className='medium-text-normal-weight hover:underline cursor-pointer'>u/{data?.user?.username}</a>
                    </div>
                </div>
                <BasicInputDropDown title={"Rules"} choosenData={formValues.ban_reason} className={'mt-4'}  >
                    {(closeDropdown) => (
                        <div className='w-[100%] px-5'>
                            {rulesList.map((item, key) => (
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
                            {banOptions.map((item, key) => (
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
                <Basicinput
                    placeHolder={"Mod note"}
                    className={'mt-4 bg-[var(--secondary)]'}
                    setFormValues={setFormValues}
                    value={formValues.mod_note}
                    name={"mod_note"}
                />
            </div>
        </div>
    );
}
