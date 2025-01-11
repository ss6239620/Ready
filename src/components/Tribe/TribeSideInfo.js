import React from 'react'
import { darkColorTheme } from '../../constant'
import { GiCakeSlice } from 'react-icons/gi'
import { BsGlobe2 } from 'react-icons/bs'

export default function TribeSideInfo({ tribeDetail, style }) {
    return (
        <div className='fixed-bg' style={{  flex: 1, borderRadius: 10, paddingInline: 20, paddingBlock: 10,...style }}>
            <div>
                <div>
                    <h4 style={{ marginBlock: 5 }}>Subheading</h4>
                    <a style={{ fontSize: 15, color: darkColorTheme.secondaryTextColor }}>
                        {tribeDetail.tribeDescription}
                    </a>
                </div>
                <div style={{ marginBlock: 15 }}>
                    <div style={{ display: 'flex', marginBlock: 5 }}>
                        <GiCakeSlice size={20} color={darkColorTheme.secondaryTextColor} />
                        <a style={{ marginLeft: 10, fontSize: 15, color: darkColorTheme.secondaryTextColor }}>
                            created at Aug,11,2024
                        </a>
                    </div>
                    <div style={{ display: 'flex', }}>
                        <BsGlobe2 size={20} color={darkColorTheme.secondaryTextColor} />
                        <a style={{ marginLeft: 10, fontSize: 15, color: darkColorTheme.secondaryTextColor }}>
                            Public
                        </a>
                    </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ flex: 1 }}>
                        <h4 style={{ marginBlock: 0 }}>310K</h4>
                        <a style={{ fontSize: 13, color: darkColorTheme.secondaryTextColor }}>
                            Members
                        </a>
                    </div>
                    <div style={{ flex: 1 }}>
                        <h4 style={{ marginBlock: 0 }}>310K</h4>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <div style={{ background: 'green', padding: 5, borderRadius: 20 }} />
                            <a style={{ fontSize: 13, color: darkColorTheme.secondaryTextColor, marginLeft: 5 }}>
                                online
                            </a>
                        </div>

                    </div>
                </div>
                <div style={{ borderBottom: "0.1px solid #FFFFFF55", marginBlock: 15 }} />
                <div>
                    <a style={{ fontSize: 15, color: darkColorTheme.secondaryTextColor }}>
                        Moderators
                    </a>
                </div>
            </div>
        </div>
    )
}
