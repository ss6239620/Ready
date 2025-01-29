import React, { useState } from 'react'
import BigButton from '../../../utils/buttons/BigButton'
import { darkColorTheme } from '../../../constant';
import SimpleDropdown from '../../../utils/dropdown/SimpleDropdown';
import { modQueuesAllcontentDropdown, modQueuesNewestFirstDropdown } from '../../../asset/data/modData';
import RadioInput from '../../../utils/input/RadioInput';
import { FaAngleDown } from 'react-icons/fa';
import ImageDropDown from '../../../utils/dropdown/ImageDropDown';
import '../../../asset/css/mod.css'

export default function Queues() {
    const [selectedTab, setSelectedTab] = useState(0);
    const [contentFilter, setcontentFilter] = useState(modQueuesAllcontentDropdown[0]);
    const [timeFIlter, settimeFIlter] = useState(modQueuesNewestFirstDropdown[0]);

    function handleTabSwitch(tabNum) {
        setSelectedTab(tabNum);
    }
    return (
        <div className='main-content mod-padding'>
            <div className='div-center-justify ' >
                <h1 className='extra-large-text-large-weight'>Queue</h1>
                <div>
                    somethings
                </div>
            </div>
            <div className='div-center-justify my-4' >
                <div>
                    <div className='flex gap-3' >
                        <BigButton
                            className={`${selectedTab === 0 ? 'secondary-bg' : ''} rounded-[50px!important] px-4`}
                            title={"Need Reviews"}
                            onClick={() => handleTabSwitch(0)}
                        />
                        <BigButton
                            className={`${selectedTab === 1 ? 'secondary-bg' : ''} rounded-[50px!important] px-4`}
                            title={"Reported"}
                            onClick={() => handleTabSwitch(1)}
                        />
                        <BigButton
                            className={`${selectedTab === 2 ? 'secondary-bg' : ''} rounded-[50px!important] px-4`}
                            title={"Removed"}
                            onClick={() => handleTabSwitch(2)}
                        />
                        <BigButton
                            className={`${selectedTab === 3 ? 'secondary-bg' : ''} rounded-[50px!important] px-4`}
                            title={"Edited"}
                            onClick={() => handleTabSwitch(3)}
                        />
                        <BigButton
                            className={`${selectedTab === 4 ? 'secondary-bg' : ''} rounded-[50px!important] px-4`}
                            title={"unmoderted"}
                            onClick={() => handleTabSwitch(4)}
                        />
                    </div>
                </div>
                <div className='div-center gap-5'>
                    <ImageDropDown className='cursor-pointer' childClassName={'right-0 w-[170px] p-3'} source={require('../../../asset/img/logo.png')} >

                    </ImageDropDown>
                    <SimpleDropdown title={contentFilter} childClassName={'right-0 w-[170px] p-3'} >
                        {
                            modQueuesAllcontentDropdown.map((item, key) => (
                                <RadioInput key={key}  title={item} selected={contentFilter} setSelected={setcontentFilter} />
                            ))
                        }
                    </SimpleDropdown>
                    <SimpleDropdown title={timeFIlter} childClassName={'right-0 w-[170px] p-3'}>
                        {
                            modQueuesNewestFirstDropdown.map((item, key) => (
                                <RadioInput key={key}  title={item} selected={timeFIlter} setSelected={settimeFIlter} />
                            ))
                        }
                    </SimpleDropdown>
                </div>
            </div>
        </div>
    )
}
