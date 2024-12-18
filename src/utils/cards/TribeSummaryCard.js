import React from 'react'
import { darkColorTheme, FILE_URL } from '../../constant'
import '../../asset/css/util.css'
import { useNavigate } from 'react-router-dom';
import { truncateText } from "../CommonFunction";

export default function TribeSummaryCard({ hoverEffect, style, data, no_of_charactor, not_require }) {

    const navigate = useNavigate()
    function handlTribeClick() {
        navigate(`/tribe/${data._id}`);
    }

    const hoverEffect_style = hoverEffect ? "bright-border-button-hover div-center" : 'div-center';
    return (
        <div onClick={handlTribeClick} className={hoverEffect_style} style={{ width: '67%', padding: 15, ...style }}>
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    marginRight: 10,
                }}
            >
                <img
                    src={`${FILE_URL}/${data.tribeProfileImage}`}
                    alt="communities-logo"
                    style={{
                        width: "60px", // Fixed size
                        height: "60px", // Fixed size
                        objectFit: "cover", // Ensures the aspect ratio is preserved
                        borderRadius: "50%", // Circular shape
                    }}
                />
            </div>
            <div>
                <h4
                    // className='text-underline'
                    style={{
                        marginInline: 3,
                        marginBlock: 5,
                        fontSize: not_require ? 17 : 21,
                        fontWeight: "bold",
                        cursor: 'pointer'
                    }}
                >
                    t/{data.tribeName}
                </h4>
                <div style={{ display: 'flex', flexDirection: not_require ? 'column-reverse' : 'column' }}>
                    <div className="div-center" style={{ marginTop: 5 }}>
                        <h5
                            style={{
                                marginInline: 3,
                                marginBlock: 0,
                                fontSize: 12,
                                color: darkColorTheme.secondaryTextColor,
                                fontWeight: 400,
                            }}
                        >
                            1.1k <span>upvotes</span>
                        </h5>
                        <div
                            style={{
                                background: darkColorTheme.secondaryTextColor,
                                padding: 1,
                                borderRadius: 20,
                                marginInline: 3,
                            }}
                        />
                        <h5
                            style={{
                                marginInline: 3,
                                marginBlock: 0,
                                fontSize: 12,
                                color: darkColorTheme.secondaryTextColor,
                                fontWeight: 400,
                            }}
                        >
                            225 <span>comments</span>
                        </h5>
                    </div>
                    <h5
                        style={{
                            marginInline: 3,
                            marginBlock: 2,
                            fontSize: 14,
                            color: darkColorTheme.secondaryTextColor,
                            fontWeight: 500,
                        }}
                    >
                        {truncateText(data.tribeDescription, no_of_charactor ? no_of_charactor : 150)}
                    </h5>
                </div>
            </div>
        </div>
    )
}
