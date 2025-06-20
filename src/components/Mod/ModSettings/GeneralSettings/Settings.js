import React from 'react'
import BigButton from '../../../../utils/buttons/BigButton'
import { useSearchParams } from 'react-router-dom';
import { ModGeneralSettingTab } from '../../../../asset/data/modData';
import GeneralTab from './GeneralTab';
import PrivacyDiscoveryTab from './PrivacyDiscoveryTab';
import NotificationTab from './NotificationTab';

export default function Settings() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentTab = searchParams.get("tab") || ModGeneralSettingTab.General;

  function handleTabSwitch(tab) {
    setSearchParams({ tab });
  }
  return (
    <div className='!px-7 mod-padding div-col  gap-2'>
      <h1 className='large-title'>Settings</h1>
      <div className='div-center-justify mt-4' >
        <div className='flex gap-3' >
          <BigButton
            className={`${currentTab === ModGeneralSettingTab.General ? 'secondary-bg' : ''} !rounded-[50px] px-4`}
            title={"General"}
            onClick={() => handleTabSwitch(ModGeneralSettingTab.General)}
          />
          <BigButton
            className={`${currentTab === ModGeneralSettingTab.Privacy_and_Discovery ? 'secondary-bg' : ''} rounded-[50px!important] px-4`}
            title={"Privacy & Discovery"}
            onClick={() => handleTabSwitch(ModGeneralSettingTab.Privacy_and_Discovery)}
          />
          <BigButton
            className={`${currentTab === ModGeneralSettingTab.Notifications ? 'secondary-bg' : ''} rounded-[50px!important] px-4`}
            title={"Notifications"}
            onClick={() => handleTabSwitch(ModGeneralSettingTab.Notifications)}
          />
        </div>
      </div>
      {currentTab === ModGeneralSettingTab.General && <GeneralTab />}
      {currentTab === ModGeneralSettingTab.Privacy_and_Discovery && <PrivacyDiscoveryTab />}
      {currentTab === ModGeneralSettingTab.Notifications && <NotificationTab />}
    </div>
  )
}
