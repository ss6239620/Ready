import React, { useState } from 'react'
import { IoMdArrowBack, IoMdClose } from 'react-icons/io'
import IconButton from '../../../../utils/buttons/IconButton'
import BigButton from '../../../../utils/buttons/BigButton'
import Underline from '../../../../utils/Underline'
import LimitInput from '../../../../utils/input/LimitInput'
import ToggleInput from '../../../../utils/input/ToggleInput'
import BasicInputDropDown from '../../../../utils/dropdown/BasicInputDropDown'
import { PiCheckLight } from 'react-icons/pi'
import Basicinput from '../../../../utils/input/Basicinput'
import { TbWorld } from 'react-icons/tb'
import { MdKeyboardArrowRight } from 'react-icons/md'

function DisplayNameModal({ name, handleSettingModal, }) {
    const [formValue, setFormValue] = useState('');
    return (
        <div className="modal-overlay div-center-justify-center ">
            <div className="small-modal-content  flex  flex-col relative z-[] ">
                <div className='div-center-justify mb-3'>
                    <h2 className='large-text-large-weight'>Display name</h2>
                    <IconButton onClick={() => handleSettingModal(name, false)} size={25} Icon={IoMdClose} />
                </div>
                <p className='medium-text-normal-weight'>Changing your tribe's display name won't change your tribe name</p>
                <LimitInput
                    setFormValues={setFormValue}
                    value={formValue}
                    placeHolder={'Display name'}
                    isSingleValueSetter
                    className={'mt-2'}
                />
                <div className='div-center gap-3 justify-end mt-5'>
                    <BigButton onClick={() => handleSettingModal(name, false)} className={'secondary-bg my-4 px-4 rounded-[20px!important]  '} title={'Cancel'} />
                    <BigButton className={'accent-bg px-6 rounded-[20px!important]  '} title={'Add'} />
                </div>
            </div>
        </div>
    )
}

function DescriptionModal({ name, handleSettingModal, }) {
    const [formValue, setFormValue] = useState('');

    return (
        <div className="modal-overlay div-center-justify-center ">
            <div className="small-modal-content  flex  flex-col relative z-[] ">
                <div className='div-center-justify mb-3'>
                    <h2 className='large-text-large-weight'>Description</h2>
                    <IconButton onClick={() => handleSettingModal(name, false)} size={25} Icon={IoMdClose} />
                </div>
                <p className='medium-text-normal-weight'>Descriptions help users discover and understand your tribe.</p>
                <LimitInput
                    setFormValues={setFormValue}
                    value={formValue}
                    placeHolder={'Description'}
                    isSingleValueSetter
                    className={'mt-2'}
                    maxChars={500}
                    type='textarea'
                />
                <div className='div-center gap-3 justify-end mt-5'>
                    <BigButton onClick={() => handleSettingModal(name, false)} className={'secondary-bg my-4 px-4 rounded-[20px!important]  '} title={'Cancel'} />
                    <BigButton className={'accent-bg px-6 rounded-[20px!important]  '} title={'Add'} />
                </div>
            </div>
        </div>
    )
}

function WelcomeMessageModal({ name, handleSettingModal, }) {
    const [formValue, setFormValue] = useState('');
    const [toggle, setToggle] = useState(false);

    return (
        <div className="modal-overlay div-center-justify-center ">
            <div className="small-modal-content  flex  flex-col relative z-[] ">
                <div className='div-center-justify mb-3'>
                    <h2 className='large-text-large-weight'>Welcome message</h2>
                    <IconButton onClick={() => handleSettingModal(name, false)} size={25} Icon={IoMdClose} />
                </div>
                <p className='medium-text-normal-weight'>Greet people when they join your tribe. New tribe members will see this in a direct message 1 hour after joining.</p>
                <div className='div-center-justify mt-2'>
                    <p className='medium-text-normal-weight'>Send welcome message to new members</p>
                    <ToggleInput selected={toggle} setSelected={setToggle} />
                </div>
                <LimitInput
                    disabled={!toggle}
                    setFormValues={setFormValue}
                    value={formValue}
                    placeHolder={'Welcome message'}
                    isSingleValueSetter
                    className={'mt-2'}
                    maxChars={5000}
                    type='textarea'
                    hideTotalChar
                />
                <div className='div-center gap-3 justify-end mt-5'>
                    <BigButton onClick={() => handleSettingModal(name, false)} className={'secondary-bg my-4 px-4 rounded-[20px!important]  '} title={'Cancel'} />
                    <BigButton className={'accent-bg px-6 rounded-[20px!important]  '} title={'Add'} />
                </div>
            </div>
        </div>
    )
}

