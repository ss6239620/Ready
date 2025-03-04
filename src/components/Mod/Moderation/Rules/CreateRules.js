import React, { useState } from 'react'
import '../../../../asset/css/mod.css'
import BigButton from '../../../../utils/buttons/BigButton';
import IconButton from '../../../../utils/buttons/IconButton';
import LimitInput from '../../../../utils/input/LimitInput'
import { IoMdArrowBack } from "react-icons/io";
import { useNavigate } from 'react-router-dom'
import { useCreateRules } from '../../../../hooks/modHook';
import FailAlert from '../../../../utils/Alert/FailAlert';

export default function CreateRules() {
    const [formValues, setFormValues] = useState({
        rule_name: "",
        rule_desc: "",
        rule_repoet_reason: "",
    });
    const { mutate, isPending, isError, error } = useCreateRules();

    function handleSave() {
        mutate({ rule_title: formValues.rule_name, rule_desc: formValues.rule_desc, rule_reason: formValues.rule_repoet_reason })
    }

    const isDisabled = !formValues.rule_name || !formValues.rule_desc || !formValues.rule_repoet_reason;

    const navigate = useNavigate();
    return (
        <div className='mod-padding pr-[250px] new-rules '>
            {isError && <FailAlert title={error} />}
            <div className='div-center-justify'>
                <div className=''>
                    <div className='div-center gap-3'>
                        <IconButton onClick={() => { navigate(-1) }} className={'p-3'} Icon={IoMdArrowBack} size={25} />
                        <h2 className='large-title my-[0px!important] '>Name and describe your rule</h2>
                    </div>
                    <a className='small-text-normal-weight my-[0px!important] '>Rules set the expectations for members and Tribal Chief visiting your Tribe</a>
                </div>
                <BigButton
                    className={`${isDisabled ? 'bg-[var(--divider)]' : 'bg-[var(--accent)]'} my-4 px-5 border-radius-large text-[#fff]`}
                    title={'Save'}
                    onClick={handleSave}
                    loading={isPending}
                    disabled={isDisabled}
                />
            </div>
            <div className='my-5'>
                <LimitInput placeHolder={'Rule name'} setFormValues={setFormValues} value={formValues.rule_name} name={'rule_name'} maxChars={100} />
            </div>
            <div className='my-5'>
                <LimitInput placeHolder={'Description'} setFormValues={setFormValues} value={formValues.rule_desc} name={'rule_desc'} maxChars={500} type='textarea' />
            </div>
            <div className='my-6'>
                <h2 className='large-text-large-weight my-[0px!important] '>Reporting</h2>
                <a className='small-text-normal-weight my-[0px!important] '>Users or mods can select a report reason when reporting content</a>
                <div className='my-5'>
                    <LimitInput placeHolder={'Report Reason'} setFormValues={setFormValues} value={formValues.rule_repoet_reason} name={'rule_repoet_reason'} maxChars={100} />
                </div>
            </div>
        </div>
    )
}
