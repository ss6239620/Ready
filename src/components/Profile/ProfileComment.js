import React from 'react'
import BigButton from '../../utils/buttons/BigButton'
import IconButton from '../../utils/buttons/IconButton'
import { BiUpvote } from 'react-icons/bi';
import { FaPlus, FaRegComment, FaShare } from 'react-icons/fa';
import { darkColorTheme } from '../../constant';
import '../../asset/css/util.css'
import Underline from '../../utils/Underline';

export default function ProfileComment({ hoverEffect }) {
    const hoverEffect_style = hoverEffect ? "bright-border-button-hover" : '';
    return (
        <>
            <Underline
                color={darkColorTheme.divider}
                sizeInPx={0.3}
                style={{ marginTop: 10 }}
            />
            <div className={hoverEffect_style} style={{ display: 'flex', alignItems: 'flex-start', gap: 5, padding: 10 }}>
                <div
                    style={{
                        display: "flex",
                    }}
                >
                    <img
                        src={require('../../asset/img/logo.png')}
                        alt=""
                        style={{
                            width: "35px",
                            height: "35px",
                            objectFit: "cover",
                            borderRadius: "50%", // Optional: makes the image circular
                            display: "block", // Removes extra space under image
                        }}
                    />
                </div>
                <div>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: 5 }}>
                        <h4
                            // className='text-underline'
                            style={{
                                fontSize: 14,
                                marginBlock: 0,
                                fontWeight: 500,
                                color: darkColorTheme.secondaryTextColor,
                            }}
                        >
                            t/unexpected
                        </h4>
                        <div style={{ background: darkColorTheme.secondaryTextColor, padding: 2, borderRadius: 20, }} />
                        <a style={{ color: darkColorTheme.secondaryTextColor, fontSize: 13, marginLeft: 5 }}>Lorem Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat?</a>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginTop: 5 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                            <h4
                                style={{
                                    fontSize: 14,
                                    marginBlock: 0,
                                    fontWeight: 500,
                                    color: darkColorTheme.secondaryTextColor,
                                }}
                            >
                                ss6239620
                            </h4>
                            <a style={{ color: darkColorTheme.secondaryTextColor, fontSize: 13, marginLeft: 5 }}>replied to</a>
                            <h4
                                style={{
                                    fontSize: 14,
                                    marginBlock: 0,
                                    fontWeight: 500,
                                    color: darkColorTheme.secondaryTextColor,
                                }}
                            >
                                rm998703
                            </h4>
                            <a style={{ color: darkColorTheme.secondaryTextColor, fontSize: 13, marginLeft: 5 }}>11 day ago</a>
                        </div>
                    </div>
                    <div style={{ marginTop: 15 }}>
                        <a style={{ color: darkColorTheme.primaryTextColor, fontSize: 14 }}> Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nihil corporis sed laboriosam provident tenetur rerum deleniti nisi ut. Nihil dignissimos sit, libero fugit magni iusto iure provident sapiente. Consectetur, illo!</a>
                    </div>
                    <div className='div-center' style={{ marginTop: 10 }}>
                        <div className='div-center' style={{ background: '#3c3c3cb0', borderRadius: 30 }}>
                            <IconButton Icon={BiUpvote} size={17} />
                            <h5 style={{ marginInline: 5, marginBlock: 0 }}>0</h5>
                            <IconButton Icon={BiUpvote} size={17} />
                        </div>
                        <div style={{ background: '#3c3c3cb0', borderRadius: 30, marginInline: 15 }}>
                            <BigButton Icon={FaRegComment} iconSize={20} style={{ background: 'none' }} title={`1`} />
                        </div>
                        <div style={{ background: '#3c3c3cb0', borderRadius: 30 }}>
                            <BigButton Icon={FaShare} iconSize={20} style={{ background: 'none' }} title={`share`} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
