import React, { useState } from 'react'
import BigButton from '../../../utils/buttons/BigButton'
import Search from '../../../utils/Search';
import '../../../asset/css/util.css'
import IconButton from '../../../utils/buttons/IconButton';
import { IoMdArrowBack, IoMdArrowForward, IoMdClose } from "react-icons/io";
import Underline from '../../../utils/Underline';
import { GoPencil } from 'react-icons/go';
import { PiCheckLight, PiHammer } from 'react-icons/pi';
import { validateEmptyString } from '../../../utils/CommonFunction';
import Basicinput from '../../../utils/input/Basicinput';
import Biginput from '../../../utils/input/Biginput';
import BasicInputDropDown from '../../../utils/dropdown/BasicInputDropDown';

export default function RestrictedUsers() {
    const [selectedTab, setSelectedTab] = useState(0);
    const [ruleHovered, setRuleHovered] = useState(null);
    const [banUserModal, setBanUserModal] = useState(false);

    function handleMouseEnter(id) {
        setRuleHovered(id);
    }

    function handleMouseLeave() {
        setRuleHovered(null);
    }

    function handleTabSwitch(tabNum) {
        setSelectedTab(tabNum);
    }

    const data = [
        {
            username: 'u/ggg',
            duration: 'Permanent',
            date: '01/31/25',
            note: 'bitch',
            reason: 'Rule 1',
            subReason: 'null',
        },
    ];

    return (
        <div className='pr-7 mod-padding div-col  gap-2'>
            <BanUserModal isOpen={banUserModal} setModal={setBanUserModal} />
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
                        <BigButton className={'rounded-[10px!important] px-5 icon-button-hover '} title={`1 - 1`} />
                        <div className='div-center gap-2'>
                            <IconButton Icon={IoMdArrowBack} size={20} />
                            <IconButton Icon={IoMdArrowForward} size={20} />
                        </div>
                    </div>
                </div>
                <Underline className={"mt-4"} />
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
                        {data.map((item, key) => (
                            <tr className='divider-bottom ' key={key} onMouseLeave={() => handleMouseLeave()} onMouseEnter={() => handleMouseEnter(key)}>
                                <td className='div-center gap-2 medium-text-normal-weight text-left p-[20px_8px]'>
                                    <img
                                        // src={`${FILE_URL}/${data?.chat_room_picture}`}
                                        src={require('../../../asset/img/logo.png')}
                                        alt=""
                                        className='img-small-style'
                                    />
                                    {item.username}
                                </td>
                                <td className='medium-text-normal-weight text-left p-[20px_8px]'>{item.duration}</td>
                                <td className='medium-text-normal-weight text-left p-[20px_8px]'>{item.date}</td>
                                <td className='medium-text-normal-weight text-left p-[20px_8px]'>{item.note}</td>
                                <td className='medium-text-normal-weight text-left p-[20px_8px]'>{item.reason}</td>
                                <td className={`div-center gap-3 p-[20px_8px] ${ruleHovered === key ? '' : 'opacity-0 pointer-events-none'}`}>
                                    <IconButton className={'teritory-bg'} Icon={PiHammer} size={20} />
                                    <IconButton Icon={GoPencil} size={20} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>

    )


    function BanUserModal({
        isOpen,
        setModal,
        formValues,
        setFormValues,
    }) {
        const [ruleSelected, setRuleSelected] = useState(0)
        if (!isOpen) return null;

        function handleClick() {
            setModal(false);
        }

        function changeChoosen(key, closeDropdown) {
            setRuleSelected(key);
            if (closeDropdown) closeDropdown();
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
                            <Basicinput
                                placeHolder={"Search users"}
                                className={'mt-4 secondary-bg'}
                                style={{ padding: 10 }}
                                validationFunc={validateEmptyString}
                            />

                            <BasicInputDropDown title={"Rules"} className={'mt-4'}  >
                                {(closeDropdown) => (
                                    <div className='w-[100%] px-5'>
                                        {[1, 2, 3, 4, 5].map((item, key) => (
                                            <div className={`icon-button-hover div-center-justify rounded-xl cursor-pointer ${ruleSelected === key ? "border-[1px] border-solid " : ""} p-2`} key={key} onClick={() => changeChoosen(key,closeDropdown)}>
                                                <p className={`small-text-normal-weight`}>Rule {key + 1}: <span >Lorem ipsum dolor sit amet </span></p>
                                                {ruleSelected === key && <PiCheckLight size={20} />}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </BasicInputDropDown>

                            <BasicInputDropDown title={"Ban Length"} className={'mt-4'}  >
                                {(closeDropdown) => (
                                    <div className='w-[100%] px-5'>
                                        {[1, 3, 7, 28, "Permanent", "Custom"].map((item, key) => (
                                            <div className={`icon-button-hover div-center-justify rounded-xl cursor-pointer ${ruleSelected === key ? "border-[1px] border-solid " : ""} p-2`} key={key} onClick={() => changeChoosen(key, closeDropdown)}>
                                                <p className={`small-text-normal-weight `}>{typeof item === "number" ? `${item} day` : item}</p>
                                                {ruleSelected === key && <PiCheckLight size={20} />}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </BasicInputDropDown>

                            <Biginput
                                placeHolder={"Message"}
                                minHeight={30}
                                className={'mt-4'}
                            />
                            <Biginput
                                placeHolder={"Mod note"}
                                minHeight={15}
                                className={'mt-4'}
                            />
                        </div>
                        <div className='div-center gap-3 justify-end w-[95%]'>
                            <BigButton onClick={()=>setModal(false)} className={'secondary-bg my-4 rounded-[20px!important] text-[#fff]'} title={'Cancel'} />
                            <BigButton onClick={() => setBanUserModal(true)} className={'teritory-bg px-4 rounded-[20px!important] text-[#fff]'} title={'Ban'} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
