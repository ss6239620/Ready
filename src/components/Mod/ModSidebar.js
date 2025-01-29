import React, { useEffect, useState } from 'react'
import IconButton from '../../utils/buttons/IconButton'
import { IoIosArrowDown, IoMdArrowBack } from 'react-icons/io'
import { darkColorTheme } from '../../constant'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { RiArrowLeftDoubleFill } from "react-icons/ri";
import { GrNotes } from "react-icons/gr";
import '../../asset/css/mod.css'
import { LuExternalLink } from "react-icons/lu";
import { modSidebarContentELemnet, modSidebarModerationELemnet, modSidebarOverviewELemnet, modSidebarSettingELemnet, routeMap } from '../../asset/data/modData'
import Underline from '../../utils/Underline'

function SideBarElements({ data, Icon, isSelected, onClick }) {
    const navigate = useNavigate();

    return (
        <div onClick={onClick} className='div-center-justify pr-5 cursor-pointer'>
            <div className='div-center gap-3' >
                <div className={`${isSelected ? 'bg-[var(--teritory)]' : 'bg-[transparent]'} h-[50px] w-[6px] rounded-md`} />
                <Icon size={20} />
                <a className="small-text-normal-weight primary-text " >{data?.title}</a>
            </div>
            {data?.external_link && <LuExternalLink size={20} />}
        </div>
    )
}

export default function ModSidebar() {
    const [selectedItem, setSelectedItem] = useState({ list: "overview", key: 0 });
    const navigate = useNavigate();

    let { id } = useParams();
    const location = useLocation();

    const handleSelection = (list, key, route) => {
        setSelectedItem({ list, key });
        navigate(`${id}/${route}`)
    };

    function handleNavigation(component) {
        navigate(`${component}`)
    }

    useEffect(() => {
        // Extract the route after the ID
        const relativePath = location.pathname.split(`${id}/`)[1];
        const removeslash=relativePath.split('/')[0];
        
        if (routeMap[removeslash]) {
            setSelectedItem(routeMap[removeslash]);
        }
    }, [location.pathname, id]);

    return (
        <div
            className="slectDivContainer main-content fixed-bg divider-right fixed-component top-1 left-0 w-[270] max-h-[calc(100vh_-_70px)]"
        >
            <div className='div-center gap-1 cursor-pointer p-3' onClick={() => { navigate(-1) }}>
                <IconButton Icon={IoMdArrowBack} size={20} />
                <a className="medium-text-normal-weight primary-text">Exit mod tools</a>
            </div>

            <div className='px-4'>
                <div className='div-center'>
                    <div className='div-center hover-bg py-4 px-2' >
                        <RiArrowLeftDoubleFill size={20} />
                        <a className="medium-text-normal-weight primary-text">Collapse</a>
                    </div>
                </div>
                <div className='div-center-justify mt-3 mb-5 px-1' >
                    <div className='div-center gap-3' >
                        <img
                            src={require('../../asset/img/logo.png')}
                            alt=""
                            className='img-small-style'
                        />
                        <a className="small-text-normal-weight secondary-text">Collapse</a>
                    </div>
                    <IoIosArrowDown size={20} />
                </div>
            </div>
            <a className="medium-text-normal-weight primary-text px-3 ">OVERVIEW</a>
            <div className='my-1' >
                {
                    modSidebarOverviewELemnet.map((item, key) => (
                        <SideBarElements key={key} data={item} Icon={item.icon} isSelected={selectedItem.list === "overview" && selectedItem.key === key} onClick={() => handleSelection("overview", key,item?.route)} />
                    ))
                }
            </div>
            <Underline color={darkColorTheme.divider} className={'mx-[20%] my-4'} />

            <a className="medium-text-normal-weight primary-text px-3 ">Moderation</a>
            <div className='my-1' >
                {
                    modSidebarModerationELemnet.map((item, key) => (
                        <SideBarElements key={key} data={item} Icon={item.icon} isSelected={selectedItem.list === "moderation" && selectedItem.key === key} onClick={() => handleSelection("moderation", key, item?.route)} />
                    ))
                }
            </div>
            <Underline color={darkColorTheme.divider} sizeInPx={2} className={'mx-[20%] my-4'} />
            <a className="medium-text-normal-weight primary-text px-3 ">CONTENT</a>
            <div className='my-1'>
                {
                    modSidebarContentELemnet.map((item, key) => (
                        <SideBarElements key={key} data={item} Icon={item.icon} isSelected={selectedItem.list === "content" && selectedItem.key === key} onClick={() => handleSelection("content", key,item?.route)} />
                    ))
                }
            </div>
            <Underline color={darkColorTheme.divider} sizeInPx={2} className={'mx-[20%] my-4'} />
            <a className="medium-text-normal-weight primary-text px-3 ">Settings</a>
            <div className='my-1'>
                {
                    modSidebarSettingELemnet.map((item, key) => (
                        <SideBarElements key={key} data={item} Icon={item.icon} isSelected={selectedItem.list === "setting" && selectedItem.key === key} onClick={() => handleSelection("setting", key,item?.route)} />
                    ))
                }
            </div>
        </div>
    )
}