function CommentThreadModal({ name, handleSettingModal, }) {
    const [formValues, setFormValues] = useState({
        default_comment_sort: "",
        hide_comment_score_for_minutes: 0,
        collapse_deleted_comment: false,
    });

    const [sortSelected, setSortSelected] = useState(0);

    function changeDefaultSort(key, closeDropdown, sort) {
        setFormValues((prev) => ({
            ...prev, default_comment_sort: sort
        }));
        setSortSelected(key);
        if (closeDropdown) closeDropdown();
    }

    function changeCollapsedComment(value) {
        setFormValues((prev) => ({
            ...prev, collapse_deleted_comment: value
        }))
    }

    return (
        <div className="modal-overlay div-center-justify-center ">
            <div className="small-modal-content  flex  flex-col relative z-[] ">
                <div className='div-center-justify mb-3'>
                    <h2 className='large-text-large-weight'>Comment threads</h2>
                    <IconButton onClick={() => handleSettingModal(name, false)} size={25} Icon={IoMdClose} />
                </div>
                <BasicInputDropDown title={"Rules"} childClassName={'!rounded-none'} choosenData={formValues.default_comment_sort} className={''}  >
                    {(closeDropdown) => (
                        <div className='w-[100%] overflow-auto h-[200px] slectDivContainer' >
                            {["Best", "Old", "Top", "Q&A", "Controversial", "New", "None"].map((item, key) => (
                                <div className={`icon-button-hover div-center-justify cursor-pointer ${sortSelected === key ? "border-[1px] border-solid " : ""} p-2`} key={key} onClick={() => changeDefaultSort(key, closeDropdown, item)}>
                                    <p className={`small-text-normal-weight`}>{item}</p>
                                    {sortSelected === key && <PiCheckLight size={20} />}
                                </div>
                            ))}
                        </div>
                    )}
                </BasicInputDropDown>
                <div className='div-center-justify my-4'>
                    <p className='small-text-small-weight'>Hide comment scores for</p>
                    <Basicinput
                        placeHolder={'Minutes'}
                        setFormValues={setFormValues}
                        value={formValues.hide_comment_score_for_minutes}
                        name={'hide_comment_score_for_minutes'}
                        type={'number'}
                    />
                </div>
                <div className='div-center-justify my-4'>
                    <p className='small-text-small-weight'>Collapse deleted and removed comments</p>
                    <ToggleInput selected={formValues.collapse_deleted_comment} setSelected={changeCollapsedComment} />
                </div>
                <div className='div-center gap-3 justify-end mt-5'>
                    <BigButton onClick={() => handleSettingModal(name, false)} className={'secondary-bg my-4 px-4 rounded-[20px!important]  '} title={'Cancel'} />
                    <BigButton className={'accent-bg px-6 rounded-[20px!important]  '} title={'Add'} />
                </div>
            </div>
        </div>
    )
}

function TribeTypeModal({ name, handlePrivacyModal, }) {
    return (
        <div className="modal-overlay div-center-justify-center ">
            <div className="small-modal-content  flex  flex-col relative z-[] ">
                <div className='div-center-justify mb-3'>
                    <h2 className='large-text-large-weight'>Tribe Type</h2>
                    <IconButton onClick={() => handlePrivacyModal(name, false)} size={25} Icon={IoMdClose} />
                </div>
            </div>
        </div>
    )
}

