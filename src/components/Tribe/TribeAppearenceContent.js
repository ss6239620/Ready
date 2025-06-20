import React, { useState } from 'react'
import { AiOutlineDelete } from 'react-icons/ai'
import IconButton from '../../utils/buttons/IconButton'
import FileInput from '../../utils/input/FileInput';
import Basicinput from '../../utils/input/Basicinput';
import BigButton from '../../utils/buttons/BigButton';
import { FiPlus } from "react-icons/fi";
import { Saturation, Hue, useColor } from "react-color-palette";
import "react-color-palette/css";
import { validateColorHex } from '../../utils/CommonFunction';

function AppearanceIcon({ values, name, handleChangeValues }) {
    const [deleted, setDeleted] = useState(false);

    function handleFileChange(file) {
        handleChangeValues(name, {
            imagefile: file,
            isUpdated: true
        });
    }
    return (
        <div>
            {!deleted && !values.isUpdated ?
                <div className='div-center-justify !items-end px-4 py-5'>
                    <div></div>
                    <img
                        src={values.image}
                        className='object-contain size-[130px] rounded-[50%]'
                        alt='profile-icon'
                    />
                    <IconButton onClick={() => setDeleted(true)} size={20} Icon={AiOutlineDelete} />
                </div>
                :
                <div className='px-1'>
                    <FileInput
                        placeHolder={"Drag and drop or browse your device"}
                        className={'my-7'}
                        setFile={handleFileChange}
                        file={values.imagefile}
                        fileTypes={["image"]}
                    />
                </div>
            }
        </div>
    )
}

function AppearanceBanner({ values, name, handleChangeValues }) {
    const [deleted, setDeleted] = useState(false);

    function handleFileChange(file) {
        handleChangeValues(name, {
            imagefile: file,
            isUpdated: true
        });
    }

    return (
        <>
            <h3 className='medium-text-large-weight capitalize'>Banner Image</h3>
            {!deleted && !values.isUpdated ?
                <div className='div-center-justify !items-end px-4 py-5'>
                    <div></div>
                    <img
                        src={values?.image}
                        className='object-contain size-[130px] rounded-[50%]'
                        alt='profile-icon'
                    />
                    <IconButton onClick={() => setDeleted(true)} size={20} Icon={AiOutlineDelete} />
                </div>
                :
                <div className='px-1'>
                    <FileInput
                        placeHolder={"Drag and drop or browse your device"}
                        className={'my-7'}
                        setFile={handleFileChange}
                        file={values.imagefile}
                        fileTypes={["image"]}
                    />
                </div>
            }
            <a className='small-text-normal-weight'>For good results, the image should be at least 1072 x 128px for desktop banners.</a>
        </>
    )
}

function AppearanceColor({ title, values, name, handleChangeValues }) {
    const [showPallet, setshowPallet] = useState(false);
    const [color, setColor] = useColor(values.colorHex);

    function handleChange(value) {
        setColor(value);
        handleChangeValues(name, {
            colorHex: value.hex,
            isUpdated: true
        });
    }
    function handleReset() {
        setshowPallet(false);
        handleChangeValues(name, {
            colorHex: '#000000',
            isUpdated: false
        });
    }
    function handleEditInput(value) {
        handleChangeValues(name, {
            colorHex: value,
            isUpdated: true
        });
    }
    return (
        <div>
            <a className='small-text-normal-weight'>{title}</a>
            {!showPallet && !values.isUpdated ?
                <div className='flex flex-col'>
                    <a className='small-text-normal-weight text-[var(--text-secondary)]'>This tribe is currently using default color.</a>
                    <BigButton
                        title={"Add Custom Color"}
                        Icon={FiPlus}
                        className={'justify-center bg-[var(--partial-secondary)] mb-4 mt-2 !rounded-full'}
                        onClick={() => setshowPallet(true)}
                    />
                </div>
                :
                <div>
                    <div className='flex flex-col'>
                        <div style={{ backgroundColor: color.hex }} className={`my-3 h-[50px] rounded-lg `} />
                        <div className='mb-3'>
                            <div>
                                <a className='medium-text-large-weight text-[var(--text-secondary)]'>Saturation</a>
                                <Saturation height={200} color={color} onChange={handleChange} />
                            </div>
                            <div>
                                <a className='medium-text-large-weight text-[var(--text-secondary)]'>Hue</a>
                                <Hue color={color} onChange={handleChange} />
                            </div>
                        </div>
                        <Basicinput
                            placeHolder={"Hex code(optional)"}
                            value={values.colorHex}
                            className={'py-3'}
                            setFormValues={handleEditInput}
                            isSingleValueSetter
                            validationFunc={validateColorHex}
                        />
                        <BigButton
                            title={"Reset to Default"}
                            Icon={FiPlus}
                            className={'justify-center bg-[var(--partial-secondary)] mb-4 mt-2 !rounded-full'}
                            onClick={handleReset}
                        />
                    </div>
                </div>
            }
        </div>
    )
}

function DiscardChanges({ setModal }) {
    function handleClick() {
        setModal(false);
        window.location.reload();
    }
    return (
        <div className="modal-overlay div-center-justify-center ">
            <div className="modal-content flex flex-col relative !h-auto ">
                <h2 className='large-text-large-weight'>Discard unsaved changes?</h2>
                <p className='medium-text-normal-weight'>Any changes you've made to your community appearance won't be saved.</p>
                <div className='div-center justify-end gap-3'>
                    <BigButton onClick={() => setModal(false)} className={'partial-secondary-bg my-4 px-4 rounded-[20px!important] justify-center  '} title={'Cancel'} />
                    <BigButton onClick={handleClick} className={'accent-bg px-6 rounded-[20px!important] justify-center'} title={'Yes, Discard'} />
                </div>
            </div>
        </div>
    )
}

export { AppearanceIcon, AppearanceBanner, AppearanceColor, DiscardChanges }
