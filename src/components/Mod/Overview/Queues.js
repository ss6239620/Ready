import React, { useState } from 'react'
import BigButton from '../../../utils/buttons/BigButton'
import { darkColorTheme } from '../../../constant';
import SimpleDropdown from '../../../utils/dropdown/SimpleDropdown';
import { modQueuesAllcontentDropdown, modQueuesNewestFirstDropdown } from '../../../asset/data/modData';
import RadioInput from '../../../utils/input/RadioInput';
import { FaAngleDown } from 'react-icons/fa';
import ImageDropDown from '../../../utils/dropdown/ImageDropDown';

export default function Queues() {
    const [selectedTab, setSelectedTab] = useState(0);
    const [contentFilter, setcontentFilter] = useState(modQueuesAllcontentDropdown[0]);
    const [timeFIlter, settimeFIlter] = useState(modQueuesNewestFirstDropdown[0]);

    function handleTabSwitch(tabNum) {
        setSelectedTab(tabNum);
    }
    return (
        <div className='main-content'>
            <div className='div-center' style={{ padding: 15, justifyContent: 'space-between' }}>
                <h1 style={{ marginBlock: 0 }}>Queue</h1>
                <div>
                    somethings
                </div>
            </div>
            <div className='div-center' style={{ padding: 15, justifyContent: 'space-between' }}>
                <div>
                    <div style={{ display: "flex", gap: 10 }}>
                        <BigButton
                            className={`${selectedTab === 0 ? 'secondary-bg' : ''}`}
                            style={{
                                borderRadius: 50,
                                paddingInline: 15,
                                padding: 0
                            }}
                            title={"Need Reviews"}
                            onClick={() => handleTabSwitch(0)}
                        />
                        <BigButton
                            className={`${selectedTab === 1 ? 'secondary-bg' : ''}`}
                            style={{
                                borderRadius: 50,
                                paddingInline: 15,
                            }}
                            title={"Reported"}
                            onClick={() => handleTabSwitch(1)}
                        />
                        <BigButton
                            className={`${selectedTab === 2 ? 'secondary-bg' : ''}`}
                            style={{
                                borderRadius: 50,
                                paddingInline: 15,
                            }}
                            title={"Removed"}
                            onClick={() => handleTabSwitch(2)}
                        />
                        <BigButton
                            className={`${selectedTab === 3 ? 'secondary-bg' : ''}`}
                            style={{
                                borderRadius: 50,
                                paddingInline: 15,
                            }}
                            title={"Edited"}
                            onClick={() => handleTabSwitch(3)}
                        />
                        <BigButton
                            className={`${selectedTab === 4 ? 'secondary-bg' : ''}`}
                            style={{
                                borderRadius: 50,
                                paddingInline: 15,
                            }}
                            title={"unmoderted"}
                            onClick={() => handleTabSwitch(4)}
                        />
                    </div>
                </div>
                <div className='div-center' style={{ gap: 20 }}>
                    <ImageDropDown style={{ cursor: 'pointer' }} source={require('../../../asset/img/logo.png')} childStyle={{ right: 0, width: 170, padding: 10 }}>

                    </ImageDropDown>
                    <SimpleDropdown title={contentFilter} childStyle={{ right: 0, width: 170, padding: 10 }}>
                        {
                            modQueuesAllcontentDropdown.map((item, key) => (
                                <RadioInput key={key} style={{}} title={item} selected={contentFilter} setSelected={setcontentFilter} />
                            ))
                        }
                    </SimpleDropdown>
                    <SimpleDropdown title={timeFIlter} childStyle={{ right: 0, width: 170, padding: 10 }}>
                        {
                            modQueuesNewestFirstDropdown.map((item, key) => (
                                <RadioInput key={key} style={{}} title={item} selected={timeFIlter} setSelected={settimeFIlter} />
                            ))
                        }
                    </SimpleDropdown>
                </div>
            </div>
        </div>
    )
}
