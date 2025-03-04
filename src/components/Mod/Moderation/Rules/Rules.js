import React, { useState } from 'react'
import '../../../../asset/css/mod.css'
import BigButton from '../../../../utils/buttons/BigButton';
import Underline from '../../../../utils/Underline';
import { formatDate, formatTime } from '../../../../utils/CommonFunction';
import IconButton from '../../../../utils/buttons/IconButton';
import { AiOutlineDelete } from "react-icons/ai";
import { GoPencil } from 'react-icons/go';
import { PiDotsSixVerticalLight } from 'react-icons/pi';
import { useNavigate } from 'react-router-dom'
import { useDeleteTribeRules, useTribeRules } from '../../../../hooks/modHook';
import FailAlert from '../../../../utils/Alert/FailAlert';

export default function Rules() {
    const [ruleHovered, setRuleHovered] = useState(null);
    const handleMouseEnter = (id) => {
        setRuleHovered(id);
    };

    const handleMouseLeave = () => {
        setRuleHovered(null);
    };
    const { data: rulesData, isLoading: rulesdataLoading, error: rulesDataError } = useTribeRules();

    const { mutate, isPending, isError, error } = useDeleteTribeRules();

    const navigate = useNavigate()

    function handleCreateRule() {
        navigate('new')
    }
    if (rulesdataLoading) {
        return <div className="main-content p-[10px_90px_10px_40px] flex justify-between py-3 ">Loading...</div>;
    }
    function deleteTribeRule(id) {
        mutate({ rule_id: id })
    }

    if (rulesData.length == 0) {
        return (
            <div className='mod-padding div-col gap-2'>
                <h1 className='large-title'>Tribe Rules</h1>
                <div className='div-center-justify-center flex-1 '>
                    <div className='div-col items-center w-[25%] '>
                        <img
                            src={require('../../../../asset/img/logo.png')}
                            alt=""
                            className="img-small-style w-[90px!important] h-[90px!important] "
                        />
                        <h2 className='extra-large-text-large-weight my-[0px!important] '>Create Your First Rule</h2>
                        <a className='medium-text-normal-weight text-center my-[0px!important]'>Rules set expectations for members and other redditors visiting your Tribe</a>
                        <BigButton onClick={handleCreateRule} className={'accent-bg my-4 border-radius-large text-[#fff]'} title={'Create Rule'} />
                    </div>
                </div>
            </div>
        )
    }
    return (
        <div className='pr-7 mod-padding div-col  gap-2'>
            {rulesDataError && <FailAlert title={rulesDataError} />}
            <h1 className='large-title'>Tribe Rules</h1>
            <div className='self-end'>
                <BigButton onClick={handleCreateRule} className={'accent-bg my-4 border-radius-large text-[#fff]'} title={'Create Rule'} />
            </div>
            <div>
                <div className='div-center-justify mb-4'>
                    <a className='medium-text-normal-weight  '>Name</a>
                    <a className='medium-text-normal-weight '>Created</a>
                </div>
                <Underline sizeInPx={0.5} />
                {
                    rulesData?.map((item, key) => (
                        <div key={key} onMouseEnter={() => handleMouseEnter(key)}
                            onMouseLeave={handleMouseLeave}>
                            <div className='div-center-justify my-3'>
                                <div className='div-center gap-4'>
                                    <div><a className='small-text-normal-weight p-1 m-[0px!important] '>{key + 1}</a></div>
                                    <div className='div-col'>
                                        <a className='medium-text-normal-weight my-[0px!important] '>{item?.tribeRuleTitle}</a>
                                        <a className='small-text-normal-weight my-[0px!important] '>{item?.tribeRuleDescription}</a>
                                    </div>
                                </div>
                                {ruleHovered === key ?
                                    <div className='div-center gap-5'>
                                        <div className='div-center gap-2'>
                                            <IconButton className={'teritory-bg'} Icon={AiOutlineDelete} size={20}
                                                onClick={() => deleteTribeRule(item?._id)} />
                                            <IconButton Icon={GoPencil} size={20} />
                                        </div>
                                        <IconButton Icon={PiDotsSixVerticalLight} size={20} />
                                    </div>
                                    :
                                    <div className='div-col div-hide'>
                                        <a className='small-text-normal-weight my-[0px!important] '>{formatDate(item?.updated_at)}</a>
                                        <a className='small-text-normal-weight my-[0px!important] '>{formatTime(item?.updated_at)}</a>
                                    </div>
                                }
                            </div>
                            <Underline sizeInPx={0.5} />
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