function TribeMatureModal({ name, handlePrivacyModal, }) {
    const [requestChange, setRequestChange] = useState(false);
    const [requestChangeText, setRequestChangeText] = useState('')

    return (
        <div className="modal-overlay div-center-justify-center ">
            <div className="small-modal-content  flex  flex-col relative z-[] ">
                {!requestChange ?
                    <div>
                        <div className='div-center-justify mb-3'>
                            <h2 className='large-text-large-weight'>Tribe Type</h2>
                            <IconButton onClick={() => handlePrivacyModal(name, false)} size={20} Icon={IoMdClose} />
                        </div>
                        <div className='div-center gap-2'>
                            <IconButton size={20} Icon={TbWorld} hoverEffectDisabled />
                            <h2 className='medium-text-normal-weight'>Mature (18+) is currently on</h2>
                        </div>
                        <Underline sizeInPx={3} className={'mt-2 mb-4'} />
                        <p className='medium-text-normal-weight'>Labeling your tribe as Mature (18+) prevents people who don't want to see mature content or who haven't confirmed that they're over 18 from seeing your tribe.</p>
                        <div className='div-center gap-3 justify-end mt-5'>
                            <BigButton onClick={() => setRequestChange(true)} className={'secondary-bg my-4 px-4 rounded-[20px!important] '} title={'Request change'} />
                            <BigButton onClick={() => handlePrivacyModal(name, false)} className={'accent-bg px-6 rounded-[20px!important]'} title={'Done'} />
                        </div>
                    </div>
                    :
                    <div>
                        <div className='div-center-justify mb-3 gap-2'>
                            <IconButton onClick={() => setRequestChange(false)} size={20} Icon={IoMdArrowBack} />
                            <h2 className='large-text-large-weight'>Request to change Mature (18+) label?</h2>
                            <IconButton onClick={() => handlePrivacyModal(name, false)} size={20} Icon={IoMdClose} />
                        </div>
                        <h2 className='medium-text-normal-weight'>Let us know why you're changing and we'll get in touch via mod mail.</h2>
                        <Underline sizeInPx={3} className={'mt-2 mb-4'} />
                        <LimitInput
                            setFormValues={setRequestChangeText}
                            value={requestChangeText}
                            placeHolder={'Reason for change'}
                            isSingleValueSetter
                            className={'mt-2'}
                            maxChars={500}
                            type='textarea'
                        />
                        <div className='div-center gap-3 justify-end mt-5'>
                            <BigButton onClick={() => handlePrivacyModal(name, false)} className={'accent-bg px-6 rounded-[20px!important]'} title={'Submit Request'} />
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

function NotificationActivityModal({ name, handleNotificationModal, }) {
    const [formValues, setFormValues] = useState({
        new_post: false,
    });

    function handleFormValues(name, value) {
        setFormValues(prev => ({
            ...prev, [name]: value
        }));
    }

    return (
        <div className="modal-overlay div-center-justify-center ">
            <div className="small-modal-content  flex  flex-col relative z-[] ">
                <div className='div-center-justify mb-3'>
                    <h2 className='large-text-large-weight'>Activity</h2>
                    <IconButton onClick={() => handleNotificationModal(name, false)} size={20} Icon={IoMdClose} />
                </div>
                <div className='div-center-justify gap-2 my-2' >
                    <h2 className='medium-text-normal-weight'>New Posts</h2>
                    <ToggleInput selected={formValues.new_post} onChange={() => handleFormValues('new_post', !formValues.new_post)} />
                </div>
                <div className='div-center-justify mb-3'>
                    <div>
                        <h2 className='medium-text-normal-weight'>Activity</h2>
                        <p className={`small-text-small-weight text-[var(--text-secondary)]`}>Know when posts in your tribe are upvoted.</p>
                    </div>
                    <IconButton size={20} Icon={MdKeyboardArrowRight} />
                </div>
            </div>
        </div>
    )
}

export { DisplayNameModal, CommentThreadModal, DescriptionModal, WelcomeMessageModal, TribeTypeModal, TribeMatureModal, NotificationActivityModal }