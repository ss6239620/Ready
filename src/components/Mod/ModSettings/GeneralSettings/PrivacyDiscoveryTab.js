import React, { useState } from 'react'
import { MdKeyboardArrowRight } from 'react-icons/md'
import { ModPrivacyDiscoveryTabRowInput } from '../../../../asset/data/modData';
import { TribeMatureModal, TribeTypeModal } from './GeneralModal';
import ToggleInput from '../../../../utils/input/ToggleInput';

export default function PrivacyDiscoveryTab() {
    const [rowInput, setRowInput] = useState(null);
    const [modalHandle, setModalHandle] = useState({
        tribe_type: false,
        mature: false,
        appear_in_tribe_field: false,
        appear_in_recommendations: false,
    });

    function handlePrivacyModal(name, value) {
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
            {modalHandle.tribe_type && <TribeTypeModal name={'tribe_type'} handlePrivacyModal={handlePrivacyModal} />}
            {modalHandle.mature && <TribeMatureModal name={'mature'} handlePrivacyModal={handlePrivacyModal} />}
            {
                ModPrivacyDiscoveryTabRowInput.map((item, key) => (
                    item.method_type === 'icon' ?
                        <div key={key} onMouseLeave={handleMouseLeave} onMouseEnter={() => handleMouseEnter(key)} onClick={() => handlePrivacyModal(item.id, true)}>
                            <IconRowModalInput item={item} hoverEffect={rowInput === key} />
                        </div>
                        : <div key={key}>
                            <SwitchRowModalInput handlePrivacyModal={handlePrivacyModal} value={modalHandle[item.id]} item={item} />
                        </div>
                ))
            }
        </div>
    )
}

function IconRowModalInput({ item, hoverEffect, }) {
    return (
        <div className='div-center-justify p-1 my-2 cursor-pointer'>
            <div>
                <a className='medium-text-normal-weight'>{item.title}</a>
                <p className='small-text-normal-weight text-[var(--text-secondary)]'>{item.desc}</p>
            </div>
            <div className='div-center gap-2'>
                <a className='medium-text-normal-weight '>{item.status || ""}</a>
                <div className={`p-2 rounded-3xl ${hoverEffect && 'bg-[var(--secondary)]'}`}>
                    <MdKeyboardArrowRight size={20} />
                </div>
            </div>
        </div>
    )
}

function SwitchRowModalInput({ item, handlePrivacyModal, value }) {
    function handleClick() {
        handlePrivacyModal(item.id, !value);
    }

    return (
        <div className='div-center-justify p-1 my-2 cursor-pointer' onClick={handleClick}>
            <div>
                <a className='medium-text-normal-weight'>{item.title}</a>
                <p className='small-text-normal-weight text-[var(--text-secondary)]'>{item.desc}</p>
            </div>
            <ToggleInput selected={value} />
        </div>
    );
}
