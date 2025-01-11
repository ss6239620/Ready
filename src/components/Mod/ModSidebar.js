import React, { useState } from 'react'
import IconButton from '../../utils/buttons/IconButton'
import { IoIosArrowDown, IoMdArrowBack } from 'react-icons/io'
import { darkColorTheme } from '../../constant'
import { useNavigate } from 'react-router-dom'
import { RiArrowLeftDoubleFill } from "react-icons/ri";
import { GrNotes } from "react-icons/gr";
import '../../asset/css/mod.css'
import { LuExternalLink } from "react-icons/lu";
import { modSidebarContentELemnet, modSidebarModerationELemnet, modSidebarOverviewELemnet, modSidebarSettingELemnet } from '../../asset/data/modData'
import Underline from '../../utils/Underline'

function SideBarElements({ data, Icon, isSelected, onClick }) {
    return (
        <div onClick={onClick} className='div-center' style={{ justifyContent: 'space-between', paddingRight: 20, cursor: 'pointer' }}>
            <div className='div-center' style={{ gap: 10 }}>
                <div style={{ backgroundColor: isSelected ? 'red' : 'transparent', height: '50px', width: '6px', borderRadius: 5 }} />
                <Icon size={20} />
                <a style={{ marginInline: 3, color: darkColorTheme.secondaryTextColor, fontSize: 15 }}>{data?.title}</a>
            </div>
            {data?.external_link && <LuExternalLink size={20} />}
        </div>
    )
}

export default function ModSidebar() {
    const [selectedItem, setSelectedItem] = useState({ list: "overview", key: 0 });
    const navigate = useNavigate();

    const handleSelection = (list, key) => {
        setSelectedItem({ list, key });
    };

    return (
        <div
            className="slectDivContainer main-content fixed-bg divider-right"
            style={{
                overflowY: "auto",
                maxHeight: "100vh",
                position: 'fixed',
                top: 5,
                maxHeight: "calc(100vh - 70px)", // Adjust based on the header/footer size
                overflowY: "auto",  // Make this section scrollable
                left: 0,
                width: 270,
            }}
        >
            <div className='div-center' style={{ gap: 5, cursor: 'pointer', padding: 10 }} onClick={() => { navigate(-1) }}>
                <IconButton Icon={IoMdArrowBack} size={20} />
                <a style={{ marginInline: 3, color: darkColorTheme.secondaryTextColor, fontSize: 15 }}>Exit mod tools</a>
            </div>

            <div style={{ paddingInline: 15 }}>
                <div className='div-center'>
                    <div className='div-center hover-bg' style={{ paddingBlock: 15, paddingInline: 8 }}>
                        <RiArrowLeftDoubleFill size={20} />
                        <a style={{ marginInline: 3, color: darkColorTheme.secondaryTextColor, fontSize: 15 }}>Collapse</a>
                    </div>
                </div>
                <div className='div-center' style={{ marginTop: 10, marginBottom: 20, paddingInline: 5, justifyContent: 'space-between' }}>
                    <div className='div-center' style={{ gap: 10 }}>
                        <img
                            src={require('../../asset/img/logo.png')}
                            alt=""
                            style={{
                                width: "30px",
                                height: "30px",
                                objectFit: "cover",
                                borderRadius: "50%", // Optional: makes the image circular
                                display: "block", // Removes extra space under image
                            }}
                        />
                        <a style={{ marginInline: 3, color: darkColorTheme.secondaryTextColor, fontSize: 15 }}>Collapse</a>
                    </div>
                    <IoIosArrowDown size={20} />
                </div>
            </div>
            <a style={{ marginInline: 3, color: darkColorTheme.secondaryTextColor, fontSize: 15, paddingInline: 15 }}>OVERVIEW</a>
            <div style={{ marginBlock: 5 }}>
                {
                    modSidebarOverviewELemnet.map((item, key) => (
                        <SideBarElements key={key} data={item} Icon={item.icon} isSelected={selectedItem.list === "overview" && selectedItem.key === key} onClick={() => handleSelection("overview", key)} />
                    ))
                }
            </div>
            <Underline color={darkColorTheme.divider} sizeInPx={2} style={{ marginInline: '20%', marginBlock: 15 }} />

            <a style={{ marginInline: 3, color: darkColorTheme.secondaryTextColor, fontSize: 15, paddingInline: 15 }}>Moderation</a>
            <div style={{ marginBlock: 5 }}>
                {
                    modSidebarModerationELemnet.map((item, key) => (
                        <SideBarElements key={key} data={item} Icon={item.icon} isSelected={selectedItem.list === "moderation" && selectedItem.key === key} onClick={() => handleSelection("moderation", key)} />
                    ))
                }
            </div>
            <Underline color={darkColorTheme.divider} sizeInPx={2} style={{ marginInline: '20%', marginBlock: 15 }} />
            <a style={{ marginInline: 3, color: darkColorTheme.secondaryTextColor, fontSize: 15, paddingInline: 15 }}>CONTENT</a>
            <div style={{ marginBlock: 5 }}>
                {
                    modSidebarContentELemnet.map((item, key) => (
                        <SideBarElements key={key} data={item} Icon={item.icon} isSelected={selectedItem.list === "content" && selectedItem.key === key} onClick={() => handleSelection("content", key)} />
                    ))
                }
            </div>
            <Underline color={darkColorTheme.divider} sizeInPx={2} style={{ marginInline: '20%', marginBlock: 15 }} />
            <a style={{ marginInline: 3, color: darkColorTheme.secondaryTextColor, fontSize: 15, paddingInline: 15 }}>Settings</a>
            <div style={{ marginBlock: 5 }}>
                {
                    modSidebarSettingELemnet.map((item, key) => (
                        <SideBarElements key={key} data={item} Icon={item.icon} isSelected={selectedItem.list === "setting" && selectedItem.key === key} onClick={() => handleSelection("setting", key)} />
                    ))
                }
            </div>
        </div>
    )
}
