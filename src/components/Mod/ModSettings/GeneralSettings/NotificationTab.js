import React, { useState } from 'react'
import { MdKeyboardArrowRight } from 'react-icons/md'
import { ModNotificationTabRowInput } from '../../../../asset/data/modData';
import ToggleInput from '../../../../utils/input/ToggleInput';
import { NotificationActivityModal } from './GeneralModal';

export default function NotificationTab() {
    const [rowInput, setRowInput] = useState(null);
    const [modalHandle, setModalHandle] = useState({
        allow_notification: false,
        activity: false,
        mod_mail: false,
        reports: false,
        milestones: false,
        tips_tricks: false,
    });

    function handleNotificationModal(name, value) {
        setModalHandle(prev => ({
            ...prev, [name]: value
        }));
    }

    function handleMouseEnter(key) {
        setRowInput(key)
    }

    function handleMouseLeave() {
        setRowInput(null);
    }

    return (
        <div className='mt-4 w-[70%]'>
            {modalHandle.activity && <NotificationActivityModal name={'activity'} handleNotificationModal={handleNotificationModal} />}
            {/* {modalHandle.mature && <TribeMatureModal name={'mature'} handlePrivacyModal={handleNotificationModal} />} */}
            {
                ModNotificationTabRowInput.map((item, key) => (
                    item.method_type === 'icon' ?
                        <div key={key} onMouseLeave={handleMouseLeave} onMouseEnter={() => handleMouseEnter(key)} onClick={() => handleNotificationModal(item.id, true)} className={`${(!modalHandle.allow_notification && item.id !=='allow_notification') && 'pointer-events-none' }`}>
                            <IconRowModalInput item={item} disabled={!modalHandle.allow_notification} hoverEffect={rowInput === key} />
                        </div>
                        : <div key={key} className={`${(!modalHandle.allow_notification && item.id !=='allow_notification') && 'pointer-events-none' }`}>
                            <SwitchRowModalInput disabled={(!modalHandle.allow_notification && item.id !=='allow_notification')}  handleNotificationModal={handleNotificationModal} value={modalHandle[item.id]} item={item} />
                        </div>
                ))
            }
        </div>
    )
}

function IconRowModalInput({ item, hoverEffect, disabled }) {
    return (
        <div className='div-center-justify p-1 my-2 cursor-pointer'>
            <div>
                <a className={`medium-text-normal-weight ${disabled && 'text-[var(--text-teritory)]'}`}>{item.title}</a>
            </div>
            <div className={`p-2 rounded-3xl ${hoverEffect && !disabled && 'bg-[var(--secondary)]'}`}>
                <MdKeyboardArrowRight size={20} color={`${disabled && 'gray'}`} />
            </div>
        </div>
    )
}

function SwitchRowModalInput({ item, handleNotificationModal, value, disabled }) {
    function handleClick() {
        if (disabled) return;
        handleNotificationModal(item.id, !value);
    }

    return (
        <div className='div-center-justify p-1 my-2 cursor-pointer' onClick={handleClick}>
            <div>
                <a className={`medium-text-normal-weight ${disabled && 'text-[var(--text-teritory)]'}`}>{item.title}</a>
                <p className={`small-text-normal-weight text-[var(--text-secondary)] ${disabled && '!text-[var(--text-teritory)]'} `}>{item.desc}</p>
            </div>
            <ToggleInput selected={value} disabled={disabled} />
        </div>
    );
}
