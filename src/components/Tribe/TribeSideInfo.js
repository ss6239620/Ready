import React from 'react'
import { darkColorTheme } from '../../constant'
import { GiCakeSlice } from 'react-icons/gi'
import { BsGlobe2 } from 'react-icons/bs'

export default function TribeSideInfo({ tribeDetail, style }) {
    return (
        <div className='fixed-bg flex-1 rounded-xl px-5 py-3' style={{ ...style }}>
            <div>
                <div>
                    <h4 className='medium-text-large-weight'>Subheading</h4>
                    <a className='medium-text-small-weight secondary-text' >
                        {tribeDetail.tribeDescription}
                    </a>
                </div>
                <div className='my-4' >
                    <div className='div-center gap-2'>
                        <GiCakeSlice size={20} color={darkColorTheme.secondaryTextColor} />
                        <a className='small-text-normal-weight secondary-text'>
                            created at Aug,11,2024
                        </a>
                    </div>
                    <div className='div-center gap-2'>
                        <BsGlobe2 size={20} color={darkColorTheme.secondaryTextColor} />
                        <a className='small-text-normal-weight secondary-text'>
                            Public
                        </a>
                    </div>
                </div>
                <div className='div-center justify-center'>
                    <div  className='flex-1'>
                        <h4 className='medium-text-normal-weight mb-0'>310K</h4>
                        <a className='small-text-normal-weight secondary-text mb-0'>
                            Members
                        </a>
                    </div>
                    <div className='flex-1' >
                        <h4 className='medium-text-normal-weight mb-0'>310K</h4>
                        <div className='div-center'>
                            <div className='bg-green-800 p-1 rounded-3xl'  />
                            <a className='small-text-normal-weight secondary-text mb-0'>
                                online
                            </a>
                        </div>

                    </div>
                </div>
                <div className='divider-bottom my-4'  />
                <div>
                    <a className='medium-text-normal-weight secondary-text' >
                        Moderators
                    </a>
                </div>
            </div>
        </div>
    )
}
