import React from 'react'
import BigButton from '../../../../utils/buttons/BigButton';
import { useSearchParams } from 'react-router-dom';
import { Restrict_Users_Tabs } from '../../../../asset/data/searchParamsData';
import BannedUser from './BannedUser';
import MuteUser from './MuteUser';

export default function RestrictedUsers() {
    const [searchParams, setSearchParams] = useSearchParams();
    const currentTab = searchParams.get("tab") || Restrict_Users_Tabs.BANNED;

    const handleTabSwitch = (tab) => {
        setSearchParams({ tab });
    }

    return (
        <div className='pr-7 mod-padding div-col  gap-2'>
            <h1 className='large-title'>Restrict Users</h1>
            <div className='div-center-justify mt-4' >
                <div className='flex gap-3' >
                    <BigButton
                        className={`${currentTab === Restrict_Users_Tabs.BANNED ? 'secondary-bg' : ''} rounded-[50px!important] px-4`}
                        title={"Banned"}
                        onClick={() => handleTabSwitch(Restrict_Users_Tabs.BANNED)}
                    />
                    <BigButton
                        className={`${currentTab === Restrict_Users_Tabs.MUTED ? 'secondary-bg' : ''} rounded-[50px!important] px-4`}
                        title={"Muted"}
                        onClick={() => handleTabSwitch(Restrict_Users_Tabs.MUTED)}

                    />
                </div>
            </div>
            {currentTab === Restrict_Users_Tabs.BANNED &&
               <BannedUser />
            }
            {currentTab === Restrict_Users_Tabs.MUTED &&
                <MuteUser />
            }
        </div>
    )
}
