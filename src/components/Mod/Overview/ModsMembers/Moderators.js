import React, { useState } from 'react'
import { Mods_And_Moderators_Tabs } from '../../../../asset/data/searchParamsData';
import BigButton from '../../../../utils/buttons/BigButton';
import { useSearchParams } from 'react-router-dom';
import ModeratorsTab from './ModeratorsTab';
import ApprovedUserTab from './ApprovedUserTab';
import InviteTab from './InviteTab';

export default function Moderators() {
    const [searchParams, setSearchParams] = useSearchParams();
    const currentTab = searchParams.get("tab") || Mods_And_Moderators_Tabs.Moderators;

    function handleTabSwitch(tab) {
        setSearchParams({ tab });
    }
    return (
        <div className='pr-7 mod-padding div-col  gap-2'>
            <h1 className='large-title'>Mods & Members</h1>
            <div className='div-center-justify mt-4' >
                <div className='flex gap-3' >
                    <BigButton
                        className={`${currentTab === Mods_And_Moderators_Tabs.Moderators ? 'secondary-bg' : ''} rounded-[50px!important] px-4`}
                        title={"Moderators"}
                        onClick={() => handleTabSwitch(Mods_And_Moderators_Tabs.Moderators)}
                    />
                    <BigButton
                        className={`${currentTab === Mods_And_Moderators_Tabs.Approved_Users ? 'secondary-bg' : ''} rounded-[50px!important] px-4`}
                        title={"Approved Users"}
                        onClick={() => handleTabSwitch(Mods_And_Moderators_Tabs.Approved_Users)}
                    />
                    <BigButton
                        className={`${currentTab === Mods_And_Moderators_Tabs.Invite ? 'secondary-bg' : ''} rounded-[50px!important] px-4`}
                        title={"Invite"}
                        onClick={() => handleTabSwitch(Mods_And_Moderators_Tabs.Invite)}
                    />
                </div>
            </div>
            {currentTab === Mods_And_Moderators_Tabs.Moderators &&
                <ModeratorsTab />
            }
            {currentTab === Mods_And_Moderators_Tabs.Approved_Users &&
                <ApprovedUserTab />
            }
            {currentTab === Mods_And_Moderators_Tabs.Invite &&
                <InviteTab />
            }
        </div>
    )
}
