import React, { useState } from 'react'
import BigButton from '../../../../utils/buttons/BigButton'
import { darkColorTheme } from '../../../../constant';
import SimpleDropdown from '../../../../utils/dropdown/SimpleDropdown';
import { modQueuesAllcontentDropdown, modQueuesNewestFirstDropdown } from '../../../../asset/data/modData';
import RadioInput from '../../../../utils/input/RadioInput';
import { FaAngleDown } from 'react-icons/fa';
import ImageDropDown from '../../../../utils/dropdown/ImageDropDown';
import '../../../../asset/css/mod.css'
import { useSearchParams } from 'react-router-dom';
import { Mods_Overview_Queue } from '../../../../asset/data/searchParamsData';
import UnmoderatorTab from './UnmoderatorTab';
import NeedReviewTab from './NeedReviewTab';
import ReportedTab from './ReportedTab';
import RemovedTab from './RemovedTab';
import EditedTab from './EditedTab';

export default function Queues() {
    const [contentFilter, setcontentFilter] = useState(modQueuesAllcontentDropdown[0]);
    const [timeFIlter, settimeFIlter] = useState(modQueuesNewestFirstDropdown[0]);

    const [searchParams, setSearchParams] = useSearchParams();
    const currentTab = searchParams.get("tab") || Mods_Overview_Queue.Unmoderted;

    const handleTabSwitch = (tab) => {
        setSearchParams({ tab });
    }
    return (
        <div className="main-content !pt-10  pr-7 !h-[calc(100vh-60px)] flex flex-col">
            <div className='sticky top-0 z-10'>
                <div className='div-center-justify ' >
                    <h1 className='extra-large-text-large-weight'>Queue</h1>
                    <div>
                        somethings
                    </div>
                </div>
                <div className="div-center-justify my-4 pb-2">
                    <div>
                        <div className='flex' >
                            <BigButton
                                className={`${currentTab === Mods_Overview_Queue.Unmoderted ? 'secondary-bg' : ''} rounded-[50px!important] px-4`}
                                title={"Unmoderted"}
                                onClick={() => handleTabSwitch(Mods_Overview_Queue.Unmoderted)}
                            />
                            <BigButton
                                className={`${currentTab === Mods_Overview_Queue.Need_Review ? 'secondary-bg' : ''} rounded-[50px!important] px-4`}
                                title={"Needs Review"}
                                onClick={() => handleTabSwitch(Mods_Overview_Queue.Need_Review)}
                            />
                            <BigButton
                                className={`${currentTab === Mods_Overview_Queue.Reported ? 'secondary-bg' : ''} rounded-[50px!important] px-4`}
                                title={"Reported"}
                                onClick={() => handleTabSwitch(Mods_Overview_Queue.Reported)}
                            />
                            <BigButton
                                className={`${currentTab === Mods_Overview_Queue.Removed ? 'secondary-bg' : ''} rounded-[50px!important] px-4`}
                                title={"Removed"}
                                onClick={() => handleTabSwitch(Mods_Overview_Queue.Removed)}
                            />
                            <BigButton
                                className={`${currentTab === Mods_Overview_Queue.Edited ? 'secondary-bg' : ''} rounded-[50px!important] px-4`}
                                title={"Edited"}
                                onClick={() => handleTabSwitch(Mods_Overview_Queue.Edited)}
                            />
                        </div>
                    </div>
                    <div className='div-center gap-5'>
                        <ImageDropDown className='cursor-pointer' childClassName={'right-0 w-[170px] p-3'} source={require('../../../../asset/img/logo.png')} >
                        </ImageDropDown>
                        <SimpleDropdown title={contentFilter} childClassName={'right-0 w-[220px] p-3'} >
                            {(closeDropDown => (
                                modQueuesAllcontentDropdown.map((item, key) => (
                                    <RadioInput onCLose={closeDropDown} key={key} title={item} selected={contentFilter} setSelected={setcontentFilter} />
                                ))))
                            }
                        </SimpleDropdown>

                        <SimpleDropdown title={timeFIlter} childClassName={'right-0 w-[250px] p-3'}>
                            {(closeDropDown => (
                                modQueuesNewestFirstDropdown.map((item, key) => (
                                    <RadioInput onCLose={closeDropDown} key={key} title={item} selected={timeFIlter} setSelected={settimeFIlter} />
                                ))))
                            }
                        </SimpleDropdown>
                    </div>
                </div>
            </div>
            {/* Scrollable Content Area */}
            {currentTab === Mods_Overview_Queue.Unmoderted &&
                <div className="overflow-y-auto flex-grow slectDivContainer">
                    <UnmoderatorTab />
                </div>
            }
            {currentTab === Mods_Overview_Queue.Need_Review &&
                <div className="overflow-y-auto flex-grow slectDivContainer">
                    <NeedReviewTab />
                </div>
            }
            {currentTab === Mods_Overview_Queue.Reported &&
                <div className="overflow-y-auto flex-grow slectDivContainer">
                    <ReportedTab />
                </div>
            }
            {currentTab === Mods_Overview_Queue.Removed &&
                <div className="overflow-y-auto flex-grow slectDivContainer">
                    <RemovedTab />
                </div>
            }
            {currentTab === Mods_Overview_Queue.Edited &&
                <div className="overflow-y-auto flex-grow slectDivContainer">
                    <EditedTab />
                </div>
            }
        </div>
    )
}
